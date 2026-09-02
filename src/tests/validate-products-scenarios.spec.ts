import { test, expect } from "../fixtures/baseFixture";
import data from "../data/testData.json";

test.describe("Products Module", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.loginAs(data.users.standard.username, data.users.standard.password);
  });

  test("@smoke TC1007 - products page displays six products", async ({ productsPage }) => {
    await productsPage.verifyLoaded();
    await productsPage.verifyProductCount(6);
  });

  test("@smoke TC1008 - user can add backpack to cart", async ({ productsPage }) => {
    await productsPage.addProduct(data.products.backpack);
    await expect(productsPage.cartLink).toHaveText("1");
  });

  test("@regression TC1009 - user can add two products", async ({ productsPage }) => {
    await productsPage.addProduct(data.products.backpack);
    await productsPage.addProduct(data.products.bikeLight);
    await expect(productsPage.cartLink).toHaveText("2");
  });

  test("@regression TC1010 - user can remove product from products page", async ({ productsPage }) => {
    await productsPage.addProduct(data.products.backpack);
    await productsPage.removeProduct(data.products.backpack);
    await expect(productsPage.cartLink).not.toHaveText("1");
  });

  test("@regression TC1011 - sort products by name A to Z", async ({ productsPage }) => {
    await productsPage.sort("az");
    const names = (await productsPage.inventoryItems.locator(".inventory_item_name").allTextContents()).map(n => n.trim());
    expect(names).toEqual([...names].sort((a, b) => a.localeCompare(b)));
  });

  test("@regression TC1012 - sort products by price low to high", async ({ productsPage }) => {
    await productsPage.sort("lohi");
    const prices = await productsPage.inventoryItems.locator(".inventory_item_price").allTextContents();
    const values = prices.map(p => Number(p.replace("$", "")));
    expect(values).toEqual([...values].sort((a, b) => a - b));
  });

  // test("@regression TC1013 - product details can be opened", async ({ productsPage, productDetailsPage }) => {
  //   await productsPage.openProduct(data.products.backpack);
  //   await productDetailsPage.verifyProduct(data.products.backpack);
  // });

  // test("@regression TC1014 - product can be added from details page", async ({ productsPage, productDetailsPage }) => {
  //   await productsPage.openProduct(data.products.bikeLight);
  //   await productDetailsPage.addToCart();
  //   await expect(productsPage.cartLink).toHaveText("1");
  // });
});