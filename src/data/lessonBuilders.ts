import type { Lesson } from "./types";

export const csvBase = "/data";

export const read = (
  id: string,
  title: string,
  summary: string,
  concepts: string[],
  body: string[],
  _legacyPoints = 10,
): Lesson => ({
  id,
  kind: "read",
  title,
  summary,
  concepts,
  body,
});

export const workshop = (
  id: string,
  title: string,
  summary: string,
  concepts: string[],
  body: string[],
  _legacyPoints = 10,
): Lesson => ({
  id,
  kind: "workshop",
  title,
  summary,
  concepts,
  body,
});

export const quiz = (
  id: string,
  title: string,
  summary: string,
  concepts: string[],
  body: string[],
  prompt: string,
  options: string[],
  answer: string,
  explanation: string,
  _legacyPoints = 15,
): Lesson => ({
  id,
  kind: "quiz",
  title,
  summary,
  concepts,
  body,
  quiz: { id: `${id}-quiz`, prompt, options, answer, explanation },
});

export const code = (
  id: string,
  title: string,
  summary: string,
  concepts: string[],
  body: string[],
  prompt: string,
  starterCode: string,
  expectedOutputContains: string[],
  expectedIncludes: string[] = ["print"],
  packages: string[] = [],
  _legacyPoints = 20,
  expectedPlotCount = 0,
): Lesson => ({
  id,
  kind: "code",
  title,
  summary,
  concepts,
  body,
  exercise: {
    id: `${id}-exercise`,
    title,
    prompt,
    starterCode,
    expectedIncludes,
    expectedOutputContains,
    expectedPlotCount,
    packages,
  },
});

export const dataset = (
  id: string,
  title: string,
  summary: string,
  concepts: string[],
  body: string[],
  datasetPath: string,
  mission: string,
  starterCode: string,
  expectedOutputContains: string[],
  packages: string[],
  hints: string[],
  expectedPlotCount = 0,
  _legacyPoints = 25,
): Lesson => ({
  id,
  kind: "dataset",
  title,
  summary,
  concepts,
  body,
  challenge: {
    id: `${id}-challenge`,
    title,
    dataset: datasetPath,
    mission,
    starterCode,
    expectedOutputContains,
    packages,
    hints,
    expectedPlotCount,
  },
});
