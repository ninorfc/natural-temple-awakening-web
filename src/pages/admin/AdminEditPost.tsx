
import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { ArrowLeft, Save } from 'lucide-react';
import { toast } from 'sonner';

const AdminEditPost = () => {
  const { isAuthenticated, updatePost, getPost } = useAdmin();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    excerpt: '',
    category: '',
    tags: '',
    published: false
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    if (id) {
      const post = getPost(id);
      if (post) {
        setFormData({
          title: post.title,
          content: post.content,
          excerpt: post.excerpt,
          category: post.category,
          tags: post.tags.join(', '),
          published: post.published
        });
        setLoading(false);
      } else {
        toast.error('Post não encontrado!');
        navigate('/admin/posts');
      }
    }
  }, [isAuthenticated, id, getPost, navigate]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim() || !formData.content.trim()) {
      toast.error('Título e conteúdo são obrigatórios!');
      return;
    }

    if (!id) return;

    const updatedPost = {
      title: formData.title.trim(),
      content: formData.content.trim(),
      excerpt: formData.excerpt.trim() || formData.content.substring(0, 150) + '...',
      category: formData.category.trim() || 'Sem categoria',
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(tag => tag),
      published: formData.published
    };

    updatePost(id, updatedPost);
    toast.success('Post atualizado com sucesso!');
    navigate('/admin/posts');
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  if (!isAuthenticated || loading) return null;

  return (
    <div className="min-h-screen cosmic-bg">
      {/* Header */}
      <header className="bg-cosmic-dark/95 backdrop-blur-sm border-b border-cosmic-violet/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Link to="/admin/posts">
                <Button variant="outline" size="sm" className="border-cosmic-violet/30 text-white hover:bg-cosmic-violet/20">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Voltar
                </Button>
              </Link>
              <h1 className="text-2xl font-bold text-cosmic-gradient">
                Editar Post
              </h1>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Conteúdo Principal */}
              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-cosmic-dark/80 border-cosmic-violet/20">
                  <CardHeader>
                    <CardTitle className="text-white">Conteúdo do Post</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="title" className="text-white/90">
                        Título *
                      </Label>
                      <Input
                        id="title"
                        type="text"
                        value={formData.title}
                        onChange={(e) => handleInputChange('title', e.target.value)}
                        className="bg-cosmic-dark/50 border-cosmic-violet/30 text-white"
                        placeholder="Digite o título do post"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="excerpt" className="text-white/90">
                        Resumo
                      </Label>
                      <Textarea
                        id="excerpt"
                        value={formData.excerpt}
                        onChange={(e) => handleInputChange('excerpt', e.target.value)}
                        className="bg-cosmic-dark/50 border-cosmic-violet/30 text-white min-h-[100px]"
                        placeholder="Breve descrição do post"
                      />
                    </div>

                    <div>
                      <Label htmlFor="content" className="text-white/90">
                        Conteúdo *
                      </Label>
                      <Textarea
                        id="content"
                        value={formData.content}
                        onChange={(e) => handleInputChange('content', e.target.value)}
                        className="bg-cosmic-dark/50 border-cosmic-violet/30 text-white min-h-[400px]"
                        placeholder="Escreva o conteúdo completo do post aqui..."
                        required
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Configurações */}
              <div className="space-y-6">
                <Card className="bg-cosmic-dark/80 border-cosmic-violet/20">
                  <CardHeader>
                    <CardTitle className="text-white">Configurações</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="category" className="text-white/90">
                        Categoria
                      </Label>
                      <Input
                        id="category"
                        type="text"
                        value={formData.category}
                        onChange={(e) => handleInputChange('category', e.target.value)}
                        className="bg-cosmic-dark/50 border-cosmic-violet/30 text-white"
                        placeholder="Ex: Despertar Espiritual"
                      />
                    </div>

                    <div>
                      <Label htmlFor="tags" className="text-white/90">
                        Tags
                      </Label>
                      <Input
                        id="tags"
                        type="text"
                        value={formData.tags}
                        onChange={(e) => handleInputChange('tags', e.target.value)}
                        className="bg-cosmic-dark/50 border-cosmic-violet/30 text-white"
                        placeholder="espiritualidade, meditação, cura"
                      />
                      <p className="text-xs text-white/50 mt-1">
                        Separe as tags com vírgulas
                      </p>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="published"
                        checked={formData.published}
                        onCheckedChange={(checked) => handleInputChange('published', checked)}
                      />
                      <Label htmlFor="published" className="text-white/90">
                        Publicar
                      </Label>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  <Button 
                    type="submit" 
                    className="w-full bg-cosmic-violet hover:bg-cosmic-violet/80"
                  >
                    <Save className="w-4 h-4 mr-2" />
                    Salvar Alterações
                  </Button>
                  
                  <Link to="/admin/posts">
                    <Button 
                      type="button" 
                      variant="outline" 
                      className="w-full border-cosmic-violet/30 text-white hover:bg-cosmic-violet/20"
                    >
                      Cancelar
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminEditPost;
