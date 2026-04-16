export interface Animal {
  id: string;
  nome: string;
  grupo: string;
  emoji: string;
  cor: string;
  descricao: string;
  curiosidades: string[];
  habitat: string;
  alimentacao: string;
  tamanho: string;
  caracteristicas: string[];
  imagem: string;
}

export interface QuizQuestion {
  id: string;
  pergunta: string;
  opcoes: string[];
  resposta: number;
  explicacao: string;
  animalId?: string;
}

export const grupos = [
  { id: "insetos", nome: "Insetos", emoji: "🦋", cor: "#F59E0B", descricao: "6 patas, 3 partes no corpo" },
  { id: "aracnideos", nome: "Aracnídeos", emoji: "🕷️", cor: "#EF4444", descricao: "8 patas, 2 partes no corpo" },
  { id: "crustaceos", nome: "Crustáceos", emoji: "🦀", cor: "#F97316", descricao: "Exoesqueleto rígido, antenas" },
  { id: "moluscos", nome: "Moluscos", emoji: "🐚", cor: "#8B5CF6", descricao: "Corpo mole, concha em muitos" },
  { id: "anelidos", nome: "Anelídeos", emoji: "🪱", cor: "#84CC16", descricao: "Corpo segmentado em anéis" },
  { id: "equinodermos", nome: "Equinodermos", emoji: "⭐", cor: "#06B6D4", descricao: "Simetria radial, endoesqueleto" },
  { id: "poríferos", nome: "Poríferos", emoji: "🧽", cor: "#EC4899", descricao: "Esponjas, poros por todo corpo" },
  { id: "cnidarios", nome: "Cnidários", emoji: "🪼", cor: "#14B8A6", descricao: "Células urticantes, tentáculos" },
];

export const animais: Animal[] = [
  {
    id: "borboleta",
    nome: "Borboleta",
    grupo: "insetos",
    emoji: "🦋",
    cor: "#F59E0B",
    descricao: "Um dos insetos mais belos do mundo, as borboletas passam por uma incrível metamorfose.",
    curiosidades: [
      "Sentem o sabor com os pés!",
      "Vivem apenas algumas semanas na fase adulta",
      "As asas são cobertas de minúsculas escamas",
      "São importantes polinizadoras de flores"
    ],
    habitat: "Florestas, jardins e campos abertos",
    alimentacao: "Néctar de flores (adulto), folhas (larva/lagarta)",
    tamanho: "2 a 30 cm de envergadura",
    caracteristicas: ["6 patas", "2 pares de asas", "Antenas com bolinha na ponta", "Metamorfose completa"],
    imagem: "🦋"
  },
  {
    id: "abelha",
    nome: "Abelha",
    grupo: "insetos",
    emoji: "🐝",
    cor: "#F59E0B",
    descricao: "Insetos sociais fundamentais para a vida na Terra, responsáveis pela polinização.",
    curiosidades: [
      "Uma colmeia pode ter até 80.000 indivíduos",
      "Produzem mel que nunca estraga",
      "Se comunicam pela dança",
      "Voam até 60 km/h"
    ],
    habitat: "Colmeias em árvores, rochas ou construções humanas",
    alimentacao: "Néctar e pólen de flores",
    tamanho: "1 a 3 cm",
    caracteristicas: ["6 patas", "2 pares de asas", "Ferrão (fêmeas)", "Corpo peludo"],
    imagem: "🐝"
  },
  {
    id: "formiga",
    nome: "Formiga",
    grupo: "insetos",
    emoji: "🐜",
    cor: "#F59E0B",
    descricao: "Insetos altamente sociais que vivem em colônias organizadas com divisão de trabalho.",
    curiosidades: [
      "Carregam até 50 vezes seu próprio peso",
      "Existem mais de 20.000 espécies",
      "Se comunicam por feromônios",
      "Algumas espécies cultivam fungos para se alimentar"
    ],
    habitat: "Solo, madeira apodrecida, sob pedras",
    alimentacao: "Variada: sementes, insetos, fungo (leafcutter)",
    tamanho: "1 mm a 5 cm",
    caracteristicas: ["6 patas", "Sem asas (operárias)", "Cintura fina", "Antenas cotovelo"],
    imagem: "🐜"
  },
  {
    id: "aranha",
    nome: "Aranha",
    grupo: "aracnideos",
    emoji: "🕷️",
    cor: "#EF4444",
    descricao: "Predadores habilidosos que produzem seda para construir teias e capturar presas.",
    curiosidades: [
      "Produzem seda mais resistente que o aço",
      "Têm 8 olhos na maioria das espécies",
      "Não são insetos! São aracnídeos",
      "Existem mais de 45.000 espécies"
    ],
    habitat: "Todos os habitats exceto mares abertos e pólos",
    alimentacao: "Insetos e outros pequenos animais",
    tamanho: "0,4 mm a 30 cm",
    caracteristicas: ["8 patas", "2 partes no corpo", "Sem antenas", "Produz seda"],
    imagem: "🕷️"
  },
  {
    id: "escorpiao",
    nome: "Escorpião",
    grupo: "aracnideos",
    emoji: "🦂",
    cor: "#EF4444",
    descricao: "Aracnídeos noturnos com ferrão venenoso na cauda, que existem há 400 milhões de anos.",
    curiosidades: [
      "Brilham sob luz ultravioleta",
      "A fêmea carrega os filhotes nas costas",
      "Podem sobreviver meses sem comer",
      "Existem há mais de 400 milhões de anos"
    ],
    habitat: "Desertos, florestas tropicais e savanas",
    alimentacao: "Insetos, aranhas e pequenos vertebrados",
    tamanho: "1 a 20 cm",
    caracteristicas: ["8 patas", "Pinças (quelíceras)", "Ferrão venenoso", "Corpo achatado"],
    imagem: "🦂"
  },
  {
    id: "caranguejo",
    nome: "Caranguejo",
    grupo: "crustaceos",
    emoji: "🦀",
    cor: "#F97316",
    descricao: "Crustáceos com carapaça dura e patas adaptadas para andar de lado.",
    curiosidades: [
      "Andam de lado por causa das articulações das patas",
      "Regeneram patas perdidas",
      "Respiram por brânquias",
      "O sangue é azul por conter cobre"
    ],
    habitat: "Praias, manguezais e oceanos",
    alimentacao: "Algas, moluscos e restos orgânicos",
    tamanho: "1 cm a 4 metros (caranguejo aranha japonês)",
    caracteristicas: ["10 patas", "Carapaça dura", "Pinças fortes", "Antenas curtas"],
    imagem: "🦀"
  },
  {
    id: "camarao",
    nome: "Camarão",
    grupo: "crustaceos",
    emoji: "🍤",
    cor: "#F97316",
    descricao: "Crustáceos aquáticos de corpo alongado, muito importantes na cadeia alimentar.",
    curiosidades: [
      "O coração fica na cabeça!",
      "Nadam para trás quando fogem de predadores",
      "São excelentes bioindicadores de qualidade da água",
      "Existem espécies de água doce e salgada"
    ],
    habitat: "Oceanos, rios e lagos",
    alimentacao: "Algas, plâncton e matéria orgânica",
    tamanho: "2 cm a 30 cm",
    caracteristicas: ["10 patas natatórias", "Corpo transparente", "Exoesqueleto fino", "Antenas longas"],
    imagem: "🦐"
  },
  {
    id: "polvo",
    nome: "Polvo",
    grupo: "moluscos",
    emoji: "🐙",
    cor: "#8B5CF6",
    descricao: "Moluscos altamente inteligentes com 8 braços e capacidade de mudar de cor.",
    curiosidades: [
      "Têm 3 corações e sangue azul",
      "São os invertebrados mais inteligentes",
      "Podem abrir potes com tampa",
      "Cada braço tem neurônios independentes"
    ],
    habitat: "Oceanos em todo o mundo",
    alimentacao: "Crustáceos, peixes e moluscos",
    tamanho: "2 cm a 9 metros",
    caracteristicas: ["8 tentáculos com ventosas", "Sem concha", "Muda de cor", "Bico córneo"],
    imagem: "🐙"
  },
  {
    id: "caracol",
    nome: "Caracol",
    grupo: "moluscos",
    emoji: "🐌",
    cor: "#8B5CF6",
    descricao: "Moluscos terrestres com concha espiral que carregam a casa nas costas.",
    curiosidades: [
      "Deixam um rastro de muco para se mover",
      "Têm 4 tentáculos, 2 com olhos",
      "Podem hibernar por meses",
      "A concha cresce junto com o animal"
    ],
    habitat: "Jardins, florestas úmidas e campos",
    alimentacao: "Folhas, frutas e cogumelos",
    tamanho: "2 mm a 30 cm",
    caracteristicas: ["Concha espiral", "Corpo mole", "4 tentáculos", "Pé muscular"],
    imagem: "🐌"
  },
  {
    id: "minhoca",
    nome: "Minhoca",
    grupo: "anelidos",
    emoji: "🪱",
    cor: "#84CC16",
    descricao: "Anelídeos essenciais para a saúde do solo, aerando e enriquecendo a terra.",
    curiosidades: [
      "Têm 5 corações",
      "Respiram pela pele úmida",
      "Uma minhoca cortada pode se regenerar",
      "Charles Darwin estudou minhocas por 40 anos"
    ],
    habitat: "Solo úmido e rico em matéria orgânica",
    alimentacao: "Matéria orgânica decomposta",
    tamanho: "5 cm a 3 metros (gigante australiana)",
    caracteristicas: ["Corpo segmentado", "Sem patas", "Hermafrodita", "Clitelo (anel reprodutor)"],
    imagem: "🪱"
  },
  {
    id: "estrela-do-mar",
    nome: "Estrela-do-mar",
    grupo: "equinodermos",
    emoji: "⭐",
    cor: "#06B6D4",
    descricao: "Equinodermos com simetria radial que se alimentam abrindo bivalves com os braços.",
    curiosidades: [
      "Não têm cérebro nem sangue",
      "Podem regenerar braços perdidos",
      "Cospem o estômago para fora para digerir",
      "Se movem com centenas de pés tubulares"
    ],
    habitat: "Oceanos em todo o mundo",
    alimentacao: "Bivalves, ostras e mariscos",
    tamanho: "1 cm a 65 cm",
    caracteristicas: ["5 braços (geralmente)", "Simetria radial", "Pés tubulares", "Endoesqueleto"],
    imagem: "⭐"
  },
  {
    id: "ourico-do-mar",
    nome: "Ouriço-do-mar",
    grupo: "equinodermos",
    emoji: "🦔",
    cor: "#06B6D4",
    descricao: "Equinodermos recobertos de espinhos que se locomovem lentamente pelo fundo do mar.",
    curiosidades: [
      "Os espinhos são usados para se mover e se defender",
      "A boca fica na parte de baixo do corpo",
      "Podem viver mais de 100 anos",
      "São parentes das estrelas-do-mar"
    ],
    habitat: "Fundos rochosos e coralinos",
    alimentacao: "Algas, briozoários e restos orgânicos",
    tamanho: "5 cm a 30 cm",
    caracteristicas: ["Espinhos longos", "Corpo esférico", "Pés tubulares", "Simetria radial"],
    imagem: "🦔"
  },
  {
    id: "esponja",
    nome: "Esponja-do-mar",
    grupo: "poríferos",
    emoji: "🧽",
    cor: "#EC4899",
    descricao: "Os animais mais simples da Terra, sem tecidos ou órgãos definidos.",
    curiosidades: [
      "São os animais mais antigos: 700 milhões de anos",
      "Filtram até 10.000 litros de água por dia",
      "Não têm sistema nervoso nem muscular",
      "Podem se regenerar a partir de fragmentos"
    ],
    habitat: "Oceanos e algumas espécies em água doce",
    alimentacao: "Partículas e micro-organismos filtrados da água",
    tamanho: "1 mm a 2 metros",
    caracteristicas: ["Corpo poroso", "Sem tecidos", "Séssil (fixo)", "Filtrador"],
    imagem: "🧽"
  },
  {
    id: "agua-viva",
    nome: "Água-viva",
    grupo: "cnidarios",
    emoji: "🪼",
    cor: "#14B8A6",
    descricao: "Cnidários gelatinosos com tentáculos urticantes que flutuam pelos oceanos.",
    curiosidades: [
      "São 95% de água",
      "Alguns são imortais! Podem rejuvenescer",
      "Não têm cérebro, coração ou pulmões",
      "Existem há 650 milhões de anos"
    ],
    habitat: "Oceanos em todo o mundo",
    alimentacao: "Plâncton, pequenos peixes e crustáceos",
    tamanho: "1 cm a 2 metros (sino)",
    caracteristicas: ["Corpo gelatinoso", "Tentáculos urticantes", "Simetria radial", "Sem cérebro"],
    imagem: "🪼"
  },
  {
    id: "coral",
    nome: "Coral",
    grupo: "cnidarios",
    emoji: "🪸",
    cor: "#14B8A6",
    descricao: "Cnidários coloniais que formam os recifes de coral, os ecossistemas mais biodiversos do mar.",
    curiosidades: [
      "São animais, não plantas!",
      "Vivem em simbiose com algas fotossintéticas",
      "Os recifes abrigam 25% das espécies marinhas",
      "O branqueamento ocorre por estresse térmico"
    ],
    habitat: "Mares tropicais rasos e quentes",
    alimentacao: "Plâncton e nutrientes via algas simbiontes",
    tamanho: "Colônias de metros a quilômetros",
    caracteristicas: ["Colonial", "Exoesqueleto calcário", "Pólipo com tentáculos", "Simbiose com algas"],
    imagem: "🪸"
  }
];

export const quizPerguntas: QuizQuestion[] = [
  {
    id: "q1",
    pergunta: "Quantas patas têm os insetos?",
    opcoes: ["4 patas", "6 patas", "8 patas", "10 patas"],
    resposta: 1,
    explicacao: "Todos os insetos têm exatamente 6 patas! Isso é uma característica fundamental que os define como insetos.",
    animalId: "borboleta"
  },
  {
    id: "q2",
    pergunta: "Qual animal é capaz de mudar de cor para se camuflar?",
    opcoes: ["Caranguejo", "Minhoca", "Polvo", "Esponja"],
    resposta: 2,
    explicacao: "O polvo é mestre do disfarce! Pode mudar sua cor e textura em milissegundos graças a células especiais chamadas cromatóforos.",
    animalId: "polvo"
  },
  {
    id: "q3",
    pergunta: "Qual grupo de invertebrados têm 8 patas?",
    opcoes: ["Insetos", "Crustáceos", "Aracnídeos", "Anelídeos"],
    resposta: 2,
    explicacao: "Os aracnídeos (aranhas, escorpiões, ácaros) têm 8 patas. Isso os diferencia dos insetos, que têm apenas 6.",
  },
  {
    id: "q4",
    pergunta: "O que é metamorfose completa?",
    opcoes: [
      "Quando o animal muda de cor",
      "Ovo → Larva → Pupa → Adulto",
      "Quando o animal perde a cauda",
      "Ovo → Ninfa → Adulto"
    ],
    resposta: 1,
    explicacao: "A metamorfose completa (holometabolia) passa por 4 fases: ovo, larva, pupa (crisálida) e adulto. Borboletas, abelhas e besouros fazem metamorfose completa.",
  },
  {
    id: "q5",
    pergunta: "Quantos corações tem uma minhoca?",
    opcoes: ["1", "2", "3", "5"],
    resposta: 3,
    explicacao: "Minhocas têm 5 pares de corações (pseudo-corações ou arcos aórticos)! Eles bombeiam o sangue pelo corpo segmentado.",
    animalId: "minhoca"
  },
  {
    id: "q6",
    pergunta: "Qual é o animal invertebrado mais inteligente?",
    opcoes: ["Aranha", "Polvo", "Caranguejo", "Borboleta"],
    resposta: 1,
    explicacao: "O polvo é considerado o invertebrado mais inteligente! Pode resolver quebra-cabeças, abrir potes e até usar ferramentas.",
    animalId: "polvo"
  },
  {
    id: "q7",
    pergunta: "Como as estrelas-do-mar se alimentam?",
    opcoes: [
      "Absorvem nutrientes pela pele",
      "Engolindo presas inteiras",
      "Cospindo o estômago para fora do corpo",
      "Filtrando água do mar"
    ],
    resposta: 2,
    explicacao: "Incrível mas verdade! A estrela-do-mar expele o estômago para fora da boca, envolve a presa e digere do lado de fora, depois retrai tudo.",
    animalId: "estrela-do-mar"
  },
  {
    id: "q8",
    pergunta: "O coral é um animal ou uma planta?",
    opcoes: ["Planta", "Animal", "Fungo", "Mineral"],
    resposta: 1,
    explicacao: "Coral é animal! Pertence ao grupo dos cnidários. Cada unidade é chamada de pólipo, e eles formam colônias que constroem os recifes.",
    animalId: "coral"
  },
  {
    id: "q9",
    pergunta: "Qual invertebrado tem 3 corações e sangue azul?",
    opcoes: ["Aranha", "Caranguejo", "Polvo", "Escorpião"],
    resposta: 2,
    explicacao: "O polvo tem 3 corações! Dois bombeiam sangue para as brânquias e um para o restante do corpo. O sangue é azul por conter hemocianina (cobre) em vez de hemoglobina (ferro).",
    animalId: "polvo"
  },
  {
    id: "q10",
    pergunta: "Qual é a principal função das esponjas-do-mar nos ecossistemas?",
    opcoes: [
      "Produzir oxigênio",
      "Filtrar e purificar a água",
      "Abrigar peixes",
      "Produzir alimentos"
    ],
    resposta: 1,
    explicacao: "As esponjas são filtradoras incríveis! Uma única esponja pode filtrar até 10.000 litros de água por dia, removendo bactérias e partículas.",
    animalId: "esponja"
  },
  {
    id: "q11",
    pergunta: "Por que os caranguejos andam de lado?",
    opcoes: [
      "Por causa do peso da carapaça",
      "Para evitar predadores",
      "Pela estrutura das articulações das patas",
      "Porque têm visão lateral"
    ],
    resposta: 2,
    explicacao: "As patas dos caranguejos têm articulações que se movem melhor no plano lateral, tornando o movimento de lado mais eficiente do que para frente.",
    animalId: "caranguejo"
  },
  {
    id: "q12",
    pergunta: "Como as abelhas se comunicam com a colmeia?",
    opcoes: [
      "Por sons (zumbido)",
      "Por cheiro (feromônios) e dança",
      "Por toque das antenas",
      "Por cores das asas"
    ],
    resposta: 1,
    explicacao: "As abelhas usam a famosa 'dança das abelhas'! A dança em 8 indica distância e direção de fontes de alimento. Também usam feromônios para se comunicar.",
    animalId: "abelha"
  },
  {
    id: "q13",
    pergunta: "Qual característica NÃO pertence aos aracnídeos?",
    opcoes: [
      "8 patas",
      "Corpo dividido em 2 partes",
      "Antenas",
      "Sem asas"
    ],
    resposta: 2,
    explicacao: "Aracnídeos NÃO têm antenas! Antenas são características dos insetos e crustáceos. Os aracnídeos usam palpos e pedipalpos para sentir o ambiente.",
  },
  {
    id: "q14",
    pergunta: "O que torna a água-viva potencialmente 'imortal'?",
    opcoes: [
      "Pode regenerar qualquer parte do corpo",
      "Pode reverter ao estágio de pólipo após amadurecer",
      "Não tem predadores naturais",
      "Vive em águas sem oxigênio"
    ],
    resposta: 1,
    explicacao: "A Turritopsis dohrnii pode reverter seu ciclo de vida! Quando estressada ou velha, a medusa adulta pode voltar ao estágio de pólipo, tornando-se biologicamente 'imortal'.",
    animalId: "agua-viva"
  },
  {
    id: "q15",
    pergunta: "Qual é a importância dos invertebrados para os ecossistemas?",
    opcoes: [
      "São apenas decorativos",
      "Polinização, decomposição, base das cadeias alimentares",
      "Servem apenas como alimento para vertebrados",
      "Não têm papel ecológico importante"
    ],
    resposta: 1,
    explicacao: "Os invertebrados são ESSENCIAIS! Polinizam plantas (abelhas), decompõem matéria orgânica (minhocas), formam a base das cadeias alimentares, e muito mais. Sem eles, os ecossistemas colapsariam.",
  }
];

export const badges = [
  { id: "primeiro-acerto", nome: "Primeiro Acerto!", emoji: "⭐", descricao: "Respondeu a primeira pergunta corretamente", pontos: 1 },
  { id: "5-seguidas", nome: "Em Chama!", emoji: "🔥", descricao: "5 respostas corretas seguidas", pontos: 5 },
  { id: "naturalista", nome: "Naturalista", emoji: "🔬", descricao: "Completou o quiz com 70% de acertos", pontos: 10 },
  { id: "especialista", nome: "Especialista", emoji: "🏆", descricao: "Completou o quiz com 90% de acertos", pontos: 15 },
  { id: "explorador", nome: "Explorador", emoji: "🗺️", descricao: "Visitou todos os grupos de animais", pontos: 10 },
  { id: "curioso", nome: "Super Curioso", emoji: "🧐", descricao: "Leu as informações de 5 animais", pontos: 5 },
];
