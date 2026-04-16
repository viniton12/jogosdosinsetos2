"use client";
import { Screen, GameState } from "../page";

interface Props {
  gameState: GameState;
  onNavigate: (tela: Screen) => void;
}

const menuItems = [
  { tela: "grupos" as Screen, emoji: "🔬", label: "Explorar Grupos", desc: "8 grupos taxonômicos", cor: "#10B981", bg: "from-emerald-600/30 to-emerald-900/10", border: "border-emerald-500/30" },
  { tela: "explore" as Screen, emoji: "🐾", label: "Galeria de Animais", desc: "15 animais detalhados", cor: "#06B6D4", bg: "from-cyan-600/30 to-cyan-900/10", border: "border-cyan-500/30" },
  { tela: "quiz" as Screen, emoji: "🧠", label: "Quiz Interativo", desc: "Desafie seus conhecimentos", cor: "#8B5CF6", bg: "from-purple-600/30 to-purple-900/10", border: "border-purple-500/30" },
  { tela: "memoria" as Screen, emoji: "🃏", label: "Jogo da Memória", desc: "Combine os pares", cor: "#F59E0B", bg: "from-yellow-600/30 to-yellow-900/10", border: "border-yellow-500/30" },
  { tela: "comparador" as Screen, emoji: "⚖️", label: "Comparar Animais", desc: "Diferenças e semelhanças", cor: "#EC4899", bg: "from-pink-600/30 to-pink-900/10", border: "border-pink-500/30" },
  { tela: "timeline" as Screen, emoji: "⏳", label: "Linha do Tempo", desc: "Evolução dos invertebrados", cor: "#F97316", bg: "from-orange-600/30 to-orange-900/10", border: "border-orange-500/30" },
  { tela: "conquistas" as Screen, emoji: "🏆", label: "Conquistas", desc: "Seus badges e recordes", cor: "#EAB308", bg: "from-yellow-600/20 to-yellow-900/10", border: "border-yellow-500/20" },
];

export default function HomeScreen({ gameState, onNavigate }: Props) {
  const totalBadgesPossiveis = 7;

  return (
    <div className="min-h-screen bg-[#060e1a] relative overflow-hidden">
      {/* Animated bg */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl" />
        {["🦋","🐝","🕷️","🦀","🐌","⭐","🪼","🧽","🐙","🪱","🦂","🐜","🦐","🪸","🦔"].map((e, i) => (
          <div key={i} className="absolute text-xl opacity-[0.07] animate-drift"
            style={{ left: `${(i * 7) % 100}%`, top: `${(i * 11 + 5) % 90}%`, animationDelay: `${i * 0.5}s`, animationDuration: `${5 + (i % 4)}s` }}>
            {e}
          </div>
        ))}
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 pt-12 pb-8">
        {/* Hero */}
        <div className="text-center mb-8">
          <div className="text-7xl mb-3 drop-shadow-2xl">🦋</div>
          <h1 className="text-5xl font-black text-white tracking-tight leading-none">
            INVERT<span className="text-emerald-400">EBRA</span>DOS
          </h1>
          <p className="text-white/50 mt-2 text-base tracking-widest uppercase text-sm">
            O mundo incrível dos animais sem espinha
          </p>
        </div>

        {/* Stats row */}
        <div className="flex justify-center gap-4 mb-8">
          {[
            { val: gameState.pontos, label: "pontos", emoji: "⭐", cor: "text-yellow-400" },
            { val: `${gameState.animaisVistos.length}/15`, label: "animais", emoji: "🐾", cor: "text-emerald-400" },
            { val: `${gameState.badges.length}/${totalBadgesPossiveis}`, label: "badges", emoji: "🏆", cor: "text-purple-400" },
          ].map((s, i) => (
            <div key={i} className="flex-1 text-center py-3 bg-white/[0.04] rounded-2xl border border-white/[0.08]">
              <div className={`text-xl font-black ${s.cor}`}>{s.val}</div>
              <div className="text-white/40 text-xs">{s.emoji} {s.label}</div>
            </div>
          ))}
        </div>

        {/* Menu grid */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          {menuItems.map((item) => (
            <button
              key={item.tela}
              onClick={() => onNavigate(item.tela)}
              className={`relative p-4 rounded-2xl border bg-gradient-to-br ${item.bg} ${item.border} text-left transition-all duration-200 hover:scale-[1.03] hover:brightness-110 group overflow-hidden`}
            >
              <div className="text-3xl mb-2">{item.emoji}</div>
              <div className="text-white font-bold text-sm leading-tight mb-0.5">{item.label}</div>
              <div className="text-white/40 text-xs">{item.desc}</div>
              {item.tela === "quiz" && gameState.quizCompleto && (
                <span className="absolute top-2 right-2 text-xs bg-yellow-500 text-black rounded-full px-1.5 py-0.5 font-bold">
                  {gameState.ultimaPontuacaoQuiz}%
                </span>
              )}
              {item.tela === "memoria" && gameState.memoriaRecorde > 0 && (
                <span className="absolute top-2 right-2 text-xs bg-yellow-500/80 text-black rounded-full px-1.5 py-0.5 font-bold">
                  🏅 {gameState.memoriaRecorde}s
                </span>
              )}
              {item.tela === "conquistas" && gameState.badges.length > 0 && (
                <span className="absolute top-2 right-2 w-5 h-5 bg-yellow-500 rounded-full flex items-center justify-center text-xs font-black text-black">
                  {gameState.badges.length}
                </span>
              )}
            </button>
          ))}
        </div>

        <p className="text-center text-white/20 text-xs mt-4">
          Desenvolvido para o ensino de Ciências • Séries Finais do Ensino Fundamental
        </p>
      </div>

      <style jsx>{`
        @keyframes drift {
          0%, 100% { transform: translateY(0px) rotate(0deg); opacity: 0.07; }
          50% { transform: translateY(-18px) rotate(8deg); opacity: 0.12; }
        }
        .animate-drift { animation: drift 5s ease-in-out infinite; }
      `}</style>
    </div>
  );
}
