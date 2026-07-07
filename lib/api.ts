import { Product } from "./types";

const API_BASE_URL = "https://fakestoreapi.com";

// SERVER-SIDE FETCHING (With Next.js Caching)
export async function getProductsServer(): Promise<Product[] | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/products`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      console.error(`[SERVER FETCH ERROR] Products API failed with status ${res.status}. Response: ${await res.text()}`);
      return null; // Return null so the client knows it failed and can try itself
    }
    return await res.json();
  } catch (error) {
    console.error(`[SERVER FETCH ERROR] getProductsServer failed completely (likely Cloudflare block). Error:`, error);
    return null;
  }
}

export async function getCategoriesServer(): Promise<string[] | null> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/categories`, {
      next: { revalidate: 3600 },
    });
    if (!res.ok) {
      console.error(`[SERVER FETCH ERROR] Categories API failed with status ${res.status}`);
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error(`[SERVER FETCH ERROR] getCategoriesServer failed completely. Error:`, error);
    return null;
  }
}


// CLIENT-SIDE FETCHING (No Next.js caching, runs in browser)
export async function getProductsClient(): Promise<Product[]> {
  const res = await fetch(`${API_BASE_URL}/products`);
  if (!res.ok) throw new Error(`Products API failed: ${res.status}`);
  return await res.json();
}

export async function getCategoriesClient(): Promise<string[]> {
  const res = await fetch(`${API_BASE_URL}/products/categories`);
  if (!res.ok) throw new Error(`Categories API failed: ${res.status}`);
  return await res.json();
}
