
import { LunarPhase, SacredCard } from '@/types/oracle';

export const lunarPhases: LunarPhase[] = [
  {
    name: "Lua Nova",
    description: "Tempo de novos começos e intenções",
    energy: "Renovação e manifestação",
    color: "cosmic-dark"
  },
  {
    name: "Lua Crescente",
    description: "Período de crescimento e expansão",
    energy: "Crescimento e determinação",
    color: "cosmic-violet"
  },
  {
    name: "Lua Cheia",
    description: "Momento de culminação e gratidão",
    energy: "Plenitude e liberação",
    color: "cosmic-gold"
  },
  {
    name: "Lua Minguante",
    description: "Tempo de liberação e purificação",
    energy: "Liberação e sabedoria",
    color: "cosmic-purple"
  }
];

export const sacredCards: SacredCard[] = [
  {
    id: "1",
    name: "Árvore da Vida",
    symbol: "🌳",
    meaning: "Conexão entre céu e terra, crescimento espiritual",
    element: "Terra",
    energy: "Estabilidade e crescimento"
  },
  {
    id: "2", 
    name: "Olho da Sabedoria",
    symbol: "👁️",
    meaning: "Visão interior, intuição e clarividência",
    element: "Éter",
    energy: "Percepção e conhecimento"
  },
  {
    id: "3",
    name: "Serpente Sagrada",
    symbol: "🐍",
    meaning: "Transformação, cura e renovação",
    element: "Fogo",
    energy: "Transformação e cura"
  },
  {
    id: "4",
    name: "Cristal de Luz",
    symbol: "💎",
    meaning: "Pureza, clareza e iluminação espiritual",
    element: "Ar",
    energy: "Purificação e clareza"
  },
  {
    id: "5",
    name: "Águas Sagradas",
    symbol: "🌊",
    meaning: "Fluidez, emoções e intuição profunda",
    element: "Água",
    energy: "Fluidez e intuição"
  },
  {
    id: "6",
    name: "Chama Violeta",
    symbol: "🔥",
    meaning: "Transmutação, proteção e elevação",
    element: "Fogo",
    energy: "Transmutação e proteção"
  }
];
