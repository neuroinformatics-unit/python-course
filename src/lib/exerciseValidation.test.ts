import { describe, expect, it } from "vitest";
import { quests } from "../data/curriculum";
import { validateCodeSubmission, validateQuizAnswer } from "./exerciseValidation";

describe("exercise validation", () => {
  it("checks quiz answers exactly", () => {
    const quiz = quests[0].lessons.find((lesson) => lesson.quiz)?.quiz;
    expect(quiz).toBeDefined();
    expect(validateQuizAnswer(quiz!, quiz!.answer)).toBe(true);
    expect(validateQuizAnswer(quiz!, "not the answer")).toBe(false);
  });

  it("reports missing code fragments", () => {
    const exercise = quests[0].lessons.find((lesson) => lesson.exercise)?.exercise;
    expect(exercise).toBeDefined();
    expect(validateCodeSubmission(exercise!, "result = 1\nprint(result)", "20\n").passed).toBe(true);
    expect(validateCodeSubmission(exercise!, "result = 1").missing).toContain("print");
    expect(validateCodeSubmission(exercise!, "result = 1\nprint(result)", "12\n").passed).toBe(false);
  });

  it("can require plotted output without showing the expected answer", () => {
    const challenge = quests
      .flatMap((quest) => quest.lessons)
      .find((lesson) => lesson.challenge?.expectedPlotCount)?.challenge;
    expect(challenge).toBeDefined();
    expect(validateCodeSubmission(challenge!, "", "2024 23.323\n", 1).passed).toBe(true);
    expect(validateCodeSubmission(challenge!, "", "2024 23.323\n", 0).passed).toBe(false);
  });
});
