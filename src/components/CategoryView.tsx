import React, { useState } from 'react';
import { Post, Category } from '../types';
import { formatRelativeTime } from '../data';
import { LayoutGrid, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

interface CategoryViewProps {
  categorySlug: string;
  posts: Post[];
  categories: Category[];
  onNavigate: (view: string, category?: string | null, slug?: string | null) => void;
}

export const CategoryView: React.FC<CategoryViewProps> = ({
  categorySlug,
  posts,
  categories,
  onNavigate
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Find category active details
  const currentCategory = categories.find(
    (c) => c.slug.toLowerCase() === categorySlug.toLowerCase()
  );

  // Filter post items mapped to this category (only Published posts)
  const categoryPosts = [...posts]
    .filter((p) => p.status === 'Published' && p.category.toLowerCase() === categorySlug.toLowerCase())
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  // Pagination bounds
  const totalPages = Math.ceil(categoryPosts.length / postsPerPage);
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = categoryPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleCardClick = (slug: string) => {
    onNavigate('article', null, slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const nameValue = currentCategory ? currentCategory.name : categorySlug;
  const descValue = currentCategory 
    ? currentCategory.description 
    : `Critical journalism, news alerts, and aesthetic essays concerning ${categorySlug}.`;

  return (
    <div id="category-page-root" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 space-y-12">
      
      {/* Editorial Category Header Banner */}
      <div 
        id="category-hero-banner"
        className="border-b border-[#2E2E2E] pb-8 space-y-3 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 opacity-10 font-serif text-8xl font-bold select-none text-gray-500 transform translate-x-12 -translate-y-8 pointer-events-none">
          {nameValue}
        </div>
        <span className="text-[#C9A84C] text-[10px] tracking-[0.25em] font-sans font-extrabold uppercase">
          JOURNAL DIVISION
        </span>
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-[#F5F5F0] font-normal tracking-tight">
          {nameValue}
        </h1>
        <p className="text-gray-400 font-serif italic text-sm md:text-md max-w-3xl leading-relaxed">
          {descValue}
        </p>
      </div>

      {/* Articles Grid layout */}
      {categoryPosts.length === 0 ? (
        <div className="text-center py-20 border border-dashed border-[#2E2E2E] p-8 rounded-sm space-y-4 max-w-xl mx-auto">
          <AlertCircle size={32} className="mx-auto text-[#C9A84C]/60" />
          <h3 className="font-serif text-lg text-gray-200">No Articles Catalogued Yet</h3>
          <p className="text-xs text-gray-400 font-sans leading-relaxed">
            There are currently no published articles found under the category "{nameValue}". You can compose and publish news critiques under this section inside the CMS Admin Dashboard.
          </p>
          <button 
            onClick={() => onNavigate('home')} 
            className="inline-block bg-[#2E2E2E] hover:bg-[#C9A84C] hover:text-black py-2 px-6 rounded-xs text-xs uppercase tracking-wider font-semibold duration-200 transition-all cursor-pointer"
          >
            Return to Homepage
          </button>
        </div>
      ) : (
        <div className="space-y-12">
          
          {/* Main Grid: 3 columns desktop, 2 tablet, 1 mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => handleCardClick(post.slug)}
                className="card-container bg-[#111111] border border-[#2E2E2E] hover:border-[#C9A84C]/35 rounded-xs p-4 flex flex-col justify-between group duration-300 cursor-pointer"
              >
                <div className="space-y-3">
                  {/* Thumbnail */}
                  <div className="aspect-[16/9.5] overflow-hidden bg-black/40 border border-[#2E2E2E]/80 rounded-sm relative">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="card-hover-image w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />
                  </div>
                  
                  {/* Info Row */}
                  <span className="text-[#C9A84C] text-[10px] tracking-[0.2em] font-sans font-bold uppercase block">
                    {post.category.toUpperCase()}
                  </span>
                  
                  {/* Headline */}
                  <h3 className="text-md md:text-lg font-serif text-[#F5F5F0] font-normal leading-snug group-hover:text-[#C9A84C] duration-250">
                    {post.title}
                  </h3>
                  
                  {/* Excerpt */}
                  <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed font-sans pr-1">
                    {post.excerpt}
                  </p>
                </div>

                {/* Writer Bylines */}
                <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono border-t border-[#2E2E2E]/30 pt-3.5 mt-5">
                  <span>
                    By <span className="text-gray-400 font-sans font-semibold">{post.author}</span>
                  </span>
                  <span>{formatRelativeTime(post.publishedAt)}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Simple Premium Style Pagination */}
          {totalPages > 1 && (
            <div id="category-pagination" className="flex items-center justify-between border-t border-[#2E2E2E] pt-6 select-none">
              <span className="text-xs text-gray-500 font-mono">
                Showing Page {currentPage} of {totalPages} &bull; {categoryPosts.length} Reviews Found
              </span>
              
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(p => Math.max(p - 1, 1))}
                  disabled={currentPage === 1}
                  className="p-2 border border-[#2E2E2E] text-gray-400 hover:text-[#C9A84C] hover:border-[#C9A84C] disabled:opacity-30 disabled:hover:text-gray-400 disabled:hover:border-[#2E2E2E] rounded-sm duration-200 cursor-pointer flex items-center justify-center"
                  aria-label="Previous Page"
                >
                  <ChevronLeft size={16} />
                </button>
                
                {Array.from({ length: totalPages }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentPage(idx + 1)}
                    className={`px-3 py-1 font-mono text-xs border rounded-sm duration-200 cursor-pointer ${
                      currentPage === idx + 1
                        ? 'bg-[#C9A84C] border-[#C9A84C] text-black font-bold'
                        : 'border-[#2E2E2E] text-gray-400 hover:border-[#C9A84C] hover:text-[#C9A84C]'
                    }`}
                  >
                    {idx + 1}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(p => Math.min(p + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className="p-2 border border-[#2E2E2E] text-gray-400 hover:text-[#C9A84C] hover:border-[#C9A84C] disabled:opacity-30 disabled:hover:text-gray-400 disabled:hover:border-[#2E2E2E] rounded-sm duration-200 cursor-pointer flex items-center justify-center"
                  aria-label="Next Page"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
};
