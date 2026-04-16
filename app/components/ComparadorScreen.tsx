"use client";
import { useState } from "react";
import { Screen, GameState } from "../page";
import { animais, grupos } from "../data/gameData";

interface Props {
  gameState: GameState;
  onNavigate: (tela: Screen) => void;
}

export default function ComparadorScreen({ gameState, onNavigate }: Props) {
  const [animal1Id, setAnimal1Id] = useState(animais[0].id);
  const [animal2Id, setAnimal2Id] = useState(animais[7].id);

  const a1 = animais.find(a => a.id === animal1Id)!;
  const a2 = animais.find(a => a.id === animal2Id)!;
  const g1 = grupos.find(g => g.id === a1.grupo)!;
  const g2 = grupos.find(g => g.id === a2.grupo)!;

  const iguais = a1.grupo === a2.grupo;

  const comparacoes = [
    { label: "Grupo", v1: g1.nome, v2: g2.nome, emoji: "🔬" },
    { label: "Habitat", v1: a1.habitat.split(",")[0], v2: a2.habitat.split(",")[0], emoji: "🏠" },
    { label: "Alimentação", v1: a1.alimentacao.split(",")[0].split("(")[0].trim(), v2: a2.alimentacao.split(",")[0].split("(")[0].trim(), emoji: "🍽️" },
    { label: "Tamanho", v1: a1.tamanho, v2: a2.tamanho, emoji: "📏" },
  ];

  const similaridades: string[] = [];
  const diferencas: string[] = [];

  if (a1.grupo === a2.grupo) similaridades.push(`Ambos são ${g1.nome}`);
  else diferencas.push(`${a1.nome} é ${g1.nome}, ${a2.nome} é ${g2.nome}`);

  // Check shared characteristics
  a1.caracteristicas.forEach(c => {
    if (a2.caracteristicas.some(c2 => c2.toLowerCase().includes(c.toLowerCase().split(" ")[0]))) {
      if (!similaridades.includes(c)) similaridades.push(c);
    }
  });

  a1.caracteristicas.forEach(c => {
    if (!a2.caracteristicas.some(c2 => c2.toLowerCase().includes(c.toLowerCase().split(" ")[0]))) {
      diferencas.push(`${a1.nome}: ${c}`);
    }
  });

  return (
    <div className="min-h-screen bg-[#060e1a] px-4 py-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => onNavigate("home")} className="text-white/60 hover:text-white text-2xl">←</button>
          <div>
            <h1 className="text-2xl font-black text-white">Comparar Animais</h1>
            <p className="text-white/40 text-sm">Selecione dois animais para comparar</p>
          </div>
        </div>

        {/* Selectors */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {[{ id: animal1Id, setId: setAnimal1Id, cor: a1.cor, animal: a1 },
            { id: animal2Id, setId: setAnimal2Id, cor: a2.cor, animal: a2 }].map((slot, i) => (
            <div key={i}>
              <div
                className="rounded-2xl p-5 text-center mb-2 border"
                style={{ background: `${slot.cor}15`, borderColor: `${slot.cor}35` }}
              >
                <div className="text-5xl mb-1">{slot.animal.emoji}</div>
                <div className="text-white font-bold text-sm">{slot.animal.nome}</div>
              </div>
              <select
                value={slot.id}
                onChange={e => slot.setId(e.target.value)}
                className="w-full bg-white/5 border border-white/15 rounded-xl px-3 py-2 text-white text-sm outline-none focus:border-white/30"
              >
                {animais.map(a => (
                  <option key={a.id} value={a.id} className="bg-gray-900">
                    {a.emoji} {a.nome}
                  </option>
                ))}
              </select>
            </div>
          ))}
        </div>

        {/* VS badge */}
        <div className={`text-center mb-5 py-2 rounded-full text-sm font-bold border ${
          iguais
            ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
            : "bg-purple-500/15 border-purple-500/30 text-purple-400"
        }`}>
          {iguais ? `✓ Ambos do grupo ${g1.nome}` : `⚡ ${g1.nome} vs ${g2.nome}`}
        </div>

        {/* Comparacao table */}
        <div className="rounded-2xl overflow-hidden border border-white/10 mb-5">
          {comparacoes.map((row, i) => (
            <div
              key={i}
              className={`grid grid-cols-[1fr_auto_1fr] gap-2 p-3 items-center ${
                i % 2 === 0 ? "bg-white/[0.03]" : "bg-transparent"
              }`}
            >
              <div className="text-white/80 text-xs text-right leading-tight">{row.v1}</div>
              <div className="text-center px-2">
                <div className="text-base">{row.emoji}</div>
                <div className="text-white/30 text-[9px] font-bold uppercase">{row.label}</div>
              </div>
              <div className="text-white/80 text-xs text-left leading-tight">{row.v2}</div>
            </div>
          ))}
        </div>

        {/* Características lado a lado */}
        <div className="grid grid-cols-2 gap-3 mb-5">
          {[a1, a2].map((a, i) => (
            <div key={i} className="p-3 rounded-xl border border-white/10 bg-white/[0.03]">
              <div className="text-white/40 text-xs font-bold uppercase mb-2">{a.nome}</div>
              {a.caracteristicas.map((c, ci) => (
                <div key={ci} className="text-xs text-white/70 flex items-center gap-1 mb-1">
                  <span style={{ color: i === 0 ? a1.cor : a2.cor }}>•</span> {c}
                </div>
              ))}
            </div>
          ))}
        </div>

        {/* Similarities & Differences */}
        <div className="grid grid-cols-2 gap-3">
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/25 rounded-xl">
            <h3 className="text-emerald-400 font-bold text-sm mb-2">✓ Semelhanças</h3>
            {similaridades.slice(0, 4).map((s, i) => (
              <p key={i} className="text-white/60 text-xs mb-1">• {s}</p>
            ))}
            {similaridades.length === 0 && <p className="text-white/30 text-xs">Nenhuma semelhança encontrada</p>}
          </div>
          <div className="p-4 bg-red-500/10 border border-red-500/25 rounded-xl">
            <h3 className="text-red-400 font-bold text-sm mb-2">✗ Diferenças</h3>
            {diferencas.slice(0, 4).map((d, i) => (
              <p key={i} className="text-white/60 text-xs mb-1">• {d}</p>
            ))}
            {diferencas.length === 0 && <p className="text-white/30 text-xs">Animais muito similares!</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
