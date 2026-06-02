import React from 'react';
import { Post } from '../types';
import { formatRelativeTime } from '../data';

interface MarqueeProps {
  posts: Post[];
  onArticleClick: (slug: string) => void;
}

export const Marquee: React.FC<MarqueeProps> = ({ posts, onArticleClick }) => {
  // Sort and select the 5 latest published posts
  const latestPosts = [...posts]
    .filter(p => p.status === 'Published')
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, 5);

  if (latestPosts.length === 0) return null;

  // Duplicate the list to ensure a seamless infinite loop transition
  const doublyLatest = [...latestPosts, ...latestPosts, ...latestPosts];

  return (
    <div 
      id="marquee-ticker-container"
      className="bg-black border-y border-[#2E2E2E] py-2 overflow-hidden select-none whitespace-nowrap tall-target"
    >
      <div className="max-w-7xl mx-auto flex items-center">
        {/* "LATEST" Prefix Indicator */}
        <div className="bg-[#C9A84C] text-black text-[9px] font-sans font-extrabold uppercase tracking-widest px-2.5 py-0.5 ml-4 md:ml-6 mr-4 flex-shrink-0 rounded-sm">
          Latest
        </div>
        
        {/* Dynamic Continuous Marquee Track */}
        <div className="relative overflow-hidden w-full h-5 flex items-center">
          <div className="flex animate-marquee hover:[animation-play-state:paused] pointer-events-auto cursor-pointer gap-16 pr-16 items-center">
            {doublyLatest.map((post, idx) => (
              <button
                key={`${post.id}-${idx}`}
                onClick={() => onArticleClick(post.slug)}
                className="flex items-center gap-2 hover:text-white transition-colors duration-200 text-left cursor-pointer"
              >
                <span className="text-[#C9A84C] text-[11px] font-mono tracking-wider font-semibold uppercase">
                  [{post.category}]
                </span>
                <span className="text-[#F5F5F0]/85 font-sans text-xs font-medium tracking-wide">
                  {post.title}
                </span>
                <span className="text-gray-500 font-mono text-[10px]">
                  &bull; {formatRelativeTime(post.publishedAt)}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
