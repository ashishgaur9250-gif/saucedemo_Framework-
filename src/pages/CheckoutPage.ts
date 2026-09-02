import { expect } from "@playwright/test";
import { BasePage } from "./BasePage";

export class CheckoutPage extends BasePage {
  readonly firstName = this.page.getByPlaceholder("First Name");
  readonly lastName = this.page.getByPlaceholder("Last Name");
  readonly postalCode = this.page.getByPlaceholder("Zip/Postal Code");
  readonly continueButton = this.page.getByRole("button", { name: "Continue" });
  readonly finishButton = this.page.getByRole("button", { name: "Finish" });
  readonly cancelButton = this.page.getByRole("button", { name: "Cancel" });
  readonly error = this.page.locator("[data-test='error']");
  readonly completeHeader = this.page.getByText("Thank you for your order!");

  async fillCustomer(firstName: string, lastName: string, postalCode: string): Promise<void> {
    await this.fill(this.firstName, firstName);
    await this.fill(this.lastName, lastName);
    await this.fill(this.postalCode, postalCode);
  }

  async continue(): Promise<void> {
    await this.click(this.continueButton);
  }

  async finish(): Promise<void> {
    await this.click(this.finishButton);
  }

  async cancel(): Promise<void> {
    await this.click(this.cancelButton);
  }

  async verifyError(message: string): Promise<void> {
    await expect(this.error).toContainText(message);
  }

  async verifyOrderComplete(): Promise<void> {
    await expect(this.completeHeader).toBeVisible();
  }
}