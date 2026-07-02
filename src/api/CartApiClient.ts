import { type APIRequestContext } from '@playwright/test';

const API_BASE = 'https://api.practicesoftwaretesting.com';

export class CartApiClient {

  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }

 
  async getCart(userId: number, token: string) {
    return await this.request.get(`${API_BASE}/carts/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  
  async addToCart(
    productId: number,
    quantity: number,
    token: string,
  ) {
    return await this.request.post(`${API_BASE}/carts`, {
      data: { product_id: productId, quantity },
      headers: { Authorization: `Bearer ${token}` },
    });
  }

  
  async deleteCartItem(cartItemId: number, token: string) {
    return await this.request.delete(
      `${API_BASE}/carts/${cartItemId}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  }
}