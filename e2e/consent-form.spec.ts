import { test, expect, Page } from "@playwright/test";
import { mockClientId, mockActiveStatements } from "./fixtures/mock-data";

const API_BASE = "http://localhost:5000";

/**
 * Helper: click the form's submit button (type="submit") to avoid
 * matching Next.js dev tools buttons that also contain "Next" text.
 * Uses .first() in case multiple forms exist (e.g. during page transitions).
 */
async function clickSubmitButton(page: Page) {
  await page.locator("form button[type='submit']").first().click();
}

/**
 * Draw a signature on a canvas and click the save button.
 */
async function drawAndSaveSignature(page: Page, container: ReturnType<Page["locator"]>) {
  const canvas = container.locator("canvas");
  // Scroll the container into view first, then wait for canvas to be visible
  await container.scrollIntoViewIfNeeded();
  await canvas.waitFor({ state: "visible", timeout: 10000 });

  const box = await canvas.boundingBox();
  if (!box) throw new Error("Canvas bounding box not found");

  // Draw a zigzag to produce enough data for base64 length validation
  await page.mouse.move(box.x + box.width * 0.1, box.y + box.height * 0.5);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.3, box.y + box.height * 0.2, { steps: 5 });
  await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.8, { steps: 5 });
  await page.mouse.move(box.x + box.width * 0.7, box.y + box.height * 0.2, { steps: 5 });
  await page.mouse.move(box.x + box.width * 0.9, box.y + box.height * 0.5, { steps: 5 });
  await page.mouse.up();

  // Click the Save button (last .rounded-full button inside the container)
  await container.locator("button.rounded-full").last().click();
}

/**
 * Set up all consent form API mocks.
 */
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

  await page.route(
    `${API_BASE}/consentForm/consentAndAcknowledgement`,
    (route) => {
      if (route.request().method() === "POST") {
        return route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(200),
        });
      }
      return route.fallback();
    }
  );

  await page.route(`${API_BASE}/consentForm/statements/active`, (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify(mockActiveStatements),
    })
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

// ============================================================
// Step 1: Personal Information
// ============================================================
test.describe("Consent Form - Step 1: Personal Information", () => {
  test.beforeEach(async ({ page }) => {
    await setupConsentFormMocks(page);
  });

  test("displays Personal Information heading", async ({ page }) => {
    await page.goto("/consent-form");
    await expect(page.getByText("Personal Information")).toBeVisible();
  });

  test("shows all required form fields", async ({ page }) => {
    await page.goto("/consent-form");

    await expect(page.getByText("Full Name:")).toBeVisible();
    await expect(page.getByText("Date of Birth:")).toBeVisible();
    await expect(page.getByText("Gender:")).toBeVisible();
    await expect(page.getByText("Phone Number:")).toBeVisible();
    await expect(page.getByText("Email Address:")).toBeVisible();
  });

  test("shows validation errors on empty submission", async ({ page }) => {
    await page.goto("/consent-form");

    await clickSubmitButton(page);

    await expect(page.getByText("Full name is required")).toBeVisible();
    await expect(page.getByText("Gender is required")).toBeVisible();
  });

  test("successfully submits and redirects to products step", async ({ page }) => {
    await page.goto("/consent-form");

    // Fill Full Name
    await page.locator("input[name='fullName']").fill("Jane Doe");

    // Fill Date of Birth via the popover calendar
    const dobButton = page.getByRole("button", { name: /Select date/i });
    await dobButton.click();

    // captionLayout="dropdown" renders select elements for month and year
    const yearDropdown = page.locator("select").last();
    await yearDropdown.selectOption("2000");
    const monthDropdown = page.locator("select").first();
    await monthDropdown.selectOption("0"); // January
    await page.getByRole("gridcell", { name: "15" }).first().click();

    // Fill Gender
    await page.locator("input[name='gender']").fill("Female");

    // Fill Phone Number (react-number-format with mask)
    await page.locator("input[type='tel']").fill("5625551234");

    // Fill Email
    await page.locator("input[name='email']").fill("jane@example.com");

    // Submit
    await clickSubmitButton(page);

    // Should redirect to products page with clientId
    await page.waitForURL(/\/consent-form\/products/, { timeout: 10000 });
    expect(page.url()).toContain("clientId=");
  });
});

// ============================================================
// Step 2: Products
// ============================================================
test.describe("Consent Form - Step 2: Products", () => {
  test.beforeEach(async ({ page }) => {
    await setupConsentFormMocks(page);
  });

  test("displays products heading", async ({ page }) => {
    await page.goto(`/consent-form/products?clientId=${mockClientId}`);

    await expect(
      page.getByText("What products are you currently using at home?")
    ).toBeVisible();
  });

  test("shows validation error for short input", async ({ page }) => {
    await page.goto(`/consent-form/products?clientId=${mockClientId}`);

    await page.locator("textarea").fill("abc");
    await clickSubmitButton(page);

    await expect(
      page.getByText("Please list at least one product")
    ).toBeVisible();
  });

  test("successfully submits and redirects to skincare history", async ({ page }) => {
    await page.goto(`/consent-form/products?clientId=${mockClientId}`);

    await page.locator("textarea").fill("Versed Light Moisturizer, Dermalogica Toner Pads");
    await clickSubmitButton(page);

    await page.waitForURL(/\/consent-form\/skincare-history/, { timeout: 10000 });
    expect(page.url()).toContain("clientId=");
  });
});

// ============================================================
// Step 3: Skincare History
// ============================================================
test.describe("Consent Form - Step 3: Skincare History", () => {
  test.beforeEach(async ({ page }) => {
    await setupConsentFormMocks(page);
  });

  test("displays Evolution of Skincare heading", async ({ page }) => {
    await page.goto(`/consent-form/skincare-history?clientId=${mockClientId}`);
    await expect(page.getByText("Evolution of Skincare")).toBeVisible();
  });

  test("shows all skincare history questions", async ({ page }) => {
    await page.goto(`/consent-form/skincare-history?clientId=${mockClientId}`);

    await expect(page.getByText("Have you ever received a facial?")).toBeVisible();
    await expect(page.getByText("retinol, AHAs, BHAs", { exact: false })).toBeVisible();
    await expect(page.getByText("chemical peels", { exact: false })).toBeVisible();
    await expect(page.getByText("hair removal", { exact: false })).toBeVisible();
    await expect(page.getByText("medical conditions", { exact: false })).toBeVisible();
    await expect(page.getByText("known allergies", { exact: false })).toBeVisible();
    await expect(page.getByText("Botox, fillers", { exact: false })).toBeVisible();
    await expect(page.getByText("negative reaction", { exact: false })).toBeVisible();
    await expect(page.getByText("skin type")).toBeVisible();
    await expect(page.getByText("Pregnant or Nursing?")).toBeVisible();
    await expect(page.getByText("smoke or consume alcohol", { exact: false })).toBeVisible();
  });

  test("shows conditional 'When?' field for facials when 'Yes' selected", async ({ page }) => {
    await page.goto(`/consent-form/skincare-history?clientId=${mockClientId}`);

    // Click "Yes" for "Have you ever received a facial?" (id: r1)
    await page.locator("#r1").click();

    // The "When?" text input should become visible
    await expect(page.locator("input[placeholder='YYYY-MM-DD']").first()).toBeVisible();
  });

  test("shows conditional 'When?' field for chemical peels when 'Yes' selected", async ({ page }) => {
    await page.goto(`/consent-form/skincare-history?clientId=${mockClientId}`);

    // Click "Yes" for chemical peels (id: r5)
    await page.locator("#r5").click();

    await expect(page.locator("input[placeholder='YYYY-MM-DD']").last()).toBeVisible();
  });

  test("successfully submits with all defaults and redirects", async ({ page }) => {
    await page.goto(`/consent-form/skincare-history?clientId=${mockClientId}`);

    // All fields default to "no" and skin type to "normal", so just submit
    await clickSubmitButton(page);

    await page.waitForURL(/\/consent-form\/emergency-contact/, { timeout: 10000 });
    expect(page.url()).toContain("clientId=");
  });

  test("submits with 'Yes' answers and conditional fields filled", async ({ page }) => {
    await page.goto(`/consent-form/skincare-history?clientId=${mockClientId}`);

    // Facial: Yes + date
    await page.locator("#r1").click();
    await page.locator("input[placeholder='YYYY-MM-DD']").first().fill("2024-06-15");

    // Retinol: Yes
    await page.locator("#r3").click();

    // Skin type: oily
    await page.locator("#r19").click();

    await clickSubmitButton(page);

    await page.waitForURL(/\/consent-form\/emergency-contact/, { timeout: 10000 });
  });
});

// ============================================================
// Step 4: Emergency Contact
// ============================================================
test.describe("Consent Form - Step 4: Emergency Contact", () => {
  test.beforeEach(async ({ page }) => {
    await setupConsentFormMocks(page);
  });

  test("displays Emergency Contact heading", async ({ page }) => {
    await page.goto(`/consent-form/emergency-contact?clientId=${mockClientId}`);
    await expect(page.getByText("Emergency Contact")).toBeVisible();
  });

  test("shows all required fields", async ({ page }) => {
    await page.goto(`/consent-form/emergency-contact?clientId=${mockClientId}`);

    await expect(page.getByText("Full Name:")).toBeVisible();
    await expect(page.getByText("Phone Number:")).toBeVisible();
    await expect(page.getByText("Relationship:")).toBeVisible();
  });

  test("shows validation errors on empty submission", async ({ page }) => {
    await page.goto(`/consent-form/emergency-contact?clientId=${mockClientId}`);

    await clickSubmitButton(page);

    await expect(page.getByText("Emergency contact name is required")).toBeVisible();
    await expect(page.getByText("Relationship is required")).toBeVisible();
  });

  test("successfully submits and redirects to consent & acknowledgement", async ({ page }) => {
    await page.goto(`/consent-form/emergency-contact?clientId=${mockClientId}`);

    await page.locator("input[name='name']").fill("John Doe");
    await page.locator("input[type='tel']").fill("5559876543");
    await page.locator("input[name='relationship']").fill("Spouse");

    await clickSubmitButton(page);

    await page.waitForURL(/\/consent-form\/consent-and-acknowledgement/, { timeout: 10000 });
    expect(page.url()).toContain("clientId=");
  });
});

// ============================================================
// Step 5: Consent & Acknowledgement
// ============================================================
test.describe("Consent Form - Step 5: Consent & Acknowledgement", () => {
  test.beforeEach(async ({ page }) => {
    await setupConsentFormMocks(page);
  });

  test("displays consent heading and text", async ({ page }) => {
    await page.goto(`/consent-form/consent-and-acknowledgement?clientId=${mockClientId}`);

    await expect(page.getByText("Consent and Acknowledgement")).toBeVisible();
    await expect(page.getByText("By signing below, I acknowledge", { exact: false })).toBeVisible();
  });

  test("shows Client's Signature label", async ({ page }) => {
    await page.goto(`/consent-form/consent-and-acknowledgement?clientId=${mockClientId}`);
    await expect(page.getByText("Client's Signature:")).toBeVisible();
  });

  test("shows validation error when submitting without signature", async ({ page }) => {
    await page.goto(`/consent-form/consent-and-acknowledgement?clientId=${mockClientId}`);

    await clickSubmitButton(page);

    await expect(page.getByText("Please provide your signature")).toBeVisible();
  });

  test("successfully draws signature, saves, and submits", async ({ page }) => {
    await page.goto(`/consent-form/consent-and-acknowledgement?clientId=${mockClientId}`);

    // Draw and save signature
    const signatureContainer = page.locator(".relative:has(canvas)").first();
    await drawAndSaveSignature(page, signatureContainer);

    await clickSubmitButton(page);

    await page.waitForURL(/\/consent-form\/initial-statements/, { timeout: 10000 });
    expect(page.url()).toContain("clientId=");
  });
});

// ============================================================
// Step 6: Initial Statements (Final)
// ============================================================
test.describe("Consent Form - Step 6: Terms and Agreements (Final)", () => {
  test.beforeEach(async ({ page }) => {
    await setupConsentFormMocks(page);
  });

  test("displays Terms and Agreements heading", async ({ page }) => {
    await page.goto(`/consent-form/initial-statements?clientId=${mockClientId}`);
    await expect(page.getByText("Terms and Agreements")).toBeVisible();
  });

  test("displays consent form statements from API", async ({ page }) => {
    await page.goto(`/consent-form/initial-statements?clientId=${mockClientId}`);

    for (const stmt of mockActiveStatements) {
      await expect(page.getByText(stmt.statement)).toBeVisible();
    }
  });

  test("displays initials pad, checkboxes, print name, and signature", async ({ page }) => {
    await page.goto(`/consent-form/initial-statements?clientId=${mockClientId}`);

    await expect(page.getByText("Please enter your initials here")).toBeVisible();
    await expect(page.getByText("Client Declaration")).toBeVisible();
    await expect(page.getByText("Print Name:")).toBeVisible();
    await expect(page.getByText("Signature:")).toBeVisible();
  });

  test("shows validation errors when submitting empty", async ({ page }) => {
    await page.goto(`/consent-form/initial-statements?clientId=${mockClientId}`);

    await clickSubmitButton(page);

    // Should show at least one validation error
    await expect(page.getByText("Please print your full name")).toBeVisible();
  });

  test("successfully completes the entire final step", async ({ page }) => {
    await page.goto(`/consent-form/initial-statements?clientId=${mockClientId}`);

    // 1. Draw and save initials
    const signaturePads = page.locator(".relative:has(canvas)");
    const initialsPad = signaturePads.first();
    await drawAndSaveSignature(page, initialsPad);

    // 2. Check all statement checkboxes
    //    Checkboxes have numeric IDs (0, 1, 2...). Use attribute selector since
    //    CSS `#0` is invalid but `[id="0"]` works.
    for (let i = 0; i < mockActiveStatements.length; i++) {
      const checkbox = page.locator(`[id="${i}"]`);
      if (await checkbox.isVisible()) {
        await checkbox.click();
      } else {
        // After initials are saved and checked, they may render as <img> overlays
        const listItem = page.locator("li").nth(i);
        const clickTarget = listItem.locator("img, button, [role='checkbox']").first();
        if (await clickTarget.isVisible()) {
          await clickTarget.click();
        }
      }
    }

    // 3. Fill printed name
    await page.locator("input[placeholder='Jane Doe']").fill("Jane Doe");

    // 4. Draw and save final signature
    const signatureContainer = signaturePads.last();
    await drawAndSaveSignature(page, signatureContainer);

    // 5. Submit
    await clickSubmitButton(page);

    // Should show success message
    await expect(
      page.getByText("Thank you for filling out the consent form!")
    ).toBeVisible({ timeout: 10000 });
  });
});

// ============================================================
// Full Consent Form Flow (End-to-End)
// ============================================================
test.describe("Consent Form - Full Flow", () => {
  test("completes all 6 steps from start to finish", async ({ page }) => {
    test.setTimeout(60000); // This is a long multi-step test
    await setupConsentFormMocks(page);

    // ---- Step 1: Personal Information ----
    await page.goto("/consent-form");
    await expect(page.getByText("Personal Information")).toBeVisible();

    await page.locator("input[name='fullName']").fill("Jane Doe");

    const dobButton = page.getByRole("button", { name: /Select date/i });
    await dobButton.click();
    await page.locator("select").last().selectOption("2000");
    await page.locator("select").first().selectOption("0");
    await page.getByRole("gridcell", { name: "15" }).first().click();

    await page.locator("input[name='gender']").fill("Female");
    await page.locator("input[type='tel']").fill("5625551234");
    await page.locator("input[name='email']").fill("jane@example.com");
    await clickSubmitButton(page);

    // ---- Step 2: Products ----
    await page.waitForURL(/\/consent-form\/products/, { timeout: 10000 });
    await expect(page.getByText("What products are you currently using at home?")).toBeVisible();

    await page.locator("textarea").fill("Versed Light Moisturizer, Dermalogica Toner Pads");
    await clickSubmitButton(page);

    // ---- Step 3: Skincare History ----
    await page.waitForURL(/\/consent-form\/skincare-history/, { timeout: 10000 });
    await expect(page.getByText("Evolution of Skincare")).toBeVisible();

    // Accept all defaults and submit
    await clickSubmitButton(page);

    // ---- Step 4: Emergency Contact ----
    await page.waitForURL(/\/consent-form\/emergency-contact/, { timeout: 10000 });
    await expect(page.getByText("Emergency Contact")).toBeVisible();

    await page.locator("input[name='name']").fill("John Doe");
    await page.locator("input[type='tel']").fill("5559876543");
    await page.locator("input[name='relationship']").fill("Spouse");
    await clickSubmitButton(page);

    // ---- Step 5: Consent & Acknowledgement ----
    await page.waitForURL(/\/consent-form\/consent-and-acknowledgement/, { timeout: 10000 });
    await expect(page.getByText("Consent and Acknowledgement")).toBeVisible();

    const step5Container = page.locator(".relative:has(canvas)").first();
    await drawAndSaveSignature(page, step5Container);
    await clickSubmitButton(page);

    // ---- Step 6: Initial Statements ----
    await page.waitForURL(/\/consent-form\/initial-statements/, { timeout: 10000 });
    await expect(page.getByText("Terms and Agreements")).toBeVisible();

    // Draw and save initials
    const signaturePads = page.locator(".relative:has(canvas)");
    const initialsPad = signaturePads.first();
    await drawAndSaveSignature(page, initialsPad);

    // Check all statement checkboxes
    for (let i = 0; i < mockActiveStatements.length; i++) {
      const checkbox = page.locator(`[id="${i}"]`);
      if (await checkbox.isVisible()) {
        await checkbox.click();
      } else {
        const listItem = page.locator("li").nth(i);
        await listItem.locator("img, button, [role='checkbox']").first().click();
      }
    }

    // Print name
    await page.locator("input[placeholder='Jane Doe']").fill("Jane Doe");

    // Draw and save final signature
    // The final signature pad is the second signature pad on this page.
    // Use nth(1) to get the second one (the final signature, not the initials one).
    const finalSigPad = page.locator(".relative:has(canvas)").nth(1);
    await finalSigPad.evaluate((el) => el.scrollIntoView({ behavior: "instant", block: "center" }));
    await page.waitForTimeout(300);
    await drawAndSaveSignature(page, finalSigPad);

    // Submit
    await clickSubmitButton(page);

    // Verify success
    await expect(
      page.getByText("Thank you for filling out the consent form!")
    ).toBeVisible({ timeout: 10000 });
  });
});
