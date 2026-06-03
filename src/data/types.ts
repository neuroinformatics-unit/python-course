export type LessonKind = "read" | "quiz" | "code" | "dataset" | "workshop";

export type QuizQuestion = {
  id: string;
  prompt: string;
  options: string[];
  answer: string;
  explanation: string;
};

export type CodeExercise = {
  id: string;
  title: string;
  prompt: string;
  starterCode: string;
  expectedIncludes?: string[];
  expectedOutputContains?: string[];
  expectedPlotCount?: number;
  packages?: string[];
  datasetPaths?: string[];
};

export type DatasetChallenge = {
  id: string;
  title: string;
  dataset: string;
  mission: string;
  hints: string[];
  starterCode: string;
  packages: string[];
  expectedOutputContains?: string[];
  expectedPlotCount?: number;
};

export type LessonImage = {
  src: string;
  alt: string;
  caption?: string;
};

export type LessonCodeExample = {
  code: string;
  caption?: string;
  packages?: string[];
  datasetPaths?: string[];
  insertAfter?: number;
};

export type Lesson = {
  id: string;
  kind: LessonKind;
  title: string;
  summary: string;
  /** Tag-like keywords once shown as chips above the body. No longer rendered — kept on the type so the existing data helpers don't need to be re-threaded. */
  concepts: string[];
  body: string[];
  images?: LessonImage[];
  examples?: LessonCodeExample[];
  quiz?: QuizQuestion;
  exercise?: CodeExercise;
  challenge?: DatasetChallenge;
};

export type Course = {
  id: string;
  number: number;
  title: string;
  theme: string;
  description: string;
  accent: string;
  lessons: Lesson[];
};
