import { describe, expect, it } from "vitest";
import { courses } from "../data/curriculum";
import {
  calculatePercentComplete,
  completeLesson,
  createInitialProgress,
  isCourseUnlocked,
  recordAttempt,
} from "./progress";

describe("progress helpers", () => {
  it("starts with all courses available and no completed lessons", () => {
    const state = createInitialProgress(courses);
    expect(state.currentCourseId).toBe("python-foundations");
    expect(state.completedLessons).toEqual([]);
    expect(isCourseUnlocked(courses, state.completedLessons, 0)).toBe(true);
    expect(isCourseUnlocked(courses, state.completedLessons, 1)).toBe(true);
    expect(isCourseUnlocked(courses, state.completedLessons, courses.length - 1)).toBe(true);
  });

  it("completes lessons once", () => {
    const initial = createInitialProgress(courses);
    const first = completeLesson(initial, courses, "why-python");
    const second = completeLesson(first, courses, "why-python");
    expect(first.completedLessons).toEqual(["why-python"]);
    expect(second.completedLessons).toEqual(["why-python"]);
  });

  it("records attempts and calculates completion percentage", () => {
    const attempted = recordAttempt(createInitialProgress(courses), "calculate-and-print");
    expect(attempted.exerciseAttempts["calculate-and-print"]).toBe(1);
    expect(calculatePercentComplete(courses, ["why-python"])).toBeGreaterThan(0);
  });
});
