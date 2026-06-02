import React, { useState, useEffect } from 'react';
import { Post, Category, SiteSettings } from '../types';
import {
  FileText, FolderMinus, Image as ImageIcon, Settings as SettingsIcon, LogOut,
  Plus, Edit, Trash2, Check, Eye, HelpCircle, ArrowLeft, ToggleLeft, ToggleRight, X, Copy
} from 'lucide-react';

interface AdminViewProps {
  posts: Post[];
  categories: Category[];
  settings: SiteSettings;
  onUpdatePosts: (posts: Post[]) => void;
  onUpdateCategories: (categories: Category[]) => void;
  onUpdateSettings: (settings: SiteSettings) => void;
  onNavigate: (view: string, category?: string | null, slug?: string | null) => void;
}

export const AdminView: React.FC<AdminViewProps> = ({
  posts,
  categories,
  settings,
  onUpdatePosts,
  onUpdateCategories,
  onUpdateSettings,
  onNavigate
}) => {
  // Session authentication state (using LocalStorage for basic state keep-alive)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Primary navigation tab inside Dashboard
  const [activeTab, setActiveTab] = useState<'posts' | 'media' | 'categories' | 'settings'>('posts');

  // Multi-state forms manager
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isPostFormOpen, setIsPostFormOpen] = useState(false);
  const [postFormMode, setPostFormMode] = useState<'add' | 'edit'>('add');

  // Individual Form Fields
  const [postTitle, setPostTitle] = useState('');
  const [postSlug, setPostSlug] = useState('');
  const [postCategory, setPostCategory] = useState('');
  const [postAuthor, setPostAuthor] = useState('Arjun Mehta');
  const [postExcerpt, setPostExcerpt] = useState('');
  const [postBody, setPostBody] = useState('');
  const [postImage, setPostImage] = useState('https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop');
  const [postTagsRaw, setPostTagsRaw] = useState('');
  const [postStatus, setPostStatus] = useState<'Published' | 'Draft'>('Published');
  const [postIsFeatured, setPostIsFeatured] = useState(false);
  const [previewPostOpen, setPreviewPostOpen] = useState(false);

  // Categories Form Fields
  const [newCatName, setNewCatName] = useState('');
  const [newCatSlug, setNewCatSlug] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  // Settings Fields (Sync with state on mount)
  const [siteTagline, setSiteTagline] = useState(settings.tagline);
  const [facebookLink, setFacebookLink] = useState(settings.facebookLink);
  const [twitterLink, setTwitterLink] = useState(settings.twitterLink);
  const [instagramLink, setInstagramLink] = useState(settings.instagramLink);
  const [mailchimpEmbed, setMailchimpEmbed] = useState(settings.mailchimpEmbed);

  // Dialog / Delete validation
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  // Media Library Images state
  const [mediaImages, setMediaImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1542204172-e7052809a86e?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1200&auto=format&fit=crop'
  ]);
  const [newMediaUrl, setNewMediaUrl] = useState('');
  const [copiedMediaIdx, setCopiedMediaIdx] = useState<number | null>(null);

  // Check manual session state on mount
  useEffect(() => {
    const session = localStorage.getItem('tfj_admin_session');
    if (session === 'active') {
      setIsAuthenticated(true);
    }
    // Pre-populate category selector if category list exists
    if (categories.length > 0) {
      setPostCategory(categories[0].name);
    }
  }, [categories]);

  // Handle Credentials validation
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Predefined secure administrator credentials as requested
    const validEmail = 'ahmed@thefilmjournal.com';
    const validPassword = 'ahmed-cinema-authority';

    if (email === validEmail && password === validPassword) {
      setIsAuthenticated(true);
      setLoginError('');
      localStorage.setItem('tfj_admin_session', 'active');
    } else {
      setLoginError('Invalid administrator credentials.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('tfj_admin_session');
  };

  // Helper: auto slug generator
  useEffect(() => {
    if (postFormMode === 'add' && postTitle) {
      const generated = postTitle
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .trim()
        .replace(/\s+/g, '-');
      setPostSlug(generated);
    }
  }, [postTitle, postFormMode]);

  const openAddPostForm = () => {
    setPostFormMode('add');
    setEditingPost(null);
    setPostTitle('');
    setPostSlug('');
    setPostCategory(categories[0]?.name || 'Reviews');
    setPostAuthor('Arjun Mehta');
    setPostExcerpt('');
    setPostBody('<p class="lead text-lg text-[#F5F5F0]/90 font-serif mb-6 leading-relaxed">Lead outline here...</p><p class="mb-6">Write comprehensive analysis paragraphs here...</p><blockquote class="border-l-2 border-[#C9A84C] pl-6 my-8 italic font-serif text-lg text-[#F5F5F0]/85 bg-[#111111]/60 py-4 pr-4">"Insert deep critique highlight pullquote inside the review context."</blockquote>');
    setPostImage(mediaImages[0]);
    setPostTagsRaw('Cinema, Reviews, Auteur');
    setPostStatus('Published');
    setPostIsFeatured(false);
    setIsPostFormOpen(true);
  };

  const openEditPostForm = (post: Post) => {
    setPostFormMode('edit');
    setEditingPost(post);
    setPostTitle(post.title);
    setPostSlug(post.slug);
    setPostCategory(post.category);
    setPostAuthor(post.author);
    setPostExcerpt(post.excerpt);
    setPostBody(post.body);
    setPostImage(post.image);
    setPostTagsRaw(post.tags.join(', '));
    setPostStatus(post.status);
    setPostIsFeatured(post.isFeatured);
    setIsPostFormOpen(true);
  };

  // Drag-and-drop or local base64 simulator
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64Str = reader.result as string;
        setPostImage(base64Str);
        setMediaImages(prev => [base64Str, ...prev]);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePostSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!postTitle.trim() || !postSlug.trim()) return;

    const formattedTags = postTagsRaw
      .split(',')
      .map((t) => t.trim())
      .filter((t) => t.length > 0);

    // If making this featured, make sure we remove isFeatured from other matching objects
    let updatedPosts = [...posts];
    if (postIsFeatured) {
      updatedPosts = updatedPosts.map(p => ({ ...p, isFeatured: false }));
    }

    if (postFormMode === 'add') {
      const newPost: Post = {
        id: `post-${Date.now()}`,
        title: postTitle.trim(),
        slug: postSlug.trim(),
        category: postCategory,
        author: postAuthor,
        publishedAt: new Date().toISOString(),
        readTime: `${Math.max(3, Math.ceil(postBody.split(' ').length / 180))} min read`,
        image: postImage,
        body: postBody,
        excerpt: postExcerpt.trim(),
        tags: formattedTags,
        isFeatured: postIsFeatured,
        status: postStatus
      };
      updatedPosts.unshift(newPost);
    } else if (postFormMode === 'edit' && editingPost) {
      updatedPosts = updatedPosts.map((p) => {
        if (p.id === editingPost.id) {
          return {
            ...p,
            title: postTitle.trim(),
            slug: postSlug.trim(),
            category: postCategory,
            author: postAuthor,
            body: postBody,
            excerpt: postExcerpt.trim(),
            image: postImage,
            tags: formattedTags,
            isFeatured: postIsFeatured,
            status: postStatus,
            readTime: `${Math.max(3, Math.ceil(postBody.split(' ').length / 180))} min read`
          };
        }
        return p;
      });
    }

    onUpdatePosts(updatedPosts);
    setIsPostFormOpen(false);
    setEditingPost(null);
  };

  const handleDeletePost = (id: string) => {
    const filtered = posts.filter((p) => p.id !== id);
    onUpdatePosts(filtered);
    setConfirmDeleteId(null);
  };

  const toggleFeaturedState = (post: Post) => {
    let updated = posts.map((p) => {
      if (p.id === post.id) {
        return { ...p, isFeatured: !p.isFeatured };
      }
      // If setting this to true, disable other featured states
      if (!post.isFeatured) {
        return { ...p, isFeatured: false };
      }
      return p;
    });
    // Ensure at least one has it if possible
    onUpdatePosts(updated);
  };

  // Add category handler
  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;

    const slug = newCatSlug.trim() || newCatName.toLowerCase().replace(/[^a-z0-9]/g, '-');
    const newCat: Category = {
      id: `cat-${Date.now()}`,
      name: newCatName.trim(),
      slug: slug,
      description: newCatDesc.trim() || 'A standalone editorial desk.'
    };

    onUpdateCategories([...categories, newCat]);
    setNewCatName('');
    setNewCatSlug('');
    setNewCatDesc('');
  };

  const handleDeleteCategory = (catId: string) => {
    onUpdateCategories(categories.filter(c => c.id !== catId));
  };

  // Add Media Image helper
  const handleAddMediaUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMediaUrl.trim()) {
      setMediaImages(prev => [newMediaUrl.trim(), ...prev]);
      setNewMediaUrl('');
    }
  };

  const handleCopyMediaLink = (url: string, idx: number) => {
    navigator.clipboard.writeText(url);
    setCopiedMediaIdx(idx);
    setTimeout(() => setCopiedMediaIdx(null), 1500);
  };

  const handleSaveSettings = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateSettings({
      tagline: siteTagline,
      facebookLink,
      twitterLink,
      instagramLink,
      mailchimpEmbed
    });
    alert('Site specifications saved successfully.');
  };

  const handleRichExampleInsert = (template: string) => {
    setPostBody(prev => prev + "\n" + template);
  };

  // If NOT Authenticated, show login template
  if (!isAuthenticated) {
    return (
      <div
        id="admin-login-template"
        className="min-h-[80vh] flex items-center justify-center px-4 py-16"
      >
        <div className="max-w-md w-full bg-[#111111] border border-[#2E2E2E] p-8 rounded-sm space-y-6 shadow-2xl shadow-black">
          <div className="text-center space-y-2">
            <span className="text-[#C9A84C] text-[10px] tracking-widest font-mono uppercase block">SECURE CREDENTIALS DESK</span>
            <h2 className="text-2xl font-serif text-white">The Film Journal CMS</h2>
            <p className="text-xs text-gray-500 max-w-xs mx-auto">
              Access is restricted to authorized editors and contributing scholars. Please authenticate below.
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider text-gray-400 block font-semibold">Admin Account Email</label>
              <input
                type="email"
                placeholder="abc@tfj.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-black/50 border border-[#2E2E2E] focus:border-[#C9A84C] focus:outline-none rounded-xs px-4 py-3 text-sm text-white"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase tracking-wider text-gray-400 block font-semibold">Special Security Token</label>
              <input
                type="password"
                placeholder="••••••••••••••"
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-black/50 border border-[#2E2E2E] focus:border-[#C9A84C] focus:outline-none rounded-xs px-4 py-3 text-sm text-white"
              />
            </div>

            {loginError && (
              <p className="text-xs text-red-400 bg-red-950/20 border border-red-900/30 p-2 text-center rounded-sm">
                {loginError}
              </p>
            )}

            <button
              type="submit"
              className="w-full bg-[#C9A84C] hover:bg-[#B3933B] text-black text-xs uppercase tracking-widest font-extrabold py-3.5 duration-200 cursor-pointer rounded-xs transition-colors"
            >
              Access Command Deck
            </button>
            <div className="text-center">

            </div>
          </form>
        </div>
      </div>
    );
  }

  // AUTHENTICATED CONTROL PANEL INTERFACE
  return (
    <div id="cms-control-deck-root" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">

      {/* Header Panel */}
      <div className="border-b border-[#2E2E2E] pb-6 mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <span className="text-[#C9A84C] text-[10px] tracking-[0.25em] font-sans font-extrabold uppercase">
            SECURE EDITORIAL CONTROL
          </span>
          <h1 className="text-3xl font-serif text-white mt-1">
            Publishing Dash
          </h1>
          <p className="text-xs text-gray-500 mt-1">
            Logged in as <span className="text-gray-300">admin@thefilmjournal.com</span> (Standard Session active).
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="px-4 py-2 border border-[#2E2E2E] hover:border-white text-xs uppercase tracking-wider text-gray-300 rounded-sm duration-200 flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft size={12} />
            <span>Preview Site</span>
          </button>

          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-950/40 border border-red-900/40 hover:bg-red-900/40 text-red-400 text-xs uppercase tracking-wider rounded-sm duration-200 flex items-center gap-1.5 cursor-pointer"
          >
            <LogOut size={12} />
            <span>Exit Hub</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">

        {/* SIDE BAR NAVIGATION */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { id: 'posts', label: 'Article Desk', icon: FileText },
            { id: 'categories', label: 'Taxonomy', icon: FolderMinus },
            { id: 'media', label: 'Media Library', icon: ImageIcon },
            { id: 'settings', label: 'Site Config', icon: SettingsIcon }
          ].map((tab) => {
            const IconComp = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setIsPostFormOpen(false);
                }}
                className={`w-full text-left px-4 py-3 rounded-xs text-xs uppercase tracking-wider font-semibold duration-200 flex items-center gap-2.5 cursor-pointer border-l-2 ${activeTab === tab.id
                  ? 'bg-[#111111] text-[#C9A84C] border-[#C9A84C]'
                  : 'text-gray-400 border-transparent hover:bg-[#111111]/40 hover:text-white'
                  }`}
              >
                <IconComp size={14} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* WORKSPACE AREA */}
        <div className="lg:col-span-4 bg-[#111111] border border-[#2E2E2E] p-6 rounded-sm min-h-[500px]">

          {/* TAB 1: ARTICLE WRITING & REVIEWS TABLE */}
          {activeTab === 'posts' && !isPostFormOpen && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-[#2E2E2E]">
                <h3 className="font-serif text-lg text-white font-normal">
                  Articles Catalogued ({posts.length})
                </h3>
                <button
                  onClick={openAddPostForm}
                  className="bg-[#C9A84C] hover:bg-[#B3933B] text-black text-xs uppercase tracking-wider font-extrabold px-4 py-2.5 rounded-xs duration-200 transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus size={14} />
                  <span>Draft New Issue</span>
                </button>
              </div>

              {/* POST TABLE LIST */}
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs divide-y divide-[#2E2E2E]">
                  <thead>
                    <tr className="text-gray-500 uppercase font-mono tracking-wider">
                      <th className="py-3 px-2">Critique Title</th>
                      <th className="py-3 px-2">Category</th>
                      <th className="py-3 px-2">Author</th>
                      <th className="py-3 px-2">Featured</th>
                      <th className="py-3 px-2">Status</th>
                      <th className="py-3 px-2 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#2E2E2E]/50 text-gray-300">
                    {posts.map((post) => (
                      <tr key={post.id} className="hover:bg-black/20 duration-150">
                        <td className="py-4 px-2 max-w-xs sm:max-w-md">
                          <button
                            onClick={() => openEditPostForm(post)}
                            className="font-serif text-sm text-left hover:text-[#C9A84C] font-normal leading-snug cursor-pointer duration-150 focus:outline-none"
                          >
                            {post.title}
                          </button>
                          <span className="block text-[10px] text-gray-500 mt-1 font-mono">
                            /{post.slug} &bull; {new Date(post.publishedAt).toLocaleDateString()}
                          </span>
                        </td>
                        <td className="py-4 px-2">
                          <span className="text-gray-400 font-medium uppercase text-[10px] tracking-wider">
                            {post.category}
                          </span>
                        </td>
                        <td className="py-4 px-2">{post.author}</td>
                        <td className="py-4 px-2">
                          <button
                            onClick={() => toggleFeaturedState(post)}
                            className="focus:outline-none cursor-pointer"
                            title="Toggle Hompage Hero"
                          >
                            {post.isFeatured ? (
                              <span className="bg-[#C9A84C]/10 border border-[#C9A84C]/40 text-[#C9A84C] text-[10px] px-2 py-0.5 rounded-sm font-semibold uppercase font-mono">Hero</span>
                            ) : (
                              <span className="text-gray-600 hover:text-gray-400 font-mono italic text-[10px]">No</span>
                            )}
                          </button>
                        </td>
                        <td className="py-4 px-2">
                          <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-sm font-semibold ${post.status === 'Published'
                            ? 'bg-emerald-950/30 border border-emerald-900/50 text-emerald-400'
                            : 'bg-amber-950/20 border border-amber-900/40 text-amber-500'
                            }`}>
                            {post.status}
                          </span>
                        </td>
                        <td className="py-4 px-2 text-right">
                          <div className="flex justify-end gap-2.5">
                            <button
                              onClick={() => {
                                onNavigate('article', null, post.slug);
                              }}
                              className="p-1.5 text-gray-400 hover:text-[#C9A84C] duration-150 cursor-pointer"
                              title="Live view"
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              onClick={() => openEditPostForm(post)}
                              className="p-1.5 text-gray-400 hover:text-white duration-150 cursor-pointer"
                              title="Edit Review Content"
                            >
                              <Edit size={14} />
                            </button>
                            <button
                              onClick={() => setConfirmDeleteId(post.id)}
                              className="p-1.5 text-gray-400 hover:text-red-400 duration-150 cursor-pointer"
                              title="Delete catalog entry"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* DRAFTING / EDITING PANEL */}
          {activeTab === 'posts' && isPostFormOpen && (
            <form onSubmit={handlePostSubmit} className="space-y-6">
              <div className="pb-4 border-b border-[#2E2E2E] flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsPostFormOpen(false)}
                    className="text-gray-500 hover:text-white"
                  >
                    <ArrowLeft size={16} />
                  </button>
                  <h3 className="font-serif text-lg text-white font-normal">
                    {postFormMode === 'add' ? 'Draft Classical Critique' : `Modify "${postTitle}"`}
                  </h3>
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setPreviewPostOpen(!previewPostOpen)}
                    className="px-3.5 py-1.5 border border-[#2E2E2E] text-xs text-gray-300 hover:text-white rounded-sm duration-150 flex items-center gap-1 cursor-pointer"
                  >
                    <Eye size={12} />
                    <span>{previewPostOpen ? "Edit Form" : "Preview Layout"}</span>
                  </button>

                  <button
                    type="submit"
                    className="bg-[#C9A84C] hover:bg-[#B3933B] text-black text-xs uppercase tracking-wider font-extrabold px-4 py-1.5 rounded-sm duration-150 cursor-pointer"
                  >
                    Save Changes
                  </button>
                </div>
              </div>

              {/* LIVE LAYOUT PREVIEW PANEL ACCORDION */}
              {previewPostOpen ? (
                <div className="bg-[#1a1a1a] p-6 border border-[#C9A84C]/40 rounded-sm space-y-4">
                  <div className="border-b border-[#2E2E2E] pb-3 mb-4">
                    <span className="text-[#C9A84C] text-[10px] tracking-widest font-mono uppercase block">{postCategory} &bull; PREVIEWING LAYOUT</span>
                    <h1 className="text-2xl md:text-3xl font-serif text-white">{postTitle || 'Untitled Preview Article'}</h1>
                    <span className="text-xs text-gray-500 font-sans block mt-1">Written by {postAuthor} &bull; Estimated {(postBody.split(' ').length / 180).toFixed(0)} min read</span>
                  </div>
                  {postImage && (
                    <div className="aspect-[21/9] w-full overflow-hidden border border-[#2E2E2E] rounded-xs mb-4">
                      <img src={postImage} alt="Feature preview visual placeholder" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <p className="font-serif italic text-gray-300 border-l border-[#C9A84C] pl-3 py-1 my-3 text-sm">{postExcerpt || 'Sample introduction excerpt paragraph text...'}</p>
                  <div className="article-rich-content text-xs text-gray-400 space-y-3 leading-relaxed" dangerouslySetInnerHTML={{ __html: postBody }} />
                </div>
              ) : (
                <div className="space-y-4 text-xs">

                  {/* Row 1: Title & Auto-slug */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-gray-400 font-semibold block uppercase tracking-wider text-[9px]">ARTICLE CRITIQUE TITLE</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Cannes 2025: Traditional Restorations in 35mm Format"
                        value={postTitle}
                        onChange={(e) => setPostTitle(e.target.value)}
                        className="w-full bg-black/40 border border-[#2E2E2E] px-3.5 py-3 text-white focus:outline-none focus:border-[#C9A84C] rounded-sm text-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-gray-400 font-semibold block uppercase tracking-wider text-[9px]">SLUG IDENTIFIER (MUTABLE URL PATH)</label>
                      <input
                        type="text"
                        required
                        placeholder="cannes-2025-restorations"
                        value={postSlug}
                        onChange={(e) => setPostSlug(e.target.value)}
                        className="w-full bg-black/40 border border-[#2E2E2E] px-3.5 py-3 text-white focus:outline-none focus:border-[#C9A84C] rounded-sm text-sm"
                      />
                    </div>
                  </div>

                  {/* Row 2: Category, Author, Featured switches */}
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-gray-400 font-semibold block uppercase tracking-wider text-[9px]">DIVISION DESK</label>
                      <select
                        value={postCategory}
                        onChange={(e) => setPostCategory(e.target.value)}
                        className="w-full bg-black/50 border border-[#2E2E2E] px-2 py-3 text-white focus:outline-none rounded-sm text-xs h-10 cursor-pointer"
                      >
                        {categories.map(c => (
                          <option key={c.id} value={c.name} className="bg-[#111111]">{c.name}</option>
                        ))}
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-gray-400 font-semibold block uppercase tracking-wider text-[9px]">AUTHOR CREDITS</label>
                      <input
                        type="text"
                        required
                        value={postAuthor}
                        onChange={(e) => setPostAuthor(e.target.value)}
                        className="w-full bg-black/40 border border-[#2E2E2E] px-3.5 py-2.5 text-white focus:outline-none focus:border-[#C9A84C] rounded-sm"
                      />
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-gray-400 font-semibold block uppercase tracking-wider text-[9px]">STATUS CONTROL</label>
                      <select
                        value={postStatus}
                        onChange={(e) => setPostStatus(e.target.value as any)}
                        className="w-full bg-black/50 border border-[#2E2E2E] px-2 py-3 text-white focus:outline-none rounded-sm text-xs h-10 cursor-pointer"
                      >
                        <option value="Published" className="bg-[#1a1a1a]">Published (Visible)</option>
                        <option value="Draft" className="bg-[#1a1a1a]">Draft (Hidden)</option>
                      </select>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-gray-400 font-semibold block uppercase tracking-wider text-[9px]">HOMEPAGE FEATURED HERO</label>
                      <button
                        type="button"
                        onClick={() => setPostIsFeatured(!postIsFeatured)}
                        className="w-full h-10 bg-black/40 border border-[#2E2E2E] rounded-sm flex items-center justify-between px-4 hover:border-white select-none cursor-pointer duration-150 text-xs"
                      >
                        <span>Featured Banner</span>
                        {postIsFeatured ? <ToggleRight size={22} className="text-[#C9A84C]" /> : <ToggleLeft size={22} className="text-gray-500" />}
                      </button>
                    </div>
                  </div>

                  {/* Row 3: Image selector & File reader */}
                  <div className="space-y-1.5">
                    <label className="text-gray-400 font-semibold block uppercase tracking-wider text-[9px]">FEATURED CINEMATIC IMAGE</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <div className="md:col-span-2">
                        <input
                          type="text"
                          required
                          placeholder="Select image URL or drag a local thumbnail file right of desk"
                          value={postImage}
                          onChange={(e) => setPostImage(e.target.value)}
                          className="w-full bg-black/40 border border-[#2E2E2E] px-3.5 py-3 text-xs text-white focus:outline-none focus:border-[#C9A84C] rounded-sm"
                        />
                      </div>
                      <div className="relative">
                        <label className="w-full h-10 border border-dashed border-[#2E2E2E] hover:border-[#C9A84C] rounded-sm flex items-center justify-center text-[10px] text-gray-400 uppercase tracking-wider font-semibold cursor-pointer select-none">
                          <span>Upload Local PNG/WebP</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleImageFileChange}
                            className="hidden"
                          />
                        </label>
                      </div>
                    </div>
                    {postImage && (
                      <div className="aspect-[21/6] max-h-40 overflow-hidden border border-[#2E2E2E] rounded-xs mt-2 relative bg-black/50">
                        <img src={postImage} alt="Chosen graphic review framing preview" className="w-full h-full object-cover opacity-60" />
                        <span className="absolute bottom-2 left-2 bg-black/80 px-2.5 py-1 text-[9px] text-[#C9A84C] font-mono rounded-sm border border-[#2E2E2E]">Image Loaded</span>
                      </div>
                    )}
                  </div>

                  {/* Row 4: Summary / Excerpt field */}
                  <div className="space-y-1.5">
                    <label className="text-gray-400 font-semibold block uppercase tracking-wider text-[9px]">CRITIQUE INTRODUCTION EXCERPT</label>
                    <textarea
                      placeholder="Enter a brief, compelling 2-sentence summary of the film critique..."
                      value={postExcerpt}
                      onChange={(e) => setPostExcerpt(e.target.value)}
                      required
                      rows={2}
                      className="w-full bg-black/40 border border-[#2E2E2E] p-3 text-white font-sans text-xs focus:outline-none focus:border-[#C9A84C] rounded-sm leading-relaxed"
                    />
                  </div>

                  {/* Row 5: Rich Body with Custom WYSIWYG insert buttons */}
                  <div className="space-y-2">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                      <label className="text-gray-400 font-semibold block uppercase tracking-wider text-[9px]">ARTICLE ESSAY BODY (HTML FORMATTED)</label>

                      {/* Short editorial tags layout shortcuts */}
                      <div className="flex flex-wrap gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleRichExampleInsert('<h3 class="text-xl font-serif text-[#C9A84C] mt-8 mb-4">A Dynamic Subheading</h3>')}
                          className="bg-[#1a1a1a] hover:bg-black border border-[#2E2E2E] text-gray-400 hover:text-[#C9A84C] py-1 px-2.5 rounded-sm select-none cursor-pointer duration-150 text-[9px] uppercase tracking-wider"
                        >
                          + Head
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRichExampleInsert('<p class="mb-6">Cinephiles have observed that...</p>')}
                          className="bg-[#1a1a1a] hover:bg-black border border-[#2E2E2E] text-gray-400 hover:text-[#C9A84C] py-1 px-2.5 rounded-sm select-none cursor-pointer duration-150 text-[9px] uppercase tracking-wider"
                        >
                          + Paragraph
                        </button>
                        <button
                          type="button"
                          onClick={() => handleRichExampleInsert('<blockquote class="border-l-2 border-[#C9A84C] pl-6 my-8 italic font-serif text-lg text-[#F5F5F0]/85 bg-[#111111]/60 py-4 pr-4">"The screen is not real estate... it is sculpting with light."</blockquote>')}
                          className="bg-[#1a1a1a] hover:bg-black border border-[#2E2E2E] text-gray-400 hover:text-[#C9A84C] py-1 px-2.5 rounded-sm select-none cursor-pointer duration-150 text-[9px] uppercase tracking-wider"
                        >
                          + Pull Quote
                        </button>
                      </div>
                    </div>

                    <textarea
                      placeholder="Write rich HTML paragraphs, subheads, and pullquotes..."
                      value={postBody}
                      onChange={(e) => setPostBody(e.target.value)}
                      required
                      rows={10}
                      className="w-full bg-black/40 border border-[#2E2E2E] p-4 text-white font-mono text-xs focus:outline-none focus:border-[#C9A84C] rounded-sm leading-relaxed"
                    />
                  </div>

                  {/* Row 6: Meta tags */}
                  <div className="space-y-1.5">
                    <label className="text-gray-400 font-semibold block uppercase tracking-wider text-[9px]">TAG KEYS (COMMA SEPARATED)</label>
                    <input
                      type="text"
                      placeholder="Cannes, Reviews, French New Wave, Restorations"
                      value={postTagsRaw}
                      onChange={(e) => setPostTagsRaw(e.target.value)}
                      className="w-full bg-black/40 border border-[#2E2E2E] px-3.5 py-3 text-white focus:outline-none focus:border-[#C9A84C] rounded-sm text-xs"
                    />
                  </div>

                </div>
              )}
            </form>
          )}

          {/* TAB 2: CATEGORY TAXONOMY DESK */}
          {activeTab === 'categories' && (
            <div className="space-y-8">
              <div className="border-b border-[#2E2E2E] pb-3.5">
                <h3 className="font-serif text-lg text-white font-normal">
                  Category Classifications ({categories.length})
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Manage the primary desks where intellectual film critiques, news briefings, and director interviews are stored on key site headers.
                </p>
              </div>

              {/* LIST CATEGORIES */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="p-4 bg-black/40 border border-[#2E2E2E] rounded-xs flex items-start justify-between gap-4 relative group hover:border-[#C9A84C]/40 duration-200"
                  >
                    <div className="space-y-1.5 flex-1 pr-4">
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-sm font-semibold text-[#F5F5F0]">{cat.name}</span>
                        <span className="font-mono text-[9px] text-[#C9A84C] bg-black px-2 py-0.5 rounded-sm border border-[#2E2E2E]">/{cat.slug}</span>
                      </div>
                      <p className="text-[11px] text-gray-500 leading-relaxed font-sans line-clamp-2">
                        {cat.description}
                      </p>
                    </div>

                    <button
                      onClick={() => {
                        if (confirm(`Are you sure you want to delete the category "${cat.name}"? Articles already matching this desk won't be deleted, but they'll lack matching directory routes.`)) {
                          handleDeleteCategory(cat.id);
                        }
                      }}
                      className="p-1.5 text-gray-500 hover:text-red-400 opacity-0 group-hover:opacity-100 duration-150 cursor-pointer"
                      title="Delete category"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                ))}
              </div>

              {/* ADD CATEGORIZATION FORM */}
              <form onSubmit={handleAddCategory} className="bg-black/20 border border-[#2E2E2E] p-5 rounded-sm space-y-4">
                <h4 className="font-serif text-sm text-[#C9A84C] font-normal border-b border-[#2E2E2E]/40 pb-2">
                  Create New Division
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  <div className="space-y-1.5">
                    <label className="text-gray-400 font-semibold block uppercase tracking-wider text-[9px]">DIVISION TITLE</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Festival Diaries"
                      value={newCatName}
                      onChange={(e) => {
                        setNewCatName(e.target.value);
                        setNewCatSlug(e.target.value.toLowerCase().replace(/[^a-z0-9]/g, '-'));
                      }}
                      className="w-full bg-black/40 border border-[#2E2E2E] px-3 py-2.5 text-white focus:outline-none focus:border-[#C9A84C] rounded-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-gray-400 font-semibold block uppercase tracking-wider text-[9px]">DESK SLUG URL</label>
                    <input
                      type="text"
                      required
                      placeholder="festival-diaries"
                      value={newCatSlug}
                      onChange={(e) => setNewCatSlug(e.target.value)}
                      className="w-full bg-black/40 border border-[#2E2E2E] px-3 py-2.5 text-white focus:outline-none focus:border-[#C9A84C] rounded-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5 text-xs">
                  <label className="text-gray-400 font-semibold block uppercase tracking-wider text-[9px]">EDITORIAL MISSION DESCRIPTION</label>
                  <textarea
                    rows={2}
                    placeholder="Provide a 1-sentence descriptor mapping our critical intentions under this desk tag..."
                    value={newCatDesc}
                    onChange={(e) => setNewCatDesc(e.target.value)}
                    className="w-full bg-black/40 border border-[#2E2E2E] p-3 text-white font-sans text-xs focus:outline-none focus:border-[#C9A84C] rounded-sm"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#2E2E2E] hover:bg-[#C9A84C] hover:text-black py-2.5 px-6 rounded-xs text-xs uppercase tracking-wider font-extrabold text-[#C9A84C] duration-200 cursor-pointer"
                >
                  Confirm Classification Desk
                </button>
              </form>

            </div>
          )}

          {/* TAB 3: MEDIA LIBRARY GRAPHICS ARCHIVE */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div className="border-b border-[#2E2E2E] pb-3.5">
                <h3 className="font-serif text-lg text-white font-normal">
                  Media Library Archives
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Upload regional film stills or scenic frames. Copy these address references to insert them directly inside your critiques.
                </p>
              </div>

              {/* MOCK URL ADD TO MEDIA LIBRARY */}
              <form onSubmit={handleAddMediaUrl} className="flex gap-2 text-xs">
                <input
                  type="text"
                  placeholder="Paste Unsplash address or image path..."
                  value={newMediaUrl}
                  onChange={(e) => setNewMediaUrl(e.target.value)}
                  className="flex-1 bg-black/40 border border-[#2E2E2E] px-3 py-2.5 text-white focus:outline-none focus:border-[#C9A84C] rounded-sm text-xs"
                />
                <button
                  type="submit"
                  className="bg-[#C9A84C] hover:bg-[#B3933B] text-black text-xs font-bold uppercase tracking-wider px-5 py-2.5 duration-200 cursor-pointer rounded-xs"
                >
                  Record Still
                </button>
              </form>

              {/* MEDIA GALLERY GRID */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {mediaImages.map((img, idx) => (
                  <div
                    key={idx}
                    className="group border border-[#2E2E2E] hover:border-[#C9A84C] duration-250 rounded-xs overflow-hidden bg-black/30 flex flex-col justify-between"
                  >
                    <div className="aspect-[16/10] bg-black/60 overflow-hidden relative">
                      <img src={img} alt={`Archive item ${idx}`} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 duration-200" />
                    </div>

                    <div className="p-2 border-t border-[#2E2E2E] bg-black/40 flex items-center justify-between gap-1">
                      <span className="text-[9px] text-gray-500 truncate max-w-[120px] font-mono">
                        {img}
                      </span>
                      <button
                        onClick={() => handleCopyMediaLink(img, idx)}
                        className="p-1 ml-1 text-gray-400 hover:text-[#C9A84C] duration-150 cursor-pointer flex items-center justify-center border border-[#2E2E2E] hover:border-[#C9A84C] rounded-xs bg-black"
                        title="Copy image link"
                      >
                        {copiedMediaIdx === idx ? <Check size={11} className="text-green-400" /> : <Copy size={11} />}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: PUBLICATION SITE GENERAL CONFIGURATIONS */}
          {activeTab === 'settings' && (
            <form onSubmit={handleSaveSettings} className="space-y-6 text-xs">
              <div className="border-b border-[#2E2E2E] pb-3.5">
                <h3 className="font-serif text-lg text-white font-normal">
                  Publication Settings & Integrations
                </h3>
                <p className="text-xs text-gray-500 mt-1">
                  Adjust visual tags, primary socials, letterbox configurations, and integration blocks instantly.
                </p>
              </div>

              <div className="space-y-4">

                <div className="space-y-1.5">
                  <label className="text-gray-400 font-semibold block uppercase tracking-wider text-[9px]">SITE SUBTITLE / TAGLINE ACCENT</label>
                  <input
                    type="text"
                    required
                    value={siteTagline}
                    onChange={(e) => setSiteTagline(e.target.value)}
                    className="w-full bg-black/40 border border-[#2E2E2E] px-3.5 py-3 text-white focus:outline-none focus:border-[#C9A84C] rounded-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-gray-400 font-semibold block uppercase tracking-wider text-[9px]">FACEBOOK SCHOLAR LINK</label>
                    <input
                      type="url"
                      value={facebookLink}
                      onChange={(e) => setFacebookLink(e.target.value)}
                      className="w-full bg-black/40 border border-[#2E2E2E] px-3 py-2.5 text-white focus:outline-none focus:border-[#C9A84C] rounded-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-gray-400 font-semibold block uppercase tracking-wider text-[9px]">TWITTER / X CRITIQUE FEED</label>
                    <input
                      type="url"
                      value={twitterLink}
                      onChange={(e) => setTwitterLink(e.target.value)}
                      className="w-full bg-black/40 border border-[#2E2E2E] px-3 py-2.5 text-white focus:outline-none focus:border-[#C9A84C] rounded-sm"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-gray-400 font-semibold block uppercase tracking-wider text-[9px]">INSTAGRAM REELS DIALOG LINK</label>
                    <input
                      type="url"
                      value={instagramLink}
                      onChange={(e) => setInstagramLink(e.target.value)}
                      className="w-full bg-black/40 border border-[#2E2E2E] px-3 py-2.5 text-white focus:outline-none focus:border-[#C9A84C] rounded-sm"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="flex justify-between items-center pb-1">
                    <label className="text-gray-400 font-semibold uppercase tracking-wider text-[9px]">MAILCHIMP NEWSLETTER EMBED BLOCK</label>
                    <span className="text-[10px] text-gray-500 font-mono">Accepts Form Fields / Custom HTML</span>
                  </div>
                  <textarea
                    rows={4}
                    value={mailchimpEmbed}
                    onChange={(e) => setMailchimpEmbed(e.target.value)}
                    className="w-full bg-black/40 border border-[#2E2E2E] p-3 text-white font-mono text-xs focus:outline-none focus:border-[#C9A84C] rounded-sm leading-relaxed"
                  />
                </div>

              </div>

              <button
                type="submit"
                className="bg-[#C9A84C] hover:bg-[#B3933B] text-black text-xs font-bold uppercase tracking-wider px-6 py-3 rounded-xs duration-200 cursor-pointer"
              >
                Save Site Configuration
              </button>
            </form>
          )}

        </div>

      </div>

      {/* CONFIRM DELETE MODAL BACKDROP */}
      {confirmDeleteId && (
        <div id="delete-confirmation-overlay" className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-[#111111] border border-red-900/40 p-6 rounded-sm space-y-4">
            <h4 className="font-serif text-lg text-white">Delete Article Critique?</h4>
            <p className="text-xs text-gray-400 leading-relaxed font-sans">
              Are you sure you want to delete this editorial piece? This operation cannot be undone and will erase records from the site directory permanently.
            </p>
            <div className="flex justify-end gap-3 text-xs uppercase font-mono tracking-wider">
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="px-4 py-2 border border-[#2E2E2E] text-gray-400 hover:text-white rounded-xs duration-150 cursor-pointer"
              >
                Cancel Delete
              </button>
              <button
                onClick={() => handleDeletePost(confirmDeleteId)}
                className="px-4 py-2 bg-red-950/40 border border-red-900 text-red-400 hover:bg-red-900 hover:text-white rounded-xs duration-150 cursor-pointer"
              >
                Permanently Purge
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
