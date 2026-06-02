import type { Course } from "../data/types";

export type ProgressState = {
  completedLessons: string[];
  exerciseAttempts: Record<string, number>;
  currentCourseId: string;
};

const storageKey = "python-course-progress-v1";

export const createInitialProgress = (courses: Course[]): ProgressState => ({
  completedLessons: [],
  exerciseAttempts: {},
  currentCourseId: courses[0]?.id ?? "",
});

export const getCourseForLesson = (courses: Course[], lessonId: string): Course | undefined =>
  courses.find((course) => course.lessons.some((lesson) => lesson.id === lessonId));

export const completeLesson = (
  state: ProgressState,
  courses: Course[],
  lessonId: string,
): ProgressState => {
  if (state.completedLessons.includes(lessonId)) return state;

  const completedLessons = [...state.completedLessons, lessonId];
  const nextCourse = getNextUnlockedCourseId(courses, completedLessons, state.currentCourseId);

  return {
    ...state,
    completedLessons,
    currentCourseId: nextCourse,
  };
};

export const recordAttempt = (state: ProgressState, exerciseId: string): ProgressState => ({
  ...state,
  exerciseAttempts: {
    ...state.exerciseAttempts,
    [exerciseId]: (state.exerciseAttempts[exerciseId] ?? 0) + 1,
  },
});

export const isCourseUnlocked = (
  _courses: Course[],
  _completedLessons: string[],
  _courseIndex: number,
): boolean => {
  return true;
};

export const getNextUnlockedCourseId = (
  courses: Course[],
  completedLessons: string[],
  fallbackCourseId: string,
): string => {
  const firstIncompleteUnlocked = courses.find((course, index) => {
    if (!isCourseUnlocked(courses, completedLessons, index)) return false;
    return course.lessons.some((lesson) => !completedLessons.includes(lesson.id));
  });

  return firstIncompleteUnlocked?.id ?? courses.at(-1)?.id ?? fallbackCourseId;
};

export const calculatePercentComplete = (courses: Course[], completedLessons: string[]): number => {
  const total = courses.reduce((sum, course) => sum + course.lessons.length, 0);
  return total === 0 ? 0 : Math.round((completedLessons.length / total) * 100);
};

export const loadProgress = (courses: Course[], storage: Storage = window.localStorage): ProgressState => {
  const fallback = createInitialProgress(courses);
  try {
    const raw = storage.getItem(storageKey);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
      exerciseAttempts: parsed.exerciseAttempts ?? {},
      currentCourseId:
        parsed.currentCourseId ??
        (parsed as Partial<ProgressState> & { currentcourseId?: string }).currentcourseId ??
        fallback.currentCourseId,
    };
  } catch {
    return fallback;
  }
};

export const saveProgress = (state: ProgressState, storage: Storage = window.localStorage): void => {
  storage.setItem(storageKey, JSON.stringify(state));
};

export const resetProgress = (courses: Course[], storage: Storage = window.localStorage): ProgressState => {
  const fresh = createInitialProgress(courses);
  saveProgress(fresh, storage);
  return fresh;
};
