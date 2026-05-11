import type { CSSProperties } from "react";
import type { Quest } from "../data/types";
import { isQuestUnlocked, type ProgressState } from "../lib/progress";
import { InlineText } from "./InlineText";

type Props = {
  quests: Quest[];
  progress: ProgressState;
  onSelectLesson: (lessonId: string) => void;
};

export function QuestMap({ quests, progress, onSelectLesson }: Props) {
  return (
    <nav className="quest-map" aria-label="Quest map">
      <div className="map-title">
        <span>Course Home</span>
      </div>
      <div className="quest-list">
        {quests.map((quest, index) => {
          const unlocked = isQuestUnlocked(quests, progress.completedLessons, index);
          const completedCount = quest.lessons.filter((lesson) =>
            progress.completedLessons.includes(lesson.id),
          ).length;
          const complete = completedCount === quest.lessons.length;

          return (
            <section className="quest-node" key={quest.id} style={{ "--quest-accent": quest.accent } as CSSProperties}>
              <div className="quest-node-header">
                <strong>
                  {quest.number}. {quest.title}
                </strong>
                <small>{complete ? quest.badge : `${completedCount}/${quest.lessons.length} lessons`}</small>
              </div>
              <div className="home-lesson-list">
                {quest.lessons.map((lesson) => {
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
