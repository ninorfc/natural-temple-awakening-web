
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Mail, Sparkles } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "E-mail necessário",
        description: "Por favor, insira seu e-mail para continuar.",
        variant: "destructive"
      });
      return;
    }

    setIsSubscribing(true);
    
    // Simular processo de inscrição
    setTimeout(() => {
      toast({
        title: "Bem-vindo(a) ao templo! ✨",
        description: "Você receberá conteúdos sagrados e exclusivos em seu e-mail.",
      });
      setEmail('');
      setIsSubscribing(false);
    }, 1500);
  };

  return (
    <section className="py-20 cosmic-bg">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <Card className="bg-cosmic-purple/30 border-cosmic-violet/30 backdrop-blur-sm overflow-hidden">
            <CardHeader className="text-center pb-6">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-cosmic-gold/20 rounded-full flex items-center justify-center animate-glow">
                  <Mail className="w-8 h-8 text-cosmic-gold" />
                </div>
              </div>
              <CardTitle className="text-3xl text-cosmic-gradient mb-3">
                Receba Sabedoria Sagrada
              </CardTitle>
              <p className="text-white/80 text-lg font-sans">
                Inscreva-se para receber canalizações exclusivas, rituais lunares e conhecimentos ancestrais diretamente em seu e-mail
              </p>
            </CardHeader>
            <CardContent className="p-8">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Seu e-mail sagrado..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-cosmic-dark/50 border-cosmic-violet/30 text-white placeholder:text-white/50 focus:border-cosmic-gold h-12 text-lg font-sans"
                  />
                  
                  <Button 
                    type="submit"
                    disabled={isSubscribing}
                    className="w-full bg-cosmic-gold text-cosmic-dark hover:bg-cosmic-gold/90 h-12 text-lg font-semibold cosmic-glow font-sans"
                  >
                    {isSubscribing ? (
                      <>
                        <Sparkles className="w-5 h-5 mr-2 animate-spin" />
                        Conectando...
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5 mr-2" />
                        Entrar no Templo
                      </>
                    )}
                  </Button>
                </div>

                <div className="text-center">
                  <p className="text-white/60 text-sm font-sans">
                    🔒 Seus dados são sagrados e protegidos. Sem spam, apenas luz e sabedoria.
                  </p>
                </div>
              </form>

              {/* Benefícios */}
              <div className="mt-8 space-y-3">
                <h4 className="text-cosmic-gold font-semibold text-center mb-4">O que você receberá:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div className="flex items-center text-white/80 font-sans">
                    <span className="w-2 h-2 bg-cosmic-gold rounded-full mr-3"></span>
                    Canalizações semanais exclusivas
                  </div>
                  <div className="flex items-center text-white/80 font-sans">
                    <span className="w-2 h-2 bg-cosmic-violet rounded-full mr-3"></span>
                    Rituais para cada fase lunar
                  </div>
                  <div className="flex items-center text-white/80 font-sans">
                    <span className="w-2 h-2 bg-cosmic-gold rounded-full mr-3"></span>
                    Dicas de plantas medicinais
                  </div>
                  <div className="flex items-center text-white/80 font-sans">
                    <span className="w-2 h-2 bg-cosmic-violet rounded-full mr-3"></span>
                    Meditações guiadas
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
