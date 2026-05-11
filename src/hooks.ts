import { useEffect, useMemo, useState } from "react";
import { quests } from "./data/curriculum";
import {
  completeLesson,
  loadProgress,
  recordAttempt,
  resetProgress,
  saveProgress,
  type ProgressState,
} from "./lib/progress";

export const useProgress = () => {
  const [progress, setProgress] = useState<ProgressState>(() => loadProgress(quests));

  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  const actions = useMemo(
    () => ({
      complete: (lessonId: string) => setProgress((state) => completeLesson(state, quests, lessonId)),
      attempt: (exerciseId: string) => setProgress((state) => recordAttempt(state, exerciseId)),
      reset: () => setProgress(resetProgress(quests)),
      selectQuest: (questId: string) => setProgress((state) => ({ ...state, currentQuestId: questId })),
    }),
    [],
  );

  return { progress, actions };
};
