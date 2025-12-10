/**
 * Auto-Generated Blog Content
 * Rich, SEO-optimized blog posts for 3000 Studios
 */

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  tags: string[];
  featured: boolean;
}

export const blogPosts: BlogPost[] = [
  {
    id: "web-design-trends-2025",
    title: "10 Web Design Trends Dominating 2025",
    excerpt: "Discover the cutting-edge design trends that are shaping the digital landscape and how to implement them in your projects.",
    content: `The digital landscape is evolving faster than ever. As we navigate through 2025, several groundbreaking trends are reshaping how we approach web design.

AI-powered personalization is no longer a buzzword—it's the foundation of modern web experiences. Websites now adapt in real-time to user behavior, preferences, and context.

WebGL and Three.js have matured, enabling stunning 3D interfaces. Glassmorphism has evolved beyond simple frosted effects into sophisticated, immersive designs.

At 3000 Studios, we combine these cutting-edge techniques with proven UX principles to create websites that drive real business results.`,
    category: "Design",
    author: "3000 Studios Team",
    date: "2024-12-10",
    readTime: "8 min read",
    tags: ["Web Design", "Trends", "UX", "UI"],
    featured: true
  },
  {
    id: "roi-of-premium-design",
    title: "The ROI of Premium Web Design: Why Quality Matters",
    excerpt: "Investing in quality design isn't an expense—it's a strategic move that pays dividends. Here's the data to prove it.",
    content: `Your website is often the first impression customers have of your business. Studies show that 75% of users judge a company's credibility based on website design.

Our clients typically see 200-400% increases in conversion rates after redesigns. Real examples include a 312% increase in online sales for an e-commerce client and a 4x increase in qualified leads for a B2B service.

We don't just make pretty websites—we build revenue-generating digital assets. Every design decision is backed by data and optimized for your business goals.`,
    category: "Business",
    author: "3000 Studios Team",
    date: "2024-12-08",
    readTime: "6 min read",
    tags: ["Business", "ROI", "Strategy"],
    featured: true
  },
  {
    id: "creative-workflow-optimization",
    title: "Optimizing Your Creative Workflow",
    excerpt: "From chaos to clarity: the systems and tools that help us deliver exceptional work consistently.",
    content: `Great creativity thrives within smart systems. At 3000 Studios, we use Figma for design collaboration, Linear for project management, and Notion for documentation.

Our tech stack includes Next.js, Tailwind CSS, Framer Motion, and Vercel—chosen for speed, flexibility, and developer experience.

Quality control is paramount: design reviews, user testing, code reviews, performance audits, and accessibility checks ensure every project meets our high standards.`,
    category: "Process",
    author: "3000 Studios Team",
    date: "2024-12-05",
    readTime: "7 min read",
    tags: ["Workflow", "Tools", "Productivity"],
    featured: false
  },
  {
    id: "portfolio-that-converts",
    title: "Building a Portfolio That Converts Clients",
    excerpt: "Your portfolio isn't just a showcase—it's a sales tool. Here's how to make it work for you.",
    content: `A portfolio should actively sell your services. Every project should tell a story: the challenge, your solution, and measurable results.

Strategic project selection is key—show your best work that represents the clients you want to attract. Use a proven case study format: context, challenge, solution, results, and beautiful visuals.

Your portfolio's technical quality speaks volumes. Lightning-fast loading, flawless responsive design, and smooth animations demonstrate your capabilities before a client even reads a word.`,
    category: "Marketing",
    author: "3000 Studios Team",
    date: "2024-12-03",
    readTime: "6 min read",
    tags: ["Portfolio", "Marketing", "Sales"],
    featured: false
  },
  {
    id: "future-of-ecommerce",
    title: "The Future of E-Commerce",
    excerpt: "E-commerce is evolving beyond transactions into immersive, personalized experiences.",
    content: `Online shopping is transforming. AR and VR integration allows customers to see furniture in their room before buying and try on clothes virtually.

AI-powered personalization creates shopping experiences that adapt to each customer with smart recommendations and predictive inventory management.

Social commerce is booming—Instagram and TikTok storefronts, live shopping events, and influencer partnerships are changing how people discover and buy products. At 3000 Studios, we build e-commerce experiences architected for the future.`,
    category: "E-Commerce",
    author: "3000 Studios Team",
    date: "2024-12-01",
    readTime: "7 min read",
    tags: ["E-Commerce", "Future", "Technology"],
    featured: true
  }
];

export function getFeaturedPosts(): BlogPost[] {
  return blogPosts.filter(post => post.featured);
}

export function getPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(post => post.category === category);
}

export function getPostById(id: string): BlogPost | undefined {
  return blogPosts.find(post => post.id === id);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(blogPosts.map(post => post.category)));
}

export function getAllTags(): string[] {
  const tags = blogPosts.flatMap(post => post.tags);
  return Array.from(new Set(tags));
}
