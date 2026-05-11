import type { CSSProperties } from "react";
import type { Lesson, Quest } from "../data/types";
import type { ProgressState } from "../lib/progress";
import { CodeRunner } from "./CodeRunner";
import { InlineText } from "./InlineText";
import { QuizCard } from "./QuizCard";
import { VisualExplainer } from "./VisualExplainer";

type Props = {
  quest: Quest;
  lesson: Lesson;
  position: { current: number; total: number };
  progress: ProgressState;
  onAttempt: (exerciseId: string) => void;
  onComplete: (lessonId: string) => void;
  onHome: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export function LessonPanel({
  quest,
  lesson,
  position,
  progress,
  onAttempt,
  onComplete,
  onHome,
  onPrevious,
  onNext,
}: Props) {
  const complete = progress.completedLessons.includes(lesson.id);
  const runnable = lesson.exercise ?? lesson.challenge;

  return (
    <main className="slide-stage">
      <article className={`lesson-card slide-card ${complete ? "complete" : ""}`} style={{ "--quest-accent": quest.accent } as CSSProperties}>
        <header className="slide-toolbar">
          <button type="button" onClick={onHome}>Home</button>
          <span>
            Quest {quest.number}: {quest.title} · Slide {position.current} of {position.total}
          </span>
          <div>
            <button type="button" onClick={onPrevious}>Previous</button>
            <button type="button" onClick={onNext}>Next</button>
          </div>
        </header>

        <div className="lesson-title-row">
          <p className="eyebrow">{lesson.kind} · {lesson.xp} XP</p>
          <h1>
            <InlineText text={lesson.title} />
          </h1>
          <p>
            <InlineText text={lesson.summary} />
          </p>
        </div>
        <div className="lesson-body">
          {lesson.body.map((paragraph) => (
            <p key={paragraph}>
              <InlineText text={paragraph} />
            </p>
          ))}
        </div>
        {lesson.images?.length ? (
          <div className="lesson-figures">
            {lesson.images.map((img) => (
              <figure key={img.src}>
                <img src={img.src} alt={img.alt} loading="lazy" />
                {img.caption && <figcaption><InlineText text={img.caption} /></figcaption>}
              </figure>
            ))}
          </div>
        ) : null}
        {lesson.examples?.length ? (
          <div className="lesson-examples" aria-label="Python code examples">
            {lesson.examples.map((example, index) => (
              <figure key={`${lesson.id}-example-${index}`}>
                <pre><code className="language-python">{example.code}</code></pre>
                {example.caption && <figcaption><InlineText text={example.caption} /></figcaption>}
              </figure>
            ))}
          </div>
        ) : null}
        <VisualExplainer lesson={lesson} />
        {lesson.quiz && <QuizCard quiz={lesson.quiz} onComplete={() => onComplete(lesson.id)} />}
        {runnable && (
          <CodeRunner
            key={runnable.id}
            item={runnable}
            onAttempt={() => onAttempt(runnable.id)}
            onComplete={() => onComplete(lesson.id)}
          />
        )}
        {!lesson.quiz && !runnable && (
          <button type="button" className="primary-action" onClick={() => onComplete(lesson.id)}>
            Mark lesson complete
          </button>
        )}
        {complete && <p className="completed-note">Completed</p>}
      </article>
    </main>
  );
}
