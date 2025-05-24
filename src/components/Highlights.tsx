
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Sparkles, BookOpen, Eye } from 'lucide-react';

const Highlights = () => {
  const highlights = [
    {
      icon: <Sparkles className="w-8 h-8 text-cosmic-gold" />,
      title: "Meditações",
      description: "Jornadas sonoras em 432Hz e 528Hz para harmonização e cura interior",
      href: "#meditacoes",
      gradient: "from-cosmic-violet/20 to-cosmic-gold/10"
    },
    {
      icon: <BookOpen className="w-8 h-8 text-cosmic-gold" />,
      title: "Artigos",
      description: "Sabedoria ancestral, plantas medicinais e conhecimentos espirituais",
      href: "#blog",
      gradient: "from-cosmic-gold/20 to-cosmic-violet/10"
    },
    {
      icon: <Eye className="w-8 h-8 text-cosmic-gold" />,
      title: "Oráculo",
      description: "Consultas intuitivas e mensagens canalizadas para seu caminho",
      href: "#oraculo",
      gradient: "from-cosmic-violet/20 to-cosmic-dark/30"
    }
  ];

  return (
    <section className="py-20 bg-cosmic-purple">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-cosmic-gradient">
            Portais de Sabedoria
          </h2>
          <p className="text-xl text-white/80 max-w-2xl mx-auto font-sans">
            Explore diferentes caminhos para sua jornada de autoconhecimento e despertar espiritual
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <Card 
              key={index}
              className={`bg-gradient-to-br ${item.gradient} border-cosmic-violet/30 hover:border-cosmic-gold/50 transition-all duration-300 hover:scale-105 cursor-pointer group`}
              onClick={() => document.querySelector(item.href)?.scrollIntoView({ behavior: 'smooth' })}
            >
              <CardContent className="p-8 text-center">
                <div className="flex justify-center mb-6 group-hover:animate-pulse">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-cosmic-gold transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/80 leading-relaxed font-sans">
                  {item.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Highlights;
