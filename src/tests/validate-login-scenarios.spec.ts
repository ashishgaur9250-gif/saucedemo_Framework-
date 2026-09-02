import { test, expect } from "../fixtures/baseFixture";
import data from "../data/testData.json";

test.describe("Login Module", () => {
  test.beforeEach(async ({ loginPage }) => {
    await loginPage.goto();
  });

  test("@smoke TC1001 - valid user can login", async ({ loginPage, productsPage }) => {
    await loginPage.loginAs(data.users.standard.username, data.users.standard.password);
    await productsPage.verifyLoaded();
    await expect(loginPage.currentPage).toHaveURL(/inventory\.html/);
  });

  test("@smoke TC1002 - login page is displayed", async ({ loginPage }) => {
    await loginPage.verifyLoginPage();
  });

  test("@regression TC1003 - invalid username shows error", async ({ loginPage }) => {
    await loginPage.loginAs(data.users.invalid.username, data.users.standard.password);
    await loginPage.verifyError("Username and password do not match");
  });

  test("@regression TC1004 - invalid password shows error", async ({ loginPage }) => {
    await loginPage.loginAs(data.users.standard.username, data.users.invalid.password);
    await loginPage.verifyError("Username and password do not match");
  });

  test("@regression TC1005 - locked user cannot login", async ({ loginPage }) => {
    await loginPage.loginAs(data.users.locked.username, data.users.locked.password);
    await loginPage.verifyError("Sorry, this user has been locked out");
  });

  test("@regression TC1006 - blank username shows validation", async ({ loginPage }) => {
    await loginPage.loginAs("", data.users.standard.password);
    await loginPage.verifyError("Username is required");
  });
});