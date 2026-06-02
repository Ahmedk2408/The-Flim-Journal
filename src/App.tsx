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

// Local storage and helpers loader
import { 
  getPosts, savePosts, 
  getCategories, saveCategories, 
  getSettings, saveSettings 
} from './data';
import { Post, Category, SiteSettings } from './types';

export default function App() {
  // Application parameters state (SPA simulated navigation)
  // Options: 'home' | 'category' | 'article' | 'about' | 'search' | 'admin'
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [articleSlug, setArticleSlug] = useState<string | null>(null);
  
  // Archival search state
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Primary publishing content streams
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [settings, setSettings] = useState<SiteSettings>({
    tagline: '',
    facebookLink: '',
    twitterLink: '',
    instagramLink: '',
    mailchimpEmbed: ''
  });

  // Load publication assets on mount
  useEffect(() => {
    setPosts(getPosts());
    setCategories(getCategories());
    setSettings(getSettings());
  }, []);

  // Update handlers with synchronizer
  const handleUpdatePosts = (newPosts: Post[]) => {
    setPosts(newPosts);
    savePosts(newPosts);
  };

  const handleUpdateCategories = (newCategories: Category[]) => {
    setCategories(newCategories);
    saveCategories(newCategories);
  };

  const handleUpdateSettings = (newSettings: SiteSettings) => {
    setSettings(newSettings);
    saveSettings(newSettings);
  };

  // Navigations dispatcher (Supports instant page triggers)
  const handleNavigate = (view: string, category: string | null = null, slug: string | null = null) => {
    setCurrentView(view);
    setSelectedCategory(category);
    setArticleSlug(slug);

    // Auto scroll view helper
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const handleSearchTrigger = (query: string) => {
    setSearchQuery(query);
    setCurrentView('search');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#1a1a1a] text-[#F5F5F0]">
      <div>
        {/* 1. Header component */}
        <Header 
          currentView={currentView}
          selectedCategory={selectedCategory}
          onNavigate={handleNavigate}
          onSearch={handleSearchTrigger}
        />

        {/* 2. Secondary Marquee Headlines Ticker (5 latest headlines sliding horizontally, hidden from admin dashboard scope) */}
        {currentView !== 'admin' && posts.length > 0 && (
          <Marquee 
            posts={posts} 
            onArticleClick={(slug) => handleNavigate('article', null, slug)} 
          />
        )}

        {/* 3. Main Workspace router matching the state view */}
        <main className="flex-grow">
          {currentView === 'home' && (
            <HomeView 
              posts={posts} 
              onNavigate={handleNavigate} 
            />
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

          {currentView === 'about' && (
            <AboutView />
          )}

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
              onUpdateCategories={handleUpdateCategories}
              onUpdateSettings={handleUpdateSettings}
              onNavigate={handleNavigate}
            />
          )}
        </main>
      </div>

      {/* 4. Editorial footer component */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
