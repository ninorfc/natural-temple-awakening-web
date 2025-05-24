
import React from 'react';
import { Button } from '@/components/ui/button';

const Hero = () => {
  return (
    <section id="inicio" className="min-h-screen flex items-center justify-center cosmic-bg cosmic-particles relative">
      <div className="container mx-auto px-4 text-center">
        <div className="animate-fade-in">
          {/* Título Principal */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 text-cosmic-gradient leading-tight">
            Você sentiu.
          </h1>
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-light mb-12 text-white/90">
            Agora é hora de lembrar.
          </h2>

          {/* Subtítulo */}
          <p className="text-xl md:text-2xl mb-12 text-white/80 max-w-3xl mx-auto leading-relaxed font-sans">
            Um templo digital de reconexão espiritual, onde saberes ancestrais e autoconhecimento 
            se encontram para despertar sua essência mais profunda.
          </p>

          {/* Botão CTA */}
          <div className="mb-16">
            <Button 
              size="lg"
              className="bg-cosmic-gold text-cosmic-dark hover:bg-cosmic-gold/90 text-lg px-8 py-4 rounded-full font-semibold cosmic-glow transition-all duration-300 hover:scale-105 font-sans"
              onClick={() => document.getElementById('despertar')?.scrollIntoView({ behavior: 'smooth' })}
            >
              Iniciar minha jornada
            </Button>
          </div>

          {/* Elemento decorativo */}
          <div className="flex justify-center">
            <div className="w-px h-20 bg-gradient-to-b from-cosmic-gold to-transparent animate-pulse"></div>
          </div>
        </div>
      </div>

      {/* Elemento místico flutuante */}
      <div className="absolute top-20 right-10 w-4 h-4 bg-cosmic-gold rounded-full animate-float opacity-60"></div>
      <div className="absolute bottom-32 left-16 w-2 h-2 bg-cosmic-violet rounded-full animate-float opacity-40" style={{animationDelay: '2s'}}></div>
      <div className="absolute top-1/2 left-10 w-3 h-3 bg-cosmic-gold rounded-full animate-float opacity-50" style={{animationDelay: '4s'}}></div>
    </section>
  );
};

export default Hero;
