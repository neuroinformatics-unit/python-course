import { describe, expect, it } from "vitest";
import { quests } from "../data/curriculum";
import {
  calculatePercentComplete,
  completeLesson,
  createInitialProgress,
  isQuestUnlocked,
  recordAttempt,
} from "./progress";

describe("progress helpers", () => {
  it("starts with all quests available and no XP", () => {
    const state = createInitialProgress(quests);
    expect(state.currentQuestId).toBe("python-foundations");
    expect(state.xp).toBe(0);
    expect(isQuestUnlocked(quests, state.completedLessons, 0)).toBe(true);
    expect(isQuestUnlocked(quests, state.completedLessons, 1)).toBe(true);
    expect(isQuestUnlocked(quests, state.completedLessons, quests.length - 1)).toBe(true);
  });

  it("completes lessons once and awards XP once", () => {
    const initial = createInitialProgress(quests);
    const first = completeLesson(initial, quests, "why-python");
    const second = completeLesson(first, quests, "why-python");
    expect(first.completedLessons).toEqual(["why-python"]);
    expect(first.xp).toBe(20);
    expect(second.xp).toBe(20);
  });

  it("awards a badge after all quest lessons are complete", () => {
    const state = quests[0].lessons.reduce(
      (current, lesson) => completeLesson(current, quests, lesson.id),
      createInitialProgress(quests),
    );
    expect(state.badges).toContain("Foundations");
  });

  it("records attempts and calculates completion percentage", () => {
    const attempted = recordAttempt(createInitialProgress(quests), "calculate-and-print");
    expect(attempted.exerciseAttempts["calculate-and-print"]).toBe(1);
    expect(calculatePercentComplete(quests, ["why-python"])).toBeGreaterThan(0);
  });
});
