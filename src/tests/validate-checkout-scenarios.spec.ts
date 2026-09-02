import { test, expect } from "../fixtures/baseFixture";
import data from "../data/testData.json";

test.describe("Checkout Module", () => {
  test.beforeEach(async ({ loginPage, productsPage, cartPage }) => {
    await loginPage.goto();
    await loginPage.loginAs(data.users.standard.username, data.users.standard.password);
    await productsPage.addProduct(data.products.backpack);
    await productsPage.openCart();
    await cartPage.checkout();
  });

  test("@smoke TC1021 - checkout information page is displayed", async ({ checkoutPage }) => {
    await expect(checkoutPage.firstName).toBeVisible();
    await expect(checkoutPage.lastName).toBeVisible();
    await expect(checkoutPage.postalCode).toBeVisible();
  });

  test("@regression TC1022 - missing first name shows validation", async ({ checkoutPage }) => {
    await checkoutPage.fillCustomer("", data.checkout.lastName, data.checkout.postalCode);
    await checkoutPage.continue();
    await checkoutPage.verifyError("First Name is required");
  });

  test("@regression TC1023 - missing last name shows validation", async ({ checkoutPage }) => {
    await checkoutPage.fillCustomer(data.checkout.firstName, "", data.checkout.postalCode);
    await checkoutPage.continue();
    await checkoutPage.verifyError("Last Name is required");
  });

  test("@regression TC1024 - missing postal code shows validation", async ({ checkoutPage }) => {
    await checkoutPage.fillCustomer(data.checkout.firstName, data.checkout.lastName, "");
    await checkoutPage.continue();
    await checkoutPage.verifyError("Postal Code is required");
  });

  test("@smoke TC1025 - standard user can complete checkout", async ({ checkoutPage }) => {
    await checkoutPage.fillCustomer(
      data.checkout.firstName,
      data.checkout.lastName,
      data.checkout.postalCode
    );
    await checkoutPage.continue();
    await expect(checkoutPage.finishButton).toBeVisible();
    await checkoutPage.finish();
    await checkoutPage.verifyOrderComplete();
  });
});