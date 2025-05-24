
import React from 'react';
import { Separator } from '@/components/ui/separator';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: 'Início', href: '#inicio' },
    { name: 'Despertar Espiritual', href: '#despertar' },
    { name: 'Sabedoria Viva', href: '#blog' },
    { name: 'Oráculo Natural', href: '#oraculo' },
    { name: 'Sobre', href: '#sobre' }
  ];

  const socialLinks = [
    { name: 'Instagram', href: '#', icon: '📸' },
    { name: 'YouTube', href: '#', icon: '🎥' },
    { name: 'Spotify', href: '#', icon: '🎵' }
  ];

  return (
    <footer className="bg-cosmic-dark border-t border-cosmic-violet/30">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Logo e Descrição */}
          <div className="text-center md:text-left">
            <h3 className="text-2xl font-bold text-cosmic-gradient mb-4">
              Sabedoria Natural
            </h3>
            <p className="text-white/70 leading-relaxed font-sans">
              Um templo digital de reconexão espiritual, onde saberes ancestrais e autoconhecimento se encontram.
            </p>
          </div>

          {/* Links Rápidos */}
          <div className="text-center">
            <h4 className="text-lg font-semibold text-cosmic-gold mb-4">Links Rápidos</h4>
            <nav className="space-y-2">
              {quickLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="block text-white/70 hover:text-cosmic-gold transition-colors font-sans"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          {/* Redes Sociais */}
          <div className="text-center md:text-right">
            <h4 className="text-lg font-semibold text-cosmic-gold mb-4">Conecte-se</h4>
            <div className="flex justify-center md:justify-end space-x-4 mb-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-cosmic-purple/50 rounded-full flex items-center justify-center hover:bg-cosmic-gold/30 transition-colors"
                  aria-label={social.name}
                >
                  <span className="text-lg">{social.icon}</span>
                </a>
              ))}
            </div>
            <p className="text-white/70 text-sm font-sans">
              Siga-nos para conteúdo espiritual exclusivo
            </p>
          </div>
        </div>

        <Separator className="bg-cosmic-violet/20 my-6" />

        {/* Créditos */}
        <div className="text-center">
          <p className="text-white/60 text-sm font-sans">
            Este é um templo digital criado por Ra'Hael Vorum
          </p>
          <p className="text-white/40 text-sm mt-2 font-sans">
            © {currentYear} Sabedoria Natural • Todos os direitos reservados
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
