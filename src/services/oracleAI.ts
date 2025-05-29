
import { LunarPhase, SacredCard, OracleReading } from '@/types/oracle';
import { lunarPhases, sacredCards } from '@/data/oracleData';

// Simulação de IA para gerar mensagens personalizadas
export class OracleAI {
  private static getRandomLunarPhase(): LunarPhase {
    return lunarPhases[Math.floor(Math.random() * lunarPhases.length)];
  }

  private static getRandomCards(count: number = 3): SacredCard[] {
    const shuffled = [...sacredCards].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }

  private static generatePersonalizedMessage(type: 'lunar' | 'cards' | 'intuitive', data?: any): string {
    const messages = {
      lunar: [
        "A energia lunar sussurra aos seus ouvidos: é tempo de honrar seus ciclos internos e permitir que a sabedoria ancestral guie seus passos.",
        "As fases da lua refletem sua própria jornada interior. Permita-se fluir com os ritmos naturais do universo.",
        "A lua ilumina o caminho que sua alma já conhece. Confie na sabedoria que habita em seu coração.",
        "Os ciclos lunares ecoam em sua essência. É hora de alinhar-se com as forças cósmicas que te chamam."
      ],
      cards: [
        "Os símbolos ancestrais revelam uma mensagem especial para você. Cada carta carrega a sabedoria de milhares de anos.",
        "As cartas sagradas ecoam com a frequência de sua alma. Elas aparecem para te lembrar de verdades esquecidas.",
        "Os símbolos falam uma linguagem além das palavras. Permita que sua intuição decodifique as mensagens.",
        "Cada carta é um portal para dimensões superiores de compreensão. Abra seu coração para receber."
      ],
      intuitive: [
        "Uma mensagem canalizada especialmente para você atravessa os véus do tempo e espaço.",
        "Sua alma pediu orientação, e o universo responde através desta canalização divina.",
        "As dimensões superiores se abrem para compartilhar a sabedoria que sua essência busca.",
        "Uma luz dourada de conhecimento desce sobre você, trazendo clareza e direção."
      ]
    };

    return messages[type][Math.floor(Math.random() * messages[type].length)];
  }

  private static generateGuidance(type: 'lunar' | 'cards' | 'intuitive', data?: any): string {
    const guidanceTemplates = {
      lunar: [
        "Permita-se honrar os ritmos naturais. Medite sob a luz lunar e registre suas visões em um diário sagrado.",
        "Crie um ritual simples de conexão lunar. Acenda uma vela e defina intenções alinhadas com esta fase.",
        "Observe seus sonhos esta noite. A lua traz mensagens através do mundo onírico.",
        "Pratique gratidão pelos ciclos que se completam e prepare-se para os que estão por vir."
      ],
      cards: [
        "Reflita sobre os símbolos apresentados. Cada um carrega uma chave para uma porta interior.",
        "Medite sobre as energias dos elementos presentes. Eles trazem equilíbrio para sua jornada.",
        "Carregue a essência destes símbolos em seu coração ao longo do dia. Eles são seus guardiões.",
        "Crie um altar sagrado com representações destes símbolos para amplificar suas energias."
      ],
      intuitive: [
        "Confie nas primeiras impressões que surgirem após esta leitura. Sua intuição está aguçada.",
        "Pratique a escuta interior em silêncio. As respostas que busca estão dentro de você.",
        "Mantenha-se receptivo aos sinais do universo nas próximas horas. Eles confirmarão esta mensagem.",
        "Anote suas percepções e volte a elas em alguns dias. Novas camadas de compreensão se revelarão."
      ]
    };

    return guidanceTemplates[type][Math.floor(Math.random() * guidanceTemplates[type].length)];
  }

  static async generateLunarReading(): Promise<OracleReading> {
    // Simular delay da IA
    await new Promise(resolve => setTimeout(resolve, 2000));

    const lunarPhase = this.getRandomLunarPhase();
    
    return {
      id: Date.now().toString(),
      type: 'lunar',
      message: this.generatePersonalizedMessage('lunar', lunarPhase),
      guidance: this.generateGuidance('lunar', lunarPhase),
      timestamp: new Date().toISOString(),
      lunarPhase
    };
  }

  static async generateCardsReading(): Promise<OracleReading> {
    await new Promise(resolve => setTimeout(resolve, 2500));

    const cards = this.getRandomCards(3);
    
    return {
      id: Date.now().toString(),
      type: 'cards',
      message: this.generatePersonalizedMessage('cards', cards),
      guidance: this.generateGuidance('cards', cards),
      timestamp: new Date().toISOString(),
      cards
    };
  }

  static async generateIntuitiveReading(): Promise<OracleReading> {
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    return {
      id: Date.now().toString(),
      type: 'intuitive',
      message: this.generatePersonalizedMessage('intuitive'),
      guidance: this.generateGuidance('intuitive'),
      timestamp: new Date().toISOString()
    };
  }
}
