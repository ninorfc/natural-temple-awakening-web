
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isAuthenticated } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (login(username, password)) {
      toast.success('Login realizado com sucesso!');
      navigate('/admin');
    } else {
      toast.error('Credenciais inválidas. Tente novamente.');
    }
  };

  return (
    <div className="min-h-screen cosmic-bg flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-cosmic-dark/90 border-cosmic-violet/20">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-cosmic-gradient">
            Sabedoria Natural
          </CardTitle>
          <CardDescription className="text-white/70">
            Acesso à Administração
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="username" className="text-white/90">
                Usuário
              </Label>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-cosmic-dark/50 border-cosmic-violet/30 text-white"
                placeholder="Digite seu usuário"
                required
              />
            </div>
            
            <div>
              <Label htmlFor="password" className="text-white/90">
                Senha
              </Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-cosmic-dark/50 border-cosmic-violet/30 text-white"
                placeholder="Digite sua senha"
                required
              />
            </div>

            <Button 
              type="submit" 
              className="w-full bg-cosmic-violet hover:bg-cosmic-violet/80"
            >
              Entrar
            </Button>
          </form>

          <div className="mt-6 p-4 bg-cosmic-violet/10 rounded-lg">
            <p className="text-sm text-white/70 text-center">
              <strong>Credenciais de demonstração:</strong><br />
              Usuário: admin<br />
              Senha: sabedoria2024
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminLogin;
