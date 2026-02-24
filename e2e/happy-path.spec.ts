/**
 * Happy-path E2E test: Full user journey from landing page through booking
 * and the complete consent form, hitting the REAL backend at localhost:5000.
 *
 * Prerequisites:
 *   1. Backend running at localhost:5000
 *   2. Valid admin credentials in .env.e2e.local:
 *        E2E_ADMIN_USERNAME=<username>
 *        E2E_ADMIN_PASSWORD=<password>
 *   3. At least one active consent form statement in the database
 *
 * Run with:
 *   pnpm test:e2e e2e/happy-path.spec.ts
 */

import { test, expect, Page } from "@playwright/test";
import { format, addDays } from "date-fns";
import * as dotenv from "dotenv";
import * as path from "path";

// ---- Load credentials from .env.e2e.local ----
dotenv.config({ path: path.resolve(__dirname, "../.env.e2e.local") });

const API_BASE = "http://localhost:5000";
const ADMIN_USERNAME = process.env.E2E_ADMIN_USERNAME!;
const ADMIN_PASSWORD = process.env.E2E_ADMIN_PASSWORD!;

// We'll create an appointment for tomorrow at 10:00 AM
const tomorrow = addDays(new Date(), 1);
const appointmentDatetime = format(
  new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 10, 0, 0),
  "yyyy-MM-dd'T'HH:mm:ss"
);
const tomorrowCalendarDataDay = `${tomorrow.getMonth() + 1}/${tomorrow.getDate()}/${tomorrow.getFullYear()}`;

// ---- Helpers ----

async function clickSubmitButton(page: Page) {
  await page.locator("form button[type='submit']").first().click();
}

async function drawAndSaveSignature(
  page: Page,
  container: ReturnType<Page["locator"]>
) {
  const canvas = container.locator("canvas");
  await container.scrollIntoViewIfNeeded();
  await canvas.waitFor({ state: "visible", timeout: 10_000 });

  const box = await canvas.boundingBox();
  if (!box) throw new Error("Canvas bounding box not found");

  await page.mouse.move(box.x + box.width * 0.1, box.y + box.height * 0.5);
  await page.mouse.down();
  await page.mouse.move(box.x + box.width * 0.3, box.y + box.height * 0.2, {
    steps: 5,
  });
  await page.mouse.move(box.x + box.width * 0.5, box.y + box.height * 0.8, {
    steps: 5,
  });
  await page.mouse.move(box.x + box.width * 0.7, box.y + box.height * 0.2, {
    steps: 5,
  });
  await page.mouse.move(box.x + box.width * 0.9, box.y + box.height * 0.5, {
    steps: 5,
  });
  await page.mouse.up();

  // Click the Save button (last .rounded-full button in the container)
  await container.locator("button.rounded-full").last().click();
}

// ---- Test Setup & Teardown ----

let adminToken: string;
let setupError: string | null = null;

test.beforeAll(async () => {
  if (!ADMIN_USERNAME || !ADMIN_PASSWORD) {
    setupError =
      "Missing E2E_ADMIN_USERNAME or E2E_ADMIN_PASSWORD in .env.e2e.local. " +
      "Add your real admin credentials to run this test.";
    return;
  }

  // 1. Log in as admin to get token
  let loginRes: Response;
  try {
    loginRes = await fetch(`${API_BASE}/admin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: ADMIN_USERNAME,
        password: ADMIN_PASSWORD,
      }),
    });
  } catch (err) {
    setupError = `Cannot reach backend at ${API_BASE}. Is it running? (${err})`;
    return;
  }

  if (!loginRes.ok) {
    setupError =
      `Admin login failed (${loginRes.status}). ` +
      `Update E2E_ADMIN_USERNAME / E2E_ADMIN_PASSWORD in .env.e2e.local with valid credentials.`;
    return;
  }

  adminToken = await loginRes.json();

  // 2. Create an available appointment for tomorrow at 10:00 AM
  const createRes = await fetch(
    `${API_BASE}/admin/${adminToken}/appointments`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify([
        { datetime: appointmentDatetime, status: false },
      ]),
    }
  );

  if (!createRes.ok) {
    setupError =
      `Failed to create appointment (${createRes.status}): ${await createRes.text()}`;
    return;
  }
});

// ---- The Test ----

test.describe("Happy Path: Landing → Booking → Consent Form", () => {
  test("completes the entire user journey end-to-end", async ({ page }) => {
    test.skip(!!setupError, setupError ?? "Setup failed");
    test.setTimeout(120_000);

    // ================================================================
    // LANDING PAGE
    // ================================================================
    await page.goto("/");

    // Service category headings are present
    await expect(page.locator("#signature-facials")).toHaveText(
      "Signature Facials"
    );
    await expect(page.locator("#facial-packages")).toHaveText(
      "Facial Packages"
    );
    await expect(page.locator("#facial-add-ons")).toHaveText("Facial Add-Ons");

    // About section is visible
    await expect(page.locator("#about")).toBeVisible();

    // ================================================================
    // BOOKING PAGE
    // ================================================================
    // Navigate to booking for the "daydream" service (a real Facial in the DB)
    await page.goto("/booking?appointmentType=daydream");

    await expect(page.locator("#booking")).toHaveText("Booking");
    await expect(
      page.getByText("Selecting a date and time sends a request")
    ).toBeVisible();

    // Click tomorrow's date in the calendar
    const tomorrowButton = page.locator(
      `button[data-day="${tomorrowCalendarDataDay}"]`
    );
    if (
      !(await tomorrowButton.isVisible({ timeout: 2000 }).catch(() => false))
    ) {
      await page
        .getByRole("button", { name: "Go to the Next Month" })
        .click();
      await page.waitForTimeout(300);
    }
    await tomorrowButton.click();

    // Wait for the appointment table to show an "Available" slot
    await expect(
      page.locator("table").getByText("Available").first()
    ).toBeVisible({ timeout: 15_000 });

    // Click "Book Now!" on the available slot
    const bookNowLink = page.getByRole("link", { name: "Book Now!" }).first();
    await expect(bookNowLink).toBeVisible();
    await bookNowLink.click();

    // ================================================================
    // SCHEDULE APPOINTMENT PAGE
    // ================================================================
    await page.waitForURL(/\/booking\/schedule-appointment/, {
      timeout: 10_000,
    });

    await expect(page.locator("#schedule-appointment")).toHaveText(
      "Schedule Appointment"
    );

    // Verify appointment date/time loaded from backend
    await expect(page.getByText("appointment on")).toBeVisible({
      timeout: 5000,
    });

    // Fill in the scheduling form
    await page.getByLabel("Preferred Name").fill("E2E Test User");
    await page.getByLabel("Email Address").fill("e2e-test@example.com");
    await page.getByLabel("Phone Number").fill("5625559999");
    await page.locator("textarea").fill("Dry skin, mild redness on cheeks");

    // Submit
    await page.locator("button[type='submit']").click();

    // Success message
    await expect(
      page.getByText("Appointment request sent!")
    ).toBeVisible({ timeout: 10_000 });

    // Redirect to consent form with clientId
    await page.waitForURL(/\/consent-form\?/, { timeout: 10_000 });
    expect(page.url()).toContain("clientId=");

    // ================================================================
    // CONSENT FORM - Step 1: Personal Information
    // ================================================================
    await expect(page.getByText("Personal Information")).toBeVisible();

    await page.locator("input[name='fullName']").fill("E2E Test User");

    // Date of Birth - open calendar, pick Jan 15, 2000
    const dobButton = page.getByRole("button", { name: /Select date/i });
    await dobButton.click();
    await page.locator("select").last().selectOption("2000");
    await page.locator("select").first().selectOption("0"); // January
    await page.getByRole("gridcell", { name: "15" }).first().click();

    await page.locator("input[name='gender']").fill("Non-binary");
    await page.locator("input[type='tel']").fill("5625559999");
    await page.locator("input[name='email']").fill("e2e-test@example.com");

    await clickSubmitButton(page);

    // ================================================================
    // CONSENT FORM - Step 2: Products
    // ================================================================
    await page.waitForURL(/\/consent-form\/products/, { timeout: 10_000 });
    expect(page.url()).toContain("clientId=");

    await expect(
      page.getByText("What products are you currently using at home?")
    ).toBeVisible();

    await page
      .locator("textarea")
      .fill("CeraVe Moisturizing Cream, La Roche-Posay SPF 50");

    await clickSubmitButton(page);

    // ================================================================
    // CONSENT FORM - Step 3: Skincare History
    // ================================================================
    await page.waitForURL(/\/consent-form\/skincare-history/, {
      timeout: 10_000,
    });
    expect(page.url()).toContain("clientId=");

    await expect(page.getByText("Evolution of Skincare")).toBeVisible();

    // Leave all defaults (No for everything, Normal skin type) and submit
    await clickSubmitButton(page);

    // ================================================================
    // CONSENT FORM - Step 4: Emergency Contact
    // ================================================================
    await page.waitForURL(/\/consent-form\/emergency-contact/, {
      timeout: 10_000,
    });
    expect(page.url()).toContain("clientId=");

    await expect(page.getByText("Emergency Contact")).toBeVisible();

    await page.locator("input[name='name']").fill("Emergency Contact Person");
    await page.locator("input[type='tel']").fill("5625558888");
    await page.locator("input[name='relationship']").fill("Sibling");

    await clickSubmitButton(page);

    // ================================================================
    // CONSENT FORM - Step 5: Consent & Acknowledgement
    // ================================================================
    await page.waitForURL(/\/consent-form\/consent-and-acknowledgement/, {
      timeout: 10_000,
    });
    expect(page.url()).toContain("clientId=");

    await expect(
      page.getByText("Consent and Acknowledgement")
    ).toBeVisible();

    // Draw and save signature
    const step5SigPad = page.locator(".relative:has(canvas)").first();
    await drawAndSaveSignature(page, step5SigPad);

    await clickSubmitButton(page);

    // ================================================================
    // CONSENT FORM - Step 6: Initial Statements (Final)
    // ================================================================
    await page.waitForURL(/\/consent-form\/initial-statements/, {
      timeout: 10_000,
    });
    expect(page.url()).toContain("clientId=");

    await expect(page.getByText("Terms and Agreements")).toBeVisible();

    // Wait for statements to load from the API
    // The backend has 11 active statements. Wait for at least the first one.
    await expect(page.locator("li").first()).toBeVisible({ timeout: 10_000 });

    // 1. Draw and save initials
    const signaturePads = page.locator(".relative:has(canvas)");
    const initialsPad = signaturePads.first();
    await drawAndSaveSignature(page, initialsPad);

    // 2. Check all statement checkboxes
    //    After initials are saved, checkboxes appear. IDs are numeric (0, 1, 2...).
    const checkboxes = page.locator("li input[type='checkbox'], li [id]").filter({
      has: page.locator("self:not(li)"),
    });
    // Simpler approach: click every <li> that contains an unchecked checkbox-like element
    const listItems = page.locator("ol li, ul li");
    const listItemCount = await listItems.count();
    for (let i = 0; i < listItemCount; i++) {
      const item = listItems.nth(i);
      // The checkbox element uses id="0", id="1", etc.
      const checkbox = item.locator(`[id="${i}"]`);
      if (await checkbox.isVisible({ timeout: 1000 }).catch(() => false)) {
        await checkbox.click();
      }
    }

    // 3. Fill printed name
    await page
      .locator("input[placeholder='Jane Doe']")
      .fill("E2E Test User");

    // 4. Draw and save final signature (second signature pad)
    const finalSigPad = signaturePads.nth(1);
    await finalSigPad.evaluate((el) =>
      el.scrollIntoView({ behavior: "instant", block: "center" })
    );
    await page.waitForTimeout(300);
    await drawAndSaveSignature(page, finalSigPad);

    // 5. Submit the final form
    await clickSubmitButton(page);

    // ================================================================
    // SUCCESS
    // ================================================================
    await expect(
      page.getByText("Thank you for filling out the consent form!")
    ).toBeVisible({ timeout: 10_000 });
  });
});
