import { useMemo, useState } from "react";
import { quests } from "./data/curriculum";
import { useProgress } from "./hooks";
import { LessonPanel } from "./components/LessonPanel";
import { ProgressHeader } from "./components/ProgressHeader";
import { QuestMap } from "./components/QuestMap";
import "./styles.css";

export default function App() {
  const { progress, actions } = useProgress();
  const lessonRefs = useMemo(
    () =>
      quests.flatMap((quest) =>
        quest.lessons.map((lesson) => ({
          quest,
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
      actions.selectQuest(ref.quest.id);
      setActiveLessonId(lessonId);
    }
  };

  const goToOffset = (offset: number) => {
    if (activeIndex < 0) return;
    const nextIndex = Math.min(Math.max(activeIndex + offset, 0), lessonRefs.length - 1);
    openLesson(lessonRefs[nextIndex].lesson.id);
  };

  return (
    <div className="app-shell">
      {activeRef ? (
        <LessonPanel
          quest={activeRef.quest}
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
        <ProgressHeader quests={quests} progress={progress} onReset={actions.reset} />
        <div className="workspace home-workspace">
          <section className="home-intro">
            <p className="eyebrow">Course Home</p>
            <h1>Choose a lesson</h1>
            <p>Open one slide at a time. You can return here whenever you want to jump to a different topic.</p>
          </section>
        <QuestMap
          quests={quests}
          progress={progress}
          onSelectLesson={openLesson}
        />
        </div>
        </>
      )}
    </div>
  );
}
