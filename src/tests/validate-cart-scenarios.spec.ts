import { test, expect } from "../fixtures/baseFixture";
import data from "../data/testData.json";

test.describe("Cart Module", () => {
  test.beforeEach(async ({ loginPage, productsPage }) => {
    await loginPage.goto();
    await loginPage.loginAs(data.users.standard.username, data.users.standard.password);
    await productsPage.addProduct(data.products.backpack);
  });

  test("@smoke TC1015 - cart displays selected product", async ({ productsPage, cartPage }) => {
    await productsPage.openCart();
    await cartPage.verifyItemPresent(data.products.backpack);
  });

  test("@regression TC1016 - cart item count is correct", async ({ productsPage, cartPage }) => {
    await productsPage.openCart();
    await cartPage.verifyItemCount(1);
  });

  test("@regression TC1017 - product can be removed from cart", async ({ productsPage, cartPage }) => {
    await productsPage.openCart();
    await cartPage.removeItem(data.products.backpack);
    await cartPage.verifyItemNotPresent(data.products.backpack);
  });

  test("@regression TC1018 - continue shopping returns to products", async ({ productsPage, cartPage }) => {
    await productsPage.openCart();
    await cartPage.continueShopping();
    await productsPage.verifyLoaded();
  });

  test("@regression TC1019 - multiple products remain in cart", async ({ productsPage, cartPage }) => {
    await productsPage.addProduct(data.products.bikeLight);
    await productsPage.openCart();
    await cartPage.verifyItemCount(2);
    await cartPage.verifyItemPresent(data.products.backpack);
    await cartPage.verifyItemPresent(data.products.bikeLight);
  });

  test("@regression TC1020 - cart checkout button is available", async ({ productsPage, cartPage }) => {
    await productsPage.openCart();
    await expect(cartPage.checkoutButton).toBeVisible();
  });
});