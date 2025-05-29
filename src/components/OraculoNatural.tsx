
import React from 'react';
import OraclePortal from './OraclePortal';

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

        <OraclePortal />

        {/* Elementos decorativos místicos */}
        <div className="absolute top-20 left-10 w-2 h-2 bg-cosmic-gold rounded-full animate-pulse opacity-60"></div>
        <div className="absolute bottom-20 right-16 w-3 h-3 bg-cosmic-violet rounded-full animate-float opacity-50"></div>
        <div className="absolute top-1/2 right-10 w-1 h-1 bg-cosmic-gold rounded-full animate-pulse opacity-70" style={{animationDelay: '2s'}}></div>
      </div>
    </section>
  );
};

export default OraculoNatural;
