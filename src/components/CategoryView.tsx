import React, { useState } from 'react';
import { Post, Category } from '../types';
import { formatRelativeTime } from '../data';
import { LayoutGrid, AlertCircle, ChevronLeft, ChevronRight, Calendar, Star } from 'lucide-react';

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
  // Match by slug OR by category name (handles both storage formats)
  const categoryPosts = [...posts]
    .filter((p) => {
      if (p.status !== 'Published') return false;
      const postCat = p.category.toLowerCase().trim();
      const slugLower = categorySlug.toLowerCase().trim();
      // Match against slug directly
      if (postCat === slugLower) return true;
      // Match against the category name (e.g. "Box Office Updates" vs "box-office-updates")
      const catName = currentCategory?.name?.toLowerCase().trim();
      if (catName && postCat === catName) return true;
      // Also match slug-ified version of the post category
      const postCatSlug = postCat.replace(/[^a-z0-9]+/g, '-');
      if (postCatSlug === slugLower) return true;
      return false;
    })
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

      {/* ── UPCOMING RELEASES: Special Table Layout ── */}
            {/* ── UPCOMING RELEASES: Table Layout ── */}
      {categorySlug === 'upcoming-releases' && (
        <div className="space-y-2">
          <p className="text-xs text-gray-500 font-sans pb-3 border-b border-[#2E2E2E]">
            A regularly updated schedule of current and upcoming film releases. Anticipation scores reflect audience interest.
          </p>
          <div className="hidden md:grid grid-cols-[160px_1fr_140px_100px] gap-4 px-4 py-3 text-[10px] uppercase tracking-[0.2em] text-[#C9A84C] font-sans font-bold border-b border-[#2E2E2E]">
            <span>Release Date</span>
            <span>Film</span>
            <span>Language / Type</span>
            <span className="text-right">Anticipation</span>
          </div>
          {[
            { date: '12 Jun 2026', title: 'Hum Angooron Ke Zamane Ke Jahar Hai', lang: '', score: 8 },
            { date: '12 Jun 2026', title: 'Scary Movie 6 (English)', lang: '', score: 51 },
            { date: '12 Jun 2026', title: 'Haunted 30: Echoes Of The Past', lang: '', score: 53 },
            { date: '12 Jun 2026', title: 'The Narmada Story', lang: '', score: 57 },
            { date: '12 Jun 2026', title: 'Main Vaapas Aaunga', lang: '', score: 100 },
            { date: '12 Jun 2026', title: 'Heer Sara', lang: '', score: 8 },
            { date: '12 Jun 2026', title: 'Bharat Bhikapa Vidhwansa', lang: '', score: 8 },
            { date: '19 Jun 2026', title: 'Top Story 9 (English)', lang: '', score: 100 },
            { date: '19 Jun 2026', title: 'Cocktail 2', lang: '', score: 86 },
            { date: '26 Jun 2026', title: 'Welcome To The Jungle', lang: '', score: 81 },
            { date: '26 Jun 2026', title: 'Naya Chakra', lang: '', score: 100 },
            { date: '3 Jul 2026',  title: 'Nagzabandham', lang: '', score: 8 },
            { date: '3 Jul 2026',  title: 'Saja Do Do Do', lang: '', score: 8 },
            { date: '3 Jul 2026',  title: 'Shiver (English)', lang: '', score: 8 },
            { date: '3 Jul 2026',  title: 'Alpha', lang: '', score: 43 },
            { date: '10 Jul 2026', title: 'Moane (English)', lang: '', score: 8 },
            { date: '10 Jul 2026', title: 'Evil Dead Burn (English)', lang: '', score: 100 },
            { date: '10 Jul 2026', title: 'Mahaparabhu Jagannath', lang: '', score: 8 },
            { date: '17 Jul 2026', title: 'Dhannad 4', lang: '', score: 77 },
            { date: '24 Jul 2026', title: 'The India Story', lang: '', score: 11 },
            { date: '24 Jul 2026', title: 'Uthe De Putter', lang: '', score: 8 },
            { date: '31 Jul 2026', title: 'Tere Yaar Hoon Main', lang: '', score: 8 },
            { date: '31 Jul 2026', title: 'Spider-Man: Brand New Day (English)', lang: '', score: 100 },
            { date: '13 Aug 2026', title: 'Behera', lang: '', score: 88 },
            { date: '14 Aug 2026', title: 'Bhedia 2', lang: '', score: 79 },
            { date: '14 Aug 2026', title: 'Awarapan 2', lang: '', score: 8 },
            { date: '15 Aug 2026', title: 'Mazhalabhumi', lang: '', score: 81 },
            { date: '21 Aug 2026', title: 'Insidious (English)', lang: '', score: 100 },
            { date: '21 Aug 2026', title: 'Blumhouse Insidious (English)', lang: '', score: 8 },
            { date: '21 Aug 2026', title: 'The Paradise', lang: '', score: 40 },
            { date: '28 Aug 2026', title: 'Paw Patrol 3: The Dino Movie (English)', lang: '', score: 100 },
            { date: '28 Aug 2026', title: 'Vivan', lang: '', score: 93 },
            { date: '28 Aug 2026', title: 'Khovia Ka Ghosta 2', lang: '', score: 8 },
            { date: '4 Sep 2026',  title: 'Mirzapur - The Movie', lang: '', score: 83 },
            { date: '4 Sep 2026',  title: 'How to Rob a Bank (English)', lang: '', score: 8 },
            { date: '11 Sep 2026', title: 'Gatto (English)', lang: '', score: 8 },
            { date: '11 Sep 2026', title: 'Udta Teen', lang: '', score: 8 },
            { date: '18 Sep 2026', title: 'Vibe', lang: '', score: 8 },
            { date: '18 Sep 2026', title: 'Resident Evil (English)', lang: '', score: 100 },
            { date: '6 Oct 2026',  title: 'Love Lottery', lang: '', score: 8 },
            { date: '6 Oct 2026',  title: "Don't Be Shy (Digital release only)", lang: '', score: 8 },
            { date: '6 Oct 2026',  title: 'Magical Wallet', lang: '', score: 100 },
            { date: '2 Oct 2026',  title: 'Varley (English)', lang: '', score: 8 },
            { date: '2 Oct 2026',  title: 'Drohyam 3', lang: '', score: 94 },
            { date: '2 Oct 2026',  title: 'Valinki Ramayana', lang: '', score: 100 },
            { date: '9 Oct 2026',  title: 'Legend of Aang: The Last Airbender (English)', lang: '', score: 8 },
            { date: '9 Oct 2026',  title: 'The Social Reckoning (English)', lang: '', score: 8 },
            { date: '9 Oct 2026',  title: 'Dongi - Gangsters Paradise', lang: '', score: 8 },
            { date: '16 Oct 2026', title: 'Streetfighter - The Movie (English)', lang: '', score: 100 },
            { date: '16 Oct 2026', title: 'Raffaar', lang: '', score: 8 },
            { date: '6 Nov 2026',  title: 'Lakadbaggha 2: The Monkey Business', lang: '', score: 8 },
            { date: '6 Nov 2026',  title: 'Archangel (English)', lang: '', score: 8 },
            { date: '8 Nov 2026',  title: 'Ramayana - Part 1', lang: '', score: 8 },
            { date: '20 Nov 2026', title: 'Ebenezer: A Christmas Carol (English)', lang: '', score: 8 },
            { date: '27 Nov 2026', title: 'Yeh Prem Moli Liya', lang: '', score: 8 },
            { date: '27 Nov 2026', title: 'Haxed (English)', lang: '', score: 8 },
            { date: '27 Nov 2026', title: 'Forbes - In - Law (English)', lang: '', score: 8 },
            { date: '3 Dec 2026',  title: 'Chandro Bai', lang: '', score: 8 },
            { date: '4 Dec 2026',  title: 'Ranger', lang: '', score: 100 },
            { date: '4 Dec 2026',  title: 'Chamunda', lang: '', score: 11 },
            { date: '4 Dec 2026',  title: 'Akshay Kumar and Ainers Basmere next', lang: '', score: 100 },
            { date: '18 Dec 2026', title: 'Avengers: Doomsday (English)', lang: '', score: 90 },
            { date: '24 Dec 2026', title: 'King', lang: '', score: 83 },
            { date: '24 Dec 2026', title: 'Shakti Shakti', lang: '', score: 40 },
            { date: '24 Dec 2026', title: 'Jumanji 3 (English)', lang: '', score: 100 },
            { date: '25 Dec 2026', title: 'Mahavatar', lang: '', score: 60 },
            { date: '31 Jan 2027', title: 'Chhatrapati Shivaji Maharaj', lang: '', score: 8 },
            { date: '31 Jan 2027', title: 'Love and War', lang: '', score: 66 },
            { date: '12 Feb 2027', title: 'Naagzilla', lang: '', score: 8 },
            { date: '14 Feb 2027', title: 'Hume De Tera', lang: '', score: 8 },
            { date: '5 Mar 2027',  title: "Salman Khan and Varmi Pardiyal's Next", lang: '', score: 8 },
            { date: '6 Mar 2027',  title: 'Spirit', lang: '', score: 8 },
            { date: '19 Mar 2027', title: 'Force 3', lang: '', score: 8 },
            { date: '7 Apr 2027',  title: 'Veranesi', lang: '', score: 100 },
            { date: '11 Jun 2027', title: 'Dragon', lang: '', score: 8 },
            { date: '13 Aug 2027', title: 'Stree 3', lang: '', score: 75 },
            { date: '13 Aug 2027', title: 'Captain India', lang: '', score: 8 },
            { date: '6 Oct 2027',  title: 'Ramayana - Part 8', lang: '', score: 8 },
            { date: '3 Dec 2027',  title: 'Mahavatar Parshuram', lang: '', score: 100 },
            { date: '3 Dec 2027',  title: 'Tumbbad 2', lang: '', score: 8 },
            { date: '24 Dec 2027', title: 'Maa Moriya', lang: '', score: 8 },
            { date: '11 Aug 2028', title: 'Pathia Mahayudh', lang: '', score: 8 },
            { date: '19 Oct 2029', title: 'Diovane Mahayudh', lang: '', score: 8 },
          ].map((film, idx) => {
            const scoreColor = film.score >= 80 ? 'bg-green-500' : film.score >= 50 ? 'bg-yellow-500' : 'bg-red-500';
            return (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-[160px_1fr_140px_100px] gap-3 md:gap-4 items-center px-4 py-4 border border-[#2E2E2E] bg-[#111111] rounded-sm">
                <div className="flex items-center gap-2 text-xs text-gray-400 font-sans">
                  <Calendar size={12} className="text-[#C9A84C] shrink-0" />
                  <span>{film.date}</span>
                </div>
                <h3 className="font-serif text-[#F5F5F0] text-base md:text-lg leading-snug">{film.title}</h3>
                <div className="text-xs text-gray-400 font-sans">
                  {film.lang && <span className="border border-[#2E2E2E] px-2 py-1 rounded-sm text-[10px] uppercase tracking-wider">{film.lang}</span>}
                </div>
                <div className="flex md:justify-end">
                  <span className={`${scoreColor} text-black font-bold text-sm px-3 py-1 rounded-sm font-sans min-w-[42px] text-center`}>{film.score}</span>
                </div>
              </div>
            );
            const releaseDate = new Date(post.publishedAt);
            const dateStr = releaseDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
            return (
              <div key={post.id} className="grid grid-cols-1 md:grid-cols-[160px_1fr_140px_100px] gap-3 md:gap-4 items-center px-4 py-4 border border-[#C9A84C]/20 bg-[#111111] rounded-sm">
                <div className="flex items-center gap-2 text-xs text-gray-400 font-sans">
                  <Calendar size={12} className="text-[#C9A84C] shrink-0" />
                  <span>{dateStr}</span>
                </div>
                <h3 className="font-serif text-[#F5F5F0] text-base md:text-lg leading-snug">{post.title}</h3>
                <div className="text-xs text-gray-400 font-sans">
                  {post.author && post.author !== '---' && (
                    <span className="border border-[#2E2E2E] px-2 py-1 rounded-sm text-[10px] uppercase tracking-wider">{post.author}</span>
                  )}
                </div>
                <div className="flex md:justify-end">
                  <Star size={10} className="text-[#C9A84C]/40" />
                </div>
              </div>
            );
          })}
          <p className="text-[10px] text-gray-600 font-sans text-center pt-6 uppercase tracking-wider">
            Anticipation scores are editorially assigned. Green = High · Yellow = Moderate · Red = Low
          </p>
        </div>
      )}


      {/* Articles Grid layout — hidden for upcoming-releases which has its own table */}
      {categorySlug !== 'upcoming-releases' && categoryPosts.length === 0 && (
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
      )}

      {categorySlug !== 'upcoming-releases' && categoryPosts.length > 0 && (
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
