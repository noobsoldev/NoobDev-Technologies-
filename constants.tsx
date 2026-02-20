
import React from 'react';
import { Service, Project, BlogPost } from './types';

export const SERVICES: Service[] = [
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
    id: 'custom-websites',
    title: 'Custom Websites',
    description: 'Modern, scalable web solutions tailored to your business needs.',
    icon: '{WEB}',
    detailedDescription: 'Full-featured corporate websites and web applications built with modern frameworks for scale and performance.',
    tools: ['React', 'Next.js', 'Webflow', 'WordPress'],
    timeline: '4-12 weeks'
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
  { id: 1, title: 'E-commerce Automation', category: 'Automation', industry: 'Retail', metric: '50% time saved', image: 'https://images.unsplash.com/photo-1518433278983-911a3c727571?auto=format&fit=crop&q=80&w=600&h=400' },
  { id: 2, title: 'SaaS Landing Page', category: 'Web Dev', industry: 'Tech Startup', metric: '3x conversions', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&q=80&w=600&h=400' },
  { id: 3, title: 'CRM Integration', category: 'CRM', industry: 'Agency', metric: 'Zero lost leads', image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=600&h=400' },
  { id: 4, title: 'SEO Overhaul', category: 'SEO', industry: 'Local Business', metric: '+140% traffic', image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=600&h=400' },
  { id: 5, title: 'Multi-platform Automation', category: 'Automation', industry: 'Consulting', metric: '15h saved/week', image: 'https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&q=80&w=600&h=400' },
  { id: 6, title: 'Custom Portal', category: 'Web Dev', industry: 'Healthcare', metric: '40% faster ops', image: 'https://images.unsplash.com/photo-1551288049-bbbda5366991?auto=format&fit=crop&q=80&w=600&h=400' }
];

export const BLOG_POSTS: BlogPost[] = [
  { id: 1, title: '5 Business Processes to Automate First', category: 'Strategy', date: 'Oct 12, 2025', excerpt: 'Discover the low-hanging fruit in your business that can be automated today.', readTime: '5 min', image: 'https://picsum.photos/seed/b1/600/400' },
  { id: 2, title: 'No-Code vs Low-Code: What\'s the Difference?', category: 'Education', date: 'Oct 08, 2025', excerpt: 'Understand which path is right for your next digital project.', readTime: '7 min', image: 'https://picsum.photos/seed/b2/600/400' },
  { id: 3, title: 'How We Saved ClientX 20 Hours Per Week', category: 'Case Study', date: 'Oct 01, 2025', excerpt: 'A deep dive into our recent automation project for a logistics firm.', readTime: '10 min', image: 'https://picsum.photos/seed/b3/600/400' }
];
