import { MCQQuestion, OptionId, PracticeMode, Difficulty, TopicCategory } from '../../types';
import { htmlFundamentalsQuestions } from './htmlFundamentals';
import { htmlContentQuestions } from './htmlContent';
import { htmlTablesFormsQuestions } from './htmlTablesForms';
import { htmlSemanticsA11yQuestions } from './htmlSemanticsA11y';
import { cssFundamentalsQuestions } from './cssFundamentals';
import { cssStylingUnitsQuestions } from './cssStylingUnits';
import { cssBoxModelPositioningQuestions } from './cssBoxModelPositioning';
import { cssFlexboxGridQuestions } from './cssFlexboxGrid';
import { cssResponsiveQuestions } from './cssResponsive';
import { cssAdvancedQuestions } from './cssAdvanced';
import { webProfessionalQuestions } from './webProfessional';

export const allQuestions: MCQQuestion[] = [
  ...htmlFundamentalsQuestions,
  ...htmlContentQuestions,
  ...htmlTablesFormsQuestions,
  ...htmlSemanticsA11yQuestions,
  ...cssFundamentalsQuestions,
  ...cssStylingUnitsQuestions,
  ...cssBoxModelPositioningQuestions,
  ...cssFlexboxGridQuestions,
  ...cssResponsiveQuestions,
  ...cssAdvancedQuestions,
  ...webProfessionalQuestions,
];

export const questionsById: Record<string, MCQQuestion> = allQuestions.reduce(
  (acc, q) => {
    acc[q.id] = q;
    return acc;
  },
  {} as Record<string, MCQQuestion>
);

export const topicCategories: { name: TopicCategory; day: number; count: number }[] = [
  { name: 'HTML fundamentals and document structure', day: 1, count: 12 },
  { name: 'Headings, text, links, lists, and images', day: 2, count: 12 },
  { name: 'Tables, forms, and input types', day: 3, count: 12 },
  { name: 'Semantic HTML and accessibility', day: 3, count: 10 },
  { name: 'CSS fundamentals and selectors', day: 4, count: 12 },
  { name: 'Colors, typography, units, and backgrounds', day: 4, count: 8 },
  { name: 'Box model, display, and positioning', day: 5, count: 12 },
  { name: 'Flexbox and CSS Grid', day: 6, count: 12 },
  { name: 'Responsive design and media queries', day: 7, count: 5 },
  { name: 'Specificity, pseudo-classes, transitions, and animations', day: 8, count: 5 },
  { name: 'Professional practices, debugging, and mixed scenarios', day: 9, count: 5 },
];

export function getAllQuestions(): MCQQuestion[] {
  return allQuestions;
}

export function getQuestionById(id: string): MCQQuestion | undefined {
  return questionsById[id];
}

export function getQuestionsByTopic(category: string): MCQQuestion[] {
  return allQuestions.filter((q) => q.topicCategory === category || q.topic === category);
}

export function getQuestionsByDay(day: number): MCQQuestion[] {
  return allQuestions.filter((q) => q.day === day);
}

export function getQuestionsByDifficulty(diff: Difficulty): MCQQuestion[] {
  return allQuestions.filter((q) => q.difficulty === diff);
}

/**
 * Fisher-Yates shuffle array helper
 */
export function shuffleArray<T>(array: T[]): T[] {
  const result = [...array];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

/**
 * Randomize options of a question while accurately preserving the correct answer identifier.
 */
export function randomizeQuestionOptions(question: MCQQuestion): MCQQuestion {
  const originalOptions = question.options;
  const originalCorrectText = originalOptions.find((o) => o.id === question.correctAnswer)?.text;

  // Shuffle option texts
  const shuffledTexts = shuffleArray(originalOptions.map((o) => o.text));
  const newOptionIds: OptionId[] = ['A', 'B', 'C', 'D'];

  const newOptions = newOptionIds.map((id, index) => ({
    id,
    text: shuffledTexts[index],
  }));

  const newCorrectOption = newOptions.find((o) => o.text === originalCorrectText);
  const newCorrectAnswer = (newCorrectOption?.id || question.correctAnswer) as OptionId;

  return {
    ...question,
    options: newOptions,
    correctAnswer: newCorrectAnswer,
  };
}

/**
 * Samples a 50-question comprehensive examination covering all 10 days proportionally.
 */
export function sampleExamQuestions(totalCount = 50, randomizeOptions = true): MCQQuestion[] {
  const days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  const selected: MCQQuestion[] = [];
  const selectedIds = new Set<string>();

  // Ensure proportional sampling: approximately 5 questions per day
  days.forEach((day) => {
    const dayPool = allQuestions.filter((q) => q.day === day || (day === 10 && q.day >= 9));
    const shuffledDayPool = shuffleArray(dayPool);
    const quota = day <= 6 ? 5 : day <= 8 ? 5 : 5;
    for (const q of shuffledDayPool) {
      if (!selectedIds.has(q.id) && selected.length < totalCount) {
        selected.push(q);
        selectedIds.add(q.id);
        if (selected.filter((item) => item.day === day).length >= quota) break;
      }
    }
  });

  // If still under totalCount, fill from remaining questions
  if (selected.length < totalCount) {
    const remaining = shuffleArray(allQuestions.filter((q) => !selectedIds.has(q.id)));
    for (const q of remaining) {
      if (selected.length >= totalCount) break;
      selected.push(q);
      selectedIds.add(q.id);
    }
  }

  // Shuffle final question order
  const shuffledQuestions = shuffleArray(selected.slice(0, totalCount));

  if (!randomizeOptions) return shuffledQuestions;
  return shuffledQuestions.map((q) => randomizeQuestionOptions(q));
}

/**
 * Generates a customized practice set based on learner filters with zero duplicate guarantee.
 */
export interface PracticeFilterOptions {
  category?: string;
  difficulty?: Difficulty | 'all';
  day?: number;
  count: number;
  filterMode?: 'all' | 'incorrect' | 'unattempted';
  attemptedQuestionIds?: Set<string>;
  incorrectQuestionIds?: Set<string>;
  randomizeOptions?: boolean;
}

export function generatePracticeSet(options: PracticeFilterOptions): MCQQuestion[] {
  let pool = [...allQuestions];

  if (options.category && options.category !== 'all') {
    pool = pool.filter((q) => q.topicCategory === options.category || q.topic === options.category);
  }

  if (options.day) {
    pool = pool.filter((q) => q.day === options.day);
  }

  if (options.difficulty && options.difficulty !== 'all') {
    pool = pool.filter((q) => q.difficulty === options.difficulty);
  }

  if (options.filterMode === 'incorrect' && options.incorrectQuestionIds) {
    pool = pool.filter((q) => options.incorrectQuestionIds!.has(q.id));
  } else if (options.filterMode === 'unattempted' && options.attemptedQuestionIds) {
    pool = pool.filter((q) => !options.attemptedQuestionIds!.has(q.id));
  }

  const shuffled = shuffleArray(pool);
  const count = Math.min(options.count, shuffled.length);
  const selected = shuffled.slice(0, count);

  if (options.randomizeOptions) {
    return selected.map((q) => randomizeQuestionOptions(q));
  }
  return selected;
}
