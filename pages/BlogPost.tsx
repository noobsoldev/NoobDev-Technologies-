import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { BraceWrap } from '../components/Layout';
import { Heart, Share2, MessageSquare, Twitter, Linkedin, Send, CheckCircle2 } from 'lucide-react';

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

const BlogInteractions = ({ title, slug }: { title: string; slug: string }) => {
  const [liked, setLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(0);
  const [showShare, setShowShare] = useState(false);
  const shareUrl = window.location.href;

  useEffect(() => {
    // Fetch initial likes
    fetch(`/api/interactions/${slug}`)
      .then(res => res.json())
      .then(data => {
        setLikesCount(data.likes);
      })
      .catch(err => console.error("Failed to fetch likes", err));
    
    // Check if user already liked this post (local storage check)
    const hasLiked = localStorage.getItem(`liked_${slug}`);
    if (hasLiked) setLiked(true);
  }, [slug]);

  const handleLike = async () => {
    const action = liked ? 'unlike' : 'like';
    
    try {
      const response = await fetch(`/api/interactions/${slug}/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action })
      });
      
      if (response.ok) {
        const data = await response.json();
        setLikesCount(data.likes);
        setLiked(!liked);
        
        if (action === 'like') {
          localStorage.setItem(`liked_${slug}`, 'true');
        } else {
          localStorage.removeItem(`liked_${slug}`);
        }
      }
    } catch (err) {
      console.error("Failed to update like", err);
    }
  };

  const shareOnTwitter = () => {
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  const shareOnLinkedIn = () => {
    window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`, '_blank');
  };

  return (
    <div className="flex items-center justify-between py-8 border-y border-gray-100 my-12">
      <div className="flex items-center gap-6">
        <button 
          onClick={handleLike}
          className={`flex items-center gap-2 group transition-colors ${liked ? 'text-[#FF0000]' : 'text-gray-500 hover:text-[#FF0000]'}`}
        >
          <Heart className={`w-5 h-5 ${liked ? 'fill-current' : 'group-hover:scale-110 transition-transform'}`} />
          <span className="font-mono text-sm font-bold">{likesCount}</span>
        </button>
        
        <div className="relative">
          <button 
            onClick={() => setShowShare(!showShare)}
            className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors group"
          >
            <Share2 className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span className="font-mono text-sm font-bold">Share</span>
          </button>
          
          {showShare && (
            <div className="absolute bottom-full left-0 mb-4 bg-white border border-gray-100 shadow-xl p-2 flex gap-2 animate-in slide-in-from-bottom-2 duration-200 z-30">
              <button onClick={shareOnTwitter} className="p-2 hover:bg-gray-50 text-[#1DA1F2] transition-colors">
                <Twitter className="w-5 h-5 fill-current" />
              </button>
              <button onClick={shareOnLinkedIn} className="p-2 hover:bg-gray-50 text-[#0A66C2] transition-colors">
                <Linkedin className="w-5 h-5 fill-current" />
              </button>
            </div>
          )}
        </div>
      </div>
      
      <a href="#comments" className="flex items-center gap-2 text-gray-500 hover:text-black transition-colors group">
        <MessageSquare className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        <span className="font-mono text-sm font-bold">Comments</span>
      </a>
    </div>
  );
};

const CommentSection = ({ slug }: { slug: string }) => {
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetch(`/api/interactions/${slug}`)
      .then(res => res.json())
      .then(data => {
        setComments(data.comments);
      })
      .catch(err => console.error("Failed to fetch comments", err));
  }, [slug]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || isSubmitting) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch(`/api/interactions/${slug}/comment`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newComment })
      });
      
      if (response.ok) {
        const comment = await response.json();
        setComments([comment, ...comments]);
        setNewComment('');
      }
    } catch (err) {
      console.error("Failed to post comment", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div id="comments" className="mt-16 pt-16 border-t border-gray-100">
      <h3 className="text-2xl font-bold mb-8 flex items-center gap-3">
        <BraceWrap className="text-lg">Comments</BraceWrap>
        <span className="text-sm font-mono text-gray-400">({comments.length})</span>
      </h3>
      
      <form onSubmit={handleSubmit} className="mb-12">
        <textarea 
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Join the discussion..."
          className="w-full bg-gray-50 border border-gray-200 p-4 min-h-[100px] focus:outline-none focus:border-[#FF0000] transition-colors mb-4 font-sans"
        />
        <button 
          type="submit"
          disabled={isSubmitting}
          className="bg-black text-white px-6 py-3 font-bold text-sm hover:bg-[#FF0000] transition-colors flex items-center gap-2 disabled:bg-gray-400"
        >
          {isSubmitting ? 'Posting...' : 'Post Comment'} <Send className="w-4 h-4" />
        </button>
      </form>
      
      <div className="space-y-8">
        {comments.length === 0 ? (
          <p className="text-gray-400 italic text-sm">No comments yet. Be the first to start the conversation!</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="flex gap-4">
              <div className="w-10 h-10 bg-gray-100 flex items-center justify-center font-bold text-[#FF0000] font-mono border border-gray-200 shrink-0">
                {comment.user.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-3 mb-1">
                  <span className="font-bold text-sm">{comment.user}</span>
                  <span className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">{comment.date}</span>
                </div>
                <p className="text-gray-600 text-sm leading-relaxed">{comment.text}</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const BlogSubscribe = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setStatus('loading');
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
    }, 1000);
  };

  return (
    <div className="bg-gray-50 border border-gray-100 p-8 md:p-12 my-16 text-center">
      {status === 'success' ? (
        <div className="animate-in zoom-in duration-300">
          <CheckCircle2 className="w-12 h-12 text-green-500 mx-auto mb-4" />
          <h3 className="text-2xl font-bold mb-2">You're on the list!</h3>
          <p className="text-gray-600">Get ready for the best automation insights in your inbox.</p>
        </div>
      ) : (
        <>
          <h3 className="text-2xl font-bold mb-4">Subscribe to <BraceWrap>Upcoming</BraceWrap> Posts</h3>
          <p className="text-gray-600 mb-8 max-w-md mx-auto">Never miss a deep dive into business automation and no-code strategy.</p>
          
          <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your@email.com" 
              required
              className="flex-1 bg-white border border-gray-200 px-4 py-3 focus:outline-none focus:border-[#FF0000] transition-colors font-mono text-sm"
            />
            <button 
              type="submit"
              disabled={status === 'loading'}
              className="bg-[#FF0000] text-white px-6 py-3 font-bold hover:bg-black transition-colors disabled:bg-gray-400"
            >
              {status === 'loading' ? 'Joining...' : 'Subscribe'}
            </button>
          </form>
        </>
      )}
    </div>
  );
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

        <BlogInteractions title={post.title} slug={post.slug} />
        
        <BlogSubscribe />

        <CommentSection slug={post.slug} />

        <div className="mt-16 pt-8 border-t border-gray-100">
             <Link to="/blog" className="inline-flex items-center text-sm font-bold hover:text-[#FF0000] transition-colors group">
                <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> Back to all articles
             </Link>
        </div>
      </div>
    </div>
  );
};
