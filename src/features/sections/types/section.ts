export enum SectionType {
  HERO = 'hero',
  FEATURES = 'features',
  PRICING = 'pricing',
  TESTIMONIALS = 'testimonials',
  CONTACT = 'contact',
  GALLERY = 'gallery',
  TEXT = 'text',
  CTA = 'cta',
  HEADER = 'header',
  FOOTER = 'footer',
}

// Basic section interface
export interface Section {
  id: string;
  type: SectionType;
  content: SectionContent; // This will be type-specific content
  createdAt: string;
  updatedAt: string;
}

// Union type for all section content types
export type SectionContent =
  | HeroContent
  | FeaturesContent
  | TextContent
  | PricingContent
  | TestimonialsContent
  | ContactContent
  | GalleryContent
  | CTAContent
  | HeaderContent
  | FooterContent;

// Hero section
export interface HeroContent {
  title: string;
  subtitle?: string;
  backgroundImage?: string;
  buttonText?: string;
  buttonLink?: string;
}

// Features section
export interface FeatureItem {
  id: string;
  title: string;
  description: string;
  icon?: string;
}

export interface FeaturesContent {
  title: string;
  description?: string;
  items: FeatureItem[];
}

// Pricing section
export interface PricingPlan {
  id: string;
  name: string;
  price: string;
  interval?: string;
  features: string[];
  buttonText: string;
  buttonLink?: string;
  isHighlighted?: boolean;
}

export interface PricingContent {
  title: string;
  description?: string;
  plans: PricingPlan[];
}

// Testimonials section
export interface Testimonial {
  id: string;
  content: string;
  author: string;
  role?: string;
  avatar?: string;
}

export interface TestimonialsContent {
  title: string;
  testimonials: Testimonial[];
}

// Contact section
export interface ContactContent {
  title: string;
  description?: string;
  email?: string;
  phone?: string;
  address?: string;
  mapUrl?: string;
  showForm?: boolean;
}

// Gallery section
export interface GalleryItem {
  id: string;
  image: string;
  caption?: string;
  link?: string;
}

export interface GalleryContent {
  title?: string;
  description?: string;
  items: GalleryItem[];
}

// Text section
export interface TextContent {
  title?: string;
  content: string;
}

// CTA (Call to Action) section
export interface CTAContent {
  title: string;
  description?: string;
  buttonText: string;
  buttonLink?: string;
  backgroundImage?: string;
}

// Header section
export interface MenuItem {
  id: string;
  label: string;
  link: string;
  children?: MenuItem[];
}

export interface HeaderContent {
  logo?: string;
  menuItems: MenuItem[];
  showContactButton?: boolean;
  contactButtonText?: string;
  contactButtonLink?: string;
}

// Footer section
export interface FooterLink {
  id: string;
  label: string;
  link: string;
}

export interface FooterLinkGroup {
  id: string;
  title: string;
  links: FooterLink[];
}

export interface FooterContent {
  logo?: string;
  description?: string;
  linkGroups?: FooterLinkGroup[];
  socialLinks?: FooterLink[];
  copyright?: string;
}
