"use client";
import { useState } from "react";
import { Screen, GameState } from "../page";
import { animais, grupos, Animal } from "../data/gameData";

interface Props {
  gameState: GameState;
  onNavigate: (tela: Screen, animal?: Animal) => void;
  onUpdateState: (estado: Partial<GameState>) => void;
}

export default function ExploreScreen({ gameState, onNavigate, onUpdateState }: Props) {
  const [filtroGrupo, setFiltroGrupo] = useState<string>("todos");
  const [busca, setBusca] = useState("");

  const animaisFiltrados = animais.filter(a => {
    const grupoOk = filtroGrupo === "todos" || a.grupo === filtroGrupo;
    const buscaOk = a.nome.toLowerCase().includes(busca.toLowerCase()) ||
                    a.grupo.toLowerCase().includes(busca.toLowerCase());
    return grupoOk && buscaOk;
  });

  const handleAnimalClick = (animal: Animal) => {
    const novosVistos = gameState.animaisVistos.includes(animal.id)
      ? gameState.animaisVistos
      : [...gameState.animaisVistos, animal.id];

    const novosBadges = [...gameState.badges];
    if (novosVistos.length === 1 && !novosBadges.includes("curioso")) {
      // first animal seen, count towards curioso badge
    }
    if (novosVistos.length >= 5 && !novosBadges.includes("curioso")) {
      novosBadges.push("curioso");
    }

    onUpdateState({ animaisVistos: novosVistos, badges: novosBadges });
    onNavigate("animal", animal);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] to-[#071220] px-4 py-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => onNavigate("home")}
            className="text-white/60 hover:text-white text-2xl transition-colors"
          >
            ←
          </button>
          <div>
            <h1 className="text-2xl font-black text-white">Explorar Animais</h1>
            <p className="text-white/40 text-sm">
              {gameState.animaisVistos.length}/{animais.length} animais descobertos
            </p>
          </div>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="🔍 Buscar animal..."
          value={busca}
          onChange={e => setBusca(e.target.value)}
          className="w-full mb-4 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-white/30 outline-none focus:border-emerald-500/50 transition-colors"
        />

        {/* Group filter */}
        <div className="flex gap-2 overflow-x-auto pb-2 mb-5 scrollbar-hide">
          <button
            onClick={() => setFiltroGrupo("todos")}
            className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-semibold transition-all ${
              filtroGrupo === "todos"
                ? "bg-white text-black"
                : "bg-white/10 text-white/60 hover:bg-white/15"
            }`}
          >
            Todos
          </button>
          {grupos.map(g => (
            <button
              key={g.id}
              onClick={() => setFiltroGrupo(g.id)}
              className={`flex-shrink-0 px-3 py-1.5 rounded-full text-sm font-semibold transition-all flex items-center gap-1 ${
                filtroGrupo === g.id
                  ? "text-black"
                  : "bg-white/10 text-white/60 hover:bg-white/15"
              }`}
              style={filtroGrupo === g.id ? { background: g.cor } : {}}
            >
              {g.emoji} {g.nome}
            </button>
          ))}
        </div>

        {/* Animals grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {animaisFiltrados.map(animal => {
            const grupo = grupos.find(g => g.id === animal.grupo);
            const visto = gameState.animaisVistos.includes(animal.id);

            return (
              <button
                key={animal.id}
                onClick={() => handleAnimalClick(animal)}
                className="relative p-4 rounded-2xl border text-center transition-all duration-200 hover:scale-105 group"
                style={{
                  background: visto ? `${animal.cor}12` : 'rgba(255,255,255,0.04)',
                  borderColor: visto ? `${animal.cor}40` : 'rgba(255,255,255,0.08)',
                }}
              >
                {!visto && (
                  <div className="absolute inset-0 bg-black/30 rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-0">
                    <span className="text-white text-xs">Clique para descobrir</span>
                  </div>
                )}
                {visto && (
                  <div className="absolute top-2 right-2 w-4 h-4 rounded-full flex items-center justify-center" style={{ background: animal.cor }}>
                    <span className="text-white text-[10px]">✓</span>
                  </div>
                )}
                <div className="text-5xl mb-2">{animal.emoji}</div>
                <div className="text-white font-bold text-sm">{animal.nome}</div>
                <div className="text-white/40 text-xs mt-0.5">{grupo?.nome}</div>
              </button>
            );
          })}
        </div>

        {animaisFiltrados.length === 0 && (
          <div className="text-center text-white/40 py-12">
            <div className="text-4xl mb-2">🔍</div>
            <p>Nenhum animal encontrado</p>
          </div>
        )}
      </div>
    </div>
  );
}
