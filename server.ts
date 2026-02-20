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

const DATABASE_NAME = "Blog CMS";
let DATABASE_ID = "";

// Helper to find database ID by name
async function getDatabaseId() {
  if (DATABASE_ID) return DATABASE_ID;
  try {
    const response = await notion.search({
      query: DATABASE_NAME,
      filter: {
        value: 'database',
        property: 'object'
      }
    });
    if (response.results.length > 0) {
      DATABASE_ID = response.results[0].id;
      return DATABASE_ID;
    }
    throw new Error("Database not found");
  } catch (error) {
    console.error("Error finding database:", error);
    return null;
  }
}

// API Routes
app.get('/api/blog', async (req, res) => {
  try {
    const dbId = await getDatabaseId();
    if (!dbId) return res.status(500).json({ error: "Database configuration error" });

    const response = await notion.databases.query({
      database_id: dbId,
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

    const posts = response.results.map((page: any) => {
      const props = page.properties;
      return {
        id: page.id,
        title: props.Title?.title[0]?.plain_text || "Untitled",
        slug: props.Slug?.rich_text[0]?.plain_text || page.id,
        date: props.Date?.date?.start || new Date().toISOString(),
        category: props.Category?.select?.name || "General",
        excerpt: props.Excerpt?.rich_text[0]?.plain_text || "",
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
    const dbId = await getDatabaseId();
    if (!dbId) return res.status(500).json({ error: "Database configuration error" });

    const { slug } = req.params;
    
    // 1. Find the page by slug
    const response = await notion.databases.query({
      database_id: dbId,
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
