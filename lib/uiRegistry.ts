/**
 * Global UI Registry
 * Single source of truth for all UI configuration
 */

export const uiRegistry = {
  theme: "luxury-dark",
  
  nav: {
    logo: "https://res.cloudinary.com/dj92eb97f/image/upload/v1767046287/new_logo-min_zd44u2.png",
    public: [
      "/",
      "/about",
      "/blog",
      "/contact",
      "/portfolio",
      "/projects",
      "/jws",
      "/live",
      "/store",
      "/apps",
      "/revenue",
      "/vendors-platform"
    ],
    admin: [
      "/admin",
      "/admin/dashboard",
      "/admin/revenue",
      "/admin/editor",
      "/admin/builder",
      "/admin/settings"
    ]
  },
  
  audio: {
    enabled: true,
    background: "/audio/ambient.mp3",
    volume: 0.2
  },
  
  video: {
    intro: "https://res.cloudinary.com/dj92eb97f/video/upload/v1767186687/1230_ptjsbp.mp4",
    hero: "https://res.cloudinary.com/dj92eb97f/video/upload/v1767186687/1230_ptjsbp.mp4"
  },
  
  branding: {
    siteName: "3000 Studios",
    tagline: "Award-Winning Creative Studio"
  }
};

export function updateRegistry(target: keyof typeof uiRegistry, payload: any) {
  uiRegistry[target] = {
    ...uiRegistry[target],
    ...payload
  };
}
