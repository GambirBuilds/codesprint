export type Difficulty = 'beginner' | 'intermediate' | 'advanced';

export type QuestionType =
  | 'concept'
  | 'syntax'
  | 'code-output'
  | 'find-error'
  | 'best-solution'
  | 'accessibility'
  | 'responsive'
  | 'css-calc'
  | 'real-world'
  | 'comparison';

export type TopicCategory =
  | 'HTML fundamentals and document structure'
  | 'Headings, text, links, lists, and images'
  | 'Tables, forms, and input types'
  | 'Semantic HTML and accessibility'
  | 'CSS fundamentals and selectors'
  | 'Colors, typography, units, and backgrounds'
  | 'Box model, display, and positioning'
  | 'Flexbox and CSS Grid'
  | 'Responsive design and media queries'
  | 'Specificity, pseudo-classes, transitions, and animations'
  | 'Professional practices, debugging, and mixed scenarios';

export type OptionId = 'A' | 'B' | 'C' | 'D';

export interface QuestionOption {
  id: OptionId;
  text: string;
}

export interface MCQQuestion {
  id: string;
  day: number;
  topic: string;
  topicCategory: TopicCategory;
  difficulty: Difficulty;
  type: QuestionType;
  question: string;
  code: string | null;
  options: QuestionOption[];
  correctAnswer: OptionId;
  explanation: string;
  distractorExplanations?: Partial<Record<OptionId, string>>;
  hint: string;
  lessonId: string;
  tags: string[];
}

export type PracticeMode =
  | 'topic'
  | 'daily'
  | 'exam'
  | 'random'
  | 'weakness';

export interface QuestionAttempt {
  questionId: string;
  selectedAnswer: OptionId | null;
  isCorrect: boolean;
  timeSpentSeconds: number;
  timestamp: number;
  mode: PracticeMode;
}

export interface ExamSessionResult {
  attemptId: string;
  timestamp: number;
  mode: PracticeMode;
  totalQuestions: number;
  correctAnswers: number;
  incorrectAnswers: number;
  unansweredQuestions: number;
  scorePercentage: number;
  passingScore: number;
  passed: boolean;
  timeSpentSeconds: number;
  timeLimitSeconds: number | null;
  topicBreakdown: Record<string, { total: number; correct: number }>;
  difficultyBreakdown: Record<Difficulty, { total: number; correct: number }>;
  userAnswers: Record<string, OptionId | null>;
  flaggedQuestionIds: string[];
  questionIds: string[];
}

export interface UserStats {
  xp: number;
  streakDays: number;
  lastActiveDate: string;
  completedLessons: string[];
  bookmarkedQuestionIds: string[];
  unlockedBadges: string[];
  questionAttempts: Record<string, QuestionAttempt>;
  examHistory: ExamSessionResult[];
  dailyPracticeCompleted: Record<number, number>; // dayNumber -> timestamp
}

export interface Lesson {
  id: string;
  day: number;
  title: string;
  durationMinutes: number;
  difficulty: Difficulty;
  summary: string;
  learningObjectives: string[];
  prerequisites: string[];
  theory: string[];
  terminology: { term: string; definition: string }[];
  codeExamples: {
    title: string;
    language: 'html' | 'css' | 'mixed';
    code: string;
    explanation: string;
  }[];
  commonMistakes: { mistake: string; fix: string; why: string }[];
  bestPractices: string[];
  interactiveSnippet?: {
    html: string;
    css: string;
    prompt: string;
  };
  relatedLessonIds: string[];
}

export interface CurriculumDay {
  day: number;
  title: string;
  tagline: string;
  description: string;
  lessons: Lesson[];
  capstoneTitle: string;
}

export interface ReferenceItem {
  id: string;
  name: string;
  type: 'html' | 'css';
  category: string;
  definition: string;
  syntax: string;
  valuesOrAttributes?: string[];
  exampleCode: string;
  commonMistake?: string;
  a11yOrCompatibilityNote?: string;
  relatedLessonId?: string;
}

export interface GameLevel {
  id: number;
  title: string;
  instructions: string;
  hint: string;
  target: any;
  starterData: any;
  solution: any;
}

export interface ProjectBrief {
  id: string;
  title: string;
  day: number;
  difficulty: Difficulty;
  description: string;
  objectives: string[];
  checklist: string[];
  starterHtml: string;
  starterCss: string;
  solutionHtml: string;
  solutionCss: string;
  rubric: { criterion: string; weight: number }[];
}
