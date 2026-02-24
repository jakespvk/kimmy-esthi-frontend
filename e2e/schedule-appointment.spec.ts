import { test, expect } from "@playwright/test";
import { mockSingleAppointment, mockClientId } from "./fixtures/mock-data";

const API_BASE = "http://localhost:5000";

test.describe("Schedule Appointment Page", () => {
  const appointmentId = "appt-001";
  const appointmentType = "Sunset Glow Facial";

  test.beforeEach(async ({ page }) => {
    // Mock the single appointment fetch
    await page.route(`${API_BASE}/appointment/${appointmentId}`, (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(mockSingleAppointment),
      })
    );

    // Mock the POST /appointment endpoint
    await page.route(`${API_BASE}/appointment`, (route) => {
      if (route.request().method() === "POST") {
        return route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(mockClientId),
        });
      }
      return route.fallback();
    });
  });

  test("displays Schedule Appointment heading", async ({ page }) => {
    await page.goto(
      `/booking/schedule-appointment?appointmentId=${appointmentId}&appointmentType=${encodeURIComponent(appointmentType)}`
    );

    await expect(page.locator("#schedule-appointment")).toHaveText(
      "Schedule Appointment"
    );
  });

  test("displays appointment date and time from API", async ({ page }) => {
    await page.goto(
      `/booking/schedule-appointment?appointmentId=${appointmentId}&appointmentType=${encodeURIComponent(appointmentType)}`
    );

    // The page shows "Scheduling {time} appointment on {date}"
    await expect(page.getByText("Scheduling")).toBeVisible();
    await expect(page.getByText("appointment on")).toBeVisible({
      timeout: 5000,
    });
  });

  test("displays warning text", async ({ page }) => {
    await page.goto(
      `/booking/schedule-appointment?appointmentId=${appointmentId}&appointmentType=${encodeURIComponent(appointmentType)}`
    );

    await expect(
      page.getByText("Selecting a date and time sends a request")
    ).toBeVisible();
  });

  test("has a Go Back button", async ({ page }) => {
    await page.goto(
      `/booking/schedule-appointment?appointmentId=${appointmentId}&appointmentType=${encodeURIComponent(appointmentType)}`
    );

    await expect(page.getByRole("button", { name: "Go Back" })).toBeVisible();
  });

  test("shows form fields with labels", async ({ page }) => {
    await page.goto(
      `/booking/schedule-appointment?appointmentId=${appointmentId}&appointmentType=${encodeURIComponent(appointmentType)}`
    );

    await expect(page.getByText("Preferred Name")).toBeVisible();
    await expect(page.getByText("Email Address")).toBeVisible();
    await expect(page.getByText("Phone Number")).toBeVisible();
    await expect(page.getByText("Skin Concerns")).toBeVisible();
  });

  test("shows validation errors on empty submission", async ({ page }) => {
    await page.goto(
      `/booking/schedule-appointment?appointmentId=${appointmentId}&appointmentType=${encodeURIComponent(appointmentType)}`
    );

    // Click submit without filling any fields
    await page.locator("button[type='submit']").click();

    // Should show validation error messages
    await expect(page.getByText("Must be valid email address")).toBeVisible();
    await expect(page.getByText("Must be valid phone number")).toBeVisible();
    await expect(
      page.getByText("We need to know a bit about why", { exact: false })
    ).toBeVisible();
  });

  test("successful submission shows success message and redirects", async ({
    page,
  }) => {
    await page.goto(
      `/booking/schedule-appointment?appointmentId=${appointmentId}&appointmentType=${encodeURIComponent(appointmentType)}`
    );

    // Fill in the form
    await page.getByLabel("Preferred Name").fill("Jane Doe");
    await page.getByLabel("Email Address").fill("jane@example.com");
    await page.getByLabel("Phone Number").fill("5625551234");
    await page.locator("textarea").fill("Dry patches on cheeks");

    // Submit
    await page.locator("button[type='submit']").click();

    // Should show success message
    await expect(
      page.getByText("Appointment request sent!")
    ).toBeVisible({ timeout: 5000 });

    // Should redirect to consent form
    await page.waitForURL(/\/consent-form/, { timeout: 10000 });
    expect(page.url()).toContain("clientId=");
  });

  test("pre-fills form from query params", async ({ page }) => {
    await page.goto(
      `/booking/schedule-appointment?appointmentId=${appointmentId}&appointmentType=${encodeURIComponent(appointmentType)}&preferredName=Kim&email=kim@test.com&phoneNumber=5551234567&skinConcerns=Acne`
    );

    await expect(page.getByLabel("Preferred Name")).toHaveValue("Kim");
    await expect(page.getByLabel("Email Address")).toHaveValue("kim@test.com");
    await expect(page.getByLabel("Phone Number")).toHaveValue("5551234567");
    await expect(page.locator("textarea")).toHaveValue("Acne");
  });
});
