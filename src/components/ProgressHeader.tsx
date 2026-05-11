import { RotateCcw } from "lucide-react";
import { calculatePercentComplete, type ProgressState } from "../lib/progress";
import type { Course } from "../data/types";

type Props = {
  courses: Course[];
  progress: ProgressState;
  onReset: () => void;
};

export function ProgressHeader({ courses, progress, onReset }: Props) {
  const percent = calculatePercentComplete(courses, progress.completedLessons);

  return (
    <header className="progress-header">
      <div>
        <p className="eyebrow">Python Course</p>
        <h1>Course progress</h1>
      </div>
      <div className="progress-stats" aria-label="Learning progress">
        <span title="Experience points">
          {progress.xp} XP
        </span>
        <span title="Badges earned">
          {progress.badges.length} badges
        </span>
        <span>{percent}% complete</span>
        <button className="icon-button" type="button" onClick={onReset} aria-label="Reset progress" title="Reset progress">
          <RotateCcw size={18} aria-hidden="true" />
        </button>
      </div>
      <div className="progress-bar" aria-hidden="true">
        <span style={{ width: `${percent}%` }} />
      </div>
    </header>
  );
}
