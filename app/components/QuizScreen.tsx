"use client";
import { useState, useEffect } from "react";
import { Screen, GameState } from "../page";
import { quizPerguntas, animais } from "../data/gameData";

interface Props {
  gameState: GameState;
  onNavigate: (tela: Screen) => void;
  onUpdateState: (estado: Partial<GameState>) => void;
}

type QuizPhase = "intro" | "question" | "feedback" | "results";

export default function QuizScreen({ gameState, onNavigate, onUpdateState }: Props) {
  const [fase, setFase] = useState<QuizPhase>("intro");
  const [perguntaAtual, setPerguntaAtual] = useState(0);
  const [respostaSelecionada, setRespostaSelecionada] = useState<number | null>(null);
  const [acertos, setAcertos] = useState(0);
  const [streak, setStreak] = useState(0);
  const [perguntas] = useState(() => {
    // Shuffle questions
    return [...quizPerguntas].sort(() => Math.random() - 0.5).slice(0, 10);
  });
  const [tempo, setTempo] = useState(20);
  const [timerAtivo, setTimerAtivo] = useState(false);

  useEffect(() => {
    if (!timerAtivo || fase !== "question") return;
    if (tempo <= 0) {
      handleResposta(-1);
      return;
    }
    const timer = setTimeout(() => setTempo(t => t - 1), 1000);
    return () => clearTimeout(timer);
  }, [tempo, timerAtivo, fase]);

  const iniciarQuiz = () => {
    setFase("question");
    setTempo(20);
    setTimerAtivo(true);
  };

  const handleResposta = (index: number) => {
    if (respostaSelecionada !== null) return;
    setTimerAtivo(false);
    setRespostaSelecionada(index);

    const pergunta = perguntas[perguntaAtual];
    const correta = index === pergunta.resposta;

    if (correta) {
      setAcertos(a => a + 1);
      setStreak(s => s + 1);
    } else {
      setStreak(0);
    }
    setFase("feedback");
  };

  const proximaPergunta = () => {
    if (perguntaAtual + 1 >= perguntas.length) {
      finalizarQuiz();
      return;
    }
    setPerguntaAtual(p => p + 1);
    setRespostaSelecionada(null);
    setFase("question");
    setTempo(20);
    setTimerAtivo(true);
  };

  const finalizarQuiz = () => {
    const pct = Math.round((acertos / perguntas.length) * 100);
    const pontosGanhos = acertos * 10;
    const novosBadges = [...gameState.badges];

    if (acertos >= 1 && !novosBadges.includes("primeiro-acerto")) {
      novosBadges.push("primeiro-acerto");
    }
    if (pct >= 70 && !novosBadges.includes("naturalista")) {
      novosBadges.push("naturalista");
    }
    if (pct >= 90 && !novosBadges.includes("especialista")) {
      novosBadges.push("especialista");
    }
    if (streak >= 5 && !novosBadges.includes("5-seguidas")) {
      novosBadges.push("5-seguidas");
    }

    onUpdateState({
      pontos: gameState.pontos + pontosGanhos,
      badges: novosBadges,
      quizCompleto: true,
      ultimaPontuacaoQuiz: pct,
      streak: Math.max(gameState.streak, streak),
    });
    setFase("results");
  };

  const pergunta = perguntas[perguntaAtual];

  // INTRO screen
  if (fase === "intro") {
    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a1628] to-[#071220] flex flex-col items-center justify-center px-4">
        <div className="max-w-lg w-full text-center">
          <div className="text-8xl mb-4">🧠</div>
          <h1 className="text-4xl font-black text-white mb-2">Quiz dos Invertebrados</h1>
          <p className="text-white/60 mb-8">
            {perguntas.length} perguntas • 20 segundos cada • Sem repetição
          </p>

          {gameState.quizCompleto && (
            <div className="mb-6 p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-2xl">
              <p className="text-yellow-400 font-bold">Sua última pontuação: {gameState.ultimaPontuacaoQuiz}%</p>
              <p className="text-white/40 text-sm">Tente superar!</p>
            </div>
          )}

          <div className="grid grid-cols-3 gap-3 mb-8">
            {[
              { emoji: "⚡", label: "Rápido", desc: "20s por pergunta" },
              { emoji: "🏆", label: "Pontue", desc: "10pts por acerto" },
              { emoji: "🎖️", label: "Conquistas", desc: "Ganhe badges" },
            ].map((item, i) => (
              <div key={i} className="p-3 bg-white/5 rounded-xl border border-white/10">
                <div className="text-2xl mb-1">{item.emoji}</div>
                <div className="text-white font-bold text-sm">{item.label}</div>
                <div className="text-white/40 text-xs">{item.desc}</div>
              </div>
            ))}
          </div>

          <button
            onClick={iniciarQuiz}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-black text-xl rounded-2xl hover:opacity-90 hover:scale-105 transition-all"
          >
            Começar Quiz! 🚀
          </button>
          <button
            onClick={() => onNavigate("home")}
            className="w-full py-3 mt-3 text-white/40 hover:text-white/60 transition-colors"
          >
            Voltar ao início
          </button>
        </div>
      </div>
    );
  }

  // RESULTS screen
  if (fase === "results") {
    const pct = Math.round((acertos / perguntas.length) * 100);
    const medalha = pct >= 90 ? "🏆" : pct >= 70 ? "🥈" : pct >= 50 ? "🥉" : "📚";
    const mensagem = pct >= 90 ? "Incrível! Você é um especialista!" : 
                     pct >= 70 ? "Muito bem! Você tem bom conhecimento!" :
                     pct >= 50 ? "Bom trabalho! Continue estudando!" :
                     "Continue explorando para aprender mais!";

    return (
      <div className="min-h-screen bg-gradient-to-b from-[#0a1628] to-[#071220] flex flex-col items-center justify-center px-4">
        <div className="max-w-lg w-full text-center">
          <div className="text-8xl mb-4">{medalha}</div>
          <h1 className="text-4xl font-black text-white mb-2">{pct}% de acertos!</h1>
          <p className="text-white/60 mb-2">{mensagem}</p>
          <p className="text-emerald-400 font-bold text-lg mb-8">+{acertos * 10} pontos ganhos!</p>

          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl">
              <div className="text-2xl font-black text-emerald-400">{acertos}</div>
              <div className="text-white/60 text-xs">Acertos</div>
            </div>
            <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <div className="text-2xl font-black text-red-400">{perguntas.length - acertos}</div>
              <div className="text-white/60 text-xs">Erros</div>
            </div>
            <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-xl">
              <div className="text-2xl font-black text-yellow-400">{gameState.pontos + acertos * 10}</div>
              <div className="text-white/60 text-xs">Total pts</div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => {
                setPerguntaAtual(0);
                setAcertos(0);
                setStreak(0);
                setRespostaSelecionada(null);
                setFase("intro");
              }}
              className="flex-1 py-4 bg-white/10 text-white font-bold rounded-2xl hover:bg-white/15 transition-all"
            >
              🔄 Jogar de Novo
            </button>
            <button
              onClick={() => onNavigate("home")}
              className="flex-1 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold rounded-2xl hover:opacity-90 transition-all"
            >
              🏠 Início
            </button>
          </div>
        </div>
      </div>
    );
  }

  // QUESTION / FEEDBACK screens
  const progresso = ((perguntaAtual + 1) / perguntas.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a1628] to-[#071220] px-4 py-6">
      <div className="max-w-lg mx-auto">
        {/* Top bar */}
        <div className="flex items-center gap-3 mb-4">
          <button onClick={() => onNavigate("home")} className="text-white/40 hover:text-white text-xl transition-colors">✕</button>
          <div className="flex-1 bg-white/10 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progresso}%` }}
            />
          </div>
          <div className="text-white/60 text-sm font-mono w-12 text-right">
            {perguntaAtual + 1}/{perguntas.length}
          </div>
        </div>

        {/* Timer + Streak */}
        <div className="flex items-center justify-between mb-4">
          <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-bold transition-colors ${
            tempo <= 5 ? 'bg-red-500/20 text-red-400 border border-red-500/30' : 'bg-white/5 text-white/60 border border-white/10'
          }`}>
            ⏱️ {tempo}s
          </div>
          {streak >= 2 && (
            <div className="flex items-center gap-1 px-3 py-1.5 rounded-full bg-orange-500/20 text-orange-400 border border-orange-500/30 text-sm font-bold">
              🔥 {streak} seguidas!
            </div>
          )}
          <div className="text-emerald-400 font-bold text-sm">
            {acertos * 10} pts
          </div>
        </div>

        {/* Question */}
        <div className="p-6 bg-white/5 border border-white/10 rounded-2xl mb-4">
          {pergunta.animalId && (
            <div className="text-5xl text-center mb-4">
              {animais.find(a => a.id === pergunta.animalId)?.emoji}
            </div>
          )}
          <p className="text-white text-xl font-bold text-center leading-relaxed">
            {pergunta.pergunta}
          </p>
        </div>

        {/* Options */}
        <div className="flex flex-col gap-3 mb-4">
          {pergunta.opcoes.map((opcao, i) => {
            let style = "bg-white/5 border-white/10 text-white hover:bg-white/10";
            if (fase === "feedback" && respostaSelecionada !== null) {
              if (i === pergunta.resposta) {
                style = "bg-emerald-500/20 border-emerald-500 text-emerald-300";
              } else if (i === respostaSelecionada && i !== pergunta.resposta) {
                style = "bg-red-500/20 border-red-500 text-red-300";
              } else {
                style = "bg-white/5 border-white/5 text-white/40";
              }
            }

            return (
              <button
                key={i}
                onClick={() => fase === "question" && handleResposta(i)}
                disabled={fase === "feedback"}
                className={`p-4 rounded-xl border text-left font-semibold transition-all ${style} ${
                  fase === "question" ? "hover:scale-[1.01] active:scale-[0.99]" : ""
                }`}
              >
                <span className="text-white/40 mr-3 font-mono text-sm">
                  {["A", "B", "C", "D"][i]}
                </span>
                {opcao}
                {fase === "feedback" && i === pergunta.resposta && " ✓"}
                {fase === "feedback" && i === respostaSelecionada && i !== pergunta.resposta && " ✗"}
              </button>
            );
          })}
        </div>

        {/* Feedback explanation */}
        {fase === "feedback" && (
          <div className={`p-4 rounded-2xl mb-4 border ${
            respostaSelecionada === pergunta.resposta
              ? "bg-emerald-500/10 border-emerald-500/30"
              : "bg-red-500/10 border-red-500/30"
          }`}>
            <div className="flex items-start gap-2">
              <span className="text-2xl">
                {respostaSelecionada === pergunta.resposta ? "🎉" : "💡"}
              </span>
              <div>
                <div className={`font-bold mb-1 ${
                  respostaSelecionada === pergunta.resposta ? "text-emerald-400" : "text-red-400"
                }`}>
                  {respostaSelecionada === pergunta.resposta ? "Correto!" : 
                   respostaSelecionada === -1 ? "Tempo esgotado!" : "Não foi dessa vez!"}
                </div>
                <p className="text-white/70 text-sm leading-relaxed">{pergunta.explicacao}</p>
              </div>
            </div>
          </div>
        )}

        {fase === "feedback" && (
          <button
            onClick={proximaPergunta}
            className="w-full py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-black text-lg rounded-2xl hover:opacity-90 transition-all"
          >
            {perguntaAtual + 1 >= perguntas.length ? "Ver Resultado 🏆" : "Próxima Pergunta →"}
          </button>
        )}
      </div>
    </div>
  );
}
