import React, { useState } from 'react';
import { Logo } from './Logo';
import { Menu, X, Search } from 'lucide-react';

interface HeaderProps {
  currentView: string;
  selectedCategory: string | null;
  onNavigate: (view: string, category?: string | null, slug?: string | null) => void;
  onSearch: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  selectedCategory,
  onNavigate,
  onSearch
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchVal, setSearchVal] = useState('');

  const menuItems = [
    { name: 'Reviews', slug: 'reviews' },
    { name: 'News', slug: 'news' },
    { name: 'Features', slug: 'features' },
    { name: 'Interviews', slug: 'interviews' },
    { name: 'Box Office', slug: 'box-office' },
    { name: 'Streaming', slug: 'streaming' },
    { name: 'About', slug: 'about' }
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchVal.trim()) {
      onSearch(searchVal.trim());
      onNavigate('search');
      setIsSearchExpanded(false);
      setSearchVal('');
    }
  };

  const checkIsActive = (itemSlug: string) => {
    if (itemSlug === 'about' && currentView === 'about') return true;
    if (currentView === 'category' && selectedCategory === itemSlug) return true;
    return false;
  };

  return (
    <header 
      id="main-publish-header"
      className="sticky top-0 z-50 bg-[#1a1a1a] border-b border-[#2E2E2E] backdrop-blur-md bg-opacity-95"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo Lockup */}
          <div className="flex-shrink-0 flex items-center">
            {/* Desktop Brand Logo */}
            <button 
              onClick={() => onNavigate('home')} 
              className="hidden sm:block cursor-pointer focus:outline-none"
              aria-label="The Film Journal Home"
            >
              <Logo variant="full" size="md" />
            </button>
            
            {/* Mobile Brand Monogram Logo */}
            <button 
              onClick={() => onNavigate('home')} 
              className="sm:hidden block cursor-pointer focus:outline-none"
              aria-label="The Film Journal Home"
            >
              <Logo variant="monogram" size="sm" />
            </button>
          </div>

          {/* Navigation Items (Desktop) */}
          <nav className="hidden lg:flex space-x-8 items-center">
            {menuItems.map((item) => {
              const isActive = checkIsActive(item.slug);
              return (
                <button
                  key={item.slug}
                  onClick={() => {
                    if (item.slug === 'about') {
                      onNavigate('about');
                    } else {
                      onNavigate('category', item.slug);
                    }
                  }}
                  className={`text-xs uppercase font-sans tracking-widest font-semibold transition-colors duration-200 cursor-pointer border-b-2 py-1 ${
                    isActive
                      ? 'text-[#C9A84C] border-[#C9A84C]'
                      : 'text-[#F5F5F0]/70 border-transparent hover:text-[#C9A84C]'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </nav>

          {/* Search Trigger and Right-Aligned UI controls */}
          <div className="flex items-center space-x-4">
            {/* Search Input Box */}
            <form 
              onSubmit={handleSearchSubmit} 
              className={`flex items-center relative duration-300 ${isSearchExpanded ? 'w-48 md:w-64' : 'w-10'}`}
            >
              <input
                type="text"
                placeholder="Search articles..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                onBlur={() => !searchVal && setIsSearchExpanded(false)}
                className={`bg-[#111111] text-xs text-[#F5F5F0] placeholder-gray-500 border border-[#2E2E2E] focus:border-[#C9A84C] focus:outline-none rounded-sm px-3 py-2 pr-9 w-full duration-300 ${
                  isSearchExpanded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
                }`}
              />
              <button
                type="button"
                onClick={() => setIsSearchExpanded(!isSearchExpanded)}
                className="absolute right-0 top-1/2 -translate-y-1/2 p-2 hover:text-[#C9A84C] text-[#F5F5F0]/70 cursor-pointer focus:outline-none"
                aria-label="Search posts"
              >
                <Search size={16} />
              </button>
            </form>

            <button
               onClick={() => onNavigate('admin')}
               className="hidden sm:inline-block text-[10px] tracking-wider uppercase font-semibold text-[#C9A84C]/80 border border-[#C9A84C]/30 px-3 py-1.5 rounded-sm hover:text-black hover:bg-[#C9A84C] duration-200 transition-all"
            >
              Dashboard
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#F5F5F0]/80 hover:text-[#C9A84C] focus:outline-none rounded-md cursor-pointer"
              aria-label="Open navigation menu"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Backdrop & Drawer Navigation */}
      {isMobileMenuOpen && (
        <div 
          id="mobile-navigation-drawer"
          className="lg:hidden border-t border-[#2E2E2E] bg-[#111111] animate-slide-down duration-200"
        >
          <div className="px-4 pt-4 pb-6 space-y-3">
            {menuItems.map((item) => {
              const isActive = checkIsActive(item.slug);
              return (
                <button
                  key={item.slug}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    if (item.slug === 'about') {
                      onNavigate('about');
                    } else {
                      onNavigate('category', item.slug);
                    }
                  }}
                  className={`block w-full text-left text-xs uppercase font-sans tracking-widest font-bold py-2.5 px-3 rounded-sm border-l-2 ${
                    isActive
                      ? 'text-[#C9A84C] bg-black/40 border-[#C9A84C]'
                      : 'text-[#F5F5F0]/80 border-transparent hover:bg-black/20 hover:text-white'
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                onNavigate('admin');
              }}
              className="block w-full text-left text-xs uppercase font-sans font-extrabold tracking-widest py-3 px-3 rounded-sm text-black bg-[#C9A84C] mt-4"
            >
              CMS Dashboard
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
