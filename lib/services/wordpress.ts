/**
 * WordPress Service
 * Integration with WordPress backend for content management
 */

import axios from 'axios';

const WP_URL = process.env.WP_URL;
const WP_USER = process.env.WP_USER;
const WP_PASS = process.env.WP_PASS;

const wpApi = axios.create({
  baseURL: `${WP_URL}/wp-json/wp/v2`,
  auth: {
    username: WP_USER || '',
    password: WP_PASS || '',
  },
});

export interface WordPressPost {
  id?: number;
  title: string;
  content: string;
  excerpt?: string;
  status: 'publish' | 'draft' | 'pending';
  categories?: number[];
  tags?: number[];
  featured_media?: number;
}

export async function createPost(post: WordPressPost): Promise<number> {
  try {
    const response = await wpApi.post('/posts', {
      title: post.title,
      content: post.content,
      excerpt: post.excerpt || '',
      status: post.status,
      categories: post.categories || [],
      tags: post.tags || [],
      featured_media: post.featured_media || 0,
    });

    return response.data.id;
  } catch (error) {
    console.error('WordPress create post error:', error);
    throw new Error('Failed to create WordPress post');
  }
}

export async function updatePost(id: number, updates: Partial<WordPressPost>): Promise<void> {
  try {
    await wpApi.put(`/posts/${id}`, updates);
  } catch (error) {
    console.error('WordPress update post error:', error);
    throw new Error('Failed to update WordPress post');
  }
}

export async function getPosts(limit: number = 10): Promise<WordPressPost[]> {
  try {
    const response = await wpApi.get('/posts', {
      params: {
        per_page: limit,
        _embed: true,
      },
    });

    return response.data.map((post: Record<string, unknown>) => ({
      id: post.id,
      title: post.title?.rendered,
      content: post.content?.rendered,
      excerpt: post.excerpt?.rendered,
      status: post.status,
    }));
  } catch (error) {
    console.error('WordPress get posts error:', error);
    throw new Error('Failed to fetch WordPress posts');
  }
}

export async function deletePost(id: number): Promise<void> {
  try {
    await wpApi.delete(`/posts/${id}`, {
      params: { force: true },
    });
  } catch (error) {
    console.error('WordPress delete post error:', error);
    throw new Error('Failed to delete WordPress post');
  }
}

export async function getCategories(): Promise<Array<{ id: number; name: string }>> {
  try {
    const response = await wpApi.get('/categories');
    return response.data.map((cat: Record<string, unknown>) => ({
      id: cat.id,
      name: cat.name,
    }));
  } catch (error) {
    console.error('WordPress get categories error:', error);
    throw new Error('Failed to fetch categories');
  }
}

export async function createCategory(name: string, description?: string): Promise<number> {
  try {
    const response = await wpApi.post('/categories', {
      name,
      description: description || '',
    });
    return response.data.id;
  } catch (error) {
    console.error('WordPress create category error:', error);
    throw new Error('Failed to create category');
  }
}
