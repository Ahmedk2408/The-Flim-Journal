import React, { useState, useEffect } from 'react';
import { Post } from '../types';
import { formatRelativeTime } from '../data';
import { Search, Film, Calendar, ArrowRight, BookOpen } from 'lucide-react';

interface SearchViewProps {
  initialQuery?: string;
  posts: Post[];
  onNavigate: (view: string, category?: string | null, slug?: string | null) => void;
  onSearchChange?: (query: string) => void;
}

export const SearchView: React.FC<SearchViewProps> = ({
  initialQuery = '',
  posts,
  onNavigate,
  onSearchChange
}) => {
  const [query, setQuery] = useState(initialQuery);

  useEffect(() => {
    setQuery(initialQuery);
  }, [initialQuery]);

  const handleSearchChangeLocal = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setQuery(val);
    if (onSearchChange) {
      onSearchChange(val);
    }
  };

  const handleCardClick = (slug: string) => {
    onNavigate('article', null, slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Perform a case-insensitive, keyword-based search over multiple fields
  const filteredPosts = posts.filter((post) => {
    if (post.status !== 'Published') return false;
    if (!query.trim()) return true;

    const term = query.toLowerCase();
    const titleMatch = post.title.toLowerCase().includes(term);
    const bodyMatch = post.body.toLowerCase().includes(term);
    const summaryMatch = post.excerpt.toLowerCase().includes(term);
    const categoryMatch = post.category.toLowerCase().includes(term);
    const authorMatch = post.author.toLowerCase().includes(term);
    
    const tagsMatch = post.tags && post.tags.some(t => 
      t.toLowerCase().includes(term)
    );

    return titleMatch || bodyMatch || summaryMatch || categoryMatch || authorMatch || tagsMatch;
  });

  return (
    <div id="search-page-root" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12">
      
      {/* Search Header Banner */}
      <div className="border-b border-[#2E2E2E] pb-8 space-y-4">
        <span className="text-[#C9A84C] text-[10px] tracking-[0.2em] font-sans font-extrabold uppercase">
          ARCHIVES SEARCH ENGINE
        </span>
        <h1 className="text-3xl md:text-5xl font-serif text-[#F5F5F0]">
          Search the Journal Archives
        </h1>
        <p className="text-xs text-gray-500 font-mono">
          Querying complete textual records of reviews, news articles, interviews, and deep critiques.
        </p>

        {/* Dynamic Search Box Widget */}
        <div id="search-input-field-wrap" className="relative max-w-2xl pt-2">
          <input
            type="text"
            placeholder="Search critiques by director, keyword, category, or country..."
            value={query}
            onChange={handleSearchChangeLocal}
            className="w-full bg-[#111111] pr-12 pl-5 py-4 text-sm md:text-base text-[#F5F5F0] placeholder-gray-500 border border-[#2E2E2E] focus:border-[#C9A84C] focus:outline-none rounded-sm duration-300 shadow-md focus:shadow-black/60 relative z-10"
          />
          <Search size={20} className="absolute right-4 top-[60%] -translate-y-1/2 text-gray-400 z-20 pointer-events-none" />
        </div>
      </div>

      {/* Query Results statistics and Grid content */}
      <div>
        <div className="flex items-center justify-between pb-3 border-b border-[#2E2E2E]/60 mb-8">
          <span className="text-xs text-gray-400 font-mono uppercase tracking-wider">
            {query.trim() 
              ? `Found ${filteredPosts.length} matches for "${query}"`
              : `Browsing all catalogued issues (${filteredPosts.length} articles total)`
            }
          </span>
          <span className="text-[10px] uppercase font-mono text-[#C9A84C] tracking-wide">
            Independent Critique index
          </span>
        </div>

        {filteredPosts.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-[#2E2E2E] max-w-md mx-auto rounded-sm space-y-4">
            <Film size={34} className="mx-auto text-gray-600" />
            <h4 className="font-serif text-lg text-gray-300">No Editorial Matches Found</h4>
            <p className="text-xs text-gray-500 font-sans leading-relaxed">
              We did not find any reviews, records, or interviews containing "{query}". Try checking search spelling or query broad parameters (e.g. "Cannes", "Sophia", "Reviews").
            </p>
            <button
              onClick={() => { setQuery(''); if (onSearchChange) onSearchChange(''); }}
              className="px-5 py-2 hover:bg-[#C9A84C] border border-[#2E2E2E] hover:border-transparent text-xs hover:text-black uppercase tracking-wider font-semibold hover:font-bold rounded-sm duration-200 cursor-pointer"
            >
              Reset Archive Query
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => handleCardClick(post.slug)}
                className="card-container bg-[#111111] border border-[#2E2E2E] hover:border-[#C9A84C]/35 rounded-xs p-4 flex flex-col justify-between group duration-300 cursor-pointer"
              >
                <div className="space-y-3">
                  {/* Thumbnail Image component */}
                  <div className="aspect-[16/9.5] overflow-hidden bg-black/40 border border-[#2E2E2E]/80 rounded-sm relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="card-hover-image w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  </div>

                  <span className="text-[#C9A84C] text-[10px] tracking-[0.2em] font-sans font-bold uppercase block">
                    {post.category.toUpperCase()}
                  </span>

                  <h3 className="text-md md:text-lg font-serif text-[#F5F5F0] font-normal leading-snug group-hover:text-[#C9A84C] duration-250">
                    {post.title}
                  </h3>

                  <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed font-sans pr-1">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono border-t border-[#2E2E2E]/30 pt-3.5 mt-5">
                  <span>
                    By <span className="text-gray-400 font-sans font-semibold">{post.author}</span>
                  </span>
                  <span>{formatRelativeTime(post.publishedAt)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
