import type { Quest } from "../data/types";

export type ProgressState = {
  completedLessons: string[];
  exerciseAttempts: Record<string, number>;
  currentQuestId: string;
  xp: number;
  badges: string[];
};

const storageKey = "python-quest-progress-v1";

export const createInitialProgress = (quests: Quest[]): ProgressState => ({
  completedLessons: [],
  exerciseAttempts: {},
  currentQuestId: quests[0]?.id ?? "",
  xp: 0,
  badges: [],
});

export const getLessonXp = (quests: Quest[], lessonId: string): number => {
  for (const quest of quests) {
    const lesson = quest.lessons.find((item) => item.id === lessonId);
    if (lesson) return lesson.xp;
  }
  return 0;
};

export const getQuestForLesson = (quests: Quest[], lessonId: string): Quest | undefined =>
  quests.find((quest) => quest.lessons.some((lesson) => lesson.id === lessonId));

export const completeLesson = (
  state: ProgressState,
  quests: Quest[],
  lessonId: string,
): ProgressState => {
  if (state.completedLessons.includes(lessonId)) return state;

  const completedLessons = [...state.completedLessons, lessonId];
  const quest = getQuestForLesson(quests, lessonId);
  const questComplete =
    quest?.lessons.every((lesson) => completedLessons.includes(lesson.id)) ?? false;
  const badges = questComplete && quest ? Array.from(new Set([...state.badges, quest.badge])) : state.badges;
  const nextQuest = getNextUnlockedQuestId(quests, completedLessons, state.currentQuestId);

  return {
    ...state,
    completedLessons,
    xp: state.xp + getLessonXp(quests, lessonId),
    badges,
    currentQuestId: nextQuest,
  };
};

export const recordAttempt = (state: ProgressState, exerciseId: string): ProgressState => ({
  ...state,
  exerciseAttempts: {
    ...state.exerciseAttempts,
    [exerciseId]: (state.exerciseAttempts[exerciseId] ?? 0) + 1,
  },
});

export const isQuestUnlocked = (
  _quests: Quest[],
  _completedLessons: string[],
  _questIndex: number,
): boolean => {
  return true;
};

export const getNextUnlockedQuestId = (
  quests: Quest[],
  completedLessons: string[],
  fallbackQuestId: string,
): string => {
  const firstIncompleteUnlocked = quests.find((quest, index) => {
    if (!isQuestUnlocked(quests, completedLessons, index)) return false;
    return quest.lessons.some((lesson) => !completedLessons.includes(lesson.id));
  });

  return firstIncompleteUnlocked?.id ?? quests.at(-1)?.id ?? fallbackQuestId;
};

export const calculatePercentComplete = (quests: Quest[], completedLessons: string[]): number => {
  const total = quests.reduce((sum, quest) => sum + quest.lessons.length, 0);
  return total === 0 ? 0 : Math.round((completedLessons.length / total) * 100);
};

export const loadProgress = (quests: Quest[], storage: Storage = window.localStorage): ProgressState => {
  const fallback = createInitialProgress(quests);
  try {
    const raw = storage.getItem(storageKey);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<ProgressState>;
    return {
      completedLessons: Array.isArray(parsed.completedLessons) ? parsed.completedLessons : [],
      exerciseAttempts: parsed.exerciseAttempts ?? {},
      currentQuestId: parsed.currentQuestId ?? fallback.currentQuestId,
      xp: typeof parsed.xp === "number" ? parsed.xp : 0,
      badges: Array.isArray(parsed.badges) ? parsed.badges : [],
    };
  } catch {
    return fallback;
  }
};

export const saveProgress = (state: ProgressState, storage: Storage = window.localStorage): void => {
  storage.setItem(storageKey, JSON.stringify(state));
};

export const resetProgress = (quests: Quest[], storage: Storage = window.localStorage): ProgressState => {
  const fresh = createInitialProgress(quests);
  saveProgress(fresh, storage);
  return fresh;
};
