
export interface LunarPhase {
  name: string;
  description: string;
  energy: string;
  color: string;
}

export interface SacredCard {
  id: string;
  name: string;
  symbol: string;
  meaning: string;
  element: string;
  energy: string;
}

export interface OracleReading {
  id: string;
  type: 'lunar' | 'cards' | 'intuitive';
  message: string;
  guidance: string;
  timestamp: string;
  lunarPhase?: LunarPhase;
  cards?: SacredCard[];
}

export interface OracleState {
  isGenerating: boolean;
  currentReading: OracleReading | null;
  history: OracleReading[];
}
