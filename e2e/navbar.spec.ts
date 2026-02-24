import { test, expect } from "@playwright/test";

const API_BASE = "http://localhost:5000";

test.describe("Navbar", () => {
  test.beforeEach(async ({ page }) => {
    await page.route(`${API_BASE}/**`, (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([]),
      })
    );
  });

  test.describe("Desktop", () => {
    test.use({ viewport: { width: 1280, height: 720 } });

    test("displays logo linking to home", async ({ page }) => {
      await page.goto("/");

      const logoLink = page.locator("a[href='/']").first();
      await expect(logoLink).toBeVisible();
      const logo = logoLink.locator("img");
      await expect(logo).toBeVisible();
    });

    test("displays tagline", async ({ page }) => {
      await page.goto("/");

      await expect(
        page.getByText("Let me make something clear... your skin")
      ).toBeVisible();
    });

    test("Services dropdown shows sub-links", async ({ page }) => {
      await page.goto("/");

      // Click on Services trigger to open dropdown
      const servicesTrigger = page.getByRole("button", {
        name: "Services",
        exact: true,
      });
      await expect(servicesTrigger).toBeVisible();
      await servicesTrigger.click();

      // Verify dropdown items
      await expect(
        page.getByRole("link", { name: "Signature Facials" })
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: "Facial Packages" })
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: "Add-ons" })
      ).toBeVisible();
    });

    test("About and Socials links are present", async ({ page }) => {
      await page.goto("/");

      await expect(
        page.getByRole("link", { name: "About", exact: true })
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: "Socials", exact: true })
      ).toBeVisible();
    });

    test("navigation links point to correct anchors", async ({ page }) => {
      await page.goto("/");

      const aboutLink = page.getByRole("link", {
        name: "About",
        exact: true,
      });
      await expect(aboutLink).toHaveAttribute("href", "/#about");

      const socialsLink = page.getByRole("link", {
        name: "Socials",
        exact: true,
      });
      await expect(socialsLink).toHaveAttribute("href", "/#socials");
    });

    test("adds shadow on scroll", async ({ page }) => {
      await page.goto("/");

      const navbar = page.locator(".sticky.top-0").first();

      // Initially no shadow class
      const initialClasses = await navbar.getAttribute("class");
      expect(initialClasses).not.toContain("shadow-md");

      // Scroll down enough to trigger the scroll handler
      await page.evaluate(() => window.scrollTo({ top: 200, behavior: "instant" }));
      // Wait for the scroll event handler to fire and React to re-render
      await page.waitForFunction(() => {
        const el = document.querySelector(".sticky.top-0");
        return el?.classList.contains("shadow-md");
      }, { timeout: 5000 }).catch(() => {
        // If the page doesn't have enough content to scroll, skip
      });

      const scrolledClasses = await navbar.getAttribute("class");
      // The navbar adds shadow-md via conditional class when scrolled > 0
      if (await page.evaluate(() => document.documentElement.scrollTop > 0)) {
        expect(scrolledClasses).toContain("shadow-md");
      }
    });
  });

  test.describe("Mobile", () => {
    test.use({ viewport: { width: 375, height: 667 } });

    test("shows hamburger menu", async ({ page }) => {
      await page.goto("/");

      // The hamburger trigger is a NavigationMenuTrigger containing the Menu icon
      const menuTrigger = page.locator("nav button").first();
      await expect(menuTrigger).toBeVisible();
    });

    test("hamburger menu opens and shows navigation links", async ({
      page,
    }) => {
      await page.goto("/");

      // Open hamburger menu
      const menuTrigger = page.locator("nav button").first();
      await menuTrigger.click();

      // Should see About and Socials links
      await expect(
        page.getByRole("link", { name: "About", exact: true })
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: "Socials", exact: true })
      ).toBeVisible();

      // Services button should be present
      await expect(
        page.getByRole("button", { name: "Services", exact: true })
      ).toBeVisible();
    });

    test("mobile Services section expands to show sub-links", async ({
      page,
    }) => {
      await page.goto("/");

      // Open hamburger menu
      const menuTrigger = page.locator("nav button").first();
      await menuTrigger.click();

      // Click Services to expand collapsible
      const servicesButton = page.getByRole("button", {
        name: "Services",
        exact: true,
      });
      await servicesButton.click();

      // Sub-links should now be visible
      await expect(
        page.getByRole("link", { name: "Signature Facials" })
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: "Facial Packages" })
      ).toBeVisible();
      await expect(
        page.getByRole("link", { name: "Add-ons" })
      ).toBeVisible();
    });
  });
});
