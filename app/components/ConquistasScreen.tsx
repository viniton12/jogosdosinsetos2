"use client";
import { Screen, GameState } from "../page";

interface Props {
  gameState: GameState;
  onNavigate: (tela: Screen) => void;
}

const todasConquistas = [
  { id: "primeiro-acerto", nome: "Primeiro Acerto!", emoji: "⭐", descricao: "Acertou a primeira pergunta do quiz", categoria: "Quiz" },
  { id: "5-seguidas", nome: "Em Chama!", emoji: "🔥", descricao: "5 respostas corretas seguidas no quiz", categoria: "Quiz" },
  { id: "naturalista", nome: "Naturalista", emoji: "🔬", descricao: "Completou o quiz com 70% de acertos", categoria: "Quiz" },
  { id: "especialista", nome: "Especialista", emoji: "🏆", descricao: "Completou o quiz com 90% de acertos", categoria: "Quiz" },
  { id: "explorador", nome: "Explorador", emoji: "🗺️", descricao: "Visitou todos os 8 grupos de invertebrados", categoria: "Exploração" },
  { id: "curioso", nome: "Super Curioso", emoji: "🧐", descricao: "Descobriu 5 ou mais animais na galeria", categoria: "Exploração" },
  { id: "memoria-bronze", nome: "Mestre da Memória", emoji: "🃏", descricao: "Completou o Jogo da Memória", categoria: "Memória" },
  { id: "memoria-mestre", nome: "Memória Perfeita", emoji: "💎", descricao: "Terminou a memória com apenas 2 erros ou menos", categoria: "Memória" },
];

const categorias = ["Quiz", "Exploração", "Memória"];

export default function ConquistasScreen({ gameState, onNavigate }: Props) {
  const conquistadas = gameState.badges;
  const pct = Math.round((conquistadas.length / todasConquistas.length) * 100);

  return (
    <div className="min-h-screen bg-[#060e1a] px-4 py-6">
      <div className="max-w-lg mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button onClick={() => onNavigate("home")} className="text-white/60 hover:text-white text-2xl">←</button>
          <div>
            <h1 className="text-2xl font-black text-white">Conquistas</h1>
            <p className="text-white/40 text-sm">{conquistadas.length}/{todasConquistas.length} desbloqueadas</p>
          </div>
        </div>

        {/* Overall progress */}
        <div className="p-5 bg-gradient-to-br from-yellow-500/15 to-orange-500/5 border border-yellow-500/20 rounded-2xl mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-white font-bold">Progresso Total</span>
            <span className="text-yellow-400 font-black text-xl">{pct}%</span>
          </div>
          <div className="bg-black/30 rounded-full h-3 mb-3">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-yellow-500 to-orange-500 transition-all duration-700"
              style={{ width: `${pct}%` }}
            />
          </div>
          <div className="flex justify-between text-xs text-white/40">
            <span>⭐ {gameState.pontos} pontos totais</span>
            <span>🎮 {gameState.totalJogadas} partidas jogadas</span>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {[
            { val: gameState.animaisVistos.length + "/15", label: "Animais vistos", emoji: "🐾" },
            { val: gameState.gruposVisitados.length + "/8", label: "Grupos", emoji: "🔬" },
            { val: gameState.memoriaRecorde > 0 ? `${gameState.memoriaRecorde}s` : "—", label: "Recorde Mem.", emoji: "🃏" },
          ].map((s, i) => (
            <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/10 text-center">
              <div className="text-lg">{s.emoji}</div>
              <div className="text-white font-black text-base">{s.val}</div>
              <div className="text-white/40 text-[10px]">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Badges by category */}
        {categorias.map(cat => {
          const itens = todasConquistas.filter(c => c.categoria === cat);
          return (
            <div key={cat} className="mb-5">
              <h2 className="text-white/60 text-xs font-bold uppercase tracking-widest mb-3">{cat}</h2>
              <div className="flex flex-col gap-2">
                {itens.map(conquista => {
                  const desbloqueada = conquistadas.includes(conquista.id);
                  return (
                    <div
                      key={conquista.id}
                      className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${
                        desbloqueada
                          ? "bg-yellow-500/10 border-yellow-500/30"
                          : "bg-white/[0.03] border-white/[0.06]"
                      }`}
                    >
                      <div className={`text-3xl transition-all ${desbloqueada ? "" : "grayscale opacity-30"}`}>
                        {conquista.emoji}
                      </div>
                      <div className="flex-1">
                        <div className={`font-bold text-sm ${desbloqueada ? "text-white" : "text-white/30"}`}>
                          {conquista.nome}
                        </div>
                        <div className={`text-xs ${desbloqueada ? "text-white/50" : "text-white/20"}`}>
                          {desbloqueada ? conquista.descricao : "???"}
                        </div>
                      </div>
                      {desbloqueada && (
                        <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                          <span className="text-black text-xs font-black">✓</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        {conquistadas.length === 0 && (
          <div className="text-center text-white/30 py-6">
            <div className="text-4xl mb-2">🎯</div>
            <p>Jogue os modos para desbloquear conquistas!</p>
          </div>
        )}
      </div>
    </div>
  );
}
