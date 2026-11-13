export type Formula = { tex: string; meaning: string; step?: number };
export type ExampleStep = { text: string; tex?: string };
export type QuizItem = { q: string; options: string[]; answer: number; why: string };
export type Think = { scenario: string; points: string[]; hint?: string; traps?: string[] };
export type Problem = { level: string; q: string; hint?: string; steps: ExampleStep[] };

export type LessonMeta = {
  goal: string;
  hook: string;
  formulas: Formula[];
  example: { problem: string; steps: ExampleStep[] };
  mistakes: string[];
  quiz: QuizItem[];
  recap?: string[];
  look?: string;
  think?: Think;
  problems?: Problem[];
  concepts?: string[];
};
