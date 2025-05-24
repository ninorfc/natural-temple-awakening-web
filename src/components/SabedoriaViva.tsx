
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, Leaf, Heart, Sparkles } from 'lucide-react';

const SabedoriaViva = () => {
  const posts = [
    {
      title: "O Poder Sagrado da Arruda",
      excerpt: "Descubra os segredos ancestrais desta planta poderosa para proteção e limpeza energética.",
      category: "Plantas Medicinais",
      date: "25 Jan 2024",
      readTime: "5 min",
      icon: <Leaf className="w-5 h-5" />,
      image: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400&h=250&fit=crop"
    },
    {
      title: "Alinhamento com os Ciclos Lunares",
      excerpt: "Como sincronizar sua energia pessoal com as fases da lua para manifestação e cura.",
      category: "Espiritualidade",
      date: "22 Jan 2024",
      readTime: "7 min",
      icon: <Sparkles className="w-5 h-5" />,
      image: "https://images.unsplash.com/photo-1470813740244-df37b8c1edcb?w=400&h=250&fit=crop"
    },
    {
      title: "Benzimentos: A Arte da Cura pela Palavra",
      excerpt: "Aprenda sobre a tradição milenar dos benzimentos e como palavras sagradas podem curar.",
      category: "Tradições Ancestrais",
      date: "18 Jan 2024",
      readTime: "6 min",
      icon: <Heart className="w-5 h-5" />,
      image: "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400&h=250&fit=crop"
    },
    {
      title: "Cristais para Meditação: Guia Completo",
      excerpt: "Os cristais essenciais para aprofundar sua prática meditativa e expandir a consciência.",
      category: "Autocuidado",
      date: "15 Jan 2024",
      readTime: "8 min",
      icon: <Sparkles className="w-5 h-5" />,
      image: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=250&fit=crop"
    }
  ];

  return (
    <section id="blog" className="py-20 bg-cosmic-purple">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-cosmic-gradient">
            Sabedoria Viva
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto font-sans">
            Artigos sobre plantas medicinais, espiritualidade, autocuidado e saberes ancestrais para nutrir sua jornada
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {posts.map((post, index) => (
            <Card key={index} className="bg-cosmic-dark/50 border-cosmic-violet/30 hover:border-cosmic-gold/50 transition-all duration-300 hover:scale-105 cursor-pointer group overflow-hidden">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between text-sm text-cosmic-violet font-sans mb-2">
                  <div className="flex items-center gap-2">
                    {post.icon}
                    <span>{post.category}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      <span>{post.date}</span>
                    </div>
                    <span>{post.readTime}</span>
                  </div>
                </div>
                <CardTitle className="text-white group-hover:text-cosmic-gold transition-colors text-xl">
                  {post.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-white/80 leading-relaxed font-sans">
                  {post.excerpt}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button 
            variant="outline" 
            size="lg"
            className="border-cosmic-gold text-cosmic-gold hover:bg-cosmic-gold hover:text-cosmic-dark transition-all duration-300 font-sans"
          >
            Ver todos os artigos
          </Button>
        </div>
      </div>
    </section>
  );
};

export default SabedoriaViva;
