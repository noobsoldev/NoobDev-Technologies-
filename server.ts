import express from 'express';
import { Client } from '@notionhq/client';
import cors from 'cors';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Notion Client
const notion = new Client({
  auth: process.env.NOTION_API_KEY
});

const DATABASE_ID = "30df75bf205280eb94bac3b90c6f37d5";

// API Routes
app.get('/api/blog', async (req, res) => {
  try {
    // Fetch with filter
    const response = await (notion.databases as any).query({
      database_id: DATABASE_ID,
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

    console.log(`[Notion] Fetched ${response.results.length} published posts.`);

    if (response.results.length === 0) {
        // Log full properties of first result if available (which is none here, so maybe log empty)
        // Or if the user meant "if zero results, log what we got" - but we got nothing.
        // The request says "If zero, log full properties object." 
        // This implies debugging why it's zero. 
        // Let's try to fetch ONE without filter to debug if we get 0 with filter.
        const debugResponse = await (notion.databases as any).query({ database_id: DATABASE_ID, page_size: 1 });
        if (debugResponse.results.length > 0) {
            console.log("[Notion Debug] First row properties:", JSON.stringify((debugResponse.results[0] as any).properties, null, 2));
        } else {
            console.log("[Notion Debug] Database is empty.");
        }
    }

    const posts = response.results.map((page: any) => {
      const props = page.properties;
      return {
        id: page.id,
        title: props.Title?.title[0]?.plain_text || "Untitled",
        slug: props.Slug?.rich_text[0]?.plain_text || page.id,
        date: props.Date?.date?.start || new Date().toISOString(),
        // Map meta to excerpt as requested by UI needs
        excerpt: props["Meta Description"]?.rich_text[0]?.plain_text || "", 
        // Keep other fields for UI compatibility if they exist, or defaults
        category: props.Category?.select?.name || "General",
        readTime: props.ReadTime?.rich_text[0]?.plain_text || "5 min read",
        image: page.cover?.external?.url || page.cover?.file?.url || "https://picsum.photos/800/400"
      };
    });

    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

app.get('/api/blog/:slug', async (req, res) => {
  try {
    const { slug } = req.params;
    
    // 1. Find the page by slug
    const response = await (notion.databases as any).query({
      database_id: DATABASE_ID,
      filter: {
        property: 'Slug',
        rich_text: {
          equals: slug
        }
      }
    });

    if (response.results.length === 0) {
      return res.status(404).json({ error: "Post not found" });
    }

    const page: any = response.results[0];
    const pageId = page.id;

    // 2. Fetch page content (blocks)
    const blocksResponse = await notion.blocks.children.list({
      block_id: pageId,
    });

    // 3. Construct post object
    const props = page.properties;
    const post = {
      id: page.id,
      title: props.Title?.title[0]?.plain_text || "Untitled",
      slug: props.Slug?.rich_text[0]?.plain_text || page.id,
      date: props.Date?.date?.start || new Date().toISOString(),
      category: props.Category?.select?.name || "General",
      image: page.cover?.external?.url || page.cover?.file?.url || null,
      content: blocksResponse.results
    };

    res.json(post);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch post" });
  }
});

// Vite Middleware
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa', 
    });
    app.use(vite.middlewares);
  } else {
    // Production static file serving would go here
    // app.use(express.static('dist'));
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
