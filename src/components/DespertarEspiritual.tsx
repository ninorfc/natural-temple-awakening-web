
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const DespertarEspiritual = () => {
  const textosCanalizados = [
    {
      title: "A Luz que Você É",
      content: "Você não está aqui por acaso. Cada respiração é um lembrete de que sua alma escolheu este momento, este corpo, esta experiência. A luz que brilha através de seus olhos é a mesma que cria as estrelas.",
      date: "Canalização de 15 de Janeiro"
    },
    {
      title: "O Despertar Interior",
      content: "O despertar não é um destino, mas uma jornada contínua de remembramento. Cada desafio é uma oportunidade de reconhecer a divindade que habita em você.",
      date: "Canalização de 22 de Janeiro"
    }
  ];

  const rituais = [
    {
      title: "Ritual da Lua Nova",
      description: "Conecte-se com a energia renovadora da lua nova para manifestar seus sonhos",
      steps: ["Acenda uma vela branca", "Escreva suas intenções", "Queime o papel sob a luz da lua", "Medite em gratidão"]
    },
    {
      title: "Banho de Ervas Sagradas",
      description: "Purificação energética com plantas ancestrais",
      steps: ["Prepare chá de arruda e guiné", "Adicione sal grosso", "Tome o banho do pescoço para baixo", "Visualize energias densas se dissolvendo"]
    }
  ];

  const afirmacoes = [
    "Eu sou luz divina em constante expansão",
    "Minha intuição me guia com sabedoria perfeita",
    "Eu confio no fluxo sagrado da vida",
    "Meu coração está aberto para receber toda abundância",
    "Eu honro a sabedoria ancestral que vive em mim"
  ];

  return (
    <section id="despertar" className="py-20 cosmic-bg">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-cosmic-gradient">
            Despertar Espiritual
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto font-sans">
            Textos canalizados, rituais sagrados e afirmações poderosas para acelerar seu processo de despertar
          </p>
        </div>

        <Tabs defaultValue="textos" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-12 bg-cosmic-purple/50">
            <TabsTrigger value="textos" className="data-[state=active]:bg-cosmic-gold data-[state=active]:text-cosmic-dark">
              Textos Canalizados
            </TabsTrigger>
            <TabsTrigger value="rituais" className="data-[state=active]:bg-cosmic-gold data-[state=active]:text-cosmic-dark">
              Rituais
            </TabsTrigger>
            <TabsTrigger value="afirmacoes" className="data-[state=active]:bg-cosmic-gold data-[state=active]:text-cosmic-dark">
              Afirmações
            </TabsTrigger>
          </TabsList>

          <TabsContent value="textos" className="space-y-6">
            {textosCanalizados.map((texto, index) => (
              <Card key={index} className="bg-cosmic-purple/30 border-cosmic-violet/30">
                <CardHeader>
                  <CardTitle className="text-cosmic-gold text-2xl">{texto.title}</CardTitle>
                  <p className="text-cosmic-violet text-sm font-sans">{texto.date}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-white/90 leading-relaxed text-lg italic">
                    "{texto.content}"
                  </p>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="rituais" className="space-y-6">
            {rituais.map((ritual, index) => (
              <Card key={index} className="bg-cosmic-purple/30 border-cosmic-violet/30">
                <CardHeader>
                  <CardTitle className="text-cosmic-gold text-2xl">{ritual.title}</CardTitle>
                  <p className="text-white/80 font-sans">{ritual.description}</p>
                </CardHeader>
                <CardContent>
                  <ol className="space-y-3">
                    {ritual.steps.map((step, stepIndex) => (
                      <li key={stepIndex} className="flex items-start text-white/90 font-sans">
                        <span className="bg-cosmic-gold text-cosmic-dark rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mr-3 mt-0.5">
                          {stepIndex + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="afirmacoes">
            <Card className="bg-cosmic-purple/30 border-cosmic-violet/30">
              <CardHeader>
                <CardTitle className="text-cosmic-gold text-2xl text-center">
                  Afirmações de Poder Pessoal
                </CardTitle>
                <p className="text-white/80 text-center font-sans">
                  Repita estas afirmações diariamente para fortalecer sua conexão espiritual
                </p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {afirmacoes.map((afirmacao, index) => (
                    <div key={index} className="bg-cosmic-dark/50 p-4 rounded-lg border border-cosmic-gold/20">
                      <p className="text-cosmic-gold text-lg text-center italic">
                        "{afirmacao}"
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default DespertarEspiritual;
