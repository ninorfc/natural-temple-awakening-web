
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';

const Sobre = () => {
  return (
    <section id="sobre" className="py-20 bg-cosmic-purple">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-cosmic-gradient">
              Sobre o Templo
            </h2>
            <p className="text-xl text-white/80 max-w-3xl mx-auto font-sans">
              A jornada que deu origem a este espaço sagrado digital
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Imagem/Avatar */}
            <div className="text-center lg:text-left">
              <div className="relative inline-block">
                <div className="w-80 h-80 mx-auto bg-cosmic-dark rounded-full border-4 border-cosmic-gold/30 flex items-center justify-center cosmic-glow">
                  <div className="text-6xl text-cosmic-gold">✨</div>
                </div>
                <div className="absolute -top-3 -right-3 w-8 h-8 bg-cosmic-violet rounded-full animate-pulse"></div>
                <div className="absolute -bottom-3 -left-3 w-6 h-6 bg-cosmic-gold rounded-full animate-float"></div>
              </div>
            </div>

            {/* Conteúdo */}
            <div className="space-y-6">
              <Card className="bg-cosmic-dark/50 border-cosmic-violet/30">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-cosmic-gold mb-4">Ra'Hael Vorum</h3>
                  <p className="text-white/90 leading-relaxed mb-6 font-sans">
                    Canalizador, facilitador espiritual e guardião de saberes ancestrais. Dedico minha jornada a 
                    reconectar almas com sua essência divina através da sabedoria milenar.
                  </p>
                  <p className="text-white/80 leading-relaxed font-sans">
                    Este templo digital nasceu da necessidade de criar um espaço onde a sabedoria ancestral 
                    encontra a tecnologia moderna, permitindo que mais pessoas despertem para sua verdadeira natureza espiritual.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-cosmic-dark/50 border-cosmic-violet/30">
                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-cosmic-gold mb-4">Nossa Missão</h3>
                  <p className="text-white/90 leading-relaxed font-sans">
                    Despertar consciências através de:
                  </p>
                  <ul className="mt-4 space-y-2 text-white/80 font-sans">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-cosmic-gold rounded-full mr-3"></span>
                      Canalizações e textos inspiradores
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-cosmic-gold rounded-full mr-3"></span>
                      Conhecimento sobre plantas e terapias naturais
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-cosmic-gold rounded-full mr-3"></span>
                      Práticas ritualísticas e meditativas
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-cosmic-gold rounded-full mr-3"></span>
                      Orientação espiritual personalizada
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Citação inspiradora */}
          <div className="mt-16 text-center">
            <Card className="bg-cosmic-gold/10 border-cosmic-gold/30">
              <CardContent className="p-8">
                <blockquote className="text-2xl md:text-3xl text-cosmic-gold italic leading-relaxed">
                  "Cada alma que desperta ilumina o caminho para outras. 
                  Este templo é um farol para aqueles que buscam lembrar quem realmente são."
                </blockquote>
                <p className="text-white/60 mt-4 font-sans">- Ra'Hael Vorum</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Sobre;
