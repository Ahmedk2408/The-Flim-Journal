export interface Post {
  id: string;
  title: string;
  slug: string;
  category: string; // 'Reviews' | 'News' | 'Features' | 'Interviews' | 'Box Office' | 'Streaming'
  author: string;
  authorAvatar?: string;
  authorBio?: string;
  publishedAt: string; // ISO Date String
  readTime: string;    // e.g., "5 min read"
  image: string;       // URL or base64 data URL
  body: string;        // HTML or Markdown text
  excerpt: string;
  tags: string[];
  isFeatured: boolean;
  status: 'Published' | 'Draft';
}

export interface SiteSettings {
  tagline: string;
  facebookLink: string;
  twitterLink: string;
  instagramLink: string;
  mailchimpEmbed: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
}
