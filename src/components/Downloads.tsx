import { FileCode2, NotebookTabs } from "lucide-react";
import type { Lesson } from "../data/types";
import { createNotebookText, createScriptText, downloadText } from "../lib/downloads";

type Props = {
  lesson: Lesson;
};

export function Downloads({ lesson }: Props) {
  const hasCode = lesson.exercise || lesson.challenge;
  if (!hasCode) return null;

  const safeName = lesson.id.replace(/[^a-z0-9-]/gi, "-");

  return (
    <div className="download-row">
      <button
        type="button"
        onClick={() => downloadText(`${safeName}.py`, createScriptText(lesson), "text/x-python")}
      >
        <FileCode2 size={16} aria-hidden="true" />
        Script starter
      </button>
      <button
        type="button"
        onClick={() =>
          downloadText(`${safeName}.ipynb`, createNotebookText(lesson), "application/x-ipynb+json")
        }
      >
        <NotebookTabs size={16} aria-hidden="true" />
        Notebook starter
      </button>
    </div>
  );
}
