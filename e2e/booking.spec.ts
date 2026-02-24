import { test, expect } from "@playwright/test";
import { format, addDays } from "date-fns";
import {
  mockAppointmentStatuses,
  mockAppointmentsForDate,
} from "./fixtures/mock-data";

const API_BASE = "http://localhost:5000";

test.describe("Booking Page", () => {
  // Calendar date selection + useEffect data fetching can have timing issues
  test.describe.configure({ retries: 2 });
  const tomorrow = addDays(new Date(), 1);
  const tomorrowFormatted = format(tomorrow, "MM-dd-yyyy");
  const todayFormatted = format(new Date(), "MM-dd-yyyy");

  test.beforeEach(async ({ page }) => {
    // Intercept ALL requests to the API base to ensure nothing hits a real backend
    await page.route(`${API_BASE}/**`, (route) => {
      const url = route.request().url();
      const path = url.replace(API_BASE, "");

      // Appointment status endpoint
      if (path === "/appointments/status") {
        return route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(mockAppointmentStatuses),
        });
      }

      // Appointments for tomorrow (the date with data)
      if (path === `/appointments/${tomorrowFormatted}`) {
        return route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(mockAppointmentsForDate),
        });
      }

      // Any other appointments date request (including today) - return empty
      if (/^\/appointments\/\d{2}-\d{2}-\d{4}$/.test(path)) {
        return route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify([]),
        });
      }

      // Default fallback
      return route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([]),
      });
    });
  });

  /**
   * Click tomorrow's date button in the calendar using the data-day attribute.
   * react-day-picker v9 renders: <button data-day="2/24/2026" aria-label="...">24</button>
   * After clicking, waits for the selected state to update.
   */
  async function clickTomorrow(page: import("@playwright/test").Page) {
    // Format date as M/D/YYYY to match react-day-picker's data-day attribute
    const month = tomorrow.getMonth() + 1;
    const day = tomorrow.getDate();
    const year = tomorrow.getFullYear();
    const dataDayValue = `${month}/${day}/${year}`;

    // If tomorrow is in the next month relative to what's displayed, navigate forward
    const tomorrowButton = page.locator(`button[data-day="${dataDayValue}"]`);
    if (!(await tomorrowButton.isVisible({ timeout: 2000 }).catch(() => false))) {
      await page.getByRole("button", { name: "Go to the Next Month" }).click();
      await page.waitForTimeout(300);
    }

    await tomorrowButton.click();

    // Wait for the selected state to be reflected (aria-pressed or selected attribute)
    // and for the table to potentially re-render
    await page.waitForTimeout(500);
  }

  test("displays booking heading and warning text", async ({ page }) => {
    await page.goto("/booking?appointmentType=Sunset+Glow+Facial");

    await expect(page.locator("#booking")).toHaveText("Booking");
    await expect(
      page.getByText("Selecting a date and time sends a request")
    ).toBeVisible();
    await expect(
      page.getByText("receive a message or email", { exact: false })
    ).toBeVisible();
  });

  test("renders the calendar and date selection label", async ({ page }) => {
    await page.goto("/booking?appointmentType=Sunset+Glow+Facial");

    await expect(
      page.getByText("Select a date to see available appointments:")
    ).toBeVisible();
    await expect(page.locator("table").first()).toBeVisible();
  });

  test("selecting a date shows appointment time slots in the table", async ({
    page,
  }) => {
    await page.goto("/booking?appointmentType=Sunset+Glow+Facial");

    await clickTomorrow(page);

    // Wait for table rows with actual data (not "No results")
    await expect(
      page.locator("table tbody tr").filter({ hasNotText: "No results" }).first()
    ).toBeVisible({ timeout: 5000 });
  });

  test("available slots show 'Available' and booked slots show 'Booked'", async ({
    page,
  }) => {
    await page.goto("/booking?appointmentType=Sunset+Glow+Facial");

    await clickTomorrow(page);

    // Wait for table rows with actual appointment data
    // The "Available" text within a table cell confirms data loaded
    await expect(
      page.locator("table").getByText("Available").first()
    ).toBeVisible({ timeout: 15000 });
    await expect(
      page.locator("table").getByText("Booked").first()
    ).toBeVisible({ timeout: 5000 });
  });

  test("available slot has a clickable 'Book Now!' link", async ({ page }) => {
    await page.goto("/booking?appointmentType=Sunset+Glow+Facial");

    await clickTomorrow(page);

    const bookNowLink = page.getByRole("link", { name: "Book Now!" }).first();
    await expect(bookNowLink).toBeVisible({ timeout: 15000 });

    const href = await bookNowLink.getAttribute("href");
    expect(href).toContain("appointmentId=appt-001");
    expect(href).toContain("appointmentType=");
  });

  test("booked slot has a disabled 'Book Now!' element", async ({ page }) => {
    await page.goto("/booking?appointmentType=Sunset+Glow+Facial");

    await clickTomorrow(page);

    const bookNowLink = page.getByRole("link", { name: "Book Now!" }).first();
    await expect(bookNowLink).toBeVisible({ timeout: 15000 });

    // The disabled "Book Now!" for booked slots is an <a> with disabled attribute
    const disabledBookNow = page.locator("a[disabled]").first();
    await expect(disabledBookNow).toBeVisible();
    await expect(disabledBookNow).toContainText("Book Now!");
  });

  test("clicking 'Book Now!' navigates to schedule appointment page", async ({
    page,
  }) => {
    await page.goto("/booking?appointmentType=Sunset+Glow+Facial");

    await clickTomorrow(page);

    const bookNowLink = page.getByRole("link", { name: "Book Now!" }).first();
    await expect(bookNowLink).toBeVisible({ timeout: 15000 });
    await bookNowLink.click();

    // columns.tsx links to /booking/scheduleAppointment (camelCase)
    await page.waitForURL(/\/booking\/schedule/, { timeout: 5000 });
  });
});

test.describe("Booking Page with Promotion", () => {
  test("uses promotion-specific API endpoint", async ({ page }) => {
    const promotionName = "summer-special";
    let promotionStatusCalled = false;

    await page.route(
      `${API_BASE}/appointments/promotion/status/${promotionName}`,
      (route) => {
        promotionStatusCalled = true;
        return route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify([]),
        });
      }
    );

    await page.route(`${API_BASE}/appointments/status`, (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([]),
      })
    );

    // Also mock default date fetch
    await page.route(/\/appointments\/\d{2}-\d{2}-\d{4}/, (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([]),
      })
    );

    await page.goto(
      `/booking?appointmentType=Sunset+Glow+Facial&promotionName=${promotionName}`
    );

    await page.waitForTimeout(1000);
    expect(promotionStatusCalled).toBe(true);
  });
});
