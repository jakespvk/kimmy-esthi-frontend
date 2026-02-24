import { Page } from "@playwright/test";

const API_BASE = "http://localhost:5000";

/**
 * Set up API route interception for a page. Call this before navigating.
 * Intercepts all requests to the backend and returns mock responses.
 */
export async function mockApiRoutes(
  page: Page,
  overrides: Record<string, { body: unknown; status?: number }> = {}
) {
  await page.route(`${API_BASE}/**`, async (route) => {
    const url = route.request().url();
    const method = route.request().method();
    const path = url.replace(API_BASE, "");

    // Check if there's a specific override for this path
    for (const [pattern, response] of Object.entries(overrides)) {
      if (path.includes(pattern)) {
        await route.fulfill({
          status: response.status ?? 200,
          contentType: "application/json",
          body: JSON.stringify(response.body),
        });
        return;
      }
    }

    // Default: return empty success for unmatched routes
    if (method === "POST" || method === "PUT" || method === "DELETE") {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify("ok"),
      });
      return;
    }

    // Default GET: return empty array
    await route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify([]),
    });
  });
}

/**
 * Draw a signature on a canvas element by simulating mouse movements.
 * Finds the canvas inside the given container selector.
 */
export async function drawSignature(page: Page, canvasSelector: string) {
  const canvas = page.locator(canvasSelector);
  await canvas.waitFor({ state: "visible" });

  const box = await canvas.boundingBox();
  if (!box) throw new Error(`Canvas not found: ${canvasSelector}`);

  // Draw a simple zigzag to produce enough data for validation
  const startX = box.x + box.width * 0.1;
  const startY = box.y + box.height * 0.5;

  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await page.mouse.move(startX + box.width * 0.2, startY - box.height * 0.3, {
    steps: 5,
  });
  await page.mouse.move(startX + box.width * 0.4, startY + box.height * 0.3, {
    steps: 5,
  });
  await page.mouse.move(startX + box.width * 0.6, startY - box.height * 0.3, {
    steps: 5,
  });
  await page.mouse.move(startX + box.width * 0.8, startY + box.height * 0.1, {
    steps: 5,
  });
  await page.mouse.up();
}

/**
 * Click the "Save" button adjacent to a signature canvas.
 * The save button is the second button in the signature pad's button group.
 */
export async function saveSignature(page: Page, containerSelector: string) {
  // The save button is the second .rounded-full button inside the signature pad container
  const container = page.locator(containerSelector);
  const saveButton = container.locator("button.rounded-full").last();
  await saveButton.click();
}
