"use client";
import { useState, useEffect, useCallback } from "react";
import { Screen, GameState } from "../page";
import { animais } from "../data/gameData";

interface Props {
  gameState: GameState;
  onNavigate: (tela: Screen) => void;
  onUpdateState: (estado: Partial<GameState>) => void;
}

interface Carta {
  id: number;
  animalId: string;
  tipo: "emoji" | "nome";
  virada: boolean;
  encontrada: boolean;
}

type GamePhase = "intro" | "playing" | "win";

const ANIMAIS_JOGO = animais.slice(0, 8);

function criarCartas(): Carta[] {
  const cartas: Carta[] = [];
  ANIMAIS_JOGO.forEach((animal, i) => {
    cartas.push({ id: i * 2, animalId: animal.id, tipo: "emoji", virada: false, encontrada: false });
    cartas.push({ id: i * 2 + 1, animalId: animal.id, tipo: "nome", virada: false, encontrada: false });
  });
  return cartas.sort(() => Math.random() - 0.5);
}

export default function MemoriaScreen({ gameState, onNavigate, onUpdateState }: Props) {
  const [fase, setFase] = useState<GamePhase>("intro");
  const [cartas, setCartas] = useState<Carta[]>([]);
  const [selecionadas, setSelecionadas] = useState<number[]>([]);
  const [pares, setPares] = useState(0);
  const [erros, setErros] = useState(0);
  const [tempo, setTempo] = useState(0);
  const [bloqueado, setBloqueado] = useState(false);

  useEffect(() => {
    if (fase !== "playing") return;
    const t = setInterval(() => setTempo(s => s + 1), 1000);
    return () => clearInterval(t);
  }, [fase]);

  const iniciar = () => {
    setCartas(criarCartas());
    setSelecionadas([]);
    setPares(0);
    setErros(0);
    setTempo(0);
    setBloqueado(false);
    setFase("playing");
  };

  const handleCarta = useCallback((id: number) => {
    if (bloqueado) return;
    const carta = cartas.find(c => c.id === id);
    if (!carta || carta.virada || carta.encontrada) return;
    if (selecionadas.length === 1 && selecionadas[0] === id) return;

    const novasSel = [...selecionadas, id];
    setCartas(prev => prev.map(c => c.id === id ? { ...c, virada: true } : c));
    setSelecionadas(novasSel);

    if (novasSel.length === 2) {
      setBloqueado(true);
      const [id1, id2] = novasSel;
      const c1 = cartas.find(c => c.id === id1)!;
      const c2 = { ...carta, virada: true };

      setTimeout(() => {
        if (c1.animalId === c2.animalId && c1.tipo !== c2.tipo) {
          // Match!
          const novosPares = pares + 1;
          setPares(novosPares);
          setCartas(prev => prev.map(c =>
            c.id === id1 || c.id === id2 ? { ...c, encontrada: true } : c
          ));
          if (novosPares === ANIMAIS_JOGO.length) {
            // Win
            const pontosGanhos = Math.max(10, 100 - erros * 5 - Math.floor(tempo / 10));
            const novosBadges = [...gameState.badges];
            if (!novosBadges.includes("memoria-mestre") && erros <= 2) {
              novosBadges.push("memoria-mestre");
            }
            if (!novosBadges.includes("memoria-bronze")) novosBadges.push("memoria-bronze");
            onUpdateState({
              pontos: gameState.pontos + pontosGanhos,
              badges: novosBadges,
              memoriaRecorde: gameState.memoriaRecorde === 0 ? tempo : Math.min(gameState.memoriaRecorde, tempo),
              totalJogadas: gameState.totalJogadas + 1,
            });
            setFase("win");
          }
        } else {
          setErros(e => e + 1);
          setCartas(prev => prev.map(c =>
            c.id === id1 || c.id === id2 ? { ...c, virada: false } : c
          ));
        }
        setSelecionadas([]);
        setBloqueado(false);
      }, 900);
    }
  }, [bloqueado, cartas, selecionadas, pares, erros, tempo, gameState, onUpdateState]);

  const formatTime = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;

  if (fase === "intro") {
    return (
      <div className="min-h-screen bg-[#060e1a] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="text-8xl mb-4">🃏</div>
          <h1 className="text-4xl font-black text-white mb-2">Jogo da Memória</h1>
          <p className="text-white/50 mb-8">Combine o emoji do animal com seu nome. 8 pares para encontrar!</p>

          {gameState.memoriaRecorde > 0 && (
            <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl">
              <p className="text-yellow-400 font-bold">🏅 Seu recorde: {formatTime(gameState.memoriaRecorde)}</p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-3 mb-8 text-sm">
            {[
              { emoji: "🃏", t: "16 cartas", d: "8 pares" },
              { emoji: "⚡", t: "Sem limite", d: "de tempo" },
              { emoji: "🏆", t: "Menos erros", d: "mais pontos" },
            ].map((i, idx) => (
              <div key={idx} className="p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="text-2xl mb-1">{i.emoji}</div>
                <div className="text-white font-bold text-xs">{i.t}</div>
                <div className="text-white/40 text-xs">{i.d}</div>
              </div>
            ))}
          </div>

          <button onClick={iniciar} className="w-full py-4 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-black text-xl rounded-2xl hover:opacity-90 hover:scale-105 transition-all">
            Jogar! 🃏
          </button>
          <button onClick={() => onNavigate("home")} className="w-full py-3 mt-3 text-white/40 hover:text-white/60 transition-colors">
            ← Voltar
          </button>
        </div>
      </div>
    );
  }

  if (fase === "win") {
    const pontos = Math.max(10, 100 - erros * 5 - Math.floor(tempo / 10));
    return (
      <div className="min-h-screen bg-[#060e1a] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="text-8xl mb-4">🎉</div>
          <h1 className="text-4xl font-black text-white mb-2">Parabéns!</h1>
          <p className="text-white/50 mb-6">Você encontrou todos os pares!</p>
          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
              <div className="text-2xl font-black text-emerald-400">{formatTime(tempo)}</div>
              <div className="text-white/50 text-xs">Tempo</div>
            </div>
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <div className="text-2xl font-black text-red-400">{erros}</div>
              <div className="text-white/50 text-xs">Erros</div>
            </div>
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
              <div className="text-2xl font-black text-yellow-400">+{pontos}</div>
              <div className="text-white/50 text-xs">Pontos</div>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={iniciar} className="flex-1 py-4 bg-yellow-500 text-black font-black rounded-2xl hover:opacity-90 transition-all">
              🔄 Jogar de Novo
            </button>
            <button onClick={() => onNavigate("home")} className="flex-1 py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/15 transition-all">
              🏠 Início
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Playing
  return (
    <div className="min-h-screen bg-[#060e1a] px-3 py-4">
      <div className="max-w-lg mx-auto">
        {/* HUD */}
        <div className="flex items-center gap-2 mb-4">
          <button onClick={() => { setFase("intro"); }} className="text-white/40 hover:text-white text-xl transition-colors">✕</button>
          <div className="flex-1 flex justify-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 bg-white/5 rounded-full px-3 py-1.5 border border-white/10">
              <span>⏱️</span><span className="text-white font-mono">{formatTime(tempo)}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-emerald-500/10 rounded-full px-3 py-1.5 border border-emerald-500/20">
              <span>✓</span><span className="text-emerald-400 font-bold">{pares}/{ANIMAIS_JOGO.length}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-red-500/10 rounded-full px-3 py-1.5 border border-red-500/20">
              <span>✗</span><span className="text-red-400 font-bold">{erros}</span>
            </div>
          </div>
        </div>

        {/* Cards grid - 4x4 */}
        <div className="grid grid-cols-4 gap-2">
          {cartas.map((carta) => {
            const animal = animais.find(a => a.id === carta.animalId)!;
            const isSelected = selecionadas.includes(carta.id);
            const show = carta.virada || carta.encontrada;

            return (
              <button
                key={carta.id}
                onClick={() => handleCarta(carta.id)}
                className={`aspect-square rounded-xl border text-center flex items-center justify-center transition-all duration-300 ${
                  carta.encontrada
                    ? "bg-emerald-500/20 border-emerald-500/50 scale-95"
                    : show
                    ? "bg-white/10 border-white/20 scale-100"
                    : "bg-white/5 border-white/10 hover:bg-white/10 hover:border-white/20 hover:scale-105 cursor-pointer"
                }`}
                style={carta.encontrada ? { background: `${animal.cor}20`, borderColor: `${animal.cor}50` } : {}}
              >
                {show ? (
                  <div className="flex flex-col items-center justify-center p-1">
                    {carta.tipo === "emoji" ? (
                      <span className="text-2xl leading-none">{animal.emoji}</span>
                    ) : (
                      <span className="text-[9px] font-bold text-white leading-tight text-center px-0.5">
                        {animal.nome}
                      </span>
                    )}
                  </div>
                ) : (
                  <span className="text-2xl opacity-30">?</span>
                )}
              </button>
            );
          })}
        </div>

        <p className="text-center text-white/30 text-xs mt-4">
          Combine o 🐙 emoji com o nome do animal
        </p>
      </div>
    </div>
  );
}
