
export type Page = 'home' | 'about' | 'services' | 'showcase' | 'blog' | 'contact';

export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  detailedDescription?: string;
  features?: string[];
  tools?: string[];
  pricing?: string;
  timeline?: string;
}

export interface Project {
  id: number;
  title: string;
  category: string;
  industry: string;
  metric: string;
  image: string;
}

export interface BlogPost {
  id: number;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  readTime: string;
  image: string;
}
