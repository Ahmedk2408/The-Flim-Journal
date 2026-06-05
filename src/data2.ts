import { Post, Category, SiteSettings } from './types';
import { supabase } from './supabaseClient';

// ─────────────────────────────────────────────
// DEFAULTS  (used on first load / fallback)
// ─────────────────────────────────────────────
export const DEFAULT_CATEGORIES: Category[] = [
  { id: 'reviews',    name: 'Reviews',    slug: 'reviews',    description: 'Authoritative, unflinching evaluation of current cinema.' },
  { id: 'news',       name: 'News',       slug: 'news',       description: 'Breaking Hollywood exclusives, festival announcements, casting developments.' },
  { id: 'features',   name: 'Features',   slug: 'features',   description: 'In-depth essays, retrospectives, and deep conceptual dives.' },
  { id: 'interviews', name: 'Interviews', slug: 'interviews', description: 'Unfiltered conversations with leading creators and artists.' },
  { id: 'box-office', name: 'Box Office', slug: 'box-office', description: 'Data-informed analysis of theatrical trends and studio finances.' },
  { id: 'streaming',  name: 'Streaming',  slug: 'streaming',  description: 'Examining the landscape of digital distribution and streaming.' },
];

export const DEFAULT_SETTINGS: SiteSettings = {
  tagline: 'Authoritative. Independent. Cinematic.',
  facebookLink: 'https://facebook.com/thefilmjournal',
  twitterLink: 'https://twitter.com/thefilmjournal',
  instagramLink: 'https://instagram.com/thefilmjournal',
  mailchimpEmbed: '<!-- Mailchimp embed placeholder -->',
};

export const DEFAULT_POSTS: Post[] = [
  {
    id: 'cannes-2025',
    title: 'Cannes 2025: The Films That Will Define the Next Decade',
    slug: 'cannes-2025-films-define-decade',
    category: 'Features',
    author: 'Arjun Mehta',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    authorBio: 'Arjun Mehta is the Senior Editorial Director for The Film Journal.',
    publishedAt: '2026-06-02T10:00:00Z',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop',
    excerpt: 'As the curtains draw to a close on the Croisette, we look at the bold auteurs set to redefine cinematic language for years to come.',
    tags: ['Cannes 2025', 'Film Festivals', 'Auteur Cinema'],
    isFeatured: true,
    status: 'Published',
    body: '<p>Full article body here.</p>',
  },
];

// ─────────────────────────────────────────────
// HELPER — is Supabase configured?
// ─────────────────────────────────────────────
function isSupabaseReady(): boolean {
  const url = import.meta.env.VITE_SUPABASE_URL;
  const key = import.meta.env.VITE_SUPABASE_ANON_KEY;
  return !!(url && key && url !== 'https://placeholder.supabase.co');
}

// ─────────────────────────────────────────────
// POSTS
// ─────────────────────────────────────────────
export async function getPosts(): Promise<Post[]> {
  if (!isSupabaseReady()) return getPostsLocal();

  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .order('published_at', { ascending: false });

  if (error) {
    console.error('[TFJ] Supabase getPosts error:', error.message);
    return getPostsLocal();
  }

  // Map snake_case DB columns → camelCase Post interface
  return (data || []).map(dbRowToPost);
}

export async function savePosts(posts: Post[]): Promise<void> {
  if (!isSupabaseReady()) { savePostsLocal(posts); return; }
  // Bulk upsert — used when admin reorders / bulk-edits
  const rows = posts.map(postToDbRow);
  const { error } = await supabase.from('posts').upsert(rows);
  if (error) console.error('[TFJ] Supabase savePosts error:', error.message);
}

export async function upsertPost(post: Post): Promise<void> {
  if (!isSupabaseReady()) {
    const posts = getPostsLocal();
    const idx = posts.findIndex(p => p.id === post.id);
    if (idx >= 0) posts[idx] = post; else posts.unshift(post);
    savePostsLocal(posts);
    return;
  }
  const { error } = await supabase.from('posts').upsert(postToDbRow(post));
  if (error) console.error('[TFJ] Supabase upsertPost error:', error.message);
}

export async function deletePost(id: string): Promise<void> {
  if (!isSupabaseReady()) {
    const posts = getPostsLocal().filter(p => p.id !== id);
    savePostsLocal(posts);
    return;
  }
  const { error } = await supabase.from('posts').delete().eq('id', id);
  if (error) console.error('[TFJ] Supabase deletePost error:', error.message);
}

// ─────────────────────────────────────────────
// SETTINGS
// ─────────────────────────────────────────────
export async function getSettings(): Promise<SiteSettings> {
  if (!isSupabaseReady()) return getSettingsLocal();

  const { data, error } = await supabase
    .from('settings')
    .select('*')
    .eq('id', 1)
    .single();

  if (error || !data) return getSettingsLocal();

  return {
    tagline: data.tagline ?? DEFAULT_SETTINGS.tagline,
    facebookLink: data.facebook_link ?? DEFAULT_SETTINGS.facebookLink,
    twitterLink: data.twitter_link ?? DEFAULT_SETTINGS.twitterLink,
    instagramLink: data.instagram_link ?? DEFAULT_SETTINGS.instagramLink,
    mailchimpEmbed: data.mailchimp_embed ?? DEFAULT_SETTINGS.mailchimpEmbed,
  };
}

export async function saveSettings(settings: SiteSettings): Promise<void> {
  if (!isSupabaseReady()) { saveSettingsLocal(settings); return; }

  const { error } = await supabase.from('settings').upsert({
    id: 1,
    tagline: settings.tagline,
    facebook_link: settings.facebookLink,
    twitter_link: settings.twitterLink,
    instagram_link: settings.instagramLink,
    mailchimp_embed: settings.mailchimpEmbed,
  });
  if (error) console.error('[TFJ] Supabase saveSettings error:', error.message);
}

// ─────────────────────────────────────────────
// CATEGORIES
// ─────────────────────────────────────────────
export async function getCategories(): Promise<Category[]> {
  if (!isSupabaseReady()) return getCategoriesLocal();

  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name', { ascending: true });

  if (error || !data || data.length === 0) return getCategoriesLocal();

  return data.map(r => ({
    id: r.id,
    name: r.name,
    slug: r.slug,
    description: r.description ?? '',
  }));
}

export async function saveCategories(categories: Category[]): Promise<void> {
  if (!isSupabaseReady()) { saveCategoriesLocal(categories); return; }
  const { error } = await supabase.from('categories').upsert(categories);
  if (error) console.error('[TFJ] Supabase saveCategories error:', error.message);
}

// ─────────────────────────────────────────────
// REAL-TIME SUBSCRIPTION (optional)
// Call this in App.tsx to auto-refresh posts live
// ─────────────────────────────────────────────
export function subscribeToPostChanges(callback: () => void) {
  if (!isSupabaseReady()) return () => {};
  const channel = supabase
    .channel('posts-changes')
    .on('postgres_changes', { event: '*', schema: 'public', table: 'posts' }, callback)
    .subscribe();
  return () => supabase.removeChannel(channel);
}

// ─────────────────────────────────────────────
// DB ROW ↔ POST MAPPERS
// ─────────────────────────────────────────────
function dbRowToPost(r: Record<string, unknown>): Post {
  return {
    id: r.id as string,
    title: r.title as string,
    slug: r.slug as string,
    category: r.category as string,
    author: r.author as string,
    authorAvatar: (r.author_avatar as string) ?? '',
    authorBio: (r.author_bio as string) ?? '',
    publishedAt: r.published_at as string,
    readTime: (r.read_time as string) ?? '5 min read',
    image: (r.image as string) ?? '',
    excerpt: (r.excerpt as string) ?? '',
    tags: (r.tags as string[]) ?? [],
    isFeatured: (r.is_featured as boolean) ?? false,
    status: (r.status as 'Published' | 'Draft') ?? 'Draft',
    body: (r.body as string) ?? '',
  };
}

function postToDbRow(p: Post): Record<string, unknown> {
  return {
    id: p.id,
    title: p.title,
    slug: p.slug,
    category: p.category,
    author: p.author,
    author_avatar: p.authorAvatar,
    author_bio: p.authorBio,
    published_at: p.publishedAt,
    read_time: p.readTime,
    image: p.image,
    excerpt: p.excerpt,
    tags: p.tags,
    is_featured: p.isFeatured,
    status: p.status,
    body: p.body,
  };
}

// ─────────────────────────────────────────────
// LOCAL STORAGE FALLBACK (unchanged from before)
// ─────────────────────────────────────────────
const LS_POSTS = 'tfj_posts';
const LS_SETTINGS = 'tfj_settings';
const LS_CATEGORIES = 'tfj_categories';

function getPostsLocal(): Post[] {
  if (typeof window === 'undefined') return DEFAULT_POSTS;
  try {
    const s = localStorage.getItem(LS_POSTS);
    return s ? JSON.parse(s) : DEFAULT_POSTS;
  } catch { return DEFAULT_POSTS; }
}
function savePostsLocal(posts: Post[]) {
  if (typeof window !== 'undefined') localStorage.setItem(LS_POSTS, JSON.stringify(posts));
}
function getSettingsLocal(): SiteSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  try {
    const s = localStorage.getItem(LS_SETTINGS);
    return s ? JSON.parse(s) : DEFAULT_SETTINGS;
  } catch { return DEFAULT_SETTINGS; }
}
function saveSettingsLocal(settings: SiteSettings) {
  if (typeof window !== 'undefined') localStorage.setItem(LS_SETTINGS, JSON.stringify(settings));
}
function getCategoriesLocal(): Category[] {
  if (typeof window === 'undefined') return DEFAULT_CATEGORIES;
  try {
    const s = localStorage.getItem(LS_CATEGORIES);
    return s ? JSON.parse(s) : DEFAULT_CATEGORIES;
  } catch { return DEFAULT_CATEGORIES; }
}
function saveCategoriesLocal(categories: Category[]) {
  if (typeof window !== 'undefined') localStorage.setItem(LS_CATEGORIES, JSON.stringify(categories));
}

// ─────────────────────────────────────────────
// UTILITY
// ─────────────────────────────────────────────
export function formatRelativeTime(dateString: string): string {
  try {
    const postDate = new Date(dateString);
    const diffMs = Date.now() - postDate.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours < 1) return `${Math.max(1, Math.floor(diffMs / 60000))}m ago`;
    if (diffHours < 24) return `${diffHours} hours ago`;
    if (diffHours < 48) return 'Yesterday';
    return postDate.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  } catch { return dateString; }
}
