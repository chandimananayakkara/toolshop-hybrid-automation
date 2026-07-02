import { type APIRequestContext } from "@playwright/test";

const API_BASE = "https://api.practicesoftwaretesting.com";

export class AuthApiClient {
  private readonly request: APIRequestContext;

  constructor(request: APIRequestContext) {
    this.request = request;
  }
  async login(email: string, password: string) {
    const response = await this.request.post(`${API_BASE}/users/login`, {
      data: { email, password },
    });
    return response;
  }

  async getAccessToken(email: string, password: string): Promise<string> {
    const response = await this.login(email, password);
    const body = await response.json();
    return body.access_token;
  }

  async getMyProfile(token: string) {
    const response = await this.request.get(`${API_BASE}/users/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response;
  }
}
