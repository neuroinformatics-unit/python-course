import type { CSSProperties } from "react";
import type { Course } from "../data/types";
import { isCourseUnlocked, type ProgressState } from "../lib/progress";
import { InlineText } from "./InlineText";

type Props = {
  courses: Course[];
  progress: ProgressState;
  onSelectLesson: (lessonId: string) => void;
};

export function CourseMap({ courses, progress, onSelectLesson }: Props) {
  return (
    <nav className="course-map" aria-label="Course map">
      <div className="map-title">
        <span>Course Home</span>
      </div>
      <div className="course-list">
        {courses.map((course, index) => {
          const unlocked = isCourseUnlocked(courses, progress.completedLessons, index);
          const completedCount = course.lessons.filter((lesson) =>
            progress.completedLessons.includes(lesson.id),
          ).length;
          const complete = completedCount === course.lessons.length;

          return (
            <section className="course-node" key={course.id} style={{ "--course-accent": course.accent } as CSSProperties}>
              <div className="course-node-header">
                <strong>
                  {course.number}. {course.title}
                </strong>
                <small>{complete ? course.badge : `${completedCount}/${course.lessons.length} lessons`}</small>
              </div>
              <div className="home-lesson-list">
                {course.lessons.map((lesson) => {
                  const isComplete = progress.completedLessons.includes(lesson.id);
                  return (
                    <button
                      type="button"
                      key={lesson.id}
                      disabled={!unlocked}
                      onClick={() => onSelectLesson(lesson.id)}
                    >
                      <span>
                        <InlineText text={lesson.title} />
                      </span>
                      <small>{isComplete ? "complete" : lesson.kind}</small>
                    </button>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>
      <footer className="site-credits">
        Some practice exercises are inspired by{" "}
        <a href="https://codingbat.com/" target="_blank" rel="noreferrer noopener">
          CodingBat
        </a>{" "}
        by Nick Parlante.
      </footer>
    </nav>
  );
}
