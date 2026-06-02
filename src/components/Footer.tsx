import React from 'react';
import { Logo } from './Logo';
import { Facebook, Twitter, Instagram, ArrowUp, Film } from 'lucide-react';

interface FooterProps {
  onNavigate: (view: string, category?: string | null, slug?: string | null) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const categories = [
    { name: 'Reviews', slug: 'reviews' },
    { name: 'News', slug: 'news' },
    { name: 'Features', slug: 'features' },
    { name: 'Interviews', slug: 'interviews' },
    { name: 'Box Office', slug: 'box-office' },
    { name: 'Streaming', slug: 'streaming' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer 
      id="site-editorial-footer"
      className="bg-[#111111] border-t border-[#2E2E2E] mt-16 text-[#F5F5F0]/65 text-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 pb-12 border-b border-[#2E2E2E]">
          
          {/* Col 1: Logo & Tagline */}
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center">
              <Logo size="md" variant="full" className="opacity-90 max-w-xs" />
            </div>
            <p className="font-serif italic text-[#F5F5F0]/80 pr-0 md:pr-12 leading-relaxed">
              "Providing rigorous film criticism, authoritative reviews, exclusive interview dialogues, and inside box office analysis for the demanding cinephile."
            </p>
            <div className="flex space-x-4 pt-2">
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 border border-[#2E2E2E] hover:border-[#C9A84C] text-[#F5F5F0]/70 hover:text-[#C9A84C] transition-all rounded-sm"
                aria-label="Facebook Profile"
              >
                <Facebook size={16} />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 border border-[#2E2E2E] hover:border-[#C9A84C] text-[#F5F5F0]/70 hover:text-[#C9A84C] transition-all rounded-sm"
                aria-label="Twitter X Profile"
              >
                <Twitter size={16} />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="p-2 border border-[#2E2E2E] hover:border-[#C9A84C] text-[#F5F5F0]/70 hover:text-[#C9A84C] transition-all rounded-sm"
                aria-label="Instagram Profile"
              >
                <Instagram size={16} />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h4 className="text-[#C9A84C] text-xs font-sans font-bold uppercase tracking-widest">Sections</h4>
            <ul className="space-y-2 text-xs">
              {categories.map((cat) => (
                <li key={cat.slug}>
                  <button 
                    onClick={() => { onNavigate('category', cat.slug); window.scrollTo(0,0); }}
                    className="hover:text-white hover:underline transition-all duration-200 text-left uppercase cursor-pointer tracking-wider"
                  >
                    {cat.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: About Links */}
          <div className="space-y-4">
            <h4 className="text-[#C9A84C] text-xs font-sans font-bold uppercase tracking-widest">Journal</h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button 
                  onClick={() => { onNavigate('about'); window.scrollTo(0,0); }}
                  className="hover:text-white hover:underline transition-all duration-200 text-left uppercase cursor-pointer tracking-wider"
                >
                  Our Mission & About
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { onNavigate('about'); window.scrollTo(0, 0); }}
                  className="hover:text-white hover:underline transition-all duration-200 text-left uppercase cursor-pointer tracking-wider"
                >
                  Masthead Staff
                </button>
              </li>
              <li>
                <span className="block text-gray-600 uppercase tracking-widest mt-2 cursor-default">
                  ISSN 2992-0021
                </span>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500 gap-4">
          <div className="flex items-center space-x-2">
            <Film size={12} className="text-[#C9A84C]/50" />
            <span>&copy; 2025 The Film Journal. All rights reserved.</span>
            <span className="text-[#2E2E2E]">|</span>
            <span className="italic font-serif text-[#C9A84C] tracking-wide text-[11px] select-none">
              Authoritative. Independent. Cinematic.
            </span>
          </div>

          {/* Scroll to Top and Secure Admin doorway */}
          <div className="flex items-center space-x-6">
            <button
              onClick={() => onNavigate('admin')}
              className="text-[10px] uppercase font-mono tracking-wider font-light text-gray-700 hover:text-[#C9A84C] transition duration-200 cursor-pointer"
              aria-label="Editorial Login CMS Entry"
            >
              [Admin Login Portal]
            </button>
            <button
              onClick={scrollToTop}
              className="flex items-center space-x-1.5 p-1 px-2.5 bg-black/40 border border-[#2E2E2E] hover:border-[#C9A84C] hover:text-[#C9A84C] duration-250 transition-all rounded-sm group uppercase font-mono text-[10px]"
              aria-label="Scroll to top of publication"
            >
              <span>Back to Top</span>
              <ArrowUp size={11} className="group-hover:-translate-y-0.5 duration-200" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
