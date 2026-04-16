"use client";
import { useState } from "react";
import HomeScreen from "./components/HomeScreen";
import ExploreScreen from "./components/ExploreScreen";
import QuizScreen from "./components/QuizScreen";
import AnimalDetailScreen from "./components/AnimalDetailScreen";
import GruposScreen from "./components/GruposScreen";
import MemoriaScreen from "./components/MemoriaScreen";
import ConquistasScreen from "./components/ConquistasScreen";
import ComparadorScreen from "./components/ComparadorScreen";
import TimelineScreen from "./components/TimelineScreen";
import { Animal } from "./data/gameData";

export type Screen = "home" | "explore" | "quiz" | "animal" | "grupos" | "memoria" | "conquistas" | "comparador" | "timeline";

export interface GameState {
  pontos: number;
  badges: string[];
  animaisVistos: string[];
  gruposVisitados: string[];
  quizCompleto: boolean;
  ultimaPontuacaoQuiz: number;
  streak: number;
  memoriaRecorde: number;
  totalJogadas: number;
}

export default function Home() {
  const [tela, setTela] = useState<Screen>("home");
  const [animalSelecionado, setAnimalSelecionado] = useState<Animal | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    pontos: 0,
    badges: [],
    animaisVistos: [],
    gruposVisitados: [],
    quizCompleto: false,
    ultimaPontuacaoQuiz: 0,
    streak: 0,
    memoriaRecorde: 0,
    totalJogadas: 0,
  });

  const navegarPara = (tela: Screen, animal?: Animal) => {
    setTela(tela);
    if (animal) setAnimalSelecionado(animal);
  };

  const atualizarEstado = (novoEstado: Partial<GameState>) => {
    setGameState(prev => ({ ...prev, ...novoEstado }));
  };

  return (
    <main className="min-h-screen">
      {tela === "home" && <HomeScreen gameState={gameState} onNavigate={navegarPara} />}
      {tela === "grupos" && <GruposScreen gameState={gameState} onNavigate={navegarPara} onUpdateState={atualizarEstado} />}
      {tela === "explore" && <ExploreScreen gameState={gameState} onNavigate={navegarPara} onUpdateState={atualizarEstado} />}
      {tela === "quiz" && <QuizScreen gameState={gameState} onNavigate={navegarPara} onUpdateState={atualizarEstado} />}
      {tela === "animal" && animalSelecionado && <AnimalDetailScreen animal={animalSelecionado} gameState={gameState} onNavigate={navegarPara} onUpdateState={atualizarEstado} />}
      {tela === "memoria" && <MemoriaScreen gameState={gameState} onNavigate={navegarPara} onUpdateState={atualizarEstado} />}
      {tela === "conquistas" && <ConquistasScreen gameState={gameState} onNavigate={navegarPara} />}
      {tela === "comparador" && <ComparadorScreen gameState={gameState} onNavigate={navegarPara} />}
      {tela === "timeline" && <TimelineScreen gameState={gameState} onNavigate={navegarPara} />}
    </main>
  );
}
