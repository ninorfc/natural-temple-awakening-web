
import React from 'react';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Highlights from '@/components/Highlights';
import DespertarEspiritual from '@/components/DespertarEspiritual';
import SabedoriaViva from '@/components/SabedoriaViva';
import OraculoNatural from '@/components/OraculoNatural';
import Sobre from '@/components/Sobre';
import Newsletter from '@/components/Newsletter';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen cosmic-bg">
      <Navigation />
      <Hero />
      <Highlights />
      <DespertarEspiritual />
      <SabedoriaViva />
      <OraculoNatural />
      <Sobre />
      <Newsletter />
      <Footer />
    </div>
  );
};

export default Index;
