import { useState, type CSSProperties } from "react";
import type { Course } from "../data/types";
import { isCourseUnlocked, type ProgressState } from "../lib/progress";
import { InlineText } from "./InlineText";

type Props = {
  courses: Course[];
  progress: ProgressState;
  onSelectLesson: (lessonId: string) => void;
};

export function CourseMap({ courses, progress, onSelectLesson }: Props) {
  const [openCourseIds, setOpenCourseIds] = useState<Set<string>>(() => new Set());

  const toggleCourse = (courseId: string) => {
    setOpenCourseIds((current) => {
      const next = new Set(current);
      if (next.has(courseId)) {
        next.delete(courseId);
      } else {
        next.add(courseId);
      }
      return next;
    });
  };

  const startCourse = (course: Course) => {
    const lesson =
      course.lessons.find((item) => !progress.completedLessons.includes(item.id)) ??
      course.lessons[0];

    if (lesson) {
      onSelectLesson(lesson.id);
    }
  };

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
          const open = openCourseIds.has(course.id);
          const lessonListId = `${course.id}-lessons`;

          return (
            <section
              className={`course-node ${unlocked ? "" : "locked"}`}
              key={course.id}
              style={{ "--course-accent": course.accent } as CSSProperties}
            >
              <div className="course-node-header">
                <button
                  type="button"
                  className="course-toggle"
                  aria-expanded={open}
                  aria-controls={lessonListId}
                  disabled={!unlocked}
                  onClick={() => toggleCourse(course.id)}
                >
                  <span className="course-toggle-icon" aria-hidden="true">{open ? "v" : ">"}</span>
                  <span>
                    <strong>
                      Module {course.number}: {course.title}
                    </strong>
                    <small>{complete ? course.badge : `${completedCount}/${course.lessons.length} lessons`}</small>
                  </span>
                </button>
                <button
                  type="button"
                  className="course-start-button"
                  disabled={!unlocked || course.lessons.length === 0}
                  onClick={() => startCourse(course)}
                >
                  Start
                </button>
              </div>
              {open ? (
                <div className="home-lesson-list" id={lessonListId}>
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
              ) : null}
            </section>
          );
        })}
      </div>

    </nav>
  );
}
