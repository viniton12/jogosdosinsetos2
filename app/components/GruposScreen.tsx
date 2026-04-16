"use client";
import { Screen, GameState } from "../page";
import { grupos, animais } from "../data/gameData";

interface Props {
  gameState: GameState;
  onNavigate: (tela: Screen, animal?: any) => void;
  onUpdateState: (estado: Partial<GameState>) => void;
}

export default function GruposScreen({ gameState, onNavigate, onUpdateState }: Props) {
  const handleGrupoClick = (grupoId: string) => {
    const novosGrupos = gameState.gruposVisitados.includes(grupoId)
      ? gameState.gruposVisitados
      : [...gameState.gruposVisitados, grupoId];
    
    const novosBadges = [...gameState.badges];
    if (novosGrupos.length === 8 && !novosBadges.includes("explorador")) {
      novosBadges.push("explorador");
    }

    onUpdateState({ gruposVisitados: novosGrupos, badges: novosBadges });
    onNavigate("explore");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] to-[#071220] px-4 py-6">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => onNavigate("home")}
            className="text-white/60 hover:text-white text-2xl transition-colors"
          >
            ←
          </button>
          <div>
            <h1 className="text-2xl font-black text-white">Grupos de Invertebrados</h1>
            <p className="text-white/40 text-sm">{gameState.gruposVisitados.length}/8 grupos descobertos</p>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6 bg-white/5 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-emerald-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
            style={{ width: `${(gameState.gruposVisitados.length / 8) * 100}%` }}
          />
        </div>

        {/* Groups grid */}
        <div className="grid grid-cols-2 gap-3">
          {grupos.map((grupo) => {
            const count = animais.filter(a => a.grupo === grupo.id).length;
            const visitado = gameState.gruposVisitados.includes(grupo.id);

            return (
              <button
                key={grupo.id}
                onClick={() => handleGrupoClick(grupo.id)}
                className="relative p-5 rounded-2xl border text-left transition-all duration-200 hover:scale-105 group overflow-hidden"
                style={{
                  background: visitado ? `${grupo.cor}15` : 'rgba(255,255,255,0.04)',
                  borderColor: visitado ? `${grupo.cor}60` : 'rgba(255,255,255,0.1)',
                }}
              >
                {visitado && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">✓</span>
                  </div>
                )}
                <div className="text-4xl mb-3">{grupo.emoji}</div>
                <div className="font-bold text-white text-base mb-1">{grupo.nome}</div>
                <div className="text-white/40 text-xs mb-2">{grupo.descricao}</div>
                <div
                  className="text-xs font-semibold"
                  style={{ color: grupo.cor }}
                >
                  {count} animais →
                </div>
              </button>
            );
          })}
        </div>

        {/* Educational note */}
        <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/10">
          <h3 className="text-white font-bold mb-1">💡 Sabia que...</h3>
          <p className="text-white/60 text-sm">
            Os invertebrados representam mais de <strong className="text-emerald-400">97% de todas as espécies animais</strong> do planeta!
            São fundamentais para o equilíbrio de todos os ecossistemas.
          </p>
        </div>
      </div>
    </div>
  );
}
