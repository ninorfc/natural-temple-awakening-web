
import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';

export interface Post {
  id: string;
  titulo: string;
  slug: string;
  imagem_url?: string;
  conteudo_html: string;
  data_publicacao: string;
  autor_id?: string;
  status: 'rascunho' | 'publicado';
  meta_descricao?: string;
  palavras_chave?: string[];
  created_at: string;
  updated_at: string;
  categorias?: Category[];
}

export interface Category {
  id: string;
  nome: string;
  slug: string;
  created_at: string;
  updated_at: string;
}

export interface CreatePostData {
  titulo: string;
  slug: string;
  imagem_url?: string;
  conteudo_html: string;
  status: 'rascunho' | 'publicado';
  meta_descricao?: string;
  palavras_chave?: string[];
  categoria_ids?: string[];
}

export interface UpdatePostData extends Partial<CreatePostData> {}

// Hook para buscar posts
export const usePosts = (status?: 'publicado' | 'rascunho') => {
  return useQuery({
    queryKey: ['posts', status],
    queryFn: async () => {
      let query = supabase
        .from('posts')
        .select(`
          *,
          post_categorias!inner(
            categorias(*)
          )
        `)
        .order('data_publicacao', { ascending: false });

      if (status) {
        query = query.eq('status', status);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Erro ao buscar posts:', error);
        throw error;
      }

      // Transformar dados para incluir categorias
      const postsWithCategories = data?.map(post => ({
        ...post,
        categorias: post.post_categorias?.map((pc: any) => pc.categorias) || []
      })) || [];

      return postsWithCategories as Post[];
    },
  });
};

// Hook para buscar um post específico
export const usePost = (slug: string) => {
  return useQuery({
    queryKey: ['post', slug],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          post_categorias(
            categorias(*)
          )
        `)
        .eq('slug', slug)
        .single();

      if (error) {
        console.error('Erro ao buscar post:', error);
        throw error;
      }

      return {
        ...data,
        categorias: data.post_categorias?.map((pc: any) => pc.categorias) || []
      } as Post;
    },
    enabled: !!slug,
  });
};

// Hook para buscar categorias
export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('categorias')
        .select('*')
        .order('nome');

      if (error) {
        console.error('Erro ao buscar categorias:', error);
        throw error;
      }

      return data as Category[];
    },
  });
};

// Hook para criar post
export const useCreatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (postData: CreatePostData) => {
      const { categoria_ids, ...postFields } = postData;

      // Criar o post
      const { data: post, error: postError } = await supabase
        .from('posts')
        .insert([postFields])
        .select()
        .single();

      if (postError) {
        console.error('Erro ao criar post:', postError);
        throw postError;
      }

      // Associar categorias se fornecidas
      if (categoria_ids && categoria_ids.length > 0) {
        const categoriaRelations = categoria_ids.map(categoria_id => ({
          post_id: post.id,
          categoria_id,
        }));

        const { error: categoriaError } = await supabase
          .from('post_categorias')
          .insert(categoriaRelations);

        if (categoriaError) {
          console.error('Erro ao associar categorias:', categoriaError);
          throw categoriaError;
        }
      }

      return post;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post criado com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao criar post:', error);
      toast.error('Erro ao criar post. Tente novamente.');
    },
  });
};

// Hook para atualizar post
export const useUpdatePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdatePostData }) => {
      const { categoria_ids, ...postFields } = data;

      // Atualizar o post
      const { data: post, error: postError } = await supabase
        .from('posts')
        .update(postFields)
        .eq('id', id)
        .select()
        .single();

      if (postError) {
        console.error('Erro ao atualizar post:', postError);
        throw postError;
      }

      // Atualizar categorias se fornecidas
      if (categoria_ids !== undefined) {
        // Remover associações existentes
        await supabase
          .from('post_categorias')
          .delete()
          .eq('post_id', id);

        // Adicionar novas associações
        if (categoria_ids.length > 0) {
          const categoriaRelations = categoria_ids.map(categoria_id => ({
            post_id: id,
            categoria_id,
          }));

          const { error: categoriaError } = await supabase
            .from('post_categorias')
            .insert(categoriaRelations);

          if (categoriaError) {
            console.error('Erro ao atualizar categorias:', categoriaError);
            throw categoriaError;
          }
        }
      }

      return post;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post atualizado com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao atualizar post:', error);
      toast.error('Erro ao atualizar post. Tente novamente.');
    },
  });
};

// Hook para deletar post
export const useDeletePost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Erro ao deletar post:', error);
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      toast.success('Post deletado com sucesso!');
    },
    onError: (error) => {
      console.error('Erro ao deletar post:', error);
      toast.error('Erro ao deletar post. Tente novamente.');
    },
  });
};
