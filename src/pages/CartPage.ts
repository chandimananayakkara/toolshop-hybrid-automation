import { type Page, type Locator, expect } from '@playwright/test';

export class CartPage {

  private readonly page: Page;
  private readonly cartItems: Locator;
  private readonly cartItemNames: Locator;
  private readonly proceedToCheckoutButton: Locator;
  private readonly cartTotalPrice: Locator;
  private readonly emptyCartMessage: Locator;
  private readonly removeItemButtons: Locator;

  constructor(page: Page) {
    this.page = page;
    this.cartItems = page.locator('[data-test="cart-item"]');
    this.cartItemNames = page.locator(
      '[data-test="product-title"]'
    );
    this.proceedToCheckoutButton = page.locator(
      '[data-test="proceed-1"]'
    );
    this.cartTotalPrice = page.locator('[data-test="cart-total"]');
    this.emptyCartMessage = page.locator(
      '[data-test="no-items"]'
    );
    this.removeItemButtons = page.locator(
      '[data-test="remove-product"]'
    );
  }

  async navigate(): Promise<void> {
    await this.page.goto('/checkout');
    await this.page.waitForLoadState('networkidle');
  }

  async proceedToCheckout(): Promise<void> {
    await this.proceedToCheckoutButton.click();
  }

  async removeItem(index: number = 0): Promise<void> {
    await this.removeItemButtons.nth(index).click();
    await this.page.waitForLoadState('networkidle');
 
  }

  async getItemCount(): Promise<number> {
    return await this.cartItems.count();
  }

  async getCartItemNames(): Promise<string[]> {
    return await this.cartItemNames.allTextContents();
  }

  async expectCartLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/checkout/);
  }

  async expectItemInCart(productName: string): Promise<void> {
    await expect(
      this.cartItemNames.filter({ hasText: productName })
    ).toBeVisible();
  }

  async expectCartEmpty(): Promise<void> {
    await expect(this.emptyCartMessage).toBeVisible();
  }

  async expectItemCount(count: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(count);
  }
}