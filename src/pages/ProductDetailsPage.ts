import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductDetailsPage extends BasePage {
  readonly backButton = this.page.getByRole("button", { name: "Back to products" });
  readonly addButton = this.page.getByRole("button", { name: /Add to cart/i });
  readonly removeButton = this.page.getByRole("button", { name: /Remove/i });

  async verifyProduct(name: string): Promise<void> {
    await expect(this.page.getByText(name, { exact: true })).toBeVisible();
  }

  async addToCart(): Promise<void> {
    await this.click(this.addButton);
  }

  async removeFromCart(): Promise<void> {
    await this.click(this.removeButton);
  }

  async backToProducts(): Promise<void> {
    await this.click(this.backButton);
  }
}