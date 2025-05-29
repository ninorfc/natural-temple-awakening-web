
import React, { createContext, useContext, useState, useEffect } from 'react';

interface Post {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  category: string;
  tags: string[];
  published: boolean;
  createdAt: string;
  updatedAt: string;
}

interface AdminContextType {
  isAuthenticated: boolean;
  posts: Post[];
  login: (username: string, password: string) => boolean;
  logout: () => void;
  createPost: (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updatePost: (id: string, post: Partial<Post>) => void;
  deletePost: (id: string) => void;
  getPost: (id: string) => Post | undefined;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    // Verificar se está logado ao carregar
    const authStatus = localStorage.getItem('admin_authenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }

    // Carregar posts do localStorage
    const storedPosts = localStorage.getItem('admin_posts');
    if (storedPosts) {
      setPosts(JSON.parse(storedPosts));
    } else {
      // Posts de exemplo
      const examplePosts: Post[] = [
        {
          id: '1',
          title: 'O Despertar da Consciência Espiritual',
          content: 'A jornada espiritual é um caminho de autodescoberta...',
          excerpt: 'Descubra os primeiros passos para o despertar espiritual',
          category: 'Despertar Espiritual',
          tags: ['espiritualidade', 'consciência', 'despertar'],
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        },
        {
          id: '2',
          title: 'Saberes Ancestrais e Plantas Medicinais',
          content: 'As plantas são nossas grandes mestras...',
          excerpt: 'Explore a sabedoria das plantas medicinais',
          category: 'Plantas Medicinais',
          tags: ['plantas', 'cura', 'ancestral'],
          published: true,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      ];
      setPosts(examplePosts);
      localStorage.setItem('admin_posts', JSON.stringify(examplePosts));
    }
  }, []);

  const login = (username: string, password: string): boolean => {
    // Credenciais simples para demonstração
    if (username === 'admin' && password === 'sabedoria2024') {
      setIsAuthenticated(true);
      localStorage.setItem('admin_authenticated', 'true');
      return true;
    }
    return false;
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin_authenticated');
  };

  const createPost = (newPost: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>) => {
    const post: Post = {
      ...newPost,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updatedPosts = [...posts, post];
    setPosts(updatedPosts);
    localStorage.setItem('admin_posts', JSON.stringify(updatedPosts));
  };

  const updatePost = (id: string, updatedPost: Partial<Post>) => {
    const updatedPosts = posts.map(post => 
      post.id === id 
        ? { ...post, ...updatedPost, updatedAt: new Date().toISOString() }
        : post
    );
    setPosts(updatedPosts);
    localStorage.setItem('admin_posts', JSON.stringify(updatedPosts));
  };

  const deletePost = (id: string) => {
    const updatedPosts = posts.filter(post => post.id !== id);
    setPosts(updatedPosts);
    localStorage.setItem('admin_posts', JSON.stringify(updatedPosts));
  };

  const getPost = (id: string): Post | undefined => {
    return posts.find(post => post.id === id);
  };

  return (
    <AdminContext.Provider value={{
      isAuthenticated,
      posts,
      login,
      logout,
      createPost,
      updatePost,
      deletePost,
      getPost
    }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error('useAdmin must be used within an AdminProvider');
  }
  return context;
};
