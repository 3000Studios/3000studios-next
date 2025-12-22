/**
 * Product Data for 3000 Studios Store
 * Expanded product catalog with diverse offerings
 */

// Affiliate link constants (load from environment variables)
// In production, set these via environment variables for security
const AMAZON_AFFILIATE_TAG = process.env.NEXT_PUBLIC_AMAZON_AFFILIATE_TAG || '3000studios-20';
const CLICKBANK_AFFILIATE_URL = process.env.NEXT_PUBLIC_CLICKBANK_AFFILIATE_URL || 'https://3000studios.pay.clickbank.net';
const JVZOO_AFFILIATE_URL = process.env.NEXT_PUBLIC_JVZOO_AFFILIATE_URL || 'https://www.jvzoo.com/3000studios';

export interface Product {
  productId: string;
  name: string;
  description: string;
  price: number;
  category: string;
  rating: number;
  reviewCount: number;
  image?: string;
  inStock: boolean;
  affiliateLink?: string;
  featured?: boolean;
  tags?: string[];
  commission?: number; // Commission percentage or fixed amount
  commissionType?: 'percentage' | 'fixed'; // Type of commission
}

export const productCatalog: Product[] = [
  // Digital Products
  {
    productId: "prod-001",
    name: "Premium Website Template - Business",
    description:
      "Fully responsive, modern business website template built with Next.js and Tailwind CSS. Includes 15+ pages, dark mode, and SEO optimization.",
    price: 149.99,
    category: "Templates",
    rating: 4.9,
    reviewCount: 127,
    inStock: true,
    featured: true,
    tags: ["Next.js", "Tailwind", "Business", "SEO"],
  },
  {
    productId: "prod-002",
    name: "E-Commerce Starter Kit",
    description:
      "Complete e-commerce solution with shopping cart, checkout, payment integration, and admin dashboard. Ready to deploy.",
    price: 299.99,
    category: "Templates",
    rating: 4.8,
    reviewCount: 89,
    inStock: true,
    featured: true,
    tags: ["E-Commerce", "Stripe", "PayPal", "Admin"],
  },
  {
    productId: "prod-003",
    name: "UI Component Library Pro",
    description:
      "200+ premium React components with TypeScript support, Storybook documentation, and dark mode. Save hundreds of hours.",
    price: 199.99,
    category: "Design",
    rating: 4.9,
    reviewCount: 203,
    inStock: true,
    featured: true,
    tags: ["React", "Components", "TypeScript", "Storybook"],
  },
  {
    productId: "prod-004",
    name: "SaaS Dashboard Template",
    description:
      "Modern SaaS dashboard with analytics, user management, billing integration, and real-time updates. Production-ready.",
    price: 249.99,
    category: "Templates",
    rating: 4.7,
    reviewCount: 156,
    inStock: true,
    featured: false,
    tags: ["SaaS", "Dashboard", "Analytics", "Billing"],
  },
  {
    productId: "prod-005",
    name: "Landing Page Bundle - 10 Pack",
    description:
      "Collection of 10 high-converting landing page templates. Each optimized for conversions with A/B testing built-in.",
    price: 179.99,
    category: "Templates",
    rating: 4.8,
    reviewCount: 94,
    inStock: true,
    featured: false,
    tags: ["Landing Pages", "Conversion", "Marketing"],
  },
  {
    productId: "prod-006",
    name: "Animation Library Premium",
    description:
      "Smooth, performant animations for React. Includes 100+ pre-built animations with full customization options.",
    price: 89.99,
    category: "Digital",
    rating: 4.9,
    reviewCount: 178,
    inStock: true,
    featured: false,
    tags: ["Animations", "React", "Framer Motion"],
  },
  {
    productId: "prod-007",
    name: "Blog Theme - Content Creator",
    description:
      "Beautiful, fast blog theme with MDX support, syntax highlighting, and built-in newsletter integration.",
    price: 129.99,
    category: "Themes",
    rating: 4.8,
    reviewCount: 112,
    inStock: true,
    featured: false,
    tags: ["Blog", "MDX", "Newsletter", "SEO"],
  },
  {
    productId: "prod-008",
    name: "Portfolio Showcase Template",
    description:
      "Stunning portfolio template for creatives. Includes project galleries, case studies, and contact forms.",
    price: 99.99,
    category: "Templates",
    rating: 4.7,
    reviewCount: 87,
    inStock: true,
    featured: false,
    tags: ["Portfolio", "Gallery", "Creative"],
  },
  {
    productId: "prod-009",
    name: "Design System Starter",
    description:
      "Complete design system with Figma files, React components, and comprehensive documentation. Perfect for teams.",
    price: 349.99,
    category: "Design",
    rating: 4.9,
    reviewCount: 145,
    inStock: true,
    featured: true,
    tags: ["Design System", "Figma", "Teams", "Components"],
  },
  {
    productId: "prod-010",
    name: "Mobile App UI Kit",
    description:
      "Premium mobile UI kit with 150+ screens for iOS and Android. Includes Figma and Sketch files.",
    price: 169.99,
    category: "Design",
    rating: 4.8,
    reviewCount: 134,
    inStock: true,
    featured: false,
    tags: ["Mobile", "UI Kit", "Figma", "Sketch"],
  },
  {
    productId: "prod-011",
    name: "SEO Toolkit Pro",
    description:
      "Comprehensive SEO toolkit with keyword research, site audits, and competitor analysis. Boost your rankings.",
    price: 79.99,
    category: "Digital",
    rating: 4.7,
    reviewCount: 201,
    inStock: true,
    featured: false,
    tags: ["SEO", "Marketing", "Analytics"],
  },
  {
    productId: "prod-012",
    name: "Icon Pack - 1000+ Premium Icons",
    description:
      "Massive collection of premium icons in SVG, PNG, and icon font formats. Customizable and production-ready.",
    price: 49.99,
    category: "Design",
    rating: 4.9,
    reviewCount: 312,
    inStock: true,
    featured: false,
    tags: ["Icons", "SVG", "Design Assets"],
  },
  {
    productId: "prod-013",
    name: "Email Template Suite",
    description:
      "50+ responsive email templates for marketing, transactional, and newsletter campaigns. Works with all major ESPs.",
    price: 89.99,
    category: "Templates",
    rating: 4.6,
    reviewCount: 76,
    inStock: true,
    featured: false,
    tags: ["Email", "Marketing", "Templates"],
  },
  {
    productId: "prod-014",
    name: "Admin Dashboard Pro",
    description:
      "Feature-rich admin dashboard with user management, analytics, reports, and customizable widgets.",
    price: 279.99,
    category: "Templates",
    rating: 4.8,
    reviewCount: 98,
    inStock: true,
    featured: true,
    tags: ["Admin", "Dashboard", "Analytics"],
  },
  {
    productId: "prod-015",
    name: "Social Media Graphics Pack",
    description:
      "500+ customizable social media templates for Instagram, Facebook, Twitter, and LinkedIn.",
    price: 59.99,
    category: "Design",
    rating: 4.7,
    reviewCount: 189,
    inStock: true,
    featured: false,
    tags: ["Social Media", "Graphics", "Marketing"],
  },
  {
    productId: "prod-016",
    name: "WordPress Theme - Agency",
    description:
      "Premium WordPress theme for creative agencies. Includes Elementor integration and 20+ demo sites.",
    price: 159.99,
    category: "Themes",
    rating: 4.8,
    reviewCount: 167,
    inStock: true,
    featured: false,
    tags: ["WordPress", "Agency", "Elementor"],
  },
  {
    productId: "prod-017",
    name: "Figma UI Kit - Mobile Banking",
    description:
      "Complete mobile banking app UI kit with 80+ screens, components library, and style guide.",
    price: 139.99,
    category: "Design",
    rating: 4.9,
    reviewCount: 92,
    inStock: true,
    featured: false,
    tags: ["Figma", "Mobile", "Banking", "UI Kit"],
  },
  {
    productId: "prod-018",
    name: "Startup Launch Bundle",
    description:
      "Everything a startup needs: website template, pitch deck, social media kit, and brand guidelines.",
    price: 399.99,
    category: "Digital",
    rating: 4.9,
    reviewCount: 67,
    inStock: true,
    featured: true,
    tags: ["Startup", "Bundle", "Branding", "Complete"],
  },
  {
    productId: "prod-019",
    name: "Video Background Collection",
    description:
      "50 premium 4K video backgrounds perfect for hero sections and landing pages. Multiple categories.",
    price: 79.99,
    category: "Digital",
    rating: 4.6,
    reviewCount: 143,
    inStock: true,
    featured: false,
    tags: ["Video", "Backgrounds", "4K"],
  },
  {
    productId: "prod-020",
    name: "Code Snippet Library",
    description:
      "300+ production-ready code snippets for React, Vue, and vanilla JavaScript. Copy, paste, customize.",
    price: 69.99,
    category: "Digital",
    rating: 4.8,
    reviewCount: 234,
    inStock: true,
    featured: false,
    tags: ["Code", "Snippets", "React", "JavaScript"],
  },
  {
    productId: "prod-021",
    name: "Branding Guidelines Template",
    description:
      "Professional brand guidelines template with logo usage, color palettes, typography, and examples.",
    price: 54.99,
    category: "Design",
    rating: 4.7,
    reviewCount: 108,
    inStock: true,
    featured: false,
    tags: ["Branding", "Guidelines", "Identity"],
  },
  {
    productId: "prod-022",
    name: "Restaurant Website Template",
    description:
      "Delicious restaurant website template with online ordering, reservations, and menu management.",
    price: 189.99,
    category: "Templates",
    rating: 4.8,
    reviewCount: 79,
    inStock: true,
    featured: false,
    tags: ["Restaurant", "Ordering", "Reservations"],
  },
  {
    productId: "prod-023",
    name: "Fitness App UI Kit",
    description:
      "Complete fitness app UI with workout tracking, nutrition planning, and social features. 100+ screens.",
    price: 149.99,
    category: "Design",
    rating: 4.9,
    reviewCount: 86,
    inStock: true,
    featured: false,
    tags: ["Fitness", "Mobile", "UI Kit", "Health"],
  },
  {
    productId: "prod-024",
    name: "Real Estate Platform Template",
    description:
      "Full-featured real estate platform with property listings, search, virtual tours, and agent profiles.",
    price: 329.99,
    category: "Templates",
    rating: 4.7,
    reviewCount: 54,
    inStock: true,
    featured: true,
    tags: ["Real Estate", "Listings", "Search"],
  },
  {
    productId: "gear-001",
    name: "Sony A7 IV Mirrorless Camera",
    description:
      "The ultimate hybrid camera for content creators. 33MP Full-Frame sensor, 4K 60p, and incredible autofocus.",
    price: 2498.0,
    category: "Gear",
    rating: 5.0,
    reviewCount: 3420,
    inStock: true,
    featured: true,
    tags: ["Camera", "Sony", "Video", "Photography"],
    affiliateLink: "https://amzn.to/3EXAMPLE",
  },
  {
    productId: "gear-002",
    name: 'MacBook Pro 16" M3 Max',
    description:
      "Unstopdable performance for creative pros. 48GB Unified Memory, 1TB SSD, Space Black.",
    price: 3499.0,
    category: "Gear",
    rating: 4.9,
    reviewCount: 890,
    inStock: true,
    featured: true,
    tags: ["Apple", "MacBook", "Laptop", "Dev"],
    affiliateLink: "https://amzn.to/3EXAMPLE",
  },
  {
    productId: "gear-003",
    name: "Shure SM7B Vocal Microphone",
    description:
      "The legendary broadcasting microphone. Perfect for podcasting, streaming, and voiceovers.",
    price: 399.0,
    category: "Gear",
    rating: 4.9,
    reviewCount: 15400,
    inStock: true,
    featured: false,
    tags: ["Audio", "Microphone", "Streaming"],
    affiliateLink: "https://amzn.to/3EXAMPLE",
>>>>>>> origin/pr/50
  },
  
  // ========================================
  // AFFILIATE PRODUCTS - AMAZON ASSOCIATES
  // ========================================
  {
    productId: 'aff-amz-001',
    name: 'Professional Webcam 4K - Streaming & Video Conferencing',
    description: 'High-quality 4K webcam perfect for content creators, streamers, and professionals. Features autofocus, HDR, and stereo microphones. Ideal for YouTube, Twitch, and business meetings.',
    price: 129.99,
    category: 'Hardware',
    rating: 4.7,
    reviewCount: 8453,
    inStock: true,
    featured: true,
    affiliateLink: `https://www.amazon.com/dp/B08CF3J8XX?tag=${AMAZON_AFFILIATE_TAG}`, // Amazon Associates link
    tags: ['Webcam', '4K', 'Streaming', 'Content Creation', 'Video'],
  },
  {
    productId: 'aff-amz-002',
    name: 'Mechanical Gaming Keyboard RGB - Programmable',
    description: 'Premium mechanical keyboard with customizable RGB lighting, programmable keys, and tactile switches. Perfect for developers, gamers, and power users.',
    price: 89.99,
    category: 'Hardware',
    rating: 4.6,
    reviewCount: 12789,
    inStock: true,
    featured: true,
    affiliateLink: `https://www.amazon.com/dp/B07Y3LNZV1?tag=${AMAZON_AFFILIATE_TAG}`, // Amazon Associates link
    tags: ['Keyboard', 'Mechanical', 'RGB', 'Gaming', 'Programming'],
  },
  {
    productId: 'aff-amz-003',
    name: 'Studio Quality USB Microphone with Stand',
    description: 'Professional condenser microphone for podcasting, streaming, voiceovers, and music recording. Plug-and-play USB connection with zero latency monitoring.',
    price: 149.99,
    category: 'Hardware',
    rating: 4.8,
    reviewCount: 15234,
    inStock: true,
    featured: true,
    affiliateLink: `https://www.amazon.com/dp/B08G86K7P7?tag=${AMAZON_AFFILIATE_TAG}`, // Amazon Associates link
    tags: ['Microphone', 'Audio', 'Podcasting', 'Streaming', 'Recording'],
  },
  {
    productId: 'aff-amz-004',
    name: 'Portable SSD 2TB - Ultra Fast External Storage',
    description: 'Lightning-fast portable SSD with USB-C 3.2 Gen 2 for blazing transfer speeds up to 1050MB/s. Perfect for video editors, photographers, and content creators.',
    price: 179.99,
    category: 'Hardware',
    rating: 4.9,
    reviewCount: 9876,
    inStock: true,
    featured: false,
    affiliateLink: `https://www.amazon.com/dp/B08GTYFC37?tag=${AMAZON_AFFILIATE_TAG}`, // Amazon Associates link
    tags: ['SSD', 'Storage', 'External', 'USB-C', 'Fast'],
  },
  {
    productId: 'aff-amz-005',
    name: 'Ergonomic Office Chair - Premium Comfort',
    description: 'High-back mesh office chair with lumbar support, adjustable armrests, and headrest. Designed for all-day comfort during long coding or design sessions.',
    price: 299.99,
    category: 'Office',
    rating: 4.5,
    reviewCount: 6543,
    inStock: true,
    featured: false,
    affiliateLink: `https://www.amazon.com/dp/B07TPZX7Y9?tag=${AMAZON_AFFILIATE_TAG}`, // Amazon Associates link
    tags: ['Office Chair', 'Ergonomic', 'Comfort', 'Productivity'],
  },
  {
    productId: 'aff-amz-006',
    name: 'Drawing Tablet with Screen 15.6" - Digital Art',
    description: 'Professional pen display tablet with 8192 pressure levels, battery-free stylus, and full lamination. Perfect for digital artists, illustrators, and designers.',
    price: 449.99,
    category: 'Hardware',
    rating: 4.7,
    reviewCount: 4321,
    inStock: true,
    featured: true,
    affiliateLink: `https://www.amazon.com/dp/B08CLPVJZH?tag=${AMAZON_AFFILIATE_TAG}`, // Amazon Associates link
    tags: ['Drawing Tablet', 'Digital Art', 'Pen Display', 'Design'],
  },
  
  // ========================================
  // AFFILIATE PRODUCTS - CLICKBANK
  // ========================================
  {
    productId: 'aff-cb-001',
    name: 'Complete Web Development Bootcamp 2024',
    description: 'Master full-stack web development from zero to hero. Includes HTML, CSS, JavaScript, React, Node.js, MongoDB, and deployment. 300+ hours of content with projects.',
    price: 199.99,
    category: 'Education',
    rating: 4.9,
    reviewCount: 45678,
    inStock: true,
    featured: true,
    affiliateLink: CLICKBANK_AFFILIATE_URL, // ClickBank affiliate link
    tags: ['Course', 'Web Development', 'Full-Stack', 'Programming', 'Bootcamp'],
  },
  {
    productId: 'aff-cb-002',
    name: 'AI & Machine Learning Mastery Course',
    description: 'Learn artificial intelligence and machine learning from industry experts. Covers Python, TensorFlow, PyTorch, neural networks, and real-world AI applications.',
    price: 249.99,
    category: 'Education',
    rating: 4.8,
    reviewCount: 23456,
    inStock: true,
    featured: true,
    affiliateLink: CLICKBANK_AFFILIATE_URL, // ClickBank affiliate link
    tags: ['AI', 'Machine Learning', 'Python', 'Course', 'Neural Networks'],
  },
  {
    productId: 'aff-cb-003',
    name: 'Social Media Marketing Blueprint - Grow Your Brand',
    description: 'Complete guide to social media marketing across all major platforms. Learn content strategy, paid advertising, influencer marketing, and analytics.',
    price: 149.99,
    category: 'Marketing',
    rating: 4.7,
    reviewCount: 18901,
    inStock: true,
    featured: false,
    affiliateLink: CLICKBANK_AFFILIATE_URL, // ClickBank affiliate link
    tags: ['Marketing', 'Social Media', 'Branding', 'Course', 'Strategy'],
  },
  {
    productId: 'aff-cb-004',
    name: 'Passive Income Blueprint - Digital Products',
    description: 'Learn how to create and sell digital products for passive income. Covers product creation, marketing, automation, and scaling your online business.',
    price: 179.99,
    category: 'Business',
    rating: 4.6,
    reviewCount: 12345,
    inStock: true,
    featured: true,
    affiliateLink: CLICKBANK_AFFILIATE_URL, // ClickBank affiliate link
    tags: ['Passive Income', 'Digital Products', 'Business', 'Course', 'Entrepreneurship'],
  },
  {
    productId: 'aff-cb-005',
    name: 'Graphic Design Masterclass - Adobe Creative Suite',
    description: 'Complete graphic design training covering Photoshop, Illustrator, InDesign, and Figma. From basics to advanced techniques with 50+ real projects.',
    price: 189.99,
    category: 'Design',
    rating: 4.8,
    reviewCount: 19234,
    inStock: true,
    featured: true,
    affiliateLink: CLICKBANK_AFFILIATE_URL, // ClickBank affiliate link
    tags: ['Graphic Design', 'Adobe', 'Photoshop', 'Course', 'Creative'],
  },
  {
    productId: 'aff-cb-006',
    name: 'YouTube Success Formula - Grow & Monetize',
    description: 'Proven strategies to grow your YouTube channel from 0 to 100K+ subscribers. Covers content creation, SEO, thumbnails, monetization, and sponsorships.',
    price: 159.99,
    category: 'Marketing',
    rating: 4.7,
    reviewCount: 16789,
    inStock: true,
    featured: false,
    affiliateLink: CLICKBANK_AFFILIATE_URL, // ClickBank affiliate link
    tags: ['YouTube', 'Content Creation', 'Video', 'Course', 'Monetization'],
  },
  {
    productId: 'aff-cb-007',
    name: 'SEO Secrets - Rank #1 on Google',
    description: 'Advanced SEO training to dominate search rankings. Learn keyword research, on-page optimization, link building, technical SEO, and content strategy.',
    price: 169.99,
    category: 'Marketing',
    rating: 4.8,
    reviewCount: 14567,
    inStock: true,
    featured: false,
    affiliateLink: CLICKBANK_AFFILIATE_URL, // ClickBank affiliate link
    tags: ['SEO', 'Google', 'Marketing', 'Course', 'Search Engine'],
  },
  
  // ========================================
  // ADDITIONAL AFFILIATE - SOFTWARE & TOOLS
  // ========================================
  {
    productId: 'aff-soft-001',
    name: 'Video Editing Software Pro - Lifetime License',
    description: 'Professional video editing software with 4K support, motion graphics, color grading, and audio editing. One-time payment, lifetime updates included.',
    price: 299.99,
    category: 'Software',
    rating: 4.6,
    reviewCount: 8765,
    inStock: true,
    featured: true,
    affiliateLink: JVZOO_AFFILIATE_URL, // JVZoo affiliate link
    tags: ['Video Editing', 'Software', '4K', 'Professional', 'Lifetime'],
  },
  {
    productId: 'aff-soft-002',
    name: 'Website Builder Pro - Drag & Drop Platform',
    description: 'Build stunning websites without coding. Includes 500+ templates, e-commerce, SEO tools, and hosting. Perfect for businesses and freelancers.',
    price: 29.99,
    category: 'Software',
    rating: 4.5,
    reviewCount: 11234,
    inStock: true,
    featured: false,
    affiliateLink: JVZOO_AFFILIATE_URL, // JVZoo affiliate link
    tags: ['Website Builder', 'No-Code', 'Templates', 'E-Commerce', 'Monthly'],
  },
  {
    productId: 'aff-soft-003',
    name: 'Email Marketing Suite - Automation & Analytics',
    description: 'Complete email marketing platform with automation workflows, A/B testing, segmentation, and detailed analytics. Grow your list and boost conversions.',
    price: 49.99,
    category: 'Software',
    rating: 4.7,
    reviewCount: 9876,
    inStock: true,
    featured: false,
    affiliateLink: JVZOO_AFFILIATE_URL, // JVZoo affiliate link
    tags: ['Email Marketing', 'Automation', 'Analytics', 'SaaS', 'Monthly'],
  },
];

export function getFeaturedProducts(): Product[] {
  return productCatalog.filter((p) => p.featured);
}

export function getProductsByCategory(category: string): Product[] {
  return productCatalog.filter((p) => p.category === category);
}

export function getProductById(id: string): Product | undefined {
  return productCatalog.find((p) => p.productId === id);
}

export function getAllCategories(): string[] {
  return Array.from(new Set(productCatalog.map((p) => p.category)));
}

export function getAffiliateProducts(): Product[] {
  return productCatalog.filter(p => p.affiliateLink);
}

export function getFeaturedAffiliateProducts(): Product[] {
  return productCatalog.filter(p => p.affiliateLink && p.featured);
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return productCatalog.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.description.toLowerCase().includes(lowerQuery) ||
      p.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
>>>>>>> origin/pr/50
  );
}
