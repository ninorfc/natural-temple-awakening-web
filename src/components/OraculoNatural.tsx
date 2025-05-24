
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Eye, Moon, Star } from 'lucide-react';

const OraculoNatural = () => {
  return (
    <section id="oraculo" className="py-20 cosmic-bg cosmic-particles relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-cosmic-gradient">
            Oráculo Natural
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto font-sans">
            Receba mensagens canalizadas e orientações intuitivas para iluminar seu caminho espiritual
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="bg-cosmic-purple/30 border-cosmic-violet/30 backdrop-blur-sm">
            <CardHeader className="text-center pb-8">
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="w-24 h-24 bg-cosmic-gold/20 rounded-full flex items-center justify-center animate-glow">
                    <Eye className="w-12 h-12 text-cosmic-gold" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-cosmic-violet rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-2 -left-2 w-4 h-4 bg-cosmic-gold rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                </div>
              </div>
              <CardTitle className="text-3xl text-cosmic-gold mb-4">
                Portal de Intuição
              </CardTitle>
              <p className="text-white/80 text-lg font-sans">
                Em breve, você poderá consultar o oráculo digital e receber mensagens personalizadas canalizadas especialmente para você
              </p>
            </CardHeader>
            <CardContent className="text-center space-y-8">
              {/* Recursos futuros */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex flex-col items-center p-6 bg-cosmic-dark/30 rounded-lg">
                  <Moon className="w-8 h-8 text-cosmic-violet mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Consultas Lunares</h3>
                  <p className="text-white/70 text-sm font-sans">Mensagens alinhadas com as fases da lua</p>
                </div>
                <div className="flex flex-col items-center p-6 bg-cosmic-dark/30 rounded-lg">
                  <Star className="w-8 h-8 text-cosmic-gold mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Cartas Sagradas</h3>
                  <p className="text-white/70 text-sm font-sans">Simbolos ancestrais para orientação</p>
                </div>
                <div className="flex flex-col items-center p-6 bg-cosmic-dark/30 rounded-lg">
                  <Eye className="w-8 h-8 text-cosmic-violet mb-3" />
                  <h3 className="text-lg font-semibold text-white mb-2">Visão Intuitiva</h3>
                  <p className="text-white/70 text-sm font-sans">Canalizações personalizadas em tempo real</p>
                </div>
              </div>

              {/* Mensagem temporária */}
              <div className="bg-cosmic-gold/10 border border-cosmic-gold/30 rounded-lg p-6">
                <p className="text-cosmic-gold italic text-lg">
                  "O universo está preparando algo especial para você. Em breve, este portal se abrirá para revelar as mensagens que sua alma precisa ouvir."
                </p>
                <p className="text-white/60 text-sm mt-3 font-sans">- Ra'Hael Vorum</p>
              </div>

              <Button 
                size="lg"
                disabled
                className="bg-cosmic-violet/50 text-white cursor-not-allowed font-sans"
              >
                Em Desenvolvimento ✨
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Elementos decorativos místicos */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-cosmic-gold rounded-full animate-pulse opacity-60"></div>
        <div className="absolute bottom-20 right-16 w-3 h-3 bg-cosmic-violet rounded-full animate-float opacity-50"></div>
        <div className="absolute top-1/2 right-10 w-1 h-1 bg-cosmic-gold rounded-full animate-pulse opacity-70" style={{animationDelay: '2s'}}></div>
      </div>
    </section>
  );
};

export default OraculoNatural;
