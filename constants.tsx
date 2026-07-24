
import React from 'react';
import { Service, Project, BlogPost } from './types';

export const SERVICES: Service[] = [
  {
    id: 'custom-websites',
    title: 'Custom Websites',
    description: 'Modern, scalable web solutions tailored to your business needs.',
    icon: '{WEB}',
    detailedDescription: 'Full-featured corporate websites and web applications built with modern frameworks for scale and performance.',
    tools: ['React', 'Next.js', 'Webflow', 'WordPress'],
    timeline: '4-12 weeks'
  },
  {
    id: 'landing-pages',
    title: 'Fast Landing Pages',
    description: 'High-converting landing pages delivered in 48 hours.',
    icon: '{LP}',
    detailedDescription: 'Speed meets quality. We build lightning-fast, mobile-responsive landing pages optimized for maximum conversion.',
    features: ['Responsive design', '90+ PageSpeed score', 'CRM integrations', 'SEO optimization'],
    pricing: 'From $999',
    timeline: '48-72 hours'
  },
  {
    id: 'ecommerce',
    title: 'E-commerce',
    description: 'Full online stores built to sell — from product pages to checkout.',
    icon: '{SHOP}',
    detailedDescription: 'Headless and platform-based storefronts with automated inventory sync, cart-recovery flows, and payment integrations — built to convert from day one.',
    features: ['Product & catalog setup', 'Payment gateway integration', 'Inventory sync automation', 'Cart-recovery flows'],
    tools: ['Shopify', 'WooCommerce', 'Stripe'],
    timeline: '2-6 weeks'
  },
  {
    id: 'ai-automation',
    title: 'AI Automation',
    description: 'Connect your apps and automate repetitive tasks with AI-powered workflows.',
    icon: '{AI}',
    detailedDescription: 'We connect your existing apps and automate repetitive manual tasks using advanced AI logic, saving your team hundreds of hours.',
    features: ['Data entry and processing', 'Email workflows', 'Customer service bots', 'Report generation', 'Lead qualification'],
    tools: ['Zapier', 'Make', 'n8n', 'OpenAI'],
    pricing: 'From $499/mo',
    timeline: '1-2 weeks'
  },
  {
    id: 'seo-optimization',
    title: 'SEO Optimization',
    description: 'Data-driven strategies to boost your organic visibility.',
    icon: '{SEO}',
    detailedDescription: 'Technical audits and content strategies designed to place your business on the first page of search results.',
    features: ['Technical audits', 'Keyword research', 'On-page SEO', 'Monthly reporting']
  },
  {
    id: 'press-releases',
    title: 'Press Releases',
    description: 'Professional distribution to 200+ major media outlets.',
    icon: '{PR}',
    detailedDescription: 'Get your brand news in front of the right audience with strategic media outreach and professional distribution.'
  },
  {
    id: 'crm-setup',
    title: 'CRM Setup',
    description: 'Custom configuration and automation for your sales pipeline.',
    icon: '{CRM}',
    detailedDescription: 'Stop losing leads. We implement and automate CRMs to ensure your sales team follows up with every opportunity.',
    tools: ['HubSpot', 'Salesforce', 'Pipedrive']
  },
  {
    id: 'openclaw-bots',
    title: 'OpenClaw Bots',
    description: 'Custom bot installation for scraping and automation.',
    icon: '{BOT}',
    detailedDescription: 'Specialized bot implementation for data monitoring, web scraping, and automated repetitive interactions.'
  },
  {
    id: 'process-automation',
    title: 'Process Automation',
    description: 'Audit and optimize your internal business workflows.',
    icon: '{BPA}',
    detailedDescription: 'We look under the hood of your business to find inefficiencies and replace them with smooth, automated systems.'
  }
];

export const PROJECTS: Project[] = [
  { id: 1, title: 'VibeNote Studio', link: 'https://vibenote.studio/', category: 'Web Dev', industry: 'SaaS', metric: 'AI Website Generator for Agencies', image: 'https://image.thum.io/get/width/1200/crop/800/noanimate/https://vibenote.studio/' },
  { id: 2, title: 'Optiofy', link: 'https://optiofy.com/', category: 'CRM', industry: 'Healthcare', metric: 'Optical Prescriptions & Billing App', image: 'https://image.thum.io/get/width/1200/crop/800/noanimate/https://optiofy.com/' },
  { id: 3, title: 'Lenswala', link: 'https://lenswala.in/', category: 'Web Dev', industry: 'Retail', metric: 'Premium Frames & Eye Care', image: 'https://image.thum.io/get/width/1200/crop/800/noanimate/https://lenswala.in/' },
  { id: 4, title: 'Akansha Rajput', link: 'https://akansharajput.in/', category: 'Web Dev', industry: 'Personal Brand', metric: 'Professional Portfolio & Branding', image: 'https://image.thum.io/get/width/1200/crop/800/noanimate/https://akansharajput.in/' },
  { id: 5, title: 'Green River Camp', link: 'https://greenrivercamp.in/', category: 'Web Dev', industry: 'Hospitality', metric: 'Nature Retreat & Glamping', image: 'https://image.thum.io/get/width/1200/crop/800/noanimate/https://greenrivercamp.in/' },
  { id: 6, title: 'Exponential Coin', link: 'https://exponential.social/', category: 'Web3', industry: 'Crypto', metric: 'Solana Meme Coin Launch', image: 'https://image.thum.io/get/width/1200/crop/800/noanimate/https://exponential.social/' },
  { id: 7, title: 'Shri Ji Jewellers', link: 'https://shriji.jewelry/', category: 'Web Dev', industry: 'Retail', metric: 'Premium Jewelry Showroom', image: 'https://image.thum.io/get/width/1200/crop/800/noanimate/https://shriji.jewelry/' }
];

export const BLOG_POSTS: BlogPost[] = [
  { id: 1, title: '5 Business Processes to Automate First', category: 'Strategy', date: 'Oct 12, 2025', excerpt: 'Discover the low-hanging fruit in your business that can be automated today.', readTime: '5 min', image: 'https://picsum.photos/seed/b1/600/400' },
  { id: 2, title: 'No-Code vs Low-Code: What\'s the Difference?', category: 'Education', date: 'Oct 08, 2025', excerpt: 'Understand which path is right for your next digital project.', readTime: '7 min', image: 'https://picsum.photos/seed/b2/600/400' },
  { id: 3, title: 'How We Saved ClientX 20 Hours Per Week', category: 'Case Study', date: 'Oct 01, 2025', excerpt: 'A deep dive into our recent automation project for a logistics firm.', readTime: '10 min', image: 'https://picsum.photos/seed/b3/600/400' }
];
