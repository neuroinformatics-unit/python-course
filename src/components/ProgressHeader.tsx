import { useEffect, useRef, useState } from "react";
import { BookOpen, RotateCcw } from "lucide-react";
import { calculatePercentComplete, type ProgressState } from "../lib/progress";
import type { Course } from "../data/types";
import { resolvePublicAssetPath } from "../lib/assets";

type Props = {
  courses: Course[];
  progress: ProgressState;
  onReset: () => void;
};

export function ProgressHeader({ courses, progress, onReset }: Props) {
  const percent = calculatePercentComplete(courses, progress.completedLessons);
  const [resetDialogOpen, setResetDialogOpen] = useState(false);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (resetDialogOpen) {
      cancelButtonRef.current?.focus();
    }
  }, [resetDialogOpen]);

  const confirmReset = () => {
    onReset();
    setResetDialogOpen(false);
  };

  return (
    <>
      <header className="progress-header">
        <div className="progress-branding">
          <a className="niu-brand" href="https://neuroinformatics.dev" target="_blank" rel="noopener noreferrer">
            <img src={resolvePublicAssetPath("/images/niu_logo.png")} alt="Neuroinformatics Unit logo" />
            <span>NIU</span>
          </a>
        </div>
        <div className="progress-stats" aria-label="Learning progress">
          <span title="Course completion">
            <BookOpen size={17} aria-hidden="true" />
            {percent}% complete
          </span>
          <button
            className="icon-button"
            type="button"
            onClick={() => setResetDialogOpen(true)}
            aria-label="Reset progress"
            title="Reset progress"
          >
            <RotateCcw size={18} aria-hidden="true" />
          </button>
        </div>
        <div className="progress-bar" aria-hidden="true">
          <span style={{ width: `${percent}%` }} />
        </div>
      </header>
      {resetDialogOpen ? (
        <div className="modal-backdrop" role="presentation">
          <section
            className="confirm-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="reset-dialog-title"
            aria-describedby="reset-dialog-description"
          >
            <h2 id="reset-dialog-title">Reset course progress?</h2>
            <p id="reset-dialog-description">
              This will clear completed lessons and exercise attempts. You cannot undo this action.
            </p>
            <div className="confirm-dialog-actions">
              <button
                type="button"
                className="secondary-action"
                ref={cancelButtonRef}
                onClick={() => setResetDialogOpen(false)}
              >
                Cancel
              </button>
              <button type="button" className="danger-action" onClick={confirmReset}>
                Reset progress
              </button>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
