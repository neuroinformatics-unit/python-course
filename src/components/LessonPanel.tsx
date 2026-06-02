import { useEffect, type CSSProperties } from "react";
import type { Course, Lesson, LessonCodeExample } from "../data/types";
import { resolvePublicAssetPath } from "../lib/assets";
import type { ProgressState } from "../lib/progress";
import { getCodeExamplesForLesson } from "../data/codeExamples";
import { CodeRunner } from "./CodeRunner";
import { ExampleRunner } from "./ExampleRunner";
import { InlineText } from "./InlineText";
import { QuizCard } from "./QuizCard";
import { VisualExplainer } from "./VisualExplainer";

type Props = {
  course: Course;
  lesson: Lesson;
  position: { current: number; total: number };
  progress: ProgressState;
  onAttempt: (exerciseId: string) => void;
  onComplete: (lessonId: string) => void;
  onHome: () => void;
  onPrevious: () => void;
  onNext: () => void;
  onSelectLesson: (lessonId: string) => void;
};

export function LessonPanel({
  course,
  lesson,
  position,
  progress,
  onAttempt,
  onComplete,
  onHome,
  onPrevious,
  onNext,
  onSelectLesson,
}: Props) {
  const complete = progress.completedLessons.includes(lesson.id);
  const runnable = lesson.exercise ?? lesson.challenge;
  const autoCompletesOnView = !lesson.quiz && !runnable;
  const screenshotExamples = lesson.examples?.length ? lesson.examples : getCodeExamplesForLesson(lesson.id);
  const anchoredExamples = screenshotExamples.filter((example) => typeof example.insertAfter === "number");
  const trailingExamples = screenshotExamples.filter((example) => typeof example.insertAfter !== "number");

  const bodySegments: Array<
    | { type: "text"; value: string }
    | { type: "code"; value: LessonCodeExample }
  > = lesson.body.flatMap((paragraph, index) => {
    const segments: Array<
      | { type: "text"; value: string }
      | { type: "code"; value: LessonCodeExample }
    > = [{ type: "text", value: paragraph }];
    anchoredExamples
      .filter((example) => example.insertAfter === index)
      .forEach((example) => segments.push({ type: "code" as const, value: example }));
    return segments;
  });

  if (trailingExamples.length > 0) {
    bodySegments.push(
      ...trailingExamples.map((example) => ({ type: "code" as const, value: example }))
    );
  }

  useEffect(() => {
    if (autoCompletesOnView && !complete) {
      onComplete(lesson.id);
    }
  }, [autoCompletesOnView, complete, lesson.id, onComplete]);

  return (
    <main className="slide-stage lesson-view">
      <aside className="lesson-sidebar" aria-label={`Module ${course.number} lessons`}>
        <div className="lesson-sidebar-heading">
          <p className="eyebrow">Module {course.number}</p>
          <h2>{course.title}</h2>
        </div>
        <div className="sidebar-lesson-list">
          {course.lessons.map((item) => {
            const itemComplete = progress.completedLessons.includes(item.id);
            const active = item.id === lesson.id;

            return (
              <button
                type="button"
                key={item.id}
                className={active ? "active" : ""}
                onClick={() => onSelectLesson(item.id)}
              >
                <span>
                  <InlineText text={item.title} />
                </span>
                <small>{itemComplete ? "complete" : item.kind}</small>
              </button>
            );
          })}
        </div>
      </aside>
      <article className={`lesson-card slide-card ${complete ? "complete" : ""}`} style={{ "--course-accent": course.accent } as CSSProperties}>
        <header className="slide-toolbar">
          <div className="slide-toolbar-left">
            <a className="niu-brand" href="https://neuroinformatics.dev" target="_blank" rel="noopener noreferrer">
              <img src={resolvePublicAssetPath("/images/niu_logo.png")} alt="NIU" />
            </a>
            <button type="button" onClick={onHome}>Home</button>
          </div>
          <span>
            Module {course.number}: {course.title} · Slide {position.current} of {position.total}
          </span>
          <div>
            <button type="button" onClick={onPrevious}>Previous</button>
            <button type="button" onClick={onNext}>Next</button>
          </div>
        </header>

        <div className="lesson-title-row">
          <p className="eyebrow">{lesson.kind}</p>
          <h1>
            <InlineText text={lesson.title} />
          </h1>
          <p>
            <InlineText text={lesson.summary} />
          </p>
        </div>
        <div className="lesson-body">
          {bodySegments.map((segment, index) =>
            segment.type === "text" ? (
              <p key={`${lesson.id}-text-${index}`}>
                <InlineText text={segment.value} />
              </p>
            ) : (
              <ExampleRunner
                key={`${lesson.id}-code-${index}-${segment.value.code}`}
                lessonId={lesson.id}
                index={index}
                example={segment.value}
              />
            )
          )}
        </div>
        {lesson.images?.length && screenshotExamples.length === 0 ? (
          <div className="lesson-figures">
            {lesson.images.map((img) => (
              <figure key={img.src}>
                <img src={resolvePublicAssetPath(img.src)} alt={img.alt} loading="lazy" />
                {img.caption && <figcaption><InlineText text={img.caption} /></figcaption>}
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
      </article>
    </main>
  );
}
