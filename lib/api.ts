import { Product } from "./types";

const API_BASE_URL = "https://fakestoreapi.com";

export async function getProducts(): Promise<Product[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/products`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(
        `Products API failed: ${res.status} ${res.statusText}`
      );
    }

    return res.json();
  } catch (error) {
    console.error("getProducts failed:", error);
    throw error;
  }
}

export async function getCategories(): Promise<string[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/categories`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(
        `Categories API failed: ${res.status} ${res.statusText}`
      );
    }

    return res.json();
  } catch (error) {
    console.error("getCategories failed:", error);
    throw error;
  }
}

export async function getProductById(id: string): Promise<Product> {
  try {
    const res = await fetch(`${API_BASE_URL}/products/${id}`, {
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      throw new Error(
        `Product API failed: ${res.status} ${res.statusText}`
      );
    }

    return res.json();
  } catch (error) {
    console.error(`getProductById(${id}) failed:`, error);
    throw error;
  }
}


// import { Product } from "./types";

// const API_BASE_URL = "https://fakestoreapi.com";

// export async function getProducts(): Promise<Product[]> {
//   const res = await fetch(`${API_BASE_URL}/products`, {
//     next: { revalidate: 3600 }, // cache for 1 hour
//   });
//   if (!res.ok) {

//     throw new Error(

//       `Failed to fetch products: ${res.status} ${res.statusText}`

//     );

//   }
//   return res.json();
// }

// export async function getProductById(id: string): Promise<Product> {
//   const res = await fetch(`${API_BASE_URL}/products/${id}`, {
//     next: { revalidate: 3600 },
//   });
//   if (!res.ok) {

//     throw new Error(

//       `Failed to fetch products: ${res.status} ${res.statusText}`

//     );

//   }
//   return res.json();
// }

// export async function getCategories(): Promise<string[]> {
//   const res = await fetch(`${API_BASE_URL}/products/categories`, {
//     next: { revalidate: 3600 },
//   });
//   if (!res.ok) {

//     throw new Error(

//       `Failed to fetch category: ${res.status} ${res.statusText}`

//     );

//   }
//   return res.json();
// }
