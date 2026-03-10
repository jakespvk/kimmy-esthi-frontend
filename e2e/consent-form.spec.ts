import { expect, Page, test } from "@playwright/test";

import { mockActiveStatements, mockClientId } from "./fixtures/mock-data";

const API_BASE = "http://localhost:5000";

async function clickSubmitButton(page: Page) {
  await page.locator("form button[type='submit']").first().click();
}

async function drawAndSaveSignature(page: Page, container: ReturnType<Page["locator"]>) {
  const canvas = container.locator("canvas");
  await container.scrollIntoViewIfNeeded();
  await canvas.waitFor({ state: "visible", timeout: 10000 });

  const box = await canvas.boundingBox();
  if (!box) throw new Error("Canvas bounding box not found");

  await page.mouse.move(box.x + box.width * 0.1, box.y + box.height * 0.5);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.3, box.y + box.height * 0.2, { steps: 5 });
  await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.8, { steps: 5 });
  await page.mouse.move(box.x + box.width * 0.7, box.y + box.height * 0.2, { steps: 5 });
  await page.mouse.move(box.x + box.width * 0.9, box.y + box.height * 0.5, { steps: 5 });
  await page.mouse.up();

  await container.locator("button.rounded-full").last().click();
}

async function setupConsentFormMocks(page: Page) {
  await page.route(`${API_BASE}/consentForm/clientInfo`, (route) => {
    if (route.request().method() === "POST") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockClientId),
      });
    }
    return route.fallback();
  });

  await page.route(`${API_BASE}/consentForm/products`, (route) => {
    if (route.request().method() === "POST") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(200),
      });
    }
    return route.fallback();
  });

  await page.route(`${API_BASE}/consentForm/skincareHistory`, (route) => {
    if (route.request().method() === "POST") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(200),
      });
    }
    return route.fallback();
  });

  await page.route(`${API_BASE}/consentForm/emergencyContact`, (route) => {
    if (route.request().method() === "POST") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(200),
      });
    }
    return route.fallback();
  });

  await page.route(`${API_BASE}/consentForm/consentAndAcknowledgement`, (route) => {
    if (route.request().method() === "POST") {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(200),
      });
    }
    return route.fallback();
  });

  await page.route(`${API_BASE}/consentForm/statements/active`, (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockActiveStatements),
    }),
  );

  await page.route(`${API_BASE}/consentForm`, (route) => {
    const url = route.request().url();
    if (route.request().method() === "POST" && url.endsWith("/consentForm")) {
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(true),
      });
    }
    return route.fallback();
  });
}

async function fillPersonalInformation(page: Page) {
  await page.locator("input[name='fullName']").fill("Jane Doe");

  const dobButton = page.getByRole("button", { name: /Select date/i });
  await dobButton.click();
  await page.locator("select").last().selectOption("2000");
  await page.locator("select").first().selectOption("0");
  await page.getByRole("gridcell", { name: "15" }).first().click();

  await page.locator("input[name='gender']").fill("Female");
  await page.locator("input[type='tel']").first().fill("5625551234");
  await page.locator("input[name='email']").fill("jane@example.com");
}

async function fillSkincareHistory(page: Page) {
  await page.locator("#r1").click();
  await page.locator("input[placeholder='YYYY-MM-DD']").first().fill("2024-06-15");
  await page.locator("#r3").click();
  await page.locator("#r19").click();
  await page.locator("#r21").click();
}

async function fillEntireConsentForm(page: Page) {
  await fillPersonalInformation(page);
  await page.locator("textarea").fill("Versed Light Moisturizer, Dermalogica Toner Pads");
  await fillSkincareHistory(page);

  await page.locator("input[name='emergencyName']").fill("John Doe");
  await page.locator("input[type='tel']").nth(1).fill("5559876543");
  await page.locator("input[name='relationship']").fill("Spouse");

  const signaturePads = page.locator(".relative:has(canvas)");
  await drawAndSaveSignature(page, signaturePads.nth(0));
  await drawAndSaveSignature(page, signaturePads.nth(1));

  for (let i = 0; i < mockActiveStatements.length; i++) {
    await page.locator(`[id="${i}"]`).click();
  }

  await page.locator("input[placeholder='Jane Doe']").fill("Jane Doe");
  await drawAndSaveSignature(page, signaturePads.nth(2));
}

test.describe("Consent Form", () => {
  test.beforeEach(async ({ page }) => {
    await setupConsentFormMocks(page);
  });

  test("renders all consent sections on one page", async ({ page }) => {
    await page.goto(`/consent-form?clientId=${mockClientId}`);

    await expect(page.getByText("Personal Information")).toBeVisible();
    await expect(page.getByText("Products Used At Home")).toBeVisible();
    await expect(page.getByText("Evolution of Skincare")).toBeVisible();
    await expect(page.getByText("Emergency Contact")).toBeVisible();
    await expect(page.getByText("Consent and Acknowledgement")).toBeVisible();
    await expect(page.getByText("Terms and Agreements")).toBeVisible();
  });

  test("shows validation errors on empty submission", async ({ page }) => {
    await page.goto(`/consent-form?clientId=${mockClientId}`);

    await clickSubmitButton(page);

    await expect(page.getByText("Full name is required")).toBeVisible();
    await expect(page.getByText("Emergency contact name is required")).toBeVisible();
    await expect(page.getByText("Please print your full name")).toBeVisible();
  });

  test("shows conditional date fields when yes answers are selected", async ({ page }) => {
    await page.goto(`/consent-form?clientId=${mockClientId}`);

    await page.locator("#r1").click();
    await page.locator("#r5").click();

    await expect(page.locator("input[placeholder='YYYY-MM-DD']").first()).toBeVisible();
    await expect(page.locator("input[placeholder='YYYY-MM-DD']").last()).toBeVisible();
  });

  test("submits the full consent form from a single page", async ({ page }) => {
    await page.goto(`/consent-form?clientId=${mockClientId}`);

    await fillEntireConsentForm(page);
    await clickSubmitButton(page);

    await expect(page.getByText("Thank you for filling out the consent form!")).toBeVisible({ timeout: 10000 });
  });

  test("keeps the consent form within the mobile viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto(`/consent-form?clientId=${mockClientId}`);

    const hasHorizontalOverflow = await page.evaluate(() => {
      const rootOverflow = document.documentElement.scrollWidth > window.innerWidth + 1;
      const oversizedField = Array.from(document.querySelectorAll("input, textarea, canvas, button"))
        .some((element) => element.getBoundingClientRect().right > window.innerWidth + 1);
      return rootOverflow || oversizedField;
    });

    expect(hasHorizontalOverflow).toBe(false);
  });

  test("redirects legacy consent step routes back to the main page", async ({ page }) => {
    await page.goto(`/consent-form/products?clientId=${mockClientId}`);
    await page.waitForURL(`/consent-form?clientId=${mockClientId}`);
  });
});
