import { type APIRequestContext } from '@playwright/test';

const API_BASE = 'https://api.practicesoftwaretesting.com';

export class ProductApiClient {

  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

 
  async getAllProducts(page: number = 1) {
    return await this.request.get(
      `${API_BASE}/products?page=${page}`
    );
  }

  
  async getProductById(id: number) {
    return await this.request.get(`${API_BASE}/products/${id}`);
  }

  
  async searchProducts(query: string) {
    return await this.request.get(
      `${API_BASE}/products/search?q=${encodeURIComponent(query)}`
     
    );
  }

  async getCategories() {
    return await this.request.get(`${API_BASE}/categories`);
  }
}