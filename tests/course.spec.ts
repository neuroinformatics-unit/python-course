import { expect, test } from "@playwright/test";

test("opens the course map and completes a reading checkpoint", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("navigation", { name: "course map" })).toBeVisible();
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
  await page.getByRole("button", { name: /Checkpoint: Calculations/ }).click();
  const exercisePanel = page.locator(".code-panel");
  await expect(page.getByLabel("Python exercise editor")).toBeVisible();
  await expect(exercisePanel.getByRole("button", { name: "Run" })).toBeVisible();
  await expect(page.getByText(/Add the two existing numbers/)).toBeVisible();
});

test("loads terminal and IDE lesson images", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /The Terminal and IDEs/ }).click();
  await expect(page.getByRole("heading", { name: /The Terminal and IDEs/ })).toBeVisible();

  const lessonImages = page.locator(".lesson-figures img");
  await expect(lessonImages).toHaveCount(3);
  await expect(lessonImages.nth(0)).toHaveAttribute("src", /slide09-01\.png$/);
  await expect(lessonImages.nth(1)).toHaveAttribute("src", /slide23-01\.png$/);
  await expect(lessonImages.nth(2)).toHaveAttribute("src", /slide13-02\.png$/);

  for (const index of [0, 1, 2]) {
    await expect.poll(async () =>
      lessonImages.nth(index).evaluate((img) => (img as HTMLImageElement).naturalWidth)
    )
      .toBeGreaterThan(0);
  }
});

test("loads GUI vs CLI lesson images", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /GUI vs CLI/ }).click();
  await expect(page.getByRole("heading", { name: /GUI vs CLI/ })).toBeVisible();

  const lessonImages = page.locator(".lesson-figures img");
  await expect(lessonImages).toHaveCount(3);
  await expect(lessonImages.nth(0)).toHaveAttribute("src", /gui-window\.png$/);
  await expect(lessonImages.nth(1)).toHaveAttribute("src", /slide09-01\.png$/);
  await expect(lessonImages.nth(2)).toHaveAttribute("src", /slide09-02\.png$/);

  for (const index of [0, 1, 2]) {
    await expect.poll(async () =>
      lessonImages.nth(index).evaluate((img) => (img as HTMLImageElement).naturalWidth)
    )
      .toBeGreaterThan(0);
  }
});

test("shows collection examples without duplicate screenshots", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /^Collections read/ }).click();
  await expect(page.getByRole("heading", { name: "Collections" })).toBeVisible();
  await expect(page.locator(".example-runner textarea").first()).toContainText("my_first_list");
  await expect(page.locator(".example-runner textarea").nth(1)).toContainText("food_prices");
  await expect(page.locator(".lesson-figures img")).toHaveCount(0);
});

test("allows jumping to later courses without completing prerequisites", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("button", { name: /Exam Task: Public Hospitals/ }).click();
  await expect(page.locator("h1", { hasText: "Exam Task: Public Hospitals" })).toBeVisible();
});

test("loads data course pages with package-backed activities", async ({ page }) => {
  await page.addInitScript(() => {
    window.localStorage.setItem(
      "python-course-progress-v1",
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
        currentCourseId: "data-toolkit",
        xp: 455,
        badges: ["Pathfinder", "Collector", "Navigator", "Function Smith", "Environment Keeper"],
      }),
    );
  });
  await page.goto("/");
  await page.getByRole("button", { name: /Checkpoint: Array Operations/ }).click();
  await expect(page.locator("h1", { hasText: "Checkpoint: Array Operations" })).toBeVisible();
  await expect(page.getByText(/Create a NumPy array/)).toBeVisible();
});
