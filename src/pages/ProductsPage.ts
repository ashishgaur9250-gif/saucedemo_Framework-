import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class ProductsPage extends BasePage {
  readonly title = this.page.getByText("Products", { exact: true });
  readonly sortDropdown = this.page.locator("[data-test='product-sort-container']");
  readonly inventoryItems = this.page.locator(".inventory_item");
  readonly cartLink = this.page.locator(".shopping_cart_link");
  readonly menuButton = this.page.getByRole("button", { name: "Open Menu" });
  readonly resetAppState = this.page.getByText("Reset App State");

  productCard(name: string) {
    return this.page.locator(".inventory_item").filter({ hasText: name });
  }

  addButton(name: string) {
    return this.productCard(name).getByRole("button", { name: /Add to cart/i });
  }

  removeButton(name: string) {
    return this.productCard(name).getByRole("button", { name: /Remove/i });
  }

  productLink(name: string) {
    return this.productCard(name).getByRole("link", { name });
  }

  async verifyLoaded(): Promise<void> {
    await expect(this.title).toBeVisible();
  }

  async addProduct(name: string): Promise<void> {
    await this.click(this.addButton(name));
  }

  async removeProduct(name: string): Promise<void> {
    await this.click(this.removeButton(name));
  }

  async sort(value: string): Promise<void> {
    await this.selectOption(this.sortDropdown, value);
  }

  async openProduct(name: string): Promise<void> {
    await this.click(this.productLink(name));
  }

  async openCart(): Promise<void> {
    await this.click(this.cartLink);
  }

  async openMenu(): Promise<void> {
    await this.click(this.menuButton);
  }

  async resetState(): Promise<void> {
    await this.click(this.resetAppState);
  }

  async verifyProductCount(count: number): Promise<void> {
    await expect(this.inventoryItems).toHaveCount(count);
  }
}