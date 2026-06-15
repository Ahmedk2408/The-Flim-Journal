import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useParams, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Marquee } from './components/Marquee';
import { HomeView } from './components/HomeView';
import { CategoryView } from './components/CategoryView';
import { ArticleView } from './components/ArticleView';
import { AboutView } from './components/AboutView';
import { SearchView } from './components/SearchView';
import { AdminView } from './components/AdminView';

import {
  getPosts, savePosts, upsertPost, deletePost,
  getCategories, saveCategories,
  getSettings, saveSettings,
  subscribeToPostChanges
} from './data';
import { Post, Category, SiteSettings } from './types';

// ── Shared data context passed down to all route components ──
interface AppData {
  posts: Post[];
  categories: Category[];
  settings: SiteSettings;
  handleUpdatePosts: (posts: Post[]) => Promise<void>;
  handleUpsertPost: (post: Post) => Promise<void>;
  handleDeletePost: (id: string) => Promise<void>;
  handleUpdateCategories: (cats: Category[]) => Promise<void>;
  handleUpdateSettings: (s: SiteSettings) => Promise<void>;
}

// ── Inner app that has access to router hooks ──
function AppInner({ data }: { data: AppData }) {
  const navigate = useNavigate();
  const location = useLocation();

  const { posts, categories, settings } = data;

  // Map old onNavigate(view, category, slug) calls → real URLs
  const handleNavigate = (view: string, category: string | null = null, slug: string | null = null) => {
    if (view === 'home') navigate('/');
    else if (view === 'article' && slug) navigate(`/article/${slug}`);
    else if (view === 'category' && category) navigate(`/category/${category}`);
    else if (view === 'about') navigate('/about');
    else if (view === 'search') navigate('/search');
    else if (view === 'admin') navigate('/admin');
    else navigate('/');
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSearchTrigger = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#1a1a1a] text-[#F5F5F0]">
      <div>
        <Header
          currentView={isAdmin ? 'admin' : 'home'}
          selectedCategory={null}
          onNavigate={handleNavigate}
          onSearch={handleSearchTrigger}
        />

        {!isAdmin && posts.length > 0 && (
          <Marquee
            posts={posts}
            onArticleClick={(slug) => navigate(`/article/${slug}`)}
          />
        )}

        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomeView posts={posts} onNavigate={handleNavigate} />} />

            <Route path="/category/:categorySlug" element={
              <CategoryViewWrapper posts={posts} categories={categories} onNavigate={handleNavigate} />
            } />

            <Route path="/article/:slug" element={
              <ArticleViewWrapper posts={posts} onNavigate={handleNavigate} onSearch={handleSearchTrigger} />
            } />

            <Route path="/about" element={<AboutView />} />

            <Route path="/search" element={
              <SearchViewWrapper posts={posts} onNavigate={handleNavigate} />
            } />

            <Route path="/admin" element={
              <AdminView
                posts={posts}
                categories={categories}
                settings={settings}
                onUpdatePosts={data.handleUpdatePosts}
                onUpsertPost={data.handleUpsertPost}
                onDeletePost={data.handleDeletePost}
                onUpdateCategories={data.handleUpdateCategories}
                onUpdateSettings={data.handleUpdateSettings}
                onNavigate={handleNavigate}
              />
            } />

            {/* Fallback */}
            <Route path="*" element={<HomeView posts={posts} onNavigate={handleNavigate} />} />
          </Routes>
        </main>
      </div>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}

// ── Wrapper components that pull URL params and pass to existing views ──
function CategoryViewWrapper({ posts, categories, onNavigate }: {
  posts: Post[]; categories: Category[];
  onNavigate: (view: string, cat?: string | null, slug?: string | null) => void;
}) {
  const { categorySlug } = useParams<{ categorySlug: string }>();
  return <CategoryView categorySlug={categorySlug!} posts={posts} categories={categories} onNavigate={onNavigate} />;
}

function ArticleViewWrapper({ posts, onNavigate, onSearch }: {
  posts: Post[];
  onNavigate: (view: string, cat?: string | null, slug?: string | null) => void;
  onSearch: (q: string) => void;
}) {
  const { slug } = useParams<{ slug: string }>();
  return <ArticleView slug={slug!} posts={posts} onNavigate={onNavigate} onSearch={onSearch} />;
}

function SearchViewWrapper({ posts, onNavigate }: {
  posts: Post[];
  onNavigate: (view: string, cat?: string | null, slug?: string | null) => void;
}) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [query, setQuery] = useState(params.get('q') || '');
  return <SearchView initialQuery={query} posts={posts} onNavigate={onNavigate} onSearchChange={setQuery} />;
}

// ── Root component: loads data, wraps everything in BrowserRouter ──
export default function App() {
  const [loading, setLoading] = useState(true);
  const [posts, setPosts]           = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [settings, setSettings]     = useState<SiteSettings>({
    tagline: '', facebookLink: '', twitterLink: '', instagramLink: '', mailchimpEmbed: ''
  });

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [p, c, s] = await Promise.all([getPosts(), getCategories(), getSettings()]);
      setPosts(p); setCategories(c); setSettings(s);
      setLoading(false);
    }
    loadData();
  }, []);

  useEffect(() => {
    const unsubscribe = subscribeToPostChanges(async () => {
      const refreshed = await getPosts();
      setPosts(refreshed);
    });
    return () => { unsubscribe(); };
  }, []);

  const handleUpdatePosts = async (newPosts: Post[]) => { setPosts(newPosts); await savePosts(newPosts); };
  const handleUpsertPost  = async (post: Post) => { await upsertPost(post); setPosts(await getPosts()); };
  const handleDeletePost  = async (id: string) => { await deletePost(id); setPosts(await getPosts()); };
  const handleUpdateCategories = async (c: Category[]) => { setCategories(c); await saveCategories(c); };
  const handleUpdateSettings   = async (s: SiteSettings) => { setSettings(s); await saveSettings(s); };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#1a1a1a]">
        <div className="text-center">
          <div className="text-[#C9A84C] font-serif text-4xl mb-4">TFJ</div>
          <div className="text-[#F5F5F0]/50 text-sm uppercase tracking-widest">Loading...</div>
        </div>
      </div>
    );
  }

  const data = {
    posts, categories, settings,
    handleUpdatePosts, handleUpsertPost, handleDeletePost,
    handleUpdateCategories, handleUpdateSettings,
  };

  return (
    <BrowserRouter>
      <AppInner data={data} />
    </BrowserRouter>
  );
}
