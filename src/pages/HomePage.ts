import { type Page, type Locator, expect } from '@playwright/test';

export class HomePage {

  private readonly page: Page;
  private readonly searchInput: Locator;
  private readonly searchButton: Locator;
  private readonly productCards: Locator;
  private readonly cartIcon: Locator;
  private readonly cartQuantityBadge: Locator;
  private readonly navCategories: Locator;
  private readonly signInLink: Locator;
  private readonly productNames: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchInput = page.locator('[data-test="search-query"]');
    this.searchButton = page.locator('[data-test="search-submit"]');
    this.productCards = page.locator('[data-test="product-name"]');
    this.cartIcon = page.locator('[data-test="nav-cart"]');
    this.cartQuantityBadge = page.locator(
      '[data-test="cart-quantity"]'
    );
    this.navCategories = page.locator(
      '[data-test="nav-categories"]'
    );
    this.signInLink = page.locator('[data-test="nav-sign-in"]');
    this.productNames = page.locator('[data-test="product-name"]');
  }

  
  async navigate(): Promise<void> {
    await this.page.goto('/');
    await this.page.waitForLoadState('networkidle');
  
  }

  async searchProduct(query: string): Promise<void> {
    await this.searchInput.fill(query);
    await this.searchButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async clickCartIcon(): Promise<void> {
    await this.cartIcon.click();
  }

  async navigateToSignIn(): Promise<void> {
    await this.signInLink.click();
  }

  async getCartCount(): Promise<string> {
    return await this.cartQuantityBadge.textContent() || '0';
  }

  async getAllProductNames(): Promise<string[]> {
    return await this.productNames.allTextContents();
  }

  async expectPageLoaded(): Promise<void> {
    await expect(this.searchInput).toBeVisible();
    await expect(this.productCards.first()).toBeVisible();
  }

  async expectCartCount(count: string): Promise<void> {
    await expect(this.cartQuantityBadge).toHaveText(count);
  }

  async expectCartEmpty(): Promise<void> {
    await expect(this.cartQuantityBadge).not.toBeVisible();
  }

  async expectProductVisible(productName: string): Promise<void> {
    await expect(
      this.productNames.filter({ hasText: productName })
    ).toBeVisible();
  }

  async expectSearchResultsContain(text: string): Promise<void> {
    const names = await this.getAllProductNames();
    const hasMatch = names.some(name =>
      name.toLowerCase().includes(text.toLowerCase())
     
    );
    expect(hasMatch).toBe(true);
  }
}