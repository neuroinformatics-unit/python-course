import { useEffect, useMemo, useState } from "react";
import { courses } from "./data/curriculum";
import { useProgress } from "./hooks";
import { LessonPanel } from "./components/LessonPanel";
import { ProgressHeader } from "./components/ProgressHeader";
import { CourseMap } from "./components/CourseMap";
import "./styles.css";

export default function App() {
  const { progress, actions } = useProgress();
  const lessonRefs = useMemo(
    () =>
      courses.flatMap((course) =>
        course.lessons.map((lesson) => ({
          course,
          lesson,
        })),
      ),
    [],
  );
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);
  const activeIndex = activeLessonId
    ? Math.max(
        0,
        lessonRefs.findIndex(({ lesson }) => lesson.id === activeLessonId),
      )
    : -1;
  const activeRef = activeIndex >= 0 ? lessonRefs[activeIndex] : null;

  const openLesson = (lessonId: string) => {
    const ref = lessonRefs.find(({ lesson }) => lesson.id === lessonId);
    if (ref) {
      actions.selectCourse(ref.course.id);
      setActiveLessonId(lessonId);
    }
  };

  const goToOffset = (offset: number) => {
    if (activeIndex < 0) return;
    const nextIndex = Math.min(Math.max(activeIndex + offset, 0), lessonRefs.length - 1);
    openLesson(lessonRefs[nextIndex].lesson.id);
  };

  useEffect(() => {
    const openFromHash = () => {
      const raw = window.location.hash;
      if (!raw.startsWith("#") || raw.length <= 1) return;

      const key = decodeURIComponent(raw.slice(1));

      const lessonRef = lessonRefs.find(({ lesson }) => lesson.id === key);
      if (lessonRef) {
        actions.selectCourse(lessonRef.course.id);
        setActiveLessonId(lessonRef.lesson.id);
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
        return;
      }

      const courseRef = lessonRefs.find(({ course }) => course.id === key);
      if (courseRef) {
        actions.selectCourse(courseRef.course.id);
        setActiveLessonId(courseRef.course.lessons[0]?.id ?? null);
        window.history.replaceState(null, "", window.location.pathname + window.location.search);
      }
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, [actions, lessonRefs]);

  return (
    <div className="app-shell">
      {activeRef ? (
        <LessonPanel
          course={activeRef.course}
          lesson={activeRef.lesson}
          position={{ current: activeIndex + 1, total: lessonRefs.length }}
          progress={progress}
          onAttempt={actions.attempt}
          onComplete={actions.complete}
          onHome={() => setActiveLessonId(null)}
          onPrevious={() => goToOffset(-1)}
          onNext={() => goToOffset(1)}
        />
      ) : (
        <>
        <ProgressHeader courses={courses} progress={progress} onReset={actions.reset} />
        <div className="workspace home-workspace">
          <section className="home-intro">
            <p className="eyebrow">Course Home</p>
            <h1>Choose a lesson</h1>
            <p>Open one slide at a time. You can return here whenever you want to jump to a different topic.</p>
          </section>
        <CourseMap
          courses={courses}
          progress={progress}
          onSelectLesson={openLesson}
        />
        </div>
        </>
      )}
    </div>
  );
}
