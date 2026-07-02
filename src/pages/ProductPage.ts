import { type Page, type Locator, expect } from '@playwright/test';

export class ProductPage {

  private readonly page: Page;
  private readonly productName: Locator;
  private readonly productPrice: Locator;
  private readonly addToCartButton: Locator;
  private readonly quantityInput: Locator;
  private readonly productDescription: Locator;
  private readonly relatedProducts: Locator;
  private readonly toastMessage: Locator;

  constructor(page: Page) {
    this.page = page;
    this.productName = page.locator('[data-test="product-name"]');
    this.productPrice = page.locator('[data-test="unit-price"]');
    this.addToCartButton = page.locator(
      '[data-test="add-to-cart"]'
    );
    this.quantityInput = page.locator('[data-test="quantity"]');
    this.productDescription = page.locator(
      '[data-test="product-description"]'
    );
    this.relatedProducts = page.locator(
      '[data-test="related-product-name"]'
    );
    this.toastMessage = page.locator('.toast-body');
  }

  async navigateToProduct(productId: number): Promise<void> {
    await this.page.goto(`/product/${productId}`);
    await this.page.waitForLoadState('networkidle');
  }

  async addToCart(quantity: number = 1): Promise<void> {
    if (quantity > 1) {
      await this.quantityInput.clear();
      await this.quantityInput.fill(quantity.toString());
    }
    await this.addToCartButton.click();
    
    await this.page.waitForSelector('.toast-body', {
      timeout: 5000,
    });
  }

  async getProductName(): Promise<string> {
    return await this.productName.textContent() || '';
  }

  async getProductPrice(): Promise<string> {
    return await this.productPrice.textContent() || '';
  }

  async expectProductLoaded(): Promise<void> {
    await expect(this.productName).toBeVisible();
    await expect(this.productPrice).toBeVisible();
    await expect(this.addToCartButton).toBeVisible();
  }

  async expectAddToCartSuccess(): Promise<void> {
    await expect(this.toastMessage).toBeVisible();
    await expect(this.toastMessage).toContainText('added');
  }
}