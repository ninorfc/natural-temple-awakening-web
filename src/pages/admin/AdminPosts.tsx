
import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { usePosts, useDeletePost } from '@/hooks/usePosts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Plus, Edit, Trash2, Search, ArrowLeft, Loader2 } from 'lucide-react';

const AdminPosts = () => {
  const { isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  
  const { data: posts, isLoading, error } = usePosts();
  const deletePostMutation = useDeletePost();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
    }
  }, [isAuthenticated, navigate]);

  const filteredPosts = posts?.filter(post =>
    post.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.conteudo_html.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.categorias?.some(cat => cat.nome.toLowerCase().includes(searchTerm.toLowerCase()))
  ) || [];

  const handleDelete = (id: string, titulo: string) => {
    if (window.confirm(`Tem certeza que deseja excluir o post "${titulo}"?`)) {
      deletePostMutation.mutate(id);
    }
  };

  if (!isAuthenticated) return null;

  if (error) {
    return (
      <div className="min-h-screen cosmic-bg flex items-center justify-center">
        <Card className="bg-cosmic-dark/80 border-cosmic-violet/20">
          <CardContent className="py-8 text-center">
            <p className="text-red-400 mb-4">Erro ao carregar posts</p>
            <Button onClick={() => window.location.reload()}>
              Tentar novamente
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen cosmic-bg">
      {/* Header */}
      <header className="bg-cosmic-dark/95 backdrop-blur-sm border-b border-cosmic-violet/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link to="/admin">
                <Button variant="outline" size="sm" className="border-cosmic-violet/30 text-white hover:bg-cosmic-violet/20">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Dashboard
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-cosmic-gradient">
                Gerenciar Posts
              </h1>
            </div>
            <Link to="/admin/posts/create">
              <Button className="bg-cosmic-violet hover:bg-cosmic-violet/80">
                <Plus className="w-4 h-4 mr-2" />
                Novo Post
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Busca */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-4 h-4" />
            <Input
              type="text"
              placeholder="Buscar posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-cosmic-dark/50 border-cosmic-violet/30 text-white"
            />
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-8">
            <Loader2 className="w-8 h-8 animate-spin text-cosmic-violet" />
            <span className="ml-2 text-white">Carregando posts...</span>
          </div>
        )}

        {/* Lista de Posts */}
        <div className="space-y-4">
          {!isLoading && filteredPosts.length === 0 ? (
            <Card className="bg-cosmic-dark/80 border-cosmic-violet/20">
              <CardContent className="py-8 text-center">
                <p className="text-white/70">
                  {searchTerm ? 'Nenhum post encontrado para sua busca.' : 'Nenhum post encontrado.'}
                </p>
                <Link to="/admin/posts/create">
                  <Button className="mt-4 bg-cosmic-violet hover:bg-cosmic-violet/80">
                    <Plus className="w-4 h-4 mr-2" />
                    Criar Primeiro Post
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            filteredPosts.map((post) => (
              <Card key={post.id} className="bg-cosmic-dark/80 border-cosmic-violet/20">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <CardTitle className="text-white">{post.titulo}</CardTitle>
                        <Badge 
                          variant={post.status === 'publicado' ? "default" : "secondary"}
                          className={post.status === 'publicado' ? "bg-green-600" : "bg-yellow-600"}
                        >
                          {post.status === 'publicado' ? 'Publicado' : 'Rascunho'}
                        </Badge>
                      </div>
                      {post.meta_descricao && (
                        <p className="text-white/70 mb-2">{post.meta_descricao}</p>
                      )}
                      <div className="flex flex-wrap gap-2 mb-2">
                        {post.categorias?.map((categoria) => (
                          <Badge key={categoria.id} variant="outline" className="border-cosmic-violet/50 text-cosmic-violet">
                            {categoria.nome}
                          </Badge>
                        ))}
                        {post.palavras_chave?.map((tag) => (
                          <Badge key={tag} variant="outline" className="border-cosmic-gold/50 text-cosmic-gold">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="text-sm text-white/50">
                        Criado em: {new Date(post.created_at).toLocaleDateString('pt-BR')}
                        {post.updated_at !== post.created_at && (
                          <span> • Atualizado em: {new Date(post.updated_at).toLocaleDateString('pt-BR')}</span>
                        )}
                      </div>
                    </div>
                    <div className="flex space-x-2 ml-4">
                      <Link to={`/admin/posts/edit/${post.id}`}>
                        <Button variant="outline" size="sm" className="border-cosmic-violet/30 text-white hover:bg-cosmic-violet/20">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="border-red-500/30 text-red-400 hover:bg-red-500/20"
                        onClick={() => handleDelete(post.id, post.titulo)}
                        disabled={deletePostMutation.isPending}
                      >
                        {deletePostMutation.isPending ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPosts;
