"use client";
import { useState } from "react";
import { Screen, GameState } from "../page";
import { Animal, grupos } from "../data/gameData";

interface Props {
  animal: Animal;
  gameState: GameState;
  onNavigate: (tela: Screen) => void;
  onUpdateState: (estado: Partial<GameState>) => void;
}

export default function AnimalDetailScreen({ animal, gameState, onNavigate }: Props) {
  const [curiosidadeAtual, setCuriosidadeAtual] = useState(0);
  const grupo = grupos.find(g => g.id === animal.grupo);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] to-[#071220] px-4 py-6">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <button
            onClick={() => onNavigate("explore")}
            className="text-white/60 hover:text-white text-2xl transition-colors"
          >
            ←
          </button>
          <div
            className="px-3 py-1 rounded-full text-sm font-semibold"
            style={{ background: `${animal.cor}25`, color: animal.cor }}
          >
            {grupo?.emoji} {grupo?.nome}
          </div>
        </div>

        {/* Animal hero */}
        <div
          className="rounded-3xl p-8 text-center mb-4 relative overflow-hidden"
          style={{ background: `linear-gradient(135deg, ${animal.cor}20, ${animal.cor}08)`, border: `1px solid ${animal.cor}30` }}
        >
          <div className="text-9xl mb-4 drop-shadow-2xl">{animal.emoji}</div>
          <h1 className="text-3xl font-black text-white mb-2">{animal.nome}</h1>
          <p className="text-white/60 text-sm leading-relaxed">{animal.descricao}</p>
        </div>

        {/* Curiosidades carousel */}
        <div
          className="rounded-2xl p-5 mb-4"
          style={{ background: `${animal.cor}12`, border: `1px solid ${animal.cor}25` }}
        >
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-white font-bold flex items-center gap-2">
              <span>💡</span> Curiosidade {curiosidadeAtual + 1}/{animal.curiosidades.length}
            </h3>
            <div className="flex gap-1">
              {animal.curiosidades.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCuriosidadeAtual(i)}
                  className="w-2 h-2 rounded-full transition-all"
                  style={{ background: i === curiosidadeAtual ? animal.cor : 'rgba(255,255,255,0.2)' }}
                />
              ))}
            </div>
          </div>
          <p className="text-white text-base leading-relaxed">{animal.curiosidades[curiosidadeAtual]}</p>
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setCuriosidadeAtual(i => Math.max(0, i - 1))}
              disabled={curiosidadeAtual === 0}
              className="flex-1 py-2 rounded-xl bg-white/10 text-white/60 hover:bg-white/15 disabled:opacity-30 transition-all text-sm"
            >
              ← Anterior
            </button>
            <button
              onClick={() => setCuriosidadeAtual(i => Math.min(animal.curiosidades.length - 1, i + 1))}
              disabled={curiosidadeAtual === animal.curiosidades.length - 1}
              className="flex-1 py-2 rounded-xl text-white font-semibold hover:opacity-90 disabled:opacity-30 transition-all text-sm"
              style={{ background: animal.cor }}
            >
              Próxima →
            </button>
          </div>
        </div>

        {/* Info cards */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-white/40 text-xs mb-1">🏠 Habitat</div>
            <div className="text-white text-sm font-semibold">{animal.habitat}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-white/40 text-xs mb-1">🍽️ Alimentação</div>
            <div className="text-white text-sm font-semibold">{animal.alimentacao}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-white/40 text-xs mb-1">📏 Tamanho</div>
            <div className="text-white text-sm font-semibold">{animal.tamanho}</div>
          </div>
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
            <div className="text-white/40 text-xs mb-1">🔬 Grupo</div>
            <div className="text-white text-sm font-semibold">{grupo?.nome}</div>
          </div>
        </div>

        {/* Características */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/10 mb-4">
          <h3 className="text-white font-bold mb-3">✨ Características Principais</h3>
          <div className="flex flex-wrap gap-2">
            {animal.caracteristicas.map((c, i) => (
              <span
                key={i}
                className="px-3 py-1 rounded-full text-sm font-medium"
                style={{ background: `${animal.cor}20`, color: animal.cor, border: `1px solid ${animal.cor}30` }}
              >
                {c}
              </span>
            ))}
          </div>
        </div>

        {/* CTA buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => onNavigate("explore")}
            className="flex-1 py-3 rounded-xl bg-white/10 text-white/70 font-semibold hover:bg-white/15 transition-all"
          >
            ← Voltar
          </button>
          <button
            onClick={() => onNavigate("quiz")}
            className="flex-1 py-3 rounded-xl text-white font-bold hover:opacity-90 transition-all"
            style={{ background: 'linear-gradient(135deg, #8B5CF6, #06B6D4)' }}
          >
            🧠 Fazer Quiz
          </button>
        </div>
      </div>
    </div>
  );
}
