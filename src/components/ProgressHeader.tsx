import { RotateCcw } from "lucide-react";
import { calculatePercentComplete, type ProgressState } from "../lib/progress";
import type { Quest } from "../data/types";

type Props = {
  quests: Quest[];
  progress: ProgressState;
  onReset: () => void;
};

export function ProgressHeader({ quests, progress, onReset }: Props) {
  const percent = calculatePercentComplete(quests, progress.completedLessons);

  return (
    <header className="progress-header">
      <div>
        <p className="eyebrow">Python Quest</p>
        <h1>Choose a path, run code, unlock the next challenge.</h1>
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
