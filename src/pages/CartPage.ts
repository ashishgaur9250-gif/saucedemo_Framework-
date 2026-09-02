import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CartPage extends BasePage {
  readonly cartItems = this.page.locator(".cart_item");
  readonly checkoutButton = this.page.getByRole("button", { name: "Checkout" });
  readonly continueShoppingButton = this.page.getByRole("button", { name: "Continue Shopping" });

  cartItem(name: string) {
    return this.page.locator(".cart_item").filter({ hasText: name });
  }

  async verifyItemPresent(name: string): Promise<void> {
    await expect(this.cartItem(name)).toBeVisible();
  }

  async verifyItemNotPresent(name: string): Promise<void> {
    await expect(this.cartItem(name)).toHaveCount(0);
  }

  async verifyItemCount(count: number): Promise<void> {
    await expect(this.cartItems).toHaveCount(count);
  }

  async removeItem(name: string): Promise<void> {
    await this.click(this.cartItem(name).getByRole("button", { name: /Remove/i }));
  }

  async checkout(): Promise<void> {
    await this.click(this.checkoutButton);
  }

  async continueShopping(): Promise<void> {
    await this.click(this.continueShoppingButton);
  }
}