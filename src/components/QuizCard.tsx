import { Check, X } from "lucide-react";
import { useState } from "react";
import type { QuizQuestion } from "../data/types";
import { validateQuizAnswer } from "../lib/exerciseValidation";
import { InlineText } from "./InlineText";

type Props = {
  quiz: QuizQuestion;
  onComplete: () => void;
};

export function QuizCard({ quiz, onComplete }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const correct = selected ? validateQuizAnswer(quiz, selected) : false;

  return (
    <section className="activity-panel">
      <h3>
        <InlineText text={quiz.prompt} />
      </h3>
      <div className="quiz-options">
        {quiz.options.map((option) => (
          <button
            type="button"
            key={option}
            className={selected === option ? "selected" : ""}
            onClick={() => setSelected(option)}
          >
            <InlineText text={option} />
          </button>
        ))}
      </div>
      {selected && (
        <div className={`feedback ${correct ? "ok" : "needs-work"}`}>
          {correct ? <Check size={18} /> : <X size={18} />}
          <span>
            <InlineText text={correct ? quiz.explanation : "Try another answer and compare it with the code idea."} />
          </span>
        </div>
      )}
      <button type="button" className="primary-action" disabled={!correct} onClick={onComplete}>
        Mark checkpoint complete
      </button>
    </section>
  );
}
