import { MCQQuestion } from '../../types';

export const cssAdvancedQuestions: MCQQuestion[] = [
  {
    id: 'css-050',
    day: 8,
    topic: 'CSS Specificity Calculation',
    topicCategory: 'Specificity, pseudo-classes, transitions, and animations',
    difficulty: 'advanced',
    type: 'css-calc',
    question: 'What is the standard specificity weight vector (ID, Class/Attribute/Pseudo-class, Element/Pseudo-element) for `#main-nav ul.menu li a:hover`?',
    code: '#main-nav ul.menu li a:hover',
    options: [
      { id: 'A', text: '(1, 2, 3) -> 1 ID (#main-nav), 2 classes/pseudo-classes (.menu, :hover), 3 elements (ul, li, a)' },
      { id: 'B', text: '(0, 1, 5)' },
      { id: 'C', text: '(2, 1, 2)' },
      { id: 'D', text: '(1, 1, 4)' }
    ],
    correctAnswer: 'A',
    explanation: 'Count the components: ID selectors = 1 (`#main-nav`). Classes, attributes, pseudo-classes = 2 (`.menu`, `:hover`). Elements and pseudo-elements = 3 (`ul`, `li`, `a`). Total specificity vector = (1, 2, 3).',
    hint: 'Count: IDs = 1; Classes + Pseudo-classes = 2; Elements = 3.',
    lessonId: 'day-8-advanced-css',
    tags: ['specificity', 'cascade', 'calculations']
  },
  {
    id: 'css-051',
    day: 8,
    topic: 'Nth-Child Formula',
    topicCategory: 'Specificity, pseudo-classes, transitions, and animations',
    difficulty: 'intermediate',
    type: 'code-output',
    question: 'Which list items will `li:nth-child(3n + 1)` select in a list of 10 items?',
    code: 'li:nth-child(3n + 1) {\n  background-color: #35F2C0;\n}',
    options: [
      { id: 'A', text: 'Items 1, 4, 7, and 10 (when n = 0, 1, 2, 3)' },
      { id: 'B', text: 'Items 3, 6, and 9' },
      { id: 'C', text: 'Items 1, 3, 5, 7, and 9' },
      { id: 'D', text: 'Only item 4' }
    ],
    correctAnswer: 'A',
    explanation: 'Evaluate `3n + 1` starting from non-negative integers: n=0 gives 1; n=1 gives 4; n=2 gives 7; n=3 gives 10. Thus items 1, 4, 7, and 10 are selected.',
    hint: 'Plug in n = 0, 1, 2, 3 into the formula 3n + 1.',
    lessonId: 'day-8-advanced-css',
    tags: ['pseudo-classes', 'nth-child', 'selectors']
  },
  {
    id: 'css-052',
    day: 8,
    topic: 'CSS Custom Properties (Variables) Inheritance',
    topicCategory: 'Specificity, pseudo-classes, transitions, and animations',
    difficulty: 'intermediate',
    type: 'concept',
    question: 'How do CSS custom properties (variables) defined with `--` behave regarding the DOM cascade and inheritance?',
    code: ':root {\n  --accent: #35F2C0;\n}\n.card {\n  --accent: #78A9FF;\n}',
    options: [
      { id: 'A', text: 'They inherit down the DOM tree naturally; a variable redeclared on a component overrides the value for that component and all its descendants' },
      { id: 'B', text: 'They are static constants that can only be declared once in `:root` and never overwritten' },
      { id: 'C', text: 'They only apply to elements with `display: flex`' },
      { id: 'D', text: 'They require Sass or Less preprocessors to compile' }
    ],
    correctAnswer: 'A',
    explanation: 'Unlike preprocessor variables, native CSS custom properties are dynamic and DOM-aware. They inherit through the DOM tree, meaning declaring `--accent: #78A9FF` inside `.card` scopes that override specifically to `.card` and its children without affecting other parts of the page.',
    hint: 'Dynamic DOM scoping and cascade inheritance.',
    lessonId: 'day-8-advanced-css',
    tags: ['css-variables', 'custom-properties', 'inheritance']
  },
  {
    id: 'css-053',
    day: 8,
    topic: 'Hardware Accelerated Transitions',
    topicCategory: 'Specificity, pseudo-classes, transitions, and animations',
    difficulty: 'advanced',
    type: 'best-solution',
    question: 'Why is animating `transform` and `opacity` dramatically better for performance than animating `width`, `height`, `top`, or `left`?',
    code: '/* High performance */\n.box:hover {\n  transform: translateY(-8px);\n  opacity: 0.9;\n}',
    options: [
      { id: 'A', text: '`transform` and `opacity` are handled directly by the GPU on the Compositor thread, bypassing costly browser Layout and Paint recalculations' },
      { id: 'B', text: 'CSS does not allow transitions on `width` or `height`' },
      { id: 'C', text: 'Animating `top` and `left` crashes mobile WebKit engines' },
      { id: 'D', text: '`transform` automatically pauses background JavaScript execution' }
    ],
    correctAnswer: 'A',
    explanation: 'Modifying geometry (`width`, `top`, `margin`) triggers the browser\'s expensive Layout (reflow) and Paint cycles across the entire page frame. Modifying `transform` and `opacity` operates purely on the Compositor thread with GPU acceleration, delivering silky smooth 60/120 FPS animations without layout reflow.',
    hint: 'Compositor-only vs Layout/Paint reflow.',
    lessonId: 'day-8-advanced-css',
    tags: ['performance', 'animations', 'gpu', 'transitions']
  },
  {
    id: 'css-054',
    day: 8,
    topic: 'Prefers-Reduced-Motion Media Query',
    topicCategory: 'Specificity, pseudo-classes, transitions, and animations',
    difficulty: 'advanced',
    type: 'accessibility',
    question: 'What is the purpose of the `@media (prefers-reduced-motion: reduce)` query?',
    code: '@media (prefers-reduced-motion: reduce) {\n  * {\n    animation-duration: 0.01ms !important;\n    transition-duration: 0.01ms !important;\n  }\n}',
    options: [
      { id: 'A', text: 'To respect operating system accessibility settings for users with vestibular motion disorders or epilepsy who experience nausea from parallax and animations' },
      { id: 'B', text: 'To save mobile battery when battery level drops below 20%' },
      { id: 'C', text: 'To force slow-motion playback for video game debugging' },
      { id: 'D', text: 'To disable CSS hover styles on touchscreen devices' }
    ],
    correctAnswer: 'A',
    explanation: 'Users with vestibular disorders, vertigo, or motion sensitivity can configure their OS to minimize motion. The `prefers-reduced-motion` media feature lets web applications disable or soften aggressive animations, fulfilling WCAG 2.2 guideline 2.3.3.',
    hint: 'Vestibular disorders and operating system accessibility motion preferences.',
    lessonId: 'day-8-advanced-css',
    tags: ['accessibility', 'prefers-reduced-motion', 'animations', 'wcag']
  }
];
