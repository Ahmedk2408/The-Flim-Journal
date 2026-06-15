import { useState, useEffect } from 'react';
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

export default function App() {
  const [currentView, setCurrentView]         = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [articleSlug, setArticleSlug]         = useState<string | null>(null);
  const [searchQuery, setSearchQuery]         = useState<string>('');
  const [loading, setLoading]                 = useState<boolean>(true);

  const [posts, setPosts]           = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [settings, setSettings]     = useState<SiteSettings>({
    tagline: '',
    facebookLink: '',
    twitterLink: '',
    instagramLink: '',
    mailchimpEmbed: ''
  });

  // ── Load everything from Supabase (or localStorage fallback) on mount ──
  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [fetchedPosts, fetchedCategories, fetchedSettings] = await Promise.all([
        getPosts(),
        getCategories(),
        getSettings(),
      ]);
      setPosts(fetchedPosts);
      setCategories(fetchedCategories);
      setSettings(fetchedSettings);
      setLoading(false);
    }
    loadData();
  }, []);

  // ── Real-time listener: refresh posts whenever any browser saves one ──
  useEffect(() => {
    const unsubscribe = subscribeToPostChanges(async () => {
      const refreshed = await getPosts();
      setPosts(refreshed);
    });
    return () => { unsubscribe(); };
  }, []);

  // ── Update handlers ──
  const handleUpdatePosts = async (newPosts: Post[]) => {
    setPosts(newPosts);
    await savePosts(newPosts);
  };

  // Called by AdminView when a single post is saved/edited
  const handleUpsertPost = async (post: Post) => {
    await upsertPost(post);
    const refreshed = await getPosts();
    setPosts(refreshed);
  };

  // Called by AdminView when a post is deleted
  const handleDeletePost = async (id: string) => {
    await deletePost(id);
    const refreshed = await getPosts();
    setPosts(refreshed);
  };

  const handleUpdateCategories = async (newCategories: Category[]) => {
    setCategories(newCategories);
    await saveCategories(newCategories);
  };

  const handleUpdateSettings = async (newSettings: SiteSettings) => {
    setSettings(newSettings);
    await saveSettings(newSettings);
  };

  const handleNavigate = (view: string, category: string | null = null, slug: string | null = null) => {
    setCurrentView(view);
    setSelectedCategory(category);
    setArticleSlug(slug);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSearchTrigger = (query: string) => {
    setSearchQuery(query);
    setCurrentView('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#1a1a1a] text-[#F5F5F0]">
      <div>
        <Header
          currentView={currentView}
          selectedCategory={selectedCategory}
          onNavigate={handleNavigate}
          onSearch={handleSearchTrigger}
        />

        {currentView !== 'admin' && posts.length > 0 && (
          <Marquee
            posts={posts}
            onArticleClick={(slug) => handleNavigate('article', null, slug)}
          />
        )}

        <main className="flex-grow">
          {currentView === 'home' && (
            <HomeView posts={posts} onNavigate={handleNavigate} />
          )}

          {currentView === 'category' && selectedCategory && (
            <CategoryView
              categorySlug={selectedCategory}
              posts={posts}
              categories={categories}
              onNavigate={handleNavigate}
            />
          )}

          {currentView === 'article' && articleSlug && (
            <ArticleView
              slug={articleSlug}
              posts={posts}
              onNavigate={handleNavigate}
              onSearch={handleSearchTrigger}
            />
          )}

          {currentView === 'about' && <AboutView />}

          {currentView === 'search' && (
            <SearchView
              initialQuery={searchQuery}
              posts={posts}
              onNavigate={handleNavigate}
              onSearchChange={setSearchQuery}
            />
          )}

          {currentView === 'admin' && (
            <AdminView
              posts={posts}
              categories={categories}
              settings={settings}
              onUpdatePosts={handleUpdatePosts}
              onUpsertPost={handleUpsertPost}
              onDeletePost={handleDeletePost}
              onUpdateCategories={handleUpdateCategories}
              onUpdateSettings={handleUpdateSettings}
              onNavigate={handleNavigate}
            />
          )}
        </main>
      </div>

      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
