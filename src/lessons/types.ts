export type Formula = { tex: string; meaning: string };
export type ExampleStep = { text: string; tex?: string };
export type QuizItem = { q: string; options: string[]; answer: number; why: string };

export type LessonMeta = {
  goal: string;
  hook: string;
  formulas: Formula[];
  example: { problem: string; steps: ExampleStep[] };
  mistakes: string[];
  quiz: QuizItem[];
  recap?: string[];
};
