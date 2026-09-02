import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class LoginPage extends BasePage {
  readonly username = this.page.getByPlaceholder("Username");
  readonly password = this.page.getByPlaceholder("Password");
  readonly loginButton = this.page.getByRole("button", { name: "Login" });
  readonly errorMessage = this.page.locator("[data-test='error']");

  async goto(): Promise<void> {
    await this.page.goto("/");
  }

  async login(username: string, password: string): Promise<void> {
    await this.fill(this.username, username);
    await this.fill(this.password, password);
    await this.click(this.loginButton);
  }

  async loginAs(username: string, password: string): Promise<void> {
    await this.login(username, password);
  }

  async verifyLoginPage(): Promise<void> {
    await expect(this.loginButton).toBeVisible();
  }

  async verifyError(message: string): Promise<void> {
    await expect(this.errorMessage).toContainText(message);
  }
}