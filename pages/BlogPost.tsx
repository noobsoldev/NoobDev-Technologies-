import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { BraceWrap } from '../components/Layout';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  date: string;
  category: string;
  image: string;
  content: any[];
}

const NotionBlock = ({ block }: { block: any }) => {
  const type = block.type;
  const value = block[type];

  if (!value) return null;

  switch (type) {
    case 'paragraph':
      return (
        <p className="mb-4 text-gray-700 leading-relaxed">
          {value.rich_text.map((t: any, i: number) => (
            <span key={i} className={t.annotations.bold ? 'font-bold' : t.annotations.italic ? 'italic' : t.annotations.code ? 'font-mono bg-gray-100 px-1 text-sm' : ''}>
              {t.plain_text}
            </span>
          ))}
        </p>
      );
    case 'heading_1':
      return <h1 className="text-3xl font-bold mt-8 mb-4">{value.rich_text[0]?.plain_text}</h1>;
    case 'heading_2':
      return <h2 className="text-2xl font-bold mt-6 mb-3 border-l-4 border-[#FF0000] pl-4">{value.rich_text[0]?.plain_text}</h2>;
    case 'heading_3':
      return <h3 className="text-xl font-bold mt-4 mb-2">{value.rich_text[0]?.plain_text}</h3>;
    case 'bulleted_list_item':
      return (
        <li className="ml-4 list-disc mb-2 text-gray-700">
          {value.rich_text[0]?.plain_text}
        </li>
      );
    case 'numbered_list_item':
      return (
        <li className="ml-4 list-decimal mb-2 text-gray-700">
          {value.rich_text[0]?.plain_text}
        </li>
      );
    case 'code':
      return (
        <pre className="bg-gray-900 text-gray-100 p-4 rounded-md overflow-x-auto mb-6 font-mono text-sm">
          <code>{value.rich_text[0]?.plain_text}</code>
        </pre>
      );
    case 'image':
      const src = value.type === 'external' ? value.external.url : value.file.url;
      const caption = value.caption?.[0]?.plain_text;
      return (
        <figure className="my-8">
          <img src={src} alt={caption || "Blog Image"} className="w-full rounded-lg shadow-md" />
          {caption && <figcaption className="text-center text-sm text-gray-500 mt-2 italic">{caption}</figcaption>}
        </figure>
      );
    case 'quote':
      return (
        <blockquote className="border-l-4 border-[#FF0000] pl-4 italic text-gray-600 my-6 bg-gray-50 py-2 pr-4">
          {value.rich_text[0]?.plain_text}
        </blockquote>
      );
    default:
      return null;
  }
};

export const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!slug) return;
    
    setLoading(true);
    const url = process.env.NODE_ENV === 'production' 
      ? `/data/blog/${slug}.json` 
      : `/api/blog/${slug}`;

    fetch(url)
      .then(res => {
        if (!res.ok) throw new Error("Post not found");
        return res.json();
      })
      .then(data => {
        setPost(data);
        setLoading(false);
        // Update SEO
        document.title = `${data.title} | Noob{dev}`;
        const metaDesc = document.querySelector('meta[name="description"]');
        if (metaDesc) {
            // Simple extraction of first paragraph text
            const firstPara = data.content.find((b: any) => b.type === 'paragraph')?.paragraph.rich_text[0]?.plain_text || "";
            metaDesc.setAttribute('content', firstPara.substring(0, 150));
        }
      })
      .catch(err => {
        console.error(err);
        setError(true);
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-32 pb-20 bg-white min-h-screen flex justify-center items-center">
        <div className="flex flex-col items-center">
             <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FF0000] mb-4"></div>
             <div className="font-mono text-gray-500">Fetching from Notion...</div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="pt-32 pb-20 bg-white min-h-screen flex justify-center items-center">
        <div className="text-center">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-gray-500 font-mono">Post not found in database.</p>
            <Link to="/blog" className="text-[#FF0000] hover:underline mt-4 block">← Back to Blog</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="page-transition pt-32 pb-20 bg-white">
      {/* Hero Image */}
      {post.image && (
        <div className="w-full h-[400px] md:h-[500px] relative mb-12">
            <div className="absolute inset-0 bg-black/30 z-10"></div>
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-0 left-0 w-full z-20 p-6 md:p-12 bg-gradient-to-t from-black/80 to-transparent">
                <div className="max-w-4xl mx-auto">
                    <div className="flex items-center gap-4 mb-4">
                        <span className="bg-[#FF0000] text-white px-3 py-1 text-[10px] font-mono font-bold uppercase tracking-widest">{post.category}</span>
                        <span className="text-gray-300 text-xs font-mono">{new Date(post.date).toLocaleDateString()}</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-4">
                        {post.title}
                    </h1>
                </div>
            </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto px-6">
        {!post.image && (
            <div className="mb-12 border-b border-gray-100 pb-8">
                 <div className="flex items-center gap-4 mb-4">
                    <span className="text-[#FF0000] font-mono font-bold uppercase tracking-widest text-xs">{post.category}</span>
                    <span className="text-gray-400 text-xs font-mono">{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <h1 className="text-4xl md:text-5xl font-bold mb-6">{post.title}</h1>
            </div>
        )}

        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-a:text-[#FF0000] prose-img:rounded-xl">
          {post.content.map((block) => (
            <NotionBlock key={block.id} block={block} />
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-100">
             <Link to="/blog" className="inline-flex items-center text-sm font-bold hover:text-[#FF0000] transition-colors group">
                <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> Back to all articles
             </Link>
        </div>
      </div>
    </div>
  );
};
