import { describe, expect, it } from "vitest";
import { courses } from "./curriculum";

describe("curriculum data", () => {
  it("uses globally unique lesson ids", () => {
    const lessonRefs = courses.flatMap((course) =>
      course.lessons.map((lesson) => ({
        courseId: course.id,
        lessonId: lesson.id,
      })),
    );
    const duplicateIds = lessonRefs
      .filter(({ lessonId }, index) =>
        lessonRefs.findIndex((ref) => ref.lessonId === lessonId) !== index,
      )
      .map(({ courseId, lessonId }) => `${courseId}/${lessonId}`);

    expect(duplicateIds).toEqual([]);
  });
});
