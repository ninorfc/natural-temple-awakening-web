import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { useAdmin } from '@/contexts/AdminContext';
import { usePost, useUpdatePost, useCategories } from '@/hooks/usePosts';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import { slugify } from '@/utils/slugify';
import { supabase } from '@/integrations/supabase/client';

const AdminEditPost = () => {
  const { isAuthenticated } = useAdmin();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  
  const { data: post, isLoading: postLoading, error } = usePost(id || '');
  const updatePostMutation = useUpdatePost();
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  
  const [formData, setFormData] = useState({
    titulo: '',
    slug: '',
    conteudo_html: '',
    meta_descricao: '',
    imagem_url: '',
    palavras_chave: '',
    status: 'rascunho' as 'rascunho' | 'publicado',
    categoria_ids: [] as string[]
  });

  const [isGeneratingSlug, setIsGeneratingSlug] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/admin/login');
      return;
    }

    if (error) {
      navigate('/admin/posts');
    }
  }, [isAuthenticated, error, navigate]);

  useEffect(() => {
    if (post) {
      setFormData({
        titulo: post.titulo,
        slug: post.slug,
        conteudo_html: post.conteudo_html,
        meta_descricao: post.meta_descricao || '',
        imagem_url: post.imagem_url || '',
        palavras_chave: post.palavras_chave?.join(', ') || '',
        status: post.status,
        categoria_ids: post.categorias?.map(cat => cat.id) || []
      });
    }
  }, [post]);

  const generateSlug = async (titulo: string, currentSlug: string) => {
    if (!titulo.trim()) return '';
    
    setIsGeneratingSlug(true);
    try {
      const baseSlug = slugify(titulo);
      
      // Se o slug não mudou, não precisa verificar
      if (baseSlug === currentSlug) {
        return currentSlug;
      }
      
      // Verificar se o slug já existe (excluindo o post atual)
      const { data } = await supabase
        .from('posts')
        .select('slug')
        .eq('slug', baseSlug)
        .neq('id', id)
        .single();

      let finalSlug = baseSlug;
      let counter = 1;

      // Se existe, adicionar número sequencial
      while (data) {
        finalSlug = `${baseSlug}-${counter}`;
        const { data: existingSlug } = await supabase
          .from('posts')
          .select('slug')
          .eq('slug', finalSlug)
          .neq('id', id)
          .single();
        
        if (!existingSlug) break;
        counter++;
      }

      return finalSlug;
    } catch (error) {
      // Se não encontrou nenhum post com o slug, pode usar o slug base
      return slugify(titulo);
    } finally {
      setIsGeneratingSlug(false);
    }
  };

  const handleTituloChange = async (titulo: string) => {
    setFormData(prev => ({ ...prev, titulo }));
    
    if (titulo.trim()) {
      const newSlug = await generateSlug(titulo, formData.slug);
      setFormData(prev => ({ ...prev, slug: newSlug }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.titulo.trim() || !formData.conteudo_html.trim() || !id) {
      return;
    }

    const palavrasChaveArray = formData.palavras_chave
      .split(',')
      .map(tag => tag.trim())
      .filter(tag => tag);

    updatePostMutation.mutate({
      id,
      data: {
        titulo: formData.titulo.trim(),
        slug: formData.slug || await generateSlug(formData.titulo, formData.slug),
        conteudo_html: formData.conteudo_html.trim(),
        meta_descricao: formData.meta_descricao.trim() || undefined,
        imagem_url: formData.imagem_url.trim() || undefined,
        status: formData.status,
        palavras_chave: palavrasChaveArray.length > 0 ? palavrasChaveArray : undefined,
        categoria_ids: formData.categoria_ids
      }
    }, {
      onSuccess: () => {
        navigate('/admin/posts');
      }
    });
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCategoryChange = (categoryId: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      categoria_ids: checked
        ? [...prev.categoria_ids, categoryId]
        : prev.categoria_ids.filter(id => id !== categoryId)
    }));
  };

  if (!isAuthenticated || postLoading) {
    return (
      <div className="min-h-screen cosmic-bg flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <Loader2 className="w-8 h-8 animate-spin text-cosmic-violet" />
          <span className="text-white">Carregando...</span>
        </div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen cosmic-bg flex items-center justify-center">
        <Card className="bg-cosmic-dark/80 border-cosmic-violet/20">
          <CardContent className="py-8 text-center">
            <p className="text-red-400 mb-4">Post não encontrado</p>
            <Link to="/admin/posts">
              <Button>Voltar para Posts</Button>
            </Link>
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
                      <Label htmlFor="titulo" className="text-white/90">
                        Título *
                      </Label>
                      <Input
                        id="titulo"
                        type="text"
                        value={formData.titulo}
                        onChange={(e) => handleTituloChange(e.target.value)}
                        className="bg-cosmic-dark/50 border-cosmic-violet/30 text-white"
                        placeholder="Digite o título do post"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="slug" className="text-white/90">
                        Slug (URL amigável)
                      </Label>
                      <div className="relative">
                        <Input
                          id="slug"
                          type="text"
                          value={formData.slug}
                          onChange={(e) => handleInputChange('slug', e.target.value)}
                          className="bg-cosmic-dark/50 border-cosmic-violet/30 text-white"
                          placeholder="slug-automatico"
                        />
                        {isGeneratingSlug && (
                          <Loader2 className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 animate-spin text-cosmic-violet" />
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="meta_descricao" className="text-white/90">
                        Meta Descrição (SEO)
                      </Label>
                      <Textarea
                        id="meta_descricao"
                        value={formData.meta_descricao}
                        onChange={(e) => handleInputChange('meta_descricao', e.target.value)}
                        className="bg-cosmic-dark/50 border-cosmic-violet/30 text-white min-h-[100px]"
                        placeholder="Breve descrição para motores de busca"
                      />
                    </div>

                    <div>
                      <Label htmlFor="imagem_url" className="text-white/90">
                        URL da Imagem de Destaque
                      </Label>
                      <Input
                        id="imagem_url"
                        type="url"
                        value={formData.imagem_url}
                        onChange={(e) => handleInputChange('imagem_url', e.target.value)}
                        className="bg-cosmic-dark/50 border-cosmic-violet/30 text-white"
                        placeholder="https://exemplo.com/imagem.jpg"
                      />
                    </div>

                    <div>
                      <Label htmlFor="conteudo_html" className="text-white/90">
                        Conteúdo *
                      </Label>
                      <Textarea
                        id="conteudo_html"
                        value={formData.conteudo_html}
                        onChange={(e) => handleInputChange('conteudo_html', e.target.value)}
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
                      <Label htmlFor="palavras_chave" className="text-white/90">
                        Palavras-chave
                      </Label>
                      <Input
                        id="palavras_chave"
                        type="text"
                        value={formData.palavras_chave}
                        onChange={(e) => handleInputChange('palavras_chave', e.target.value)}
                        className="bg-cosmic-dark/50 border-cosmic-violet/30 text-white"
                        placeholder="espiritualidade, meditação, cura"
                      />
                      <p className="text-xs text-white/50 mt-1">
                        Separe as palavras-chave com vírgulas
                      </p>
                    </div>

                    <div>
                      <Label className="text-white/90 mb-3 block">Categorias</Label>
                      {categoriesLoading ? (
                        <div className="flex items-center space-x-2">
                          <Loader2 className="w-4 h-4 animate-spin text-cosmic-violet" />
                          <span className="text-white/50 text-sm">Carregando categorias...</span>
                        </div>
                      ) : (
                        <div className="space-y-2 max-h-48 overflow-y-auto">
                          {categories?.map((category) => (
                            <div key={category.id} className="flex items-center space-x-2">
                              <Checkbox
                                id={`category-${category.id}`}
                                checked={formData.categoria_ids.includes(category.id)}
                                onCheckedChange={(checked) => 
                                  handleCategoryChange(category.id, checked as boolean)
                                }
                              />
                              <Label 
                                htmlFor={`category-${category.id}`} 
                                className="text-white/90 text-sm cursor-pointer"
                              >
                                {category.nome}
                              </Label>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center space-x-2">
                      <Switch
                        id="status"
                        checked={formData.status === 'publicado'}
                        onCheckedChange={(checked) => 
                          handleInputChange('status', checked ? 'publicado' : 'rascunho')
                        }
                      />
                      <Label htmlFor="status" className="text-white/90">
                        Publicar
                      </Label>
                    </div>
                  </CardContent>
                </Card>

                <div className="space-y-3">
                  <Button 
                    type="submit" 
                    className="w-full bg-cosmic-violet hover:bg-cosmic-violet/80"
                    disabled={updatePostMutation.isPending}
                  >
                    {updatePostMutation.isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Salvando...
                      </>
                    ) : (
                      <>
                        <Save className="w-4 h-4 mr-2" />
                        Salvar Alterações
                      </>
                    )}
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
