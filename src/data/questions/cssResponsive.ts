import { MCQQuestion } from '../../types';

export const cssResponsiveQuestions: MCQQuestion[] = [
  {
    id: 'css-045',
    day: 7,
    topic: 'Viewport Meta Tag',
    topicCategory: 'Responsive design and media queries',
    difficulty: 'intermediate',
    type: 'responsive',
    question: 'What occurs on a mobile smartphone if `<meta name="viewport" content="width=device-width, initial-scale=1.0">` is omitted from the document head?',
    code: null,
    options: [
      { id: 'A', text: 'The mobile browser simulates a virtual desktop screen (~980px wide) and zooms out, making text and buttons tiny and unreadable' },
      { id: 'B', text: 'The browser fails to load external CSS files' },
      { id: 'C', text: 'All images are stretched to fill 100% of the screen height' },
      { id: 'D', text: 'Touch events are completely disabled on iOS devices' }
    ],
    correctAnswer: 'A',
    explanation: 'Without the viewport meta tag, mobile browsers assume legacy non-responsive desktop sites and render at ~980px virtual width before scaling down. `width=device-width, initial-scale=1.0` binds the CSS viewport to the actual physical device screen width at 1:1 scale.',
    hint: 'Think of how old websites looked on the original iPhone (zoomed out desktop view).',
    lessonId: 'day-7-responsive-design',
    tags: ['responsive', 'viewport', 'meta', 'mobile']
  },
  {
    id: 'css-046',
    day: 7,
    topic: 'Mobile-First Media Queries',
    topicCategory: 'Responsive design and media queries',
    difficulty: 'intermediate',
    type: 'best-solution',
    question: 'Why does mobile-first development rely predominantly on `min-width` media queries rather than `max-width` queries?',
    code: '/* Base styles (Mobile) */\n.grid { grid-template-columns: 1fr; }\n\n/* Desktop enhancement */\n@media (min-width: 768px) {\n  .grid { grid-template-columns: repeat(3, 1fr); }\n}',
    options: [
      { id: 'A', text: 'Base styles apply to low-powered mobile devices first without media query evaluation, progressively enhancing as screen width increases' },
      { id: 'B', text: 'Because `max-width` was deprecated in the Media Queries Level 4 spec' },
      { id: 'C', text: '`min-width` renders faster because it disables GPU antialiasing' },
      { id: 'D', text: 'Mobile devices do not support boolean logic inside media blocks' }
    ],
    correctAnswer: 'A',
    explanation: 'Mobile-first methodology establishes default, unconstrained styles for the simplest mobile layout first. Then, `min-width` queries progressively enhance the interface for wider tablet and desktop screens, avoiding complex style overrides and desktop bloat on mobile.',
    hint: 'Progressive enhancement from smallest screen upward using min-width.',
    lessonId: 'day-7-responsive-design',
    tags: ['mobile-first', 'media-queries', 'min-width', 'responsive']
  },
  {
    id: 'css-047',
    day: 7,
    topic: 'Modern Range Syntax in Media Queries',
    topicCategory: 'Responsive design and media queries',
    difficulty: 'advanced',
    type: 'syntax',
    question: 'How is a viewport range query between 768px and 1024px written using modern CSS Media Queries Level 4 syntax?',
    code: null,
    options: [
      { id: 'A', text: '@media (768px <= width <= 1024px)' },
      { id: 'B', text: '@media (width: between 768px and 1024px)' },
      { id: 'C', text: '@media (min: 768px -> max: 1024px)' },
      { id: 'D', text: '@media (range: 768px..1024px)' }
    ],
    correctAnswer: 'A',
    explanation: 'Media Queries Level 4 introduced standard mathematical comparison operators (`<=`, `>=`, `<`). Writing `@media (768px <= width <= 1024px)` is cleaner and more intuitive than `@media (min-width: 768px) and (max-width: 1024px)`.',
    hint: 'Mathematical comparison operators directly inside parentheses.',
    lessonId: 'day-7-responsive-design',
    tags: ['media-queries', 'range-syntax', 'modern-css']
  },
  {
    id: 'css-048',
    day: 7,
    topic: 'Fluid Typography with Clamp',
    topicCategory: 'Responsive design and media queries',
    difficulty: 'advanced',
    type: 'css-calc',
    question: 'Given `font-size: clamp(1.5rem, 4vw, 3rem);`, what will the computed font-size be when `4vw` evaluates to `48px` (assuming `1rem = 16px`)?',
    code: 'h1 {\n  font-size: clamp(1.5rem, 4vw, 3rem);\n}',
    options: [
      { id: 'A', text: '48px (since 48px is comfortably between the minimum 24px and maximum 48px limits)' },
      { id: 'B', text: '24px (it always clamps to the minimum)' },
      { id: 'C', text: '16px' },
      { id: 'D', text: '64px' }
    ],
    correctAnswer: 'A',
    explanation: '`clamp(MIN, PREFERRED, MAX)` clamps between minimum `1.5rem` (24px) and maximum `3rem` (48px). At 48px, `4vw` hits the top bound of 48px and resolves to 48px.',
    hint: 'clamp(min, val, max): 1.5rem = 24px, 3rem = 48px, 4vw = 48px.',
    lessonId: 'day-7-responsive-design',
    tags: ['clamp', 'fluid-typography', 'calculations', 'responsive']
  },
  {
    id: 'css-049',
    day: 7,
    topic: 'Responsive Touch Target Size',
    topicCategory: 'Responsive design and media queries',
    difficulty: 'intermediate',
    type: 'accessibility',
    question: 'According to WCAG 2.2 Success Criterion 2.5.8 (Target Size Minimum), what is the minimum recommended touch target dimensions for interactive controls?',
    code: null,
    options: [
      { id: 'A', text: 'At least 24x24 CSS pixels (with 44x44 or 48x48 px strongly recommended for mobile ergonomics)' },
      { id: 'B', text: 'At least 100x100 pixels' },
      { id: 'C', text: '10x10 pixels' },
      { id: 'D', text: 'Target size is determined automatically by the display manufacturer' }
    ],
    correctAnswer: 'A',
    explanation: 'WCAG 2.2 SC 2.5.8 requires interactive targets to be at least 24x24 CSS pixels (or have sufficient spacing). Apple Human Interface Guidelines and Google Material Design recommend 44x44 or 48x48 CSS pixels for comfortable finger tapping on mobile.',
    hint: 'Consider finger tap accuracy on smartphone screens.',
    lessonId: 'day-7-responsive-design',
    tags: ['touch-targets', 'accessibility', 'mobile', 'wcag']
  }
];
