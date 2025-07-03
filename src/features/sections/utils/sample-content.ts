import {
  SectionType,
  HeroContent,
  FeaturesContent,
  TextContent,
  PricingContent,
  TestimonialsContent,
  ContactContent,
  GalleryContent,
  CTAContent,
  HeaderContent,
  FooterContent,
  SectionContent,
} from '../types/section';

// Generate sample hero content
const generateHeroContent = (): HeroContent => ({
  title: 'Build Your Dream Website Today',
  description:
    'Create beautiful websites without writing a single line of code.',
  buttonText: 'Get Started',
  buttonLink: '#',
  backgroundImage:
    'https://images.unsplash.com/photo-1579546929662-711aa81148cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
  alignment: 'center',
});

// Generate sample features content
const generateFeaturesContent = (): FeaturesContent => ({
  title: 'Key Features',
  description: 'Designed to help you build faster',
  items: [
    {
      id: 'feature-1',
      title: 'Easy to Use',
      description: 'Intuitive drag and drop interface',
      icon: 'Mouse',
    },
    {
      id: 'feature-2',
      title: 'Responsive',
      description: 'Looks great on any device',
      icon: 'Smartphone',
    },
    {
      id: 'feature-3',
      title: 'Customizable',
      description: 'Tailor to your specific needs',
      icon: 'Settings',
    },
    {
      id: 'feature-4',
      title: 'Fast Loading',
      description: 'Optimized for performance',
      icon: 'Zap',
    },
  ],
});

// Generate sample text content
const generateTextContent = (): TextContent => ({
  title: 'About Our Platform',
  content: `<p>Our platform is designed to help you create stunning websites without any technical knowledge. Whether you're a small business owner, entrepreneur, or creative professional, our tools make it easy to build your online presence.</p><p>With our intuitive interface, you can customize every aspect of your site. Choose from professionally designed templates, add your content, and publish in minutes.</p>`,
});

// Generate sample pricing content
const generatePricingContent = (): PricingContent => ({
  title: 'Pricing Plans',
  description: 'Choose the plan that fits your needs',
  plans: [
    {
      id: 'pricing-1',
      name: 'Basic',
      price: '$9.99',
      interval: 'monthly',
      features: [
        'Up to 5 pages',
        'Basic templates',
        'Custom domain',
        '24/7 Support',
      ],
      buttonText: 'Get Started',
      buttonLink: '#',
      featured: false,
      description: 'Perfect for personal websites',
    },
    {
      id: 'pricing-2',
      name: 'Professional',
      price: '$19.99',
      interval: 'monthly',
      features: [
        'Up to 20 pages',
        'Premium templates',
        'Custom domain',
        'Priority support',
        'Analytics',
      ],
      buttonText: 'Get Started',
      buttonLink: '#',
      featured: true,
      description: 'Ideal for businesses',
    },
    {
      id: 'pricing-3',
      name: 'Enterprise',
      price: '$49.99',
      interval: 'monthly',
      features: [
        'Unlimited pages',
        'All templates',
        'Custom domain',
        'Dedicated support',
        'Advanced analytics',
        'SEO tools',
      ],
      buttonText: 'Contact Us',
      buttonLink: '#',
      featured: false,
      description: 'For large organizations',
    },
  ],
});

// Generate sample testimonials content
const generateTestimonialsContent = (): TestimonialsContent => ({
  title: 'What Our Customers Say',
  description: 'Trusted by thousands of businesses worldwide',
  testimonials: [
    {
      id: 'testimonials-1',
      content: `This platform transformed how we build websites. It's incredibly intuitive and powerful.`,
      author: 'Sarah Johnson',
      role: 'Marketing Director',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      rating: 5,
      company: 'TechCorp',
    },
    {
      id: 'testimonials-2',
      content:
        'I had my website up and running in just a few hours. The templates are beautiful and customizable.',
      author: 'Michael Chen',
      role: 'Entrepreneur',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      rating: 4,
      company: 'StartupLab',
    },
    {
      id: 'testimonials-3',
      content:
        'The customer support is phenomenal. They helped me every step of the way.',
      author: 'Emma Davis',
      role: 'Small Business Owner',
      avatar: 'https://randomuser.me/api/portraits/women/3.jpg',
      rating: 5,
      company: 'Craft Studio',
    },
  ],
});

// Generate sample contact content
const generateContactContent = (): ContactContent => ({
  title: 'Get In Touch',
  description: `We'd love to hear from you`,
  email: 'contact@example.com',
  phone: '+1 (555) 123-4567',
  address: '123 Main Street, City, Country',
  showForm: true,
  socialLinks: [
    { id: 'social-link-1', label: 'Twitter', link: 'https://twitter.com' },
    { id: 'social-link-2', label: 'Facebook', link: 'https://facebook.com' },
    { id: 'social-link-3', label: 'Instagram', link: 'https://instagram.com' },
  ],
});

// Generate sample gallery content
const generateGalleryContent = (): GalleryContent => ({
  title: 'Our Work',
  description: 'Browse through our recent projects',
  items: [
    {
      id: `gallery-1`,
      image:
        'https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      caption: 'Modern Dashboard Design',
      link: '#',
    },
    {
      id: `gallery-2`,
      image:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1115&q=80',
      caption: 'E-commerce Platform',
      link: '#',
    },
    {
      id: `gallery-3`,
      image:
        'https://images.unsplash.com/photo-1581291518633-83b4ebd1d83e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      caption: 'Mobile Application',
      link: '#',
    },
    {
      id: `gallery-4`,
      image:
        'https://images.unsplash.com/photo-1541560052-3744e48ab80b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1059&q=80',
      caption: 'Website Redesign',
      link: '#',
    },
  ],
});

// Generate sample CTA content
const generateCTAContent = (): CTAContent => ({
  title: 'Ready to Get Started?',
  description: `Join thousands of satisfied customers today`,
  buttonText: 'Sign Up Now',
  buttonLink: '#',
  backgroundImage:
    'https://images.unsplash.com/photo-1557683316-973673baf926?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1129&q=80',
});

// Generate sample header content
const generateHeaderContent = (): HeaderContent => ({
  logo: `WebBuilder`,
  menuItems: [
    { id: 'menu-item-1', label: 'Home', link: '#' },
    { id: 'menu-item-2', label: 'Features', link: '#' },
    { id: 'menu-item-3', label: 'Pricing', link: '#' },
    { id: 'menu-item-4', label: 'About', link: '#' },
    { id: 'menu-item-5', label: 'Contact', link: '#' },
  ],
  contactButtonText: 'Get Started',
  contactButtonLink: '#',
});

// Generate sample footer content
const generateFooterContent = (): FooterContent => ({
  logo: {
    text: 'WebBuilder',
    image: '',
  },
  description: 'Create beautiful websites without code.',
  copyright: `© ${new Date().getFullYear()} WebBuilder. All rights reserved.`,
  linkGroups: [
    {
      id: ``,
      title: 'Company',
      links: [
        { id: 'footer-link-1', label: 'About us', link: '#' },
        { id: 'footer-link-2', label: 'Careers', link: '#' },
        { id: 'footer-link-3', label: 'Blog', link: '#' },
      ],
    },
    {
      id: ``,
      title: 'Resources',
      links: [
        { id: 'footer-link-4', label: 'Documentation', link: '#' },
        { id: 'footer-link-5', label: 'Tutorials', link: '#' },
        { id: 'footer-link-6', label: 'Support', link: '#' },
      ],
    },
    {
      id: ``,
      title: 'Legal',
      links: [
        { id: 'footer-link-7', label: 'Privacy Policy', link: '#' },
        { id: 'footer-link-8', label: 'Terms of Service', link: '#' },
      ],
    },
  ],
  socialLinks: [
    { id: 'footer-link-9', label: 'Twitter', link: '#' },
    { id: 'footer-link-10', label: 'Facebook', link: '#' },
    { id: 'footer-link-11', label: 'Instagram', link: '#' },
    { id: 'footer-link-12', label: 'LinkedIn', link: '#' },
  ],
});

// Main function to generate content based on section type
export const generateSampleContent = (type: SectionType): SectionContent => {
  switch (type) {
    case SectionType.HERO:
      return generateHeroContent();
    case SectionType.FEATURES:
      return generateFeaturesContent();
    case SectionType.TEXT:
      return generateTextContent();
    case SectionType.PRICING:
      return generatePricingContent();
    case SectionType.TESTIMONIALS:
      return generateTestimonialsContent();
    case SectionType.CONTACT:
      return generateContactContent();
    case SectionType.GALLERY:
      return generateGalleryContent();
    case SectionType.CTA:
      return generateCTAContent();
    case SectionType.HEADER:
      return generateHeaderContent();
    case SectionType.FOOTER:
      return generateFooterContent();
    default:
      throw new Error(`No sample content generator for section type: ${type}`);
  }
};
