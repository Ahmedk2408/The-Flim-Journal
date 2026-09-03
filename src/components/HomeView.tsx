import React from 'react';
import { Post } from '../types';
import { formatRelativeTime } from '../data';
import { Calendar, Clock, Play, Mail, CheckCircle, ChevronRight } from 'lucide-react';

interface HomeViewProps {
  posts: Post[];
  onNavigate: (view: string, category?: string | null, slug?: string | null) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({ posts, onNavigate }) => {
  // Get all active published posts
  const published = [...posts].filter((p) => p.status === 'Published');

  // Sort by published date descending
  const sortedPosts = [...published].sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  // Identify Featured HERO post
  const heroPost = sortedPosts.find(p => p.isFeatured) || sortedPosts[0];

  // Next 3 "Top Stories" (excluding Hero post)
  const topStories = sortedPosts
    .filter(p => p.id !== heroPost?.id)
    .slice(0, 3);

  // Remaining articles for the Latest News Feed
  const excludedIds = new Set([heroPost?.id, ...topStories.map(p => p.id)]);
  const latestFeed = sortedPosts.filter(p => !excludedIds.has(p.id));

  // Trending Now items (Numbered 1-5, fallback if not enough articles)
  const trendingPosts = [...sortedPosts].slice(0, 5);

  const [newsletterEmail, setNewsletterEmail] = React.useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = React.useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  const handleCardClick = (slug: string) => {
    onNavigate('article', null, slug);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="homepage-root" className="space-y-12">

      {/* 1. CINEMATIC HERO SECTION */}
      {heroPost && (
        <section
          id="cinematic-hero-section"
          className="w-full border-b border-[#2E2E2E] group"
        >
          {/* TOP — Full width image, no text on top of it */}
          <div className="relative w-full h-[52vw] max-h-[540px] min-h-[220px] overflow-hidden">
            <img
              src={heroPost.image}
              alt={heroPost.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-out scale-100 group-hover:scale-[1.02]"
            />
            {/* Subtle bottom fade so image blends into text section */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent" />
          </div>

          {/* BOTTOM — Clean text section, fully readable, no overlap */}
          <div className="bg-[#111111] w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-7 md:py-10">
              <div className="max-w-3xl space-y-4">

                <span className="inline-block text-[#C9A84C] text-[10px] md:text-xs tracking-[0.2em] font-sans font-extrabold uppercase border border-[#C9A84C]/40 px-3 py-1 rounded-sm">
                  FEATURED {heroPost.category.toUpperCase()}
                </span>

                <button
                  onClick={() => handleCardClick(heroPost.slug)}
                  className="block text-left focus:outline-none cursor-pointer"
                >
                  <h2 className="text-2xl sm:text-3xl md:text-5xl font-serif text-[#F5F5F0] font-normal leading-tight md:leading-[1.15] tracking-tight hover:text-[#C9A84C] transition-colors duration-300">
                    {heroPost.title}
                  </h2>
                </button>

                <p className="text-gray-400 font-sans text-sm md:text-base leading-relaxed line-clamp-2 md:line-clamp-3 font-normal">
                  {heroPost.excerpt}
                </p>

                {/* Author & Reading Stats */}
                <div className="flex flex-wrap items-center gap-x-4 gap-y-2 pt-1 text-xs text-gray-500 font-sans">
                  <span className="font-semibold text-gray-300">
                    By <span className="text-[#F5F5F0]">{heroPost.author}</span>
                  </span>
                  <span className="text-gray-600">|</span>
                  <span className="flex items-center gap-1">
                    <Clock size={12} className="text-[#C9A84C]" />
                    {heroPost.readTime}
                  </span>
                  <span className="text-gray-600">&bull;</span>
                  <span>{formatRelativeTime(heroPost.publishedAt)}</span>
                </div>

                {/* Read More button */}
                <div className="pt-2">
                  <button
                    onClick={() => handleCardClick(heroPost.slug)}
                    className="bg-[#C9A84C] hover:bg-black hover:text-[#C9A84C] border border-transparent hover:border-[#C9A84C] text-black font-sans font-bold text-xs uppercase tracking-widest px-6 py-3.5 transition-all duration-300 rounded-sm cursor-pointer shadow-lg shadow-black/30"
                  >
                    Read Continuous Critique
                  </button>
                </div>

              </div>
            </div>
          </div>
        </section>
      )}

      {/* 2. TOP STORIES GRID (3 columns) */}
      {topStories.length > 0 && (
        <section id="top-stories-grid" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="border-b border-[#2E2E2E] pb-3 mb-8 flex items-center justify-between">
            <h3 className="font-serif text-xl text-[#F5F5F0] font-normal tracking-wide">
              Top Stories <span className="text-[#C9A84C] italic text-sm font-medium ml-1">Now Reading</span>
            </h3>
            <span className="text-xs uppercase font-sans tracking-widest text-[#C9A84C] font-semibold">
              Crucial Screenplay Analyses
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {topStories.map((post) => (
              <div
                key={post.id}
                onClick={() => handleCardClick(post.slug)}
                className="card-container flex flex-col group cursor-pointer"
              >
                {/* Image Wrap */}
                <div className="aspect-[16/9.5] overflow-hidden bg-[#111111] border border-[#2E2E2E] rounded-sm relative">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="card-hover-image w-full h-full object-cover"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-60" />
                </div>

                {/* Meta details */}
                <div className="pt-4 space-y-2 flex-grow flex flex-col justify-between">
                  <div>
                    <span className="text-[#C9A84C] text-[10px] tracking-[0.2em] font-sans font-bold uppercase block mb-1">
                      {post.category.toUpperCase()}
                    </span>
                    <h4 className="text-lg font-serif text-[#F5F5F0] font-normal leading-snug group-hover:text-[#C9A84C] transition-colors duration-250">
                      {post.title}
                    </h4>
                    <p className="text-xs text-gray-400 mt-2 font-sans line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 flex items-center justify-between text-[11px] text-gray-500 font-sans border-t border-[#2E2E2E]/30 mt-3">
                    <span className="font-medium">
                      By <span className="text-gray-400">{post.author}</span>
                    </span>
                    <span>{formatRelativeTime(post.publishedAt)}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 3. LATEST NEWS & SIDEBAR SPLIT (2 columns) */}
      <section id="editorial-feed" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* LEFT SIDE: Latest Articles (Wide, 2 cols of space) */}
          <div className="lg:col-span-2 space-y-8">
            <div className="border-b border-[#2E2E2E] pb-3 mb-6">
              <h3 className="font-serif text-lg text-[#F5F5F0] font-normal tracking-wide">
                Latest News & Critical Analysis
              </h3>
            </div>

            {latestFeed.length === 0 ? (
              <div className="text-center py-12 border border-dashed border-[#2E2E2E] text-gray-500 rounded-sm font-serif italic">
                No secondary news articles published currently. Add them in the Admin Panel dashboard.
              </div>
            ) : (
              <div className="space-y-6">
                {latestFeed.map((post) => (
                  <div
                    key={post.id}
                    onClick={() => handleCardClick(post.slug)}
                    className="card-container flex flex-col sm:flex-row items-start gap-4 p-4 hover:bg-[#111111]/60 border border-transparent hover:border-[#2E2E2E] rounded-xs duration-300 cursor-pointer"
                  >
                    {/* Thumbnail Image */}
                    <div className="w-full sm:w-[190px] aspect-[16/10] overflow-hidden bg-[#111111] border border-[#2E2E2E]/60 rounded-xs flex-shrink-0">
                      <img
                        src={post.image}
                        alt={post.title}
                        className="card-hover-image w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>

                    {/* Meta Body */}
                    <div className="flex-1 space-y-1.5 self-center">
                      <span className="text-[#C9A84C] text-[9px] tracking-[0.2em] font-sans font-bold uppercase">
                        {post.category.toUpperCase()}
                      </span>
                      <h4 className="text-md sm:text-lg font-serif text-[#F5F5F0] font-normal leading-snug group-hover:text-[#C9A84C] transition-colors duration-250">
                        {post.title}
                      </h4>
                      <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed">
                        {post.excerpt}
                      </p>

                      <div className="flex items-center gap-3 pt-1.5 text-[10px] text-gray-500 font-mono">
                        <span>By {post.author}</span>
                        <span>&bull;</span>
                        <span>{formatRelativeTime(post.publishedAt)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR: Content Widgets (Narrow, 1 col) */}
          <div className="space-y-10 lg:pl-4">

            {/* WIDGET 1: Trending List */}
            <div id="sidebar-trending-widget" className="bg-[#111111] border border-[#2E2E2E] p-6 rounded-sm space-y-4">
              <h4 className="text-[#C9A84C] text-xs font-sans font-bold uppercase tracking-widest pb-3 border-b border-[#2E2E2E]">
                Trending Discussions
              </h4>
              <ol className="divide-y divide-[#2E2E2E]/40">
                {trendingPosts.map((post, idx) => (
                  <li key={post.id} className="py-3 flex items-start gap-4 group cursor-pointer" onClick={() => handleCardClick(post.slug)}>
                    <span className="font-serif italic text-2xl text-gray-600 group-hover:text-[#C9A84C] duration-200 select-none">
                      {idx + 1}
                    </span>
                    <div className="space-y-1">
                      <span className="text-[9px] text-[#C9A84C] font-sans font-extrabold uppercase tracking-widest block">
                        {post.category}
                      </span>
                      <h5 className="text-[13px] font-serif text-gray-200 group-hover:text-[#C9A840] duration-200 font-normal leading-snug">
                        {post.title}
                      </h5>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            {/* WIDGET 2: Must Watch Video Embed Placeholder */}
            {/*<div id="sidebar-trailer-widget" className="bg-[#111111] border border-[#2E2E2E] p-6 rounded-sm space-y-4">*/}
              {/*<div className="flex items-center justify-between pb-3 border-b border-[#2E2E2E]">
                <h4 className="text-[#C9A84C] text-xs font-sans font-bold uppercase tracking-widest">
                  Must Watch Preview
                </h4>
                <span className="text-[10px] text-gray-500 font-mono">Cannes Critics Cut</span>
              </div>*/}

              {/* Theater View Box */}
              {/*<div className="relative aspect-[16/9.5] overflow-hidden bg-black border border-[#2E2E2E] rounded-xs group flex items-center justify-center">
                <img
                  src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop"
                  alt="Trailers Screen"
                  className="w-full h-full object-cover opacity-60 transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 duration-300" />
                <button
                  className="absolute p-3 rounded-full bg-[#C9A84C] text-black hover:scale-110 active:scale-95 duration-200 cursor-pointer shadow-lg shadow-black/80 flex items-center justify-center"
                  aria-label="Play Trailer Frame"
                  onClick={() => alert("Playing Official Festival Trailer: Sophia Al-Kindi's 'Silence of the Fog' (Aesthetics Premiere)")}
                >
                  <Play size={18} fill="black" />
                </button>
              </div>
              <p className="text-xs font-serif italic text-gray-400 leading-relaxed text-center mt-2 pr-1">
                Sophia Al-Kindi's official festival trailer for "Silence of the Fog" (2025 Grand Jury Selection).
              </p>
            </div>*/}

            {/* WIDGET 3: Premium Editorial Newsletter */}
            <div id="sidebar-newsletter-widget" className="bg-[#111111] border-2 border-[#C9A84C]/25 p-6 rounded-sm relative overflow-hidden">
              <div className="absolute -right-8 -bottom-8 opacity-5 text-gray-300 select-none">
                <Mail size={120} />
              </div>

              <div className="space-y-4 relative z-10">
                <span className="inline-block text-[#C9A84C] text-[9px] font-sans font-extrabold uppercase tracking-widest border border-[#C9A84C]/30 px-2 py-0.5 rounded-xs">
                  The Letterbox Select
                </span>
                <h4 className="text-base font-serif text-[#F5F5F0] font-normal leading-snug">
                  The Weekly Chronicle of Serious Cinema
                </h4>
                <p className="text-xs text-gray-400 leading-relaxed font-sans">
                  Join 40,000+ cinematic scholars receiving exclusive film essays, industry updates, and critical guides directly in their inboxes.
                </p>

                {newsletterSubscribed ? (
                  <div className="p-4 bg-[#C9A84C]/10 border border-[#C9A84C]/30 text-xs rounded-sm space-y-1.5 duration-300">
                    <div className="flex items-center gap-1.5 text-[#C9A84C] font-semibold">
                      <CheckCircle size={14} />
                      Subscription Confirmed
                    </div>
                    <p className="text-gray-400">Welcome to the Journal circle. Our next dispatch arrives Friday morning.</p>
                  </div>
                ) : (
                  <form onSubmit={handleNewsletterSubmit} className="space-y-2 mt-4">
                    <input
                      type="email"
                      placeholder="Enter your email address"
                      value={newsletterEmail}
                      onChange={(e) => setNewsletterEmail(e.target.value)}
                      required
                      className="w-full bg-black/40 border border-[#2E2E2E] px-3 py-2.5 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#C9A84C] duration-200 rounded-sm"
                    />
                    <button
                      type="submit"
                      className="w-full bg-[#C9A84C] hover:bg-[#B3933B] text-black font-semibold text-xs uppercase tracking-wider py-2.5 duration-200 transition-colors cursor-pointer rounded-sm"
                    >
                      Subscribe
                    </button>
                    <p className="text-[10px] text-gray-500 font-mono text-center">No algorithms. No filler. Standard Privacy rules.</p>
                  </form>
                )}
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* 4. CATEGORY SPOTLIGHTS & SPOTLIGHT DRAWER (Reviews, Features, Interviews) */}
      <section id="category-spotlights" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#2E2E2E] pt-12">
        <div className="space-y-12">

          {['Reviews', 'Features', 'Interviews'].map((catName) => {
            const catArticles = published
              .filter(p => p.category === catName)
              .slice(0, 3);

            if (catArticles.length === 0) return null;

            return (
              <div key={catName} className="space-y-6">
                <div className="flex items-center justify-between border-b border-[#2E2E2E]/60 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="w-1.5 h-1.5 bg-[#C9A84C] rounded-full" />
                    <h4 className="font-serif text-lg text-[#F5F5F0] font-normal tracking-wide">
                      Spotlight: {catName}
                    </h4>
                  </div>
                  <button
                    onClick={() => {
                      onNavigate('category', catName.toLowerCase());
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className="flex items-center gap-1 text-[#C9A84C] hover:text-[#B3933B] text-xs font-semibold uppercase tracking-wider cursor-pointer duration-150 transition-colors"
                  >
                    <span>See All {catName}</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                {/* Grid for Spotlight cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {catArticles.map((post) => (
                    <div
                      key={post.id}
                      onClick={() => handleCardClick(post.slug)}
                      className="card-container bg-[#111111] border border-[#2E2E2E] hover:border-[#C9A84C]/40 p-4 rounded-xs duration-300 cursor-pointer flex flex-col justify-between group"
                    >
                      <div className="space-y-3">
                        {/* Aspect block for image */}
                        <div className="aspect-[16/9.5] overflow-hidden bg-black/30 border border-[#2E2E2E]/40 rounded-sm relative">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="card-hover-image w-full h-full object-cover"
                            loading="lazy"
                          />
                        </div>
                        <span className="text-[#C9A84C] text-[9px] tracking-[0.2em] font-sans font-bold uppercase block">
                          {post.category.toUpperCase()}
                        </span>
                        <h5 className="text-md font-serif text-[#F5F5F0] font-normal leading-snug group-hover:text-[#C9A84C] duration-250">
                          {post.title}
                        </h5>
                        <p className="text-xs text-gray-400 line-clamp-2 leading-relaxed font-sans">
                          {post.excerpt}
                        </p>
                      </div>

                      <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono border-t border-[#2E2E2E]/30 pt-3 mt-4">
                        <span>By {post.author}</span>
                        <span>{formatRelativeTime(post.publishedAt)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}

        </div>
      </section>

    </div>
  );
};
