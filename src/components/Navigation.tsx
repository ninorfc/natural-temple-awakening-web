
import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    { name: 'Início', href: '#inicio' },
    { name: 'Despertar Espiritual', href: '#despertar' },
    { name: 'Sabedoria Viva', href: '#blog' },
    { name: 'Oráculo Natural', href: '#oraculo' },
    { name: 'Sobre', href: '#sobre' }
  ];

  return (
    <nav className="fixed top-0 w-full bg-cosmic-dark/95 backdrop-blur-sm z-50 border-b border-cosmic-violet/20">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div className="text-2xl font-bold text-cosmic-gradient">
            <Link to="/">Sabedoria Natural</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="hover-gold transition-colors duration-300 text-white/90 hover:text-cosmic-gold"
              >
                {item.name}
              </a>
            ))}
            {/* Link discreto para admin */}
            <Link 
              to="/admin/login"
              className="text-white/30 hover:text-white/60 transition-colors duration-300 text-sm"
              title="Área Administrativa"
            >
              •
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-cosmic-gold"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="hover-gold transition-colors duration-300 text-white/90 hover:text-cosmic-gold py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <Link 
                to="/admin/login"
                className="text-white/50 hover:text-white/80 transition-colors duration-300 py-2 text-sm"
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
