import { Post, Category, SiteSettings } from './types';

export const DEFAULT_CATEGORIES: Category[] = [
  {
    id: 'reviews',
    name: 'Reviews',
    slug: 'reviews',
    description: 'Authoritative, unflinching evaluation of current cinema. Long-form critiques with intellectual rigor and technical precision.'
  },
  {
    id: 'news',
    name: 'News',
    slug: 'news',
    description: 'Breaking Hollywood exclusives, festival announcements, casting developments, and critical financial movements in the industry.'
  },
  {
    id: 'features',
    name: 'Features',
    slug: 'features',
    description: 'In-depth essays, retrospectives, and deep conceptual dives exploring cinematic techniques, auteur theories, and culture.'
  },
  {
    id: 'interviews',
    name: 'Interviews',
    slug: 'interviews',
    description: 'Unfiltered conversations with leading creators, actors, screenwriters, cinematographers, and unsung designers shaping the medium.'
  },
  {
    id: 'box-office',
    name: 'Box Office',
    slug: 'box-office',
    description: 'Data-informed analysis of theatrical trends, box office receipts, international distribution, and studio financial structures.'
  },
  {
    id: 'streaming',
    name: 'Streaming',
    slug: 'streaming',
    description: 'Examining the landscape of digital distribution, direct-to-home releases, curating indie streaming, and physical media restorations.'
  }
];

export const DEFAULT_SETTINGS: SiteSettings = {
  tagline: 'Authoritative. Independent. Cinematic.',
  facebookLink: 'https://facebook.com/thefilmjournal',
  twitterLink: 'https://twitter.com/thefilmjournal',
  instagramLink: 'https://instagram.com/thefilmjournal',
  mailchimpEmbed: '<!-- Default Mailchimp newsletter form placeholder -->\n<div class="newsletter-form flex flex-col sm:flex-row gap-2">\n  <input type="email" placeholder="Enter your email address" class="bg-black/40 border border-[#2E2E2E] px-4 py-3 text-sm text-[#F5F5F0] focus:outline-none focus:border-[#C9A84C] duration-200 flex-1 rounded-sm" required />\n  <button type="submit" class="bg-[#C9A84C] hover:bg-[#B3933B] text-black font-semibold text-xs uppercase tracking-wider px-6 py-3 duration-200 rounded-sm">Subscribe</button>\n</div>'
};

export const DEFAULT_POSTS: Post[] = [
  {
    id: 'cannes-2025',
    title: 'Cannes 2025: The Films That Will Define the Next Decade',
    slug: 'cannes-2025-films-define-decade',
    category: 'Features',
    author: 'Arjun Mehta',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    authorBio: 'Arjun Mehta is the Senior Editorial Director for The Film Journal. He writes extensively on international auteur cinema and holds a PhD in Film History from Columbia University.',
    publishedAt: '2026-06-02T10:00:00Z',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1200&auto=format&fit=crop',
    excerpt: 'As the curtains draw to a close on the Croisette, we look at the bold auteurs and visceral masterworks that are set to redefine cinematic language for years to come.',
    tags: ['Cannes 2025', 'Film Festivals', 'Auteur Cinema', 'Future Of Film'],
    isFeatured: true,
    status: 'Published',
    body: `<p class="lead text-lg text-[#F5F5F0]/90 font-serif mb-6 leading-relaxed">The 78th Cannes Film Festival was not just a celebration of cinema but a battleground for its moving soul. In a year defined by tectonic technological shifts and geopolitical polarization, the filmmakers on the Croisette responded with a profound retreat into raw, unfiltered, human-centric aesthetic rebellion.</p>
    
    <p class="mb-6">It has become customary to view Cannes as a mere launchpad for awards seasons, a gilded playground of red carpets and yacht parties. But underneath the heavy layer of corporate sponsorship, the Selection Officielle offered a deeply evocative glimpse of where the medium is heading. We saw a rejection of digital flatness, a return to high-contrast Kodak 35mm formats, and narrative designs that trade easy algorithms for challenging, uncomfortable emotional structures.</p>
    
    <h3 class="text-xl font-serif text-[#C9A84C] mt-8 mb-4">The Triumph of Sensualism</h3>
    <p class="mb-6">Leading the pack was the highly anticipated feature from master stylist Céline Sciamma, whose new exploration of memory and geographic space captured the Jury's imagination. Shot entirely on location in rural Spain during the dry summer, the film’s framing borrows heavily from the Renaissance chiaroscuro. The light is not merely styled; it is sculpted, casting the characters in a permanent suspension between historical memory and contemporary isolation.</p>

    <blockquote class="border-l-2 border-[#C9A84C] pl-6 my-8 italic font-serif text-lg text-[#F5F5F0]/85 bg-[#111111]/60 py-4 pr-4">
      "Cinema is not a reflection of reality, but a visual rhythm that allows us to survive it. At Cannes, we saw directors who treat the screen as raw canvas, not empty real estate."
    </blockquote>

    <h3 class="text-xl font-serif text-[#C9A84C] mt-8 mb-4">Reconsidering Cinematic Scale</h3>
    <p class="mb-6">In direct contrast to the blockbuster maximalism of streaming platforms, several of the most striking competition entries were intensely contained. One particularly striking film took place entirely within the confines of a single operating train cabin traveling across Eastern Europe. The restriction of physical space forced the cinematographer to adopt custom wider lenses that warp perspective just enough to reflect the interior psychological collapse of its leads.</p>

    <div class="my-8">
      <img src="https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=1200&auto=format&fit=crop" alt="Cinematic camera setup" class="w-full h-[400px] object-cover border border-[#2E2E2E]" />
      <p class="text-xs italic text-gray-500 mt-2 font-serif">Behind-the-scenes framing: Emphasizing physical lighting and high-contrast anamorphic lenses over sterile green screens.</p>
    </div>

    <p class="mb-6">What we are witnessing is the birth of what critics are calling <i>The New Sincerity</i>. After a decade of ironic self-awareness and visual digital-fatigue, the next decade belonging to directors who dare to be earnest, atmospheric, and uncomfortably patient.</p>`
  },
  {
    id: 'silence-of-the-fog',
    title: 'Review: The new "Silence of the Fog" is a Haunting Masterpiece of Restraint',
    slug: 'review-silence-of-the-fog-masterpiece-restraint',
    category: 'Reviews',
    author: 'Evelyn Thorne',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop',
    authorBio: 'Evelyn Thorne is a veteran film critic with over fifteen years of experience in film theory. Her analytical critiques favor visual language, sound design, and Neo-Noir structuralism.',
    publishedAt: '2026-06-02T08:15:00Z',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=1200&auto=format&fit=crop',
    excerpt: 'A quiet, masterfully shot exploration of solitude and memory that relies on what is unsaid, establishing itself as the year\'s finest slow-burn thriller.',
    tags: ['Reviews', 'Slow Cinema', 'Thriller', 'Indie Film'],
    isFeatured: false,
    status: 'Published',
    body: `<p class="lead text-lg text-[#F5F5F0]/90 font-serif mb-6 leading-relaxed">It takes extraordinary courage to make a thriller about silence. In an industry governed by sensory overload and loud, explosive jumpscares, director Sophia Al-Kindi presents a masterful antithesis: a film where the most terrifying element is the quiet itself.</p>
    
    <p class="mb-6">Set in a desolate coastal town in the Scottish Highlands, <i>Silence of the Fog</i> stars Michael Shannon in a career-defining performance as Thomas, a retired maritime watchman suffering from gradual hearing loss. The film adapts its entire soundscape to Thomas's subjective experience—sound is muffled, dialogue is frequently drowned out by the heavy, low hum of the tides, and long stretches of narrative are carried forward entirely by physical performance, visual design, and lighting.</p>
    
    <h3 class="text-xl font-serif text-[#C9A84C] mt-8 mb-4">A Masterclass in Visual Composition</h3>
    <p class="mb-6">Al-Kindi uses an extremely narrow 1.33:1 Academy ratio, framing Shannon as though he is trapped by the very borders of the screen. The mist and fog of the highlands are not merely ecological backdrops; they are active narrative agents, creeping into the visual space and slowly dissolving the boundary between Thomas’s objective reality and his growing auditory hallucinations.</p>

    <blockquote class="border-l-2 border-[#C9A84C] pl-6 my-8 italic font-serif text-lg text-[#F5F5F0]/85 bg-[#111111]/60 py-4 pr-4">
      "Silence of the Fog does not strive to entertain; it strives to capture the claustrophobic weight of the human mind struggling to hold onto its bearings in a dissolving landscape."
    </blockquote>

    <p class="mb-6">Special credit must be given to cinematographer Łukasz Żal. His monochrome-like digital color palette, accented only by the faint amber glow of kerosene lanterns, makes every scene resemble an oil painting. This is not a film you simply watch; you absorb its atmosphere through your skin. It stands as a triumph of modern restraint and is, without a doubt, a historic milestone for independent cinema this year.</p>`
  },
  {
    id: 'indian-mythological-epic',
    title: 'Exclusive: Inside the Making of the Most Ambitious Indian Film of the Year',
    slug: 'exclusive-making-ambitious-indian-film-year',
    category: 'Interviews',
    author: 'Arjun Mehta',
    authorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150&auto=format&fit=crop',
    authorBio: 'Arjun Mehta is the Senior Editorial Director for The Film Journal. He writes extensively on international auteur cinema and holds a PhD in Film History from Columbia University.',
    publishedAt: '2026-06-01T15:30:00Z',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1542204172-e7052809a86e?q=80&w=1200&auto=format&fit=crop',
    excerpt: 'We sit down with director Vikramaditya Sengupta to discuss miniature set design, the rejection of greenscreens, and the monumental effort behind his new mythological opus.',
    tags: ['Interviews', 'Indian Cinema', 'Behind The Scenes', 'Set Design'],
    isFeatured: true,
    status: 'Published',
    body: `<p class="lead text-lg text-[#F5F5F0]/90 font-serif mb-6 leading-relaxed">Vikramaditya Sengupta does not build films; he builds entire worlds. His latest production, <i>Dharma’s Wake</i>, is a monumental 3-hour legendary epic that trades the standard greenscreen aesthetic of modern blockbusters for massive, hand-carved stone sets, real miniatures, and forced perspective techniques.</p>
    
    <p class="mb-6">In this exclusive interview, we travel to the outskirts of Hyderabad, where a series of ancient ruins have been completely reconstructed with historical architectural precision. Sengupta describes the immense pressure of directing a cast of thousands, the philosophy of treating myth not as fantasy but as tangible history, and why Indian independent production must stand out through master craftsmanship.</p>

    <h3 class="text-xl font-serif text-[#C9A84C] mt-8 mb-4">Reclaiming the Art of Practical Effects</h3>
    <p class="mb-6"><b>The Film Journal:</b> When looking at the sheer scale of the palace of Rajgiri in your film, the immediate instinct for any contemporary producer would be to generate it using Unreal Engine and physical LED panels. You chose to build a 1:1 scale replica and supplement it with 1:10 scale miniatures. Why?</p>
    
    <p class="mb-6"><b>Vikramaditya Sengupta:</b> There is a tactile lie that CGI tells us. Our eyes are incredibly sophisticated sensors. We understand the physical weight of light when it bounces off stone. When you project light onto a green screen and wrap it around an actor's face, the physics are wrong. We built stone structures because we wanted our actors to touch historical weight. When a character leans against a pillar, we wanted them to feel cold granite, not warm plywood or air. The performance changes because of that tactile truth.</p>

    <blockquote class="border-l-2 border-[#C9A84C] pl-6 my-8 italic font-serif text-lg text-[#F5F5F0]/85 bg-[#111111]/60 py-4 pr-4">
      "If we treat mythology as a fantasy world made of pixels, it lacks spiritual gravity. If we build it with rock, mortar, and sweat, it becomes historical memory."
    </blockquote>

    <h3 class="text-xl font-serif text-[#C9A84C] mt-8 mb-4">A Global Aesthetic Infusion</h3>
    <p class="mb-6"><b>The Film Journal:</b> The sound design of the film integrates instruments that are historically accurate to the 4th Century BC, mixed with sub-bass digital elements. What was the goal behind this hybrid audio palette?</p>
    
    <p class="mb-6"><b>Vikramaditya Sengupta:</b> We wanted something that felt primordial. We tracked down ancient wind instruments and bronze horns from temple vaults. We recorded them in empty cisterns to capture the spatial acoustics. Then, we overlaid low-frequency analog synthesizer tracks. We wanted the sound to feel like a geological shift—not just music, but the literal earth opening up.</p>`
  },
  {
    id: 'box-office-surprises',
    title: 'Box Office Report: The Numbers Behind This Summer\'s Biggest Surprises',
    slug: 'box-office-report-summer-surprises',
    category: 'Box Office',
    author: 'Marcus Sterling',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop',
    authorBio: 'Marcus Sterling covers the financial landscape of modern entertainment. A former investment analyst turned screenwriter, he bridges the gap between artistic expression and commercial sustainability.',
    publishedAt: '2026-05-30T14:45:00Z',
    readTime: '5 min read',
    image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?q=80&w=1200&auto=format&fit=crop',
    excerpt: 'In an era of franchise fatigue, original mid-budget thrillers and avant-garde horror are driving audiences back to the cinemas, shaking up traditional studio calculations.',
    tags: ['Box Office', 'Industry Analysis', 'Summer Blockbusters', 'Cinema Trends'],
    isFeatured: true,
    status: 'Published',
    body: `<p class="lead text-lg text-[#F5F5F0]/90 font-serif mb-6 leading-relaxed">The numbers are in, and they paint a radical picture. The summer box office of 2026 will go down in history as the season the traditional franchise formula cracked, allowing original, auteur-driven mid-budget cinema to claim historic commercial victories.</p>
    
    <p class="mb-6">For the last decade, studio executives have operated under a single, nervous thesis: that standard, globally known IP is the only insurance policy against quiet movie theaters. However, a series of costly franchise failures this summer, contrasted with the explosive theatrical performance of original works, suggests that audiences have hit critical mass with predictable cinematic layouts.</p>

    <h3 class="text-xl font-serif text-[#C9A84C] mt-8 mb-4">The Rise of the Avant-Garde Cash-Cow</h3>
    <p class="mb-6">The star performer of the season was a highly intellectual horror piece budgeted at a modest $15 million. With virtually no CGI and relying on viral, puzzle-based marketing, the film grossed over $140 million domestically in its first three weeks. It is a stunning yield that has had physical distributors reviewing their contracts.</p>

    <div class="my-8">
      <table class="w-full border-collapse text-left text-sm text-[#F5F5F0]">
        <thead>
          <tr class="border-b border-[#2E2E2E] text-[#C9A84C] uppercase text-xs tracking-wider">
            <th class="py-3 px-4">Film Name</th>
            <th class="py-3 px-4">Budget</th>
            <th class="py-3 px-4">Global Gross</th>
            <th class="py-3 px-4">Return on Investment</th>
          </tr>
        </thead>
        <tbody>
          <tr class="border-b border-[#2E2E2E]/60 bg-black/20">
            <td class="py-3 px-4 font-serif font-semibold">The Echo of Echoes (Horror)</td>
            <td class="py-3 px-4">$15M</td>
            <td class="py-3 px-4">$184M</td>
            <td class="py-3 px-4 text-[#C9A84C] font-semibold">1,226%</td>
          </tr>
          <tr class="border-b border-[#2E2E2E]/60">
            <td class="py-3 px-4 font-serif font-semibold">Legacy Sequel III (Sci-Fi)</td>
            <td class="py-3 px-4">$250M</td>
            <td class="py-3 px-4">$192M</td>
            <td class="py-3 px-4 text-red-400 font-semibold">-23%</td>
          </tr>
          <tr class="border-b border-[#2E2E2E]/60 bg-black/20">
            <td class="py-3 px-4 font-serif font-semibold">Midnight in Milan (Romance)</td>
            <td class="py-3 px-4">$8M</td>
            <td class="py-3 px-4">$76M</td>
            <td class="py-3 px-4 text-[#C9A84C] font-semibold">950%</td>
          </tr>
        </tbody>
      </table>
    </div>

    <p class="mb-6">What this table reveals is an appetite for theatrical singularity. Audiences are no longer willing to pay high ticket prices for content that feels like an expensive episodic television show. They want a complete, artistically challenging, and closed cinematic experience that justifies leaving their living rooms.</p>`
  },
  {
    id: 'cyberpunk-new-wave',
    title: 'The New Wave of Cyberpunk: Neon, Nostalgia, and Beyond',
    slug: 'new-wave-cyberpunk-neon-nostalgia-streaming',
    category: 'Streaming',
    author: 'Evelyn Thorne',
    authorAvatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=150&auto=format&fit=crop',
    authorBio: 'Evelyn Thorne is a veteran film critic with over fifteen years of experience in film theory. Her analytical critiques favor visual language, sound design, and Neo-Noir structuralism.',
    publishedAt: '2026-05-28T09:00:00Z',
    readTime: '7 min read',
    image: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?q=80&w=1200&auto=format&fit=crop',
    excerpt: 'How direct-to-streaming science fiction is capturing the neon-soaked anxieties of our digitized age through atmospheric soundtracks and hyper-dense cityscapes.',
    tags: ['Cyberpunk', 'Streaming', 'Science Fiction', 'Aesthetics'],
    isFeatured: false,
    status: 'Published',
    body: `<p class="lead text-lg text-[#F5F5F0]/90 font-serif mb-6 leading-relaxed">Cyberpunk was once an alarm bell; now, it is a nostalgia trip. The genre designed by Gibson and Scott to warn us of mega-corporate digital enclosures has transitioned into an aesthetic comfort blanket, defined by warm pink hues, analog synthesizers, and synthetic rain on asphalt.</p>
    
    <p class="mb-6">A series of recent releases across major streaming platforms suggests that digital screenwriters are grappling with a paradox: how to critique our deeply connected world using visual metaphors that have themselves become commodified marketing designs. As we browse neon-soaked interfaces for our next science fiction fix, we must ask ourselves if cyberpunk can still possess teeth, or if it is simply a stylish, comfortable digital aesthetic.</p>

    <h3 class="text-xl font-serif text-[#C9A84C] mt-8 mb-4">Breaking Free from the Blade Runner Shadow</h3>
    <p class="mb-6">The most significant obstacle facing contemporary cyberpunk is its aesthetic captivity to Ridley Scott’s 1982 masterpiece. Virtually every streaming sci-fi thriller features the same visual guidelines: dark, rain-soaked alleyways, colossal corporate pyramids, and synthetic advertisements floating above crowd-dense streets. The genre’s philosophy has frequently been diluted to mere set decoration.</p>

    <blockquote class="border-l-2 border-[#C9A84C] pl-6 my-8 italic font-serif text-lg text-[#F5F5F0]/85 bg-[#111111]/60 py-4 pr-4">
      "Cyberpunk no longer needs to show us flying cars and cybernetic prosthetics to warn us of our digital vulnerabilities; it only needs to show us a screen locking a user out of their own archive."
    </blockquote>

    <p class="mb-6">The standout indie titles currently streaming avoid these visual traps by focusing on <i>Corporate Minimalist</i> cyberpunk—clean, sterile white lab spaces, algorithmic white noise, and the silent, invisible extraction of personal metadata. It is less flashy, but infinitely more terrifying because it reflects our actual, non-fictional digital landscape.</p>`
  },
  {
    id: 'editorial-tension-editing',
    title: 'A Masterclass in Editorial Tension: The Legacy of Film Editing',
    slug: 'masterclass-editorial-tension-film-editing',
    category: 'News',
    author: 'Marcus Sterling',
    authorAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop',
    authorBio: 'Marcus Sterling covers the financial landscape of modern entertainment. A former investment analyst turned screenwriter, he bridges the gap between artistic expression and commercial sustainability.',
    publishedAt: '2026-05-25T11:20:00Z',
    readTime: '4 min read',
    image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=1200&auto=format&fit=crop',
    excerpt: 'Industry veterans gather to discuss how the subtle art of the cut shapes the emotional landscape of contemporary film, and why editing is the ultimate silent narrator.',
    tags: ['Film Editing', 'Film Craft', 'Auteur Cinema', 'Industry Panel'],
    isFeatured: false,
    status: 'Published',
    body: `<p class="lead text-lg text-[#F5F5F0]/90 font-serif mb-6 leading-relaxed">"The director writes the film on set, but the editor discovers what they actually said." This sentiment, echoed by legendary editor Thelma Schoonmaker, was the focal point of yesterday\'s annual Guild Panel in Los Angeles.</p>
    
    <p class="mb-6">The discussion brought together five of the industry’s most respected editors to dissect a craft that is frequently misunderstood yet represents the very essence of cinematic language. The panel explored the shifting requirements of editorial speed, the psychological exhaustion of processing massive digital rushes, and why the most impactful cuts are often the ones the viewer never notices.</p>

    <h3 class="text-xl font-serif text-[#C9A84C] mt-8 mb-4">The Rhythm of Emotional Restraint</h3>
    <p class="mb-6">Much of the panel’s focus centered on the challenge of maintaining long takes versus high-volume editorial cuts. In current television and blockbuster action, the average shot length has plummeted to under two seconds. The panel argued that this high-tempo edit pattern restricts the visual layout, leaving little room for narrative breathing space or character interiority.</p>

    <p class="mb-6">By studying classic examples of neo-realism, the panel demonstrated how holding a shot past its comfortable duration creates a rare form of emotional gravity. It demands that the viewer study the corners of the frame, look at facial twitches, and share the physical stagnation of the character—a quality that quick cuts wipe clean.</p>`
  }
];

// Content Management helper functions connecting LocalStorage
const LOCAL_STORAGE_POSTS = 'tfj_posts';
const LOCAL_STORAGE_SETTINGS = 'tfj_settings';
const LOCAL_STORAGE_CATEGORIES = 'tfj_categories';

export function getPosts(): Post[] {
  if (typeof window === 'undefined') return DEFAULT_POSTS;
  const stored = localStorage.getItem(LOCAL_STORAGE_POSTS);
  if (!stored) {
    localStorage.setItem(LOCAL_STORAGE_POSTS, JSON.stringify(DEFAULT_POSTS));
    return DEFAULT_POSTS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_POSTS;
  }
}

export function savePosts(posts: Post[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_POSTS, JSON.stringify(posts));
  }
}

export function getSettings(): SiteSettings {
  if (typeof window === 'undefined') return DEFAULT_SETTINGS;
  const stored = localStorage.getItem(LOCAL_STORAGE_SETTINGS);
  if (!stored) {
    localStorage.setItem(LOCAL_STORAGE_SETTINGS, JSON.stringify(DEFAULT_SETTINGS));
    return DEFAULT_SETTINGS;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_SETTINGS;
  }
}

export function saveSettings(settings: SiteSettings): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_SETTINGS, JSON.stringify(settings));
  }
}

export function getCategories(): Category[] {
  if (typeof window === 'undefined') return DEFAULT_CATEGORIES;
  const stored = localStorage.getItem(LOCAL_STORAGE_CATEGORIES);
  if (!stored) {
    localStorage.setItem(LOCAL_STORAGE_CATEGORIES, JSON.stringify(DEFAULT_CATEGORIES));
    return DEFAULT_CATEGORIES;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return DEFAULT_CATEGORIES;
  }
}

export function saveCategories(categories: Category[]): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem(LOCAL_STORAGE_CATEGORIES, JSON.stringify(categories));
  }
}

export function formatRelativeTime(dateString: string): string {
  try {
    const postDate = new Date(dateString);
    const currentDate = new Date();
    const diffMs = currentDate.getTime() - postDate.getTime();
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    
    if (diffHours < 1) {
      const diffMins = Math.floor(diffMs / (1000 * 60));
      return `${diffMins || 1}m ago`;
    }
    if (diffHours < 24) {
      return `${diffHours} hours ago`;
    }
    if (diffHours < 48) {
      return 'Yesterday';
    }
    
    // Format full date for older posts
    return postDate.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  } catch (e) {
    return dateString;
  }
}
