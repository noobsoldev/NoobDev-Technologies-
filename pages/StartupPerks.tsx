
import React, { useState, useEffect } from 'react';
import { BraceWrap } from '../components/Layout';

interface Perk {
  id: number;
  company: string;
  program: string;
  value: string;
  description: string;
  link: string;
  category: string;
}

const CATEGORIES = [
  "All Perks",
  "Cloud Infrastructure",
  "AI & ML Platforms",
  "Database Services",
  "Analytics & Monitoring",
  "Developer Tools",
  "Communication",
  "Design & Collab",
  "Other Services"
];

const PERKS: Perk[] = [
  // CLOUD INFRASTRUCTURE
  {
    id: 1,
    company: "Google Cloud",
    program: "Google for Startups Cloud Program",
    value: "Up to $350,000",
    description: "Cloud credits over two years with additional perks for AI-focused startups. Includes Firebase, technical support, and Google Cloud training resources.",
    link: "https://cloud.google.com/startup",
    category: "Cloud Infrastructure"
  },
  {
    id: 2,
    company: "Microsoft Azure",
    program: "Microsoft for Startups Founders Hub",
    value: "Up to $150,000",
    description: "Azure credits plus free GitHub Enterprise, Microsoft 365, Visual Studio Enterprise, and access to OpenAI models with mentorship support.",
    link: "https://foundershub.startups.microsoft.com",
    category: "Cloud Infrastructure"
  },
  {
    id: 3,
    company: "Amazon Web Services",
    program: "AWS Activate",
    value: "Up to $100,000",
    description: "AWS credits covering EC2, S3, Lambda, RDS, and most AWS services. Includes technical support credits and access to business guidance.",
    link: "https://aws.amazon.com/activate",
    category: "Cloud Infrastructure"
  },
  {
    id: 4,
    company: "Cloudflare",
    program: "Cloudflare for Startups",
    value: "Up to $100,000",
    description: "Credits for Workers, Pages, R2 storage, D1 database, and enterprise-level DDoS protection for up to 3 domains.",
    link: "https://www.cloudflare.com/forstartups",
    category: "Cloud Infrastructure"
  },
  {
    id: 5,
    company: "DigitalOcean",
    program: "DigitalOcean Hatch",
    value: "Up to $100,000",
    description: "Infrastructure credits for Droplets, Kubernetes clusters, managed databases, and Spaces object storage for early-stage startups.",
    link: "https://www.digitalocean.com/hatch",
    category: "Cloud Infrastructure"
  },
  {
    id: 6,
    company: "Vercel",
    program: "Vercel for Startups",
    value: "Varies by partner",
    description: "Credits and discounts for the frontend cloud platform with automatic global scaling, edge functions, and CI/CD pipelines.",
    link: "https://vercel.com/startups",
    category: "Cloud Infrastructure"
  },
  {
    id: 7,
    company: "Fly.io",
    program: "Fly.io Startup Credits",
    value: "Up to $50,000",
    description: "Run full-stack apps and databases close to users worldwide. Credits cover compute, storage, and global anycast networking.",
    link: "https://fly.io",
    category: "Cloud Infrastructure"
  },
  // AI & ML PLATFORMS
  {
    id: 8,
    company: "Anthropic",
    program: "Anthropic Startup Program",
    value: "$25,000",
    description: "Claude API credits with priority rate limits, technical resources, and exclusive access to founder events and early model releases.",
    link: "https://www.anthropic.com/startups",
    category: "AI & ML Platforms"
  },
  {
    id: 9,
    company: "OpenAI",
    program: "OpenAI Startup Credits",
    value: "Up to $25,000",
    description: "API credits for GPT-4o, o1, DALL-E, Whisper, and other models. Available via select accelerator and VC partner programs.",
    link: "https://openai.com/startups",
    category: "AI & ML Platforms"
  },
  {
    id: 10,
    company: "Google DeepMind / Gemini",
    program: "Google AI Startup Program",
    value: "Up to $350,000",
    description: "Access to Gemini API, Vertex AI, and Google's foundation models with generous free-tier quotas and startup-focused pricing.",
    link: "https://cloud.google.com/startup",
    category: "AI & ML Platforms"
  },
  {
    id: 11,
    company: "Mistral AI",
    program: "Mistral for Startups",
    value: "Up to $10,000",
    description: "API credits for Mistral's open and commercial models including Mistral Large and Codestral for code generation tasks.",
    link: "https://mistral.ai",
    category: "AI & ML Platforms"
  },
  {
    id: 12,
    company: "ElevenLabs",
    program: "ElevenLabs Grants Program",
    value: "~$4,000+",
    description: "12 months of Scale-tier access including text-to-speech, voice cloning, conversational AI agents, and over 680 hours of generated audio.",
    link: "https://elevenlabs.io/startup-grants",
    category: "AI & ML Platforms"
  },
  {
    id: 13,
    company: "Cohere",
    program: "Cohere for Startups",
    value: "Up to $10,000",
    description: "Credits for enterprise-grade NLP APIs including text generation, embeddings, classification, and multilingual search capabilities.",
    link: "https://cohere.com/startups",
    category: "AI & ML Platforms"
  },
  {
    id: 14,
    company: "Hugging Face",
    program: "Hugging Face Startup Program",
    value: "Up to $50,000",
    description: "Compute credits for training and deploying models on Hugging Face infrastructure, plus access to the Pro Hub and private datasets.",
    link: "https://huggingface.co/startups",
    category: "AI & ML Platforms"
  },
  // DATABASE SERVICES
  {
    id: 15,
    company: "MongoDB",
    program: "MongoDB for Startups",
    value: "Up to $20,000",
    description: "Atlas credits for the multi-cloud developer data platform with technical support, MongoDB University access, and co-marketing opportunities.",
    link: "https://www.mongodb.com/startups",
    category: "Database Services"
  },
  {
    id: 16,
    company: "PlanetScale",
    program: "PlanetScale Startup Program",
    value: "Varies",
    description: "Credits for the serverless MySQL-compatible platform with database branching, non-blocking schema migrations, and infinite horizontal scale.",
    link: "https://planetscale.com/startups",
    category: "Database Services"
  },
  {
    id: 17,
    company: "Supabase",
    program: "Supabase Startup Credits",
    value: "$300",
    description: "Credits for the open-source Firebase alternative including Postgres database, authentication, edge functions, and real-time subscriptions.",
    link: "https://supabase.com/partners/integrations",
    category: "Database Services"
  },
  {
    id: 18,
    company: "Redis",
    program: "Redis Startup Program",
    value: "Up to $5,000",
    description: "Credits for Redis Cloud covering caching, session management, real-time leaderboards, and pub/sub messaging for high-performance apps.",
    link: "https://redis.com/try-free",
    category: "Database Services"
  },
  {
    id: 19,
    company: "Neon",
    program: "Neon Startup Program",
    value: "Up to $3,000",
    description: "Serverless Postgres with autoscaling, branching for dev/test environments, and a generous free tier with pay-per-use pricing.",
    link: "https://neon.tech",
    category: "Database Services"
  },
  // ANALYTICS & MONITORING
  {
    id: 20,
    company: "Mixpanel",
    program: "Mixpanel for Startups",
    value: "$50,000",
    description: "One year free of the Growth plan including product analytics, session replay for up to 500K sessions, and unlimited team seats.",
    link: "https://mixpanel.com/startups",
    category: "Analytics & Monitoring"
  },
  {
    id: 21,
    company: "PostHog",
    program: "PostHog for Startups",
    value: "$50,000",
    description: "All-in-one platform with product analytics, session replay, feature flags, A/B testing, surveys, and a data warehouse connector.",
    link: "https://posthog.com/startups",
    category: "Analytics & Monitoring"
  },
  {
    id: 22,
    company: "Amplitude",
    program: "Amplitude Startup Scholarship",
    value: "1 year free",
    description: "Full access to the Growth plan for behavioral analytics, cohort analysis, user journey mapping, and product experimentation tools.",
    link: "https://amplitude.com/startups",
    category: "Analytics & Monitoring"
  },
  {
    id: 23,
    company: "Datadog",
    program: "Datadog for Startups",
    value: "1 year free",
    description: "Full-stack observability including APM, infrastructure monitoring, log management, synthetic testing, and real-user monitoring.",
    link: "https://www.datadoghq.com/partner/datadog-for-startups",
    category: "Analytics & Monitoring"
  },
  {
    id: 24,
    company: "Segment",
    program: "Twilio Segment Startup Program",
    value: "$25,000",
    description: "Full access to Segment's customer data platform connecting over 450 sources and destinations for unified user data pipelines.",
    link: "https://segment.com/industry/startups",
    category: "Analytics & Monitoring"
  },
  {
    id: 25,
    company: "Sentry",
    program: "Sentry Startup Program",
    value: "Free tier + discounts",
    description: "Error tracking and performance monitoring with detailed stack traces, release tracking, and session replay for web and mobile apps.",
    link: "https://sentry.io/for/startups",
    category: "Analytics & Monitoring"
  },
  // DEVELOPER TOOLS
  {
    id: 26,
    company: "Retool",
    program: "Retool Startup Program",
    value: "Up to $60,000",
    description: "Build internal tools, admin dashboards, and data apps without heavy frontend coding. Includes 1 year free plus 25% off the second year.",
    link: "https://retool.com/startups",
    category: "Developer Tools"
  },
  {
    id: 27,
    company: "GitHub",
    program: "GitHub for Startups",
    value: "20 seats free",
    description: "GitHub Enterprise for 12 months with advanced code security, secret scanning, compliance controls, and project management features.",
    link: "https://github.com/enterprise/startups",
    category: "Developer Tools"
  },
  {
    id: 28,
    company: "Algolia",
    program: "Algolia Startup Program",
    value: "$10,000",
    description: "Credits for the search and discovery platform powering fast, typo-tolerant, and highly relevant search experiences at any scale.",
    link: "https://www.algolia.com/startups",
    category: "Developer Tools"
  },
  {
    id: 29,
    company: "Linear",
    program: "Linear for Startups",
    value: "Up to 6 months free",
    description: "Modern issue tracking and project management built for high-velocity software teams with cycles, roadmaps, and GitHub integration.",
    link: "https://linear.app/startups",
    category: "Developer Tools"
  },
  {
    id: 30,
    company: "Notion",
    program: "Notion for Startups",
    value: "Up to $1,000",
    description: "All-in-one workspace for docs, wikis, databases, and project management. Includes 6 months free with Notion AI included.",
    link: "https://www.notion.so/startups",
    category: "Developer Tools"
  },
  {
    id: 31,
    company: "Doppler",
    program: "Doppler Startup Program",
    value: "1 year free",
    description: "Universal secrets manager for syncing environment variables and secrets across cloud providers, CI/CD pipelines, and team members.",
    link: "https://www.doppler.com/startups",
    category: "Developer Tools"
  },
  // COMMUNICATION
  {
    id: 32,
    company: "Intercom",
    program: "Intercom Early Stage Program",
    value: "Up to 95% off",
    description: "Customer messaging platform with AI-powered live chat, product tours, outbound messaging, and a help center builder.",
    link: "https://www.intercom.com/early-stage",
    category: "Communication"
  },
  {
    id: 33,
    company: "HubSpot",
    program: "HubSpot for Startups",
    value: "Up to 90% off",
    description: "Full CRM suite including marketing automation, sales pipeline, customer service, and CMS tools at heavily discounted startup pricing.",
    link: "https://www.hubspot.com/startups",
    category: "Communication"
  },
  {
    id: 34,
    company: "Zendesk",
    program: "Zendesk for Startups",
    value: "6 months free",
    description: "Customer service and help desk software with ticketing, live chat, AI-powered bots, and a knowledge base builder for growing teams.",
    link: "https://www.zendesk.com/startups",
    category: "Communication"
  },
  {
    id: 35,
    company: "Twilio",
    program: "Twilio Startups",
    value: "$500",
    description: "Communication APIs for SMS, voice calls, video conferencing, WhatsApp messaging, and email delivery via SendGrid.",
    link: "https://www.twilio.com/startups",
    category: "Communication"
  },
  // DESIGN & COLLAB
  {
    id: 36,
    company: "Figma",
    program: "Figma Startup Program",
    value: "$1,000",
    description: "Collaborative design platform for UI/UX design, prototyping, and design systems with real-time multiplayer editing and dev handoff.",
    link: "https://www.figma.com/startups",
    category: "Design & Collab"
  },
  {
    id: 37,
    company: "Miro",
    program: "Miro for Startups",
    value: "$1,000",
    description: "Online collaborative whiteboard for brainstorming, user story mapping, sprint planning, and async team collaboration at scale.",
    link: "https://miro.com/startups",
    category: "Design & Collab"
  },
  {
    id: 38,
    company: "Loom",
    program: "Loom for Startups",
    value: "Free Pro plan",
    description: "Async video messaging for team communication, product demos, customer onboarding, and reducing unnecessary meetings.",
    link: "https://www.loom.com/startups",
    category: "Design & Collab"
  },
  // OTHER SERVICES
  {
    id: 39,
    company: "Stripe Atlas",
    program: "Stripe Atlas",
    value: "$150 off + perks",
    description: "Delaware C-corp incorporation with EIN, 83(b) filing guidance, US bank account access, and extensive partner perks for founders.",
    link: "https://stripe.com/atlas",
    category: "Other Services"
  },
  {
    id: 40,
    company: "Brex",
    program: "Brex for Startups",
    value: "Exclusive partner deals",
    description: "Corporate card with no personal guarantee, high limits, built-in expense management, and extensive partner discounts on tools and services.",
    link: "https://www.brex.com/startups",
    category: "Other Services"
  },
  {
    id: 41,
    company: "Zoho One",
    program: "Zoho One for Startups",
    value: "1 year free",
    description: "Bundle of 40+ business apps including CRM, email hosting, project management, accounting, HR, and marketing automation tools.",
    link: "https://www.zoho.com/one/startups",
    category: "Other Services"
  },
  {
    id: 42,
    company: "Gusto",
    program: "Gusto for Startups",
    value: "3 months free",
    description: "Payroll, benefits administration, and HR platform designed for small businesses with automated tax filings and employee onboarding.",
    link: "https://gusto.com/partners",
    category: "Other Services"
  },
  {
    id: 43,
    company: "Freshworks",
    program: "Freshworks for Startups",
    value: "Up to $10,000",
    description: "Credits covering Freshdesk, Freshsales CRM, Freshmarketer, and Freshservice IT management tools for early-stage startup teams.",
    link: "https://www.freshworks.com/startups",
    category: "Other Services"
  },
  {
    id: 44,
    company: "Dropbox",
    program: "Dropbox for Startups",
    value: "40–90% off",
    description: "Discounts on Dropbox Business, DocSend for secure pitch deck sharing, and Dropbox Sign for e-signatures and contract workflows.",
    link: "https://www.dropbox.com/startups",
    category: "Other Services"
  },
  {
    id: 45,
    company: "Ramp",
    program: "Ramp Partner Perks",
    value: "Extensive partner deals",
    description: "Corporate card and spend management platform with automated expense categorization and partner perks including AI tool credits.",
    link: "https://ramp.com/rewards",
    category: "Other Services"
  }
];

export const StartupPerks = () => {
  const [activeCategory, setActiveCategory] = useState("All Perks");

  useEffect(() => {
    document.title = "Startup Perks | Noob{Dev} Technologies";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Discover over $1.5M in free cloud credits, AI API access, developer tools, and startup programs.");
    }
  }, []);

  const filteredPerks = activeCategory === "All Perks" 
    ? PERKS 
    : PERKS.filter(perk => perk.category === activeCategory);

  return (
    <div className="page-transition pt-32 pb-20 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header Section */}
        <div className="mb-20 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">Startup <BraceWrap>Perks</BraceWrap></h1>
          <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Free Credits & Discounts for Startups</h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-10">
            Discover over $1.5M in free cloud credits, AI API access, developer tools, and startup programs — all in one place.
          </p>

          {/* Stat Badges */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[
              "45 Total Perks",
              "$1.5M+ Estimated Value",
              "14 Featured Programs",
              "8 Categories"
            ].map((stat, idx) => (
              <div key={idx} className="bg-gray-100 px-4 py-2 text-xs font-mono font-bold border-l-2 border-[#FF0000] uppercase tracking-wider">
                {stat}
              </div>
            ))}
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="mb-12 overflow-x-auto no-scrollbar">
          <div className="flex space-x-2 pb-4 min-w-max">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-3 text-sm font-bold font-mono uppercase tracking-widest transition-all border-2 ${
                  activeCategory === cat 
                    ? "bg-black text-white border-black" 
                    : "bg-white text-gray-500 border-gray-100 hover:border-[#FF0000] hover:text-black"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Perks Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPerks.map((perk) => (
            <div 
              key={perk.id} 
              className="bg-white p-8 border border-gray-100 hover:border-[#FF0000] hover:shadow-xl transition-all group flex flex-col h-full"
            >
              <div className="mb-4">
                <span className="text-[10px] font-mono font-bold text-[#FF0000] uppercase tracking-[0.2em] bg-red-50 px-2 py-1 rounded">
                  {perk.category}
                </span>
              </div>
              
              <h3 className="text-2xl font-bold mb-1 group-hover:text-[#FF0000] transition-colors">{perk.company}</h3>
              <p className="text-sm font-mono text-gray-500 mb-4">{perk.program}</p>
              
              <div className="mb-6">
                <div className="text-xs font-mono text-gray-500 uppercase mb-1">Value</div>
                <div className="text-xl font-bold text-black">{perk.value}</div>
              </div>
              
              <p className="text-gray-700 text-sm leading-relaxed mb-8 flex-grow line-clamp-2">
                {perk.description}
              </p>
              
              <a 
                href={perk.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-black text-white px-6 py-3 font-bold text-center hover:bg-[#FF0000] transition-colors"
              >
                Apply Now →
              </a>
            </div>
          ))}
        </div>

        {filteredPerks.length === 0 && (
          <div className="py-20 text-center">
            <p className="text-gray-500 font-mono">No perks found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
};
