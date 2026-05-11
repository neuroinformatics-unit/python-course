import { expect, test } from "@playwright/test";

test("opens the quest map and completes a reading checkpoint", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("navigation", { name: "Quest map" })).toBeVisible();
  await page.getByRole("button", { name: /Why Python/ }).click();
  await expect(page.getByRole("heading", { name: /Why Python/ })).toBeVisible();

  await page.getByRole("button", { name: "Mark lesson complete" }).click();
  await page.getByRole("button", { name: "Home" }).click();
  await expect(page.getByTitle("Experience points")).toContainText("20 XP");
});

test("persists local progress after reload", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Why Python/ }).click();
  await page.getByRole("button", { name: "Mark lesson complete" }).click();
  await page.reload();
  await expect(page.getByTitle("Experience points")).toContainText("20 XP");
});

test("shows a runnable code cell", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Calculations/ }).click();
  await expect(page.getByLabel("Python code editor")).toBeVisible();
  await expect(page.getByRole("button", { name: "Run" })).toBeVisible();
  await expect(page.getByText(/Add 12 and 8/)).toBeVisible();
});

test("allows jumping to later quests without completing prerequisites", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Exam Task: Public Hospitals/ }).click();
  await expect(page.locator("h1", { hasText: "Exam Task: Public Hospitals" })).toBeVisible();
});

test("loads data quest pages with package-backed activities", async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem(
      "python-quest-progress-v1",
      JSON.stringify({
        completedLessons: [
          "why-python",
          "first-calculator",
          "data-types",
          "collections",
          "mutable",
          "loops",
          "conditionals",
          "comprehensions",
          "functions",
          "standard-library",
          "ways-of-working",
          "conda",
          "starter-files",
        ],
        exerciseAttempts: {},
        currentQuestId: "data-toolkit",
        xp: 455,
        badges: ["Pathfinder", "Collector", "Navigator", "Function Smith", "Environment Keeper"],
      }),
    );
  });
  await page.goto("/");
  await page.getByRole("button", { name: /Array Operations/ }).click();
  await expect(page.locator("h1", { hasText: "Array Operations" })).toBeVisible();
  await expect(page.getByText(/multiply by 2/)).toBeVisible();
});
