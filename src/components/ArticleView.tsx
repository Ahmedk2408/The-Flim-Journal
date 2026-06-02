import React, { useState } from 'react';
import { Post } from '../types';
import { formatRelativeTime } from '../data';
import { Clock, Share2, Facebook, Twitter, Link, Check, Heart, MessageSquare, ChevronRight, User } from 'lucide-react';

interface ArticleViewProps {
  slug: string;
  posts: Post[];
  onNavigate: (view: string, category?: string | null, slug?: string | null) => void;
  onSearch: (query: string) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  slug,
  posts,
  onNavigate,
  onSearch
}) => {
  const [copiedLink, setCopiedLink] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(Math.floor(Math.random() * 80) + 24);

  // Find the requested post
  const currentPost = posts.find((p) => p.slug === slug);

  if (!currentPost) {
    return (
      <div className="max-w-md mx-auto py-24 px-4 text-center space-y-6">
        <h2 className="font-serif text-2xl text-red-400">Article Not Found</h2>
        <p className="text-gray-400 text-sm">
          The requested film review or journal entry has been unrecorded, deleted, or marked as a draft.
        </p>
        <button
          onClick={() => onNavigate('home')}
          className="bg-[#C9A84C] text-black font-sans uppercase text-xs tracking-widest font-bold px-6 py-3 rounded-xs cursor-pointer"
        >
          Return to Homepage
        </button>
      </div>
    );
  }

  // Get 3 related articles (exclude current, prefer same category first)
  const relatedPosts = [...posts]
    .filter((p) => p.id !== currentPost.id && p.status === 'Published')
    .sort((a, b) => {
      // Prioritize same category match
      const aSameCat = a.category === currentPost.category ? 1 : 0;
      const bSameCat = b.category === currentPost.category ? 1 : 0;
      if (aSameCat !== bSameCat) return bSameCat - aSameCat;
      // Secondary sort by date
      return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
    })
    .slice(0, 3);

  const copyUrlToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleAuthorClick = (authorName: string) => {
    onSearch(authorName);
    onNavigate('search');
  };

  const handleLikeClick = () => {
    if (liked) {
      setLikesCount(p => p - 1);
    } else {
      setLikesCount(p => p + 1);
    }
    setLiked(!liked);
  };

  return (
    <article id="article-view-root" className="relative space-y-12">
      
      {/* 1. ARTICLE FULL-WIDTH HERO HEADER BANNER */}
      <section 
        id="article-editorial-header"
        className="relative h-[55vh] md:h-[65vh] min-h-[400px] w-full flex items-end overflow-hidden border-b border-[#2E2E2E]"
      >
        <div className="absolute inset-0 z-0">
          <img 
            src={currentPost.image} 
            alt={currentPost.title}
            className="w-full h-full object-cover"
          />
          {/* Bottom vignette overlay to maintain premium text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#1a1a1a] via-[#1a1a1a]/40 to-black/45 z-10" />
        </div>

        {/* Text Positioning overlay */}
        <div className="relative z-20 max-w-4xl mx-auto px-4 md:px-6 pb-8 md:pb-12 text-center md:text-left w-full">
          <div className="space-y-4 max-w-3xl">
            
            {/* Upper category tag in uppercase letter-spaced gold */}
            <span className="inline-block text-[#C9A84C] text-[10px] md:text-xs tracking-[0.25em] font-sans font-extrabold uppercase bg-black/70 border border-[#2E2E2E] px-3.5 py-1 rounded-sm">
              {currentPost.category.toUpperCase()}
            </span>

            <h1 className="text-3xl md:text-5xl font-serif text-[#F5F5F0] font-normal leading-tight md:leading-[1.12] tracking-tight">
              {currentPost.title}
            </h1>

            {/* Sub description / Excerpt overlay */}
            <p className="text-gray-300 font-serif italic text-sm md:text-md leading-relaxed line-clamp-2 md:line-clamp-3 opacity-90">
              {currentPost.excerpt}
            </p>

            {/* Author details metadata link row */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-x-4 gap-y-2 pt-2 text-xs text-gray-400 font-sans border-t border-[#2E2E2E]/40 mt-4">
              <button 
                onClick={() => handleAuthorClick(currentPost.author)}
                className="font-bold text-gray-300 hover:text-[#C9A84C] duration-150 transition-colors uppercase gap-1 flex items-center cursor-pointer"
              >
                <span>By <span className="text-white underline decoration-gray-600 underline-offset-4 font-semibold">{currentPost.author}</span></span>
              </button>
              <span className="text-gray-600">|</span>
              <span className="flex items-center gap-1">
                <Clock size={12} className="text-[#C9A84C]" />
                {currentPost.readTime}
              </span>
              <span className="text-gray-600">&bull;</span>
              <span>{formatRelativeTime(currentPost.publishedAt)}</span>
            </div>

          </div>
        </div>
      </section>

      {/* 2. BODY CONTENT AREA & FLOATING SIDEBAR */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* DESKTOP FIXED LEFT SHARE BAR (Columns 1) */}
        <div className="hidden lg:block lg:col-span-1 relative">
          <div className="sticky top-28 space-y-6 flex flex-col items-center">
            
            <div className="text-center space-y-1">
              <span className="text-gray-500 font-mono text-[10px] uppercase tracking-widest block">Share Critique</span>
              <div className="w-8 h-[1px] bg-[#2E2E2E] mx-auto" />
            </div>

            <div className="flex flex-col space-y-3">
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(currentPost.title)}`}
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-[#111111] border border-[#2E2E2E] hover:border-[#C9A84C] text-[#F5F5F0]/70 hover:text-[#C9A84C] rounded-sm duration-200 group flex items-center justify-center"
                title="Post to Twitter / X"
              >
                <Twitter size={15} />
              </a>

              <a
                href={`https://facebook.com/sharer/sharer.php`}
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-[#111111] border border-[#2E2E2E] hover:border-[#C9A84C] text-[#F5F5F0]/70 hover:text-[#C9A84C] rounded-sm duration-200 group flex items-center justify-center"
                title="Share on Facebook"
              >
                <Facebook size={15} />
              </a>

              <button
                onClick={copyUrlToClipboard}
                className="p-3 bg-[#111111] border border-[#2E2E2E] hover:border-[#C9A84C] text-[#F5F5F0]/70 hover:text-[#C9A84C] rounded-sm duration-200 flex items-center justify-center relative group cursor-pointer"
                title="Copy Link URL"
              >
                {copiedLink ? <Check size={15} className="text-green-400" /> : <Link size={15} />}
              </button>
            </div>

            {/* Small premium interactions spacer */}
            <div className="w-full bg-[#111111] border border-[#2E2E2E] p-4 text-center rounded-sm space-y-3 mt-4">
              <div className="space-y-1">
                <span className="text-gray-500 font-mono text-[9px] uppercase tracking-wider block">Scholarly Rating</span>
                <span className="text-xs text-gray-300 font-bold">{likesCount} Endorsements</span>
              </div>
              <button
                onClick={handleLikeClick}
                className={`w-full py-1.5 px-2 rounded-xs text-[10px] uppercase tracking-wider font-extrabold flex items-center justify-center gap-1 duration-200 cursor-pointer ${
                  liked 
                    ? 'bg-[#C9A84C] text-black' 
                    : 'bg-black border border-[#2E2E2E] hover:border-[#C9A84C] text-[#C9A84C]'
                }`}
              >
                <Heart size={10} fill={liked ? "black" : "none"} />
                {liked ? "Endorsed!" : "Endorse"}
              </button>
            </div>

          </div>
        </div>

        {/* ARTICLE TEXT BODY COLUMN (Columns 2-3 spanning 3 widths) */}
        <div className="lg:col-span-3 space-y-10 pl-0 lg:pl-4">
          
          {/* RICH DIRECT HTML CONTENT BLOCK CONTAINER */}
          <div 
            id="article-essay-canvas"
            className="article-rich-content max-w-[720px] mx-auto text-[#E2E2D5] font-body text-[17px] md:text-[18px] leading-[1.85]"
            dangerouslySetInnerHTML={{ __html: currentPost.body }}
          />

          {/* Core Tags list block */}
          {currentPost.tags && currentPost.tags.length > 0 && (
            <div className="max-w-[720px] mx-auto flex flex-wrap gap-2 pt-6 border-t border-[#2E2E2E]">
              {currentPost.tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => { onSearch(tag); onNavigate('search'); }}
                  className="bg-[#111111] hover:bg-[#C9A84C] hover:text-black border border-[#2E2E2E] text-gray-400 text-[10px] tracking-wider uppercase px-3 py-1.5 duration-200 transition-all cursor-pointer rounded-xs"
                >
                  #{tag}
                </button>
              ))}
            </div>
          )}

          {/* 3. WRITER BIO AND PORTRAIT FRAME */}
          <div 
            id="author-biography-box"
            className="max-w-[720px] mx-auto bg-[#111111] border-l-4 border-[#C9A84C] p-6 rounded-r-sm flex flex-col sm:flex-row gap-5 items-center sm:items-start text-center sm:text-left mt-12"
          >
            {/* Round Avatar Container */}
            <div className="w-16 h-16 rounded-full overflow-hidden bg-[#1a1a1a] border border-[#2E2E2E] flex-shrink-0 flex items-center justify-center">
              {currentPost.authorAvatar ? (
                <img 
                  src={currentPost.authorAvatar} 
                  alt={currentPost.author} 
                  className="w-full h-full object-cover"
                />
              ) : (
                <User size={30} className="text-[#C9A84C]" />
              )}
            </div>

            {/* Authors Narrative contents */}
            <div className="space-y-2 flex-grow">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between justify-center gap-1.5">
                <h4 className="font-serif text-md text-[#F5F5F0] font-bold">
                  {currentPost.author}
                </h4>
                <button
                  onClick={() => handleAuthorClick(currentPost.author)}
                  className="text-xs uppercase font-mono tracking-wider font-semibold text-[#C9A84C] hover:underline cursor-pointer"
                >
                  View All Critiques &bull; {posts.filter(p => p.author === currentPost.author && p.status === 'Published').length} Posts
                </button>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed max-w-xl">
                {currentPost.authorBio || `${currentPost.author} is a senior contributor writer for The Film Journal, offering insightful and exhaustive cinematic theory essays concerning classical restorations and digital auteur aesthetics.`}
              </p>
            </div>
          </div>

        </div>

      </section>

      {/* MOBILE SHARE & STATS BAR (Sticky to bottom on phone) */}
      <section 
        id="mobile-sticky-share-bar"
        className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-black/95 backdrop-blur-md border-t border-[#2E2E2E] py-3.5 px-6 flex items-center justify-between text-xs duration-300"
      >
        <span className="font-serif text-gray-300">
          Critique by <span className="text-[#C9A84C] font-semibold">{currentPost.author}</span>
        </span>

        <div className="flex items-center space-x-3 text-gray-400">
          <button 
            onClick={handleLikeClick}
            className={`p-1.5 flex items-center gap-1.5 rounded-sm ${liked ? 'text-[#C9A84C]' : 'text-gray-400'}`}
          >
            <Heart size={14} fill={liked ? "#C9A84C" : "none"} />
            <span>{likesCount}</span>
          </button>

          <a
            href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(currentPost.title)}`}
            target="_blank"
            className="p-1.5"
            rel="noreferrer"
          >
            <Twitter size={14} />
          </a>

          <button
            onClick={copyUrlToClipboard}
            className="p-1.5 flex items-center gap-1"
          >
            {copiedLink ? <span className="text-green-400">Copied!</span> : <Link size={14} />}
          </button>
        </div>
      </section>

      {/* 4. "YOU MAY ALSO LIKE" RELATED GRID (3 related items) */}
      {relatedPosts.length > 0 && (
        <section 
          id="related-articles-section"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-[#2E2E2E] pt-12 mt-16 pb-6"
        >
          <div className="border-b border-[#2E2E2E] pb-3 mb-8 flex items-center justify-between">
            <h3 className="font-serif text-lg text-[#F5F5F0] font-normal tracking-wide">
              You May Also Like <span className="text-[#C9A84C] italic text-xs ml-1 font-medium">&bull; Companion Literature</span>
            </h3>
            <span className="text-xs uppercase font-sans tracking-widest text-[#C9A84C] font-semibold">
              Scholarly Cinema Corollaries
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedPosts.map((post) => (
              <div
                key={post.id}
                onClick={() => {
                  onNavigate('article', null, post.slug);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="card-container bg-[#111111] border border-[#2E2E2E] hover:border-[#C9A84C]/35 rounded-xs p-4 flex flex-col justify-between group duration-300 cursor-pointer"
              >
                <div className="space-y-3">
                  {/* Thumbnail image */}
                  <div className="aspect-[16/9.5] overflow-hidden bg-black/40 border border-[#2E2E2E]/80 rounded-sm relative">
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

                  <h4 className="text-sm md:text-md font-serif text-[#F5F5F0] font-normal leading-snug group-hover:text-[#C9A84C] duration-250">
                    {post.title}
                  </h4>

                  <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed font-sans pr-1">
                    {post.excerpt}
                  </p>
                </div>

                <div className="flex items-center justify-between text-[10px] text-gray-500 font-mono border-t border-[#2E2E2E]/30 pt-3 mt-4">
                  <span>
                    By <span className="text-gray-400 font-sans font-semibold">{post.author}</span>
                  </span>
                  <span>{formatRelativeTime(post.publishedAt)}</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

    </article>
  );
};
