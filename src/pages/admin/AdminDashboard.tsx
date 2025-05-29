
import React, { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, FileText, Settings, LogOut, BarChart3 } from 'lucide-react';

const AdminDashboard = () => {
  const { isAuthenticated, logout, posts } = useAdmin();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const publishedPosts = posts.filter(post => post.published).length;
  const draftPosts = posts.filter(post => !post.published).length;

  if (!isAuthenticated) return null;

  return (
    <div className="min-h-screen cosmic-bg">
      {/* Header */}
      <header className="bg-cosmic-dark/95 backdrop-blur-sm border-b border-cosmic-violet/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-cosmic-gradient">
              Administração - Sabedoria Natural
            </h1>
            <div className="flex items-center space-x-4">
              <Link to="/" target="_blank">
                <Button variant="outline" className="border-cosmic-violet/30 text-white hover:bg-cosmic-violet/20">
                  Ver Site
                </Button>
              </Link>
              <Button 
                onClick={handleLogout}
                variant="outline" 
                className="border-red-500/30 text-red-400 hover:bg-red-500/20"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-cosmic-dark/80 border-cosmic-violet/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/70">
                Posts Publicados
              </CardTitle>
              <BarChart3 className="h-4 w-4 text-cosmic-gold" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cosmic-gold">{publishedPosts}</div>
            </CardContent>
          </Card>

          <Card className="bg-cosmic-dark/80 border-cosmic-violet/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/70">
                Rascunhos
              </CardTitle>
              <FileText className="h-4 w-4 text-cosmic-violet" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cosmic-violet">{draftPosts}</div>
            </CardContent>
          </Card>

          <Card className="bg-cosmic-dark/80 border-cosmic-violet/20">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-white/70">
                Total de Posts
              </CardTitle>
              <FileText className="h-4 w-4 text-white" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">{posts.length}</div>
            </CardContent>
          </Card>
        </div>

        {/* Ações Rápidas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="bg-cosmic-dark/80 border-cosmic-violet/20 hover:border-cosmic-gold/40 transition-colors cursor-pointer">
            <Link to="/admin/posts/create">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Plus className="h-6 w-6 text-cosmic-gold" />
                  <CardTitle className="text-white">Criar Novo Post</CardTitle>
                </div>
                <CardDescription className="text-white/70">
                  Adicione um novo artigo ao blog Sabedoria Viva
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="bg-cosmic-dark/80 border-cosmic-violet/20 hover:border-cosmic-violet/40 transition-colors cursor-pointer">
            <Link to="/admin/posts">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <FileText className="h-6 w-6 text-cosmic-violet" />
                  <CardTitle className="text-white">Gerenciar Posts</CardTitle>
                </div>
                <CardDescription className="text-white/70">
                  Visualize, edite ou exclua posts existentes
                </CardDescription>
              </CardHeader>
            </Link>
          </Card>

          <Card className="bg-cosmic-dark/80 border-cosmic-violet/20 opacity-50">
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Settings className="h-6 w-6 text-white/50" />
                <CardTitle className="text-white/50">Configurações</CardTitle>
              </div>
              <CardDescription className="text-white/50">
                Em breve - Configurações do site
              </CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Posts Recentes */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-white mb-4">Posts Recentes</h2>
          <div className="space-y-4">
            {posts.slice(0, 5).map((post) => (
              <Card key={post.id} className="bg-cosmic-dark/80 border-cosmic-violet/20">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-white">{post.title}</CardTitle>
                      <CardDescription className="text-white/70">
                        {post.excerpt}
                      </CardDescription>
                      <div className="flex items-center space-x-4 mt-2 text-sm text-white/50">
                        <span>Categoria: {post.category}</span>
                        <span>Status: {post.published ? 'Publicado' : 'Rascunho'}</span>
                      </div>
                    </div>
                    <Link to={`/admin/posts/edit/${post.id}`}>
                      <Button variant="outline" size="sm" className="border-cosmic-violet/30 text-white hover:bg-cosmic-violet/20">
                        Editar
                      </Button>
                    </Link>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
