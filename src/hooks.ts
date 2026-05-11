import { useEffect, useMemo, useState } from "react";
import { courses } from "./data/curriculum";
import {
  completeLesson,
  loadProgress,
  recordAttempt,
  resetProgress,
  saveProgress,
  type ProgressState,
} from "./lib/progress";

export const useProgress = () => {
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress(courses));

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const actions = useMemo(
    () => ({
      complete: (lessonId: string) => setProgress((state) => completeLesson(state, courses, lessonId)),
      attempt: (exerciseId: string) => setProgress((state) => recordAttempt(state, exerciseId)),
      reset: () => setProgress(resetProgress(courses)),
      selectCourse: (courseId: string) => setProgress((state) => ({ ...state, currentCourseId: courseId })),
    }),
    [],
  );

  return { progress, actions };
};
