"use client";
import { useState } from "react";
import { Screen, GameState } from "../page";

interface Props {
  gameState: GameState;
  onNavigate: (tela: Screen) => void;
}

const eventos = [
  {
    era: "Pré-Cambriano",
    periodo: "700 milhões de anos atrás",
    ma: 700,
    emoji: "🧽",
    titulo: "Surgimento das Esponjas",
    grupo: "Poríferos",
    cor: "#EC4899",
    descricao: "As primeiras esponjas (Poríferos) surgem nos oceanos primitivos. São os animais multicelulares mais antigos conhecidos.",
    curiosidade: "Não possuíam tecidos nem órgãos — apenas células organizadas com poros.",
    impacto: "Começaram a filtrar e oxigenar os oceanos primitivos.",
  },
  {
    era: "Cambriano",
    periodo: "650 milhões de anos atrás",
    ma: 650,
    emoji: "🪼",
    titulo: "Era dos Cnidários",
    grupo: "Cnidários",
    cor: "#14B8A6",
    descricao: "Água-vivas, corais e anêmonas surgem. Primeiros animais com tecidos especializados e simetria radial.",
    curiosidade: "Algumas linhas de água-viva são biologicamente imortais.",
    impacto: "Desenvolveram células urticantes (cnidócitos) — primeira 'arma' animal.",
  },
  {
    era: "Cambriano",
    periodo: "540 milhões de anos atrás",
    ma: 540,
    emoji: "💥",
    titulo: "Explosão Cambriana",
    grupo: "Todos os grupos",
    cor: "#F97316",
    descricao: "Explosão evolutiva! Em apenas 20 milhões de anos surgem quase todos os grandes grupos de animais.",
    curiosidade: "A maioria dos planos corporais animais surgiu neste período.",
    impacto: "Marco mais importante da história animal — diversificação radical.",
  },
  {
    era: "Ordoviciano",
    periodo: "490 milhões de anos atrás",
    ma: 490,
    emoji: "🦀",
    titulo: "Surgimento dos Artrópodes marinhos",
    grupo: "Crustáceos / Quelicerados",
    cor: "#F97316",
    descricao: "Trilobites e outros artrópodes dominam os mares. São os primeiros animais com exoesqueleto articulado.",
    curiosidade: "Trilobites tiveram olhos compostos com centenas de lentes.",
    impacto: "O exoesqueleto revolucionou a proteção e locomoção animal.",
  },
  {
    era: "Siluriano",
    periodo: "430 milhões de anos atrás",
    ma: 430,
    emoji: "🦂",
    titulo: "Primeiros Aracnídeos em terra",
    grupo: "Aracnídeos",
    cor: "#EF4444",
    descricao: "Escorpiões e aracnídeos ancestrais são os primeiros animais invertebrados a conquistar a terra firme.",
    curiosidade: "Escorpiões existem há 430 milhões de anos quase sem mudanças!",
    impacto: "Pioneiros na conquista do ambiente terrestre.",
  },
  {
    era: "Devoniano",
    periodo: "400 milhões de anos atrás",
    ma: 400,
    emoji: "🪱",
    titulo: "Evolução dos Anelídeos",
    grupo: "Anelídeos",
    cor: "#84CC16",
    descricao: "Minhocas e seus parentes se desenvolvem. O corpo segmentado em anéis é uma grande vantagem evolutiva.",
    curiosidade: "Minhocas gigantes na Austrália podem chegar a 3 metros!",
    impacto: "Transformaram o solo — fundamentais para a agricultura.",
  },
  {
    era: "Carbonífero",
    periodo: "350 milhões de anos atrás",
    ma: 350,
    emoji: "🐜",
    titulo: "Primeiros Insetos com asas",
    grupo: "Insetos",
    cor: "#F59E0B",
    descricao: "Insetos desenvolvem asas — a única vez que voo evoluiu em invertebrados. Surgem libélulas gigantes.",
    curiosidade: "Libélulas do Carbonífero tinham 70cm de envergadura!",
    impacto: "Conquista do ar — nova dimensão ecológica explorada.",
  },
  {
    era: "Jurássico",
    periodo: "200 milhões de anos atrás",
    ma: 200,
    emoji: "🐝",
    titulo: "Co-evolução com Angiospermas",
    grupo: "Insetos (Abelhas)",
    cor: "#F59E0B",
    descricao: "Com o surgimento das flores, abelhas e borboletas co-evoluem com as plantas em uma relação de polinização.",
    curiosidade: "80% das espécies de plantas dependem de polinizadores.",
    impacto: "Surgimento da polinização — revolução na reprodução vegetal.",
  },
  {
    era: "Hoje",
    periodo: "Presente",
    ma: 0,
    emoji: "🌍",
    titulo: "Invertebrados Dominam",
    grupo: "Todos os grupos",
    cor: "#10B981",
    descricao: "Os invertebrados representam 97% de todas as espécies animais. São fundamentais para todos os ecossistemas do planeta.",
    curiosidade: "Existem mais de 1 milhão de espécies de insetos descritas.",
    impacto: "Sem invertebrados, os ecossistemas terrestres colapsariam em meses.",
  },
];

export default function TimelineScreen({ onNavigate }: Props) {
  const [selecionado, setSelecionado] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#060e1a] px-4 py-6">
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <div className="flex items-center gap-3 mb-2">
          <button onClick={() => onNavigate("home")} className="text-white/60 hover:text-white text-2xl">←</button>
          <div>
            <h1 className="text-2xl font-black text-white">Linha do Tempo Evolutiva</h1>
            <p className="text-white/40 text-sm">700 milhões de anos de história</p>
          </div>
        </div>
        <p className="text-white/30 text-xs mb-6 ml-9">Toque em cada evento para saber mais</p>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-pink-500/60 via-orange-500/40 to-emerald-500/60" />

          <div className="flex flex-col gap-4">
            {eventos.map((ev, i) => {
              const aberto = selecionado === i;
              return (
                <div key={i} className="relative pl-16">
                  {/* Node */}
                  <button
                    onClick={() => setSelecionado(aberto ? null : i)}
                    className="absolute left-2 top-3 w-9 h-9 rounded-full border-2 flex items-center justify-center text-lg z-10 transition-all hover:scale-110"
                    style={{
                      background: `${ev.cor}25`,
                      borderColor: ev.cor,
                      boxShadow: aberto ? `0 0 16px ${ev.cor}60` : "none",
                    }}
                  >
                    {ev.emoji}
                  </button>

                  {/* Card */}
                  <div
                    className={`rounded-xl border transition-all duration-300 overflow-hidden cursor-pointer ${
                      aberto ? "border-opacity-60" : "border-white/10 hover:border-white/20"
                    }`}
                    style={aberto ? { borderColor: ev.cor + "60", background: `${ev.cor}10` } : { background: "rgba(255,255,255,0.03)" }}
                    onClick={() => setSelecionado(aberto ? null : i)}
                  >
                    <div className="p-3">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="text-white font-bold text-sm leading-tight">{ev.titulo}</div>
                          <div className="text-white/40 text-xs mt-0.5">{ev.periodo}</div>
                        </div>
                        <div className="flex flex-col items-end gap-1 flex-shrink-0">
                          <span
                            className="text-xs px-2 py-0.5 rounded-full font-semibold"
                            style={{ background: `${ev.cor}25`, color: ev.cor }}
                          >
                            {ev.grupo}
                          </span>
                          <span className="text-white/30 text-xs">{aberto ? "▲" : "▼"}</span>
                        </div>
                      </div>
                    </div>

                    {aberto && (
                      <div className="px-3 pb-4 border-t border-white/10 mt-0 pt-3">
                        <p className="text-white/70 text-sm mb-3 leading-relaxed">{ev.descricao}</p>
                        <div className="grid grid-cols-1 gap-2">
                          <div className="p-2.5 bg-black/20 rounded-lg">
                            <div className="text-xs font-bold text-yellow-400 mb-1">💡 Curiosidade</div>
                            <p className="text-white/60 text-xs">{ev.curiosidade}</p>
                          </div>
                          <div className="p-2.5 bg-black/20 rounded-lg">
                            <div className="text-xs font-bold text-emerald-400 mb-1">🌍 Impacto Evolutivo</div>
                            <p className="text-white/60 text-xs">{ev.impacto}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom note */}
        <div className="mt-6 p-4 bg-white/5 rounded-2xl border border-white/10 text-center">
          <p className="text-white/50 text-xs leading-relaxed">
            Os invertebrados existem na Terra há mais de <strong className="text-emerald-400">700 milhões de anos</strong> — 
            muito antes dos dinossauros e dos seres humanos!
          </p>
        </div>
      </div>
    </div>
  );
}
