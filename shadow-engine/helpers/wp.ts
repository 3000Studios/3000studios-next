/*
 *   Copyright (c) 2025 NAME.
 *   All rights reserved.
 *   Unauthorized copying, modification, distribution, or use of this is prohibited without express written permission.
 */

import axios from "axios";

const WP_BASE_URL =
  process.env.WORDPRESS_API_URL || "https://3000studios.com/wp-json/wp/v2";
const WP_USERNAME = process.env.WORDPRESS_USERNAME || "";
const WP_PASSWORD = process.env.WORDPRESS_PASSWORD || "";

export async function callWordPressAPI(
  endpoint: string,
  method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
  data?: any,
): Promise<any> {
  try {
    if (!WP_USERNAME || !WP_PASSWORD) {
      throw new Error("WordPress credentials not configured");
    }

    const auth = Buffer.from(`${WP_USERNAME}:${WP_PASSWORD}`).toString(
      "base64",
    );

    const response = await axios({
      url: `${WP_BASE_URL}/${endpoint}`,
      method,
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      data,
    });

    return response.data;
  } catch (err: any) {
    throw new Error(`WordPress API call failed: ${err.message}`);
  }
}

export async function getWordPressPosts(limit: number = 10): Promise<any[]> {
  return await callWordPressAPI(`posts?per_page=${limit}`);
}

export async function createWordPressPost(
  title: string,
  content: string,
): Promise<any> {
  return await callWordPressAPI("posts", "POST", {
    title,
    content,
    status: "draft",
  });
}
