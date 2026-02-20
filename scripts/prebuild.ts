import * as fs from 'fs';
import * as path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const DATABASE_ID = "30df75bf205280eb94bac3b90c6f37d5";
const NOTION_VERSION = "2022-06-28";

if (!NOTION_API_KEY) {
  console.error("Error: NOTION_API_KEY is missing in .env file");
  process.exit(1);
}

async function notionFetch(endpoint: string, method: string = 'GET', body?: any) {
  const url = `https://api.notion.com/v1/${endpoint}`;
  const headers = {
    'Authorization': `Bearer ${NOTION_API_KEY}`,
    'Notion-Version': NOTION_VERSION,
    'Content-Type': 'application/json'
  };

  const options: RequestInit = {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined
  };

  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Notion API Error ${res.status}: ${text}`);
  }
  return res.json();
}

async function fetchBlogData() {
  console.log("Starting static blog data generation (using fetch)...");
  
  try {
    // 1. Fetch All Posts
    const response = await notionFetch(`databases/${DATABASE_ID}/query`, 'POST', {
      filter: {
        property: 'Published',
        checkbox: {
          equals: true
        }
      },
      sorts: [
        {
          property: 'Date',
          direction: 'descending'
        }
      ]
    });

    console.log(`Fetched ${response.results.length} posts.`);

    const posts = response.results.map((page: any) => {
      const props = page.properties;
      return {
        id: page.id,
        title: props.Title?.title[0]?.plain_text || "Untitled",
        slug: props.Slug?.rich_text[0]?.plain_text || page.id,
        date: props.Date?.date?.start || new Date().toISOString(),
        category: props.Category?.select?.name || "General",
        excerpt: props["Meta Description"]?.rich_text[0]?.plain_text || "",
        readTime: props.ReadTime?.rich_text[0]?.plain_text || "5 min read",
        image: page.cover?.external?.url || page.cover?.file?.url || "https://picsum.photos/800/400"
      };
    });

    // Ensure directories exist
    const publicDir = path.join(__dirname, '../public');
    const dataDir = path.join(publicDir, 'data');
    const blogDir = path.join(dataDir, 'blog');

    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir);
    if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir);

    // Write posts list
    fs.writeFileSync(path.join(dataDir, 'blog.json'), JSON.stringify(posts, null, 2));
    console.log("Wrote public/data/blog.json");

    // 2. Fetch and Write Individual Posts
    for (const post of posts) {
      console.log(`Fetching content for: ${post.slug}`);
      
      const blocksResponse = await notionFetch(`blocks/${post.id}/children`, 'GET');

      const fullPost = {
        ...post,
        content: blocksResponse.results
      };

      fs.writeFileSync(
        path.join(blogDir, `${post.slug}.json`), 
        JSON.stringify(fullPost, null, 2)
      );
    }

    console.log("Static blog data generation complete!");

  } catch (error) {
    console.error("Error generating blog data:", error);
    process.exit(1);
  }
}

fetchBlogData();
