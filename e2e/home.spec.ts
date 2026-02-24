import { test, expect } from "@playwright/test";

const API_BASE = "http://localhost:5000";

test.describe("Home Page", () => {
  // NOTE: The home page is a server component with "use cache".
  // The fetch calls for services happen server-side during SSR, so Playwright's
  // page.route() cannot intercept them (it only intercepts browser-side requests).
  // These tests validate the page structure. Service card content depends on whatever
  // the dev server returns (or errors gracefully if the backend is not running).

  test.beforeEach(async ({ page }) => {
    // Intercept any client-side API calls (e.g. from React Query hydration)
    await page.route(`${API_BASE}/**`, (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([]),
      })
    );
  });

  test("displays all three service category headings", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("#signature-facials")).toHaveText("Signature Facials");
    await expect(page.locator("#facial-packages")).toHaveText("Facial Packages");
    await expect(page.locator("#facial-add-ons")).toHaveText("Facial Add-Ons");
  });

  test("renders the About section with bio text", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("#about")).toBeVisible();
    await expect(
      page.getByText("Kimmy Ancheta", { exact: false })
    ).toBeVisible();
  });

  test("renders the Socials section", async ({ page }) => {
    await page.goto("/");

    await expect(page.locator("#socials")).toBeVisible();
  });

  test("page has proper structure with service sections and about", async ({
    page,
  }) => {
    await page.goto("/");

    // All three section headings should exist in order
    const headings = page.locator("h1");
    const headingTexts = await headings.allTextContents();

    expect(headingTexts).toContain("Signature Facials");
    expect(headingTexts).toContain("Facial Packages");
    expect(headingTexts).toContain("Facial Add-Ons");
    expect(headingTexts).toContain("About");
    expect(headingTexts).toContain("Socials");
  });
});
