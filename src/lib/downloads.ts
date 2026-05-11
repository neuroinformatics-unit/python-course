import type { Lesson } from "../data/types";

export const createScriptText = (lesson: Lesson): string => {
  const code = lesson.exercise?.starterCode ?? lesson.challenge?.starterCode ?? "print('Hello from Python Quest')";
  return `# ${lesson.title}\n# Generated from Python Quest\n\n${code}\n`;
};

export const createNotebookText = (lesson: Lesson): string => {
  const code = lesson.exercise?.starterCode ?? lesson.challenge?.starterCode ?? "print('Hello from Python Quest')";
  return JSON.stringify(
    {
      cells: [
        {
          cell_type: "markdown",
          metadata: {},
          source: [`# ${lesson.title}\n`, "\n", lesson.summary],
        },
        {
          cell_type: "code",
          execution_count: null,
          metadata: {},
          outputs: [],
          source: code.split("\n").map((line) => `${line}\n`),
        },
      ],
      metadata: {
        kernelspec: {
          display_name: "Python 3",
          language: "python",
          name: "python3",
        },
        language_info: {
          name: "python",
          pycodemirror_mode: {
            name: "ipython",
            version: 3,
          },
        },
      },
      nbformat: 4,
      nbformat_minor: 5,
    },
    null,
    2,
  );
};

export const downloadText = (filename: string, text: string, mimeType: string): void => {
  const blob = new Blob([text], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
};
