
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Moon, Star, Eye, Sparkles } from 'lucide-react';
import { useOracle } from '@/hooks/useOracle';
import { toast } from 'sonner';

const OraclePortal = () => {
  const { 
    isGenerating, 
    currentReading, 
    generateLunarReading, 
    generateCardsReading, 
    generateIntuitiveReading,
    clearCurrentReading 
  } = useOracle();

  const handleLunarConsultation = async () => {
    try {
      await generateLunarReading();
      toast.success('Consulta lunar canalizada com sucesso!');
    } catch (error) {
      toast.error('Erro ao canalizar mensagem lunar. Tente novamente.');
    }
  };

  const handleCardsConsultation = async () => {
    try {
      await generateCardsReading();
      toast.success('Cartas sagradas reveladas!');
    } catch (error) {
      toast.error('Erro ao revelar as cartas. Tente novamente.');
    }
  };

  const handleIntuitiveConsultation = async () => {
    try {
      await generateIntuitiveReading();
      toast.success('Visão intuitiva canalizada!');
    } catch (error) {
      toast.error('Erro na canalização. Tente novamente.');
    }
  };

  if (currentReading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <Card className="bg-cosmic-purple/30 border-cosmic-violet/30 backdrop-blur-sm">
          <CardHeader className="text-center">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-cosmic-gold/20 rounded-full flex items-center justify-center animate-pulse">
                {currentReading.type === 'lunar' && <Moon className="w-8 h-8 text-cosmic-gold" />}
                {currentReading.type === 'cards' && <Star className="w-8 h-8 text-cosmic-gold" />}
                {currentReading.type === 'intuitive' && <Eye className="w-8 h-8 text-cosmic-gold" />}
              </div>
            </div>
            <CardTitle className="text-2xl text-cosmic-gold mb-2">
              {currentReading.type === 'lunar' && 'Consulta Lunar'}
              {currentReading.type === 'cards' && 'Cartas Sagradas'}
              {currentReading.type === 'intuitive' && 'Visão Intuitiva'}
            </CardTitle>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Fase lunar ou cartas */}
            {currentReading.lunarPhase && (
              <div className="text-center p-4 bg-cosmic-dark/30 rounded-lg">
                <h3 className="text-lg font-semibold text-cosmic-violet mb-2">
                  {currentReading.lunarPhase.name}
                </h3>
                <p className="text-white/80 text-sm">
                  {currentReading.lunarPhase.description}
                </p>
                <p className="text-cosmic-gold text-sm mt-2">
                  Energia: {currentReading.lunarPhase.energy}
                </p>
              </div>
            )}

            {currentReading.cards && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {currentReading.cards.map((card) => (
                  <div key={card.id} className="text-center p-4 bg-cosmic-dark/30 rounded-lg">
                    <div className="text-3xl mb-2">{card.symbol}</div>
                    <h3 className="text-lg font-semibold text-cosmic-violet mb-1">
                      {card.name}
                    </h3>
                    <p className="text-white/80 text-sm mb-2">{card.meaning}</p>
                    <p className="text-cosmic-gold text-xs">
                      {card.element} - {card.energy}
                    </p>
                  </div>
                ))}
              </div>
            )}

            {/* Mensagem canalizada */}
            <div className="bg-cosmic-gold/10 border border-cosmic-gold/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-cosmic-gold mb-3">
                Mensagem Canalizada
              </h3>
              <p className="text-white italic text-lg leading-relaxed">
                "{currentReading.message}"
              </p>
            </div>

            {/* Orientações */}
            <div className="bg-cosmic-violet/10 border border-cosmic-violet/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-cosmic-violet mb-3">
                Orientações Espirituais
              </h3>
              <p className="text-white/90 leading-relaxed">
                {currentReading.guidance}
              </p>
            </div>

            {/* Ações */}
            <div className="flex justify-center space-x-4 pt-4">
              <Button 
                onClick={clearCurrentReading}
                variant="outline"
                className="border-cosmic-violet/30 text-white hover:bg-cosmic-violet/20"
              >
                Nova Consulta
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
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
            Consulte o oráculo digital e receba mensagens personalizadas canalizadas especialmente para você
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Opções de consulta */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-cosmic-dark/30 border-cosmic-violet/20 hover:border-cosmic-violet/40 transition-colors cursor-pointer">
              <CardContent className="p-6 text-center">
                <Moon className="w-12 h-12 text-cosmic-violet mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Consultas Lunares</h3>
                <p className="text-white/70 text-sm mb-4 font-sans">
                  Mensagens alinhadas com as fases da lua
                </p>
                <Button 
                  onClick={handleLunarConsultation}
                  disabled={isGenerating}
                  className="w-full bg-cosmic-violet hover:bg-cosmic-violet/80"
                >
                  {isGenerating ? <Sparkles className="w-4 h-4 animate-spin" /> : 'Consultar Luna'}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-cosmic-dark/30 border-cosmic-gold/20 hover:border-cosmic-gold/40 transition-colors cursor-pointer">
              <CardContent className="p-6 text-center">
                <Star className="w-12 h-12 text-cosmic-gold mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Cartas Sagradas</h3>
                <p className="text-white/70 text-sm mb-4 font-sans">
                  Símbolos ancestrais para orientação
                </p>
                <Button 
                  onClick={handleCardsConsultation}
                  disabled={isGenerating}
                  className="w-full bg-cosmic-gold hover:bg-cosmic-gold/80 text-cosmic-dark"
                >
                  {isGenerating ? <Sparkles className="w-4 h-4 animate-spin" /> : 'Revelar Cartas'}
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-cosmic-dark/30 border-cosmic-violet/20 hover:border-cosmic-violet/40 transition-colors cursor-pointer">
              <CardContent className="p-6 text-center">
                <Eye className="w-12 h-12 text-cosmic-violet mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-3">Visão Intuitiva</h3>
                <p className="text-white/70 text-sm mb-4 font-sans">
                  Canalizações personalizadas em tempo real
                </p>
                <Button 
                  onClick={handleIntuitiveConsultation}
                  disabled={isGenerating}
                  className="w-full bg-cosmic-violet hover:bg-cosmic-violet/80"
                >
                  {isGenerating ? <Sparkles className="w-4 h-4 animate-spin" /> : 'Canalizar Visão'}
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Estado de carregamento */}
          {isGenerating && (
            <div className="text-center py-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-cosmic-gold/20 rounded-full flex items-center justify-center animate-pulse">
                  <Sparkles className="w-8 h-8 text-cosmic-gold animate-spin" />
                </div>
              </div>
              <p className="text-cosmic-gold italic text-lg">
                Canalizando mensagem sagrada...
              </p>
              <p className="text-white/60 text-sm mt-2 font-sans">
                Aguarde enquanto as dimensões superiores se alinham
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OraclePortal;
