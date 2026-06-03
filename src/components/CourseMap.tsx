import { type CSSProperties } from "react";
import {
  BookOpen,
  Box,
  Braces,
  Code2,
  Database,
  FileCheck2,
  FunctionSquare,
  ListTree,
  Repeat2,
} from "lucide-react";
import type { Course } from "../data/types";
import { isCourseUnlocked, type ProgressState } from "../lib/progress";

type Props = {
  courses: Course[];
  progress: ProgressState;
  onSelectLesson: (lessonId: string) => void;
};

const courseIcons = [
  BookOpen,
  ListTree,
  FunctionSquare,
  Repeat2,
  Box,
  Database,
  Braces,
  FileCheck2,
];

export function CourseMap({ courses, progress, onSelectLesson }: Props) {
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
        <span>Explore the Python course:</span>
      </div>
      <div className="course-list">
        {courses.map((course, index) => {
          const Icon = courseIcons[index] ?? Code2;
          const unlocked = isCourseUnlocked(courses, progress.completedLessons, index);
          const completedCount = course.lessons.filter((lesson) =>
            progress.completedLessons.includes(lesson.id),
          ).length;
          return (
            <button
              type="button"
              className={`course-node ${unlocked ? "" : "locked"}`}
              id={course.id}
              key={course.id}
              style={{ "--course-accent": course.accent } as CSSProperties}
              disabled={!unlocked || course.lessons.length === 0}
              onClick={() => startCourse(course)}
            >
              <div className="course-card-media" aria-hidden="true">
                <Icon size={58} strokeWidth={1.7} />
              </div>
              <div className="course-node-header">
                <div className="course-card-title">
                  <span>
                    <small className="course-theme">{course.theme}</small>
                    <strong>
                      Module {course.number}: {course.title}
                    </strong>
                    <span className="course-description">{course.description}</span>
                  </span>
                </div>
              </div>
              <div className="course-card-footer">
                <span>{`${completedCount}/${course.lessons.length} lessons complete`}</span>
              </div>
            </button>
          );
        })}
      </div>

    </nav>
  );
}
