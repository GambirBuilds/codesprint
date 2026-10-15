import { MCQQuestion } from '../../types';

export const cssFlexboxGridQuestions: MCQQuestion[] = [
  {
    id: 'css-033',
    day: 6,
    topic: 'Flexbox Axes',
    topicCategory: 'Flexbox and CSS Grid',
    difficulty: 'beginner',
    type: 'concept',
    question: 'When `flex-direction: row;` (default) is set on a flex container, what are the main axis and cross axis directions?',
    code: '.container {\n  display: flex;\n  flex-direction: row;\n}',
    options: [
      { id: 'A', text: 'Main axis runs horizontally (inline left-to-right); cross axis runs vertically (top-to-bottom)' },
      { id: 'B', text: 'Main axis runs vertically; cross axis runs horizontally' },
      { id: 'C', text: 'Both axes run diagonally across the container' },
      { id: 'D', text: 'There is only a main axis; cross axis only exists in CSS Grid' }
    ],
    correctAnswer: 'A',
    explanation: 'In Flexbox with `flex-direction: row`, the main axis is horizontal along the reading direction (left-to-right in LTR languages), and the cross axis runs perpendicular to it (vertically). If changed to `column`, the axes swap.',
    hint: 'Row = horizontal main axis; Column = vertical main axis.',
    lessonId: 'day-6-flexbox-grid',
    tags: ['flexbox', 'axes', 'layout']
  },
  {
    id: 'css-034',
    day: 6,
    topic: 'Justify-Content vs Align-Items',
    topicCategory: 'Flexbox and CSS Grid',
    difficulty: 'beginner',
    type: 'comparison',
    question: 'Which property aligns flex items along the main axis, and which aligns along the cross axis?',
    code: null,
    options: [
      { id: 'A', text: '`justify-content` aligns along the main axis; `align-items` aligns along the cross axis' },
      { id: 'B', text: '`align-items` aligns along the main axis; `justify-content` aligns along the cross axis' },
      { id: 'C', text: '`align-content` aligns along the main axis; `justify-items` aligns along the cross axis' },
      { id: 'D', text: 'Both properties align items along the vertical axis exclusively' }
    ],
    correctAnswer: 'A',
    explanation: 'In Flexbox, `justify-content` distributes items along the main axis (e.g. flex-start, center, space-between). `align-items` aligns items along the cross axis (e.g. stretch, center, flex-start).',
    hint: 'Justify = main axis; Align = cross axis.',
    lessonId: 'day-6-flexbox-grid',
    tags: ['flexbox', 'justify-content', 'align-items']
  },
  {
    id: 'css-035',
    day: 6,
    topic: 'Perfect Centering in Flexbox',
    topicCategory: 'Flexbox and CSS Grid',
    difficulty: 'beginner',
    type: 'best-solution',
    question: 'How do you perfectly center an item both horizontally and vertically inside a full-height container using Flexbox?',
    code: '.hero-wrapper {\n  display: flex;\n  ______: center;\n  ______: center;\n  min-height: 100vh;\n}',
    options: [
      { id: 'A', text: 'justify-content: center; align-items: center;' },
      { id: 'B', text: 'text-align: center; vertical-align: middle;' },
      { id: 'C', text: 'float: center; margin: auto auto;' },
      { id: 'D', text: 'align-content: middle; place-items: normal;' }
    ],
    correctAnswer: 'A',
    explanation: 'Setting `display: flex; justify-content: center; align-items: center;` centers all child flex items along both the main and cross axes simultaneously.',
    hint: 'Center on the main axis with justify-content, and on the cross axis with align-items.',
    lessonId: 'day-6-flexbox-grid',
    tags: ['flexbox', 'centering', 'best-practices']
  },
  {
    id: 'css-036',
    day: 6,
    topic: 'Flex-Grow, Shrink & Basis Shorthand',
    topicCategory: 'Flexbox and CSS Grid',
    difficulty: 'intermediate',
    type: 'syntax',
    question: 'In the shorthand declaration `flex: 1 0 auto;`, what do the three values represent respectively?',
    code: '.sidebar-item {\n  flex: 1 0 auto;\n}',
    options: [
      { id: 'A', text: 'flex-grow: 1; flex-shrink: 0; flex-basis: auto;' },
      { id: 'B', text: 'flex-shrink: 1; flex-grow: 0; flex-order: auto;' },
      { id: 'C', text: 'flex-basis: 1; flex-direction: 0; flex-wrap: auto;' },
      { id: 'D', text: 'flex-order: 1; flex-align: 0; flex-justify: auto;' }
    ],
    correctAnswer: 'A',
    explanation: 'The `flex` shorthand accepts three properties in order: `flex-grow` (how much to absorb excess space), `flex-shrink` (how much to shrink when space is constrained), and `flex-basis` (initial base size before distribution).',
    hint: 'Grow, Shrink, Basis (G-S-B).',
    lessonId: 'day-6-flexbox-grid',
    tags: ['flexbox', 'flex-shorthand', 'flex-basis']
  },
  {
    id: 'css-037',
    day: 6,
    topic: 'Flex-Wrap and Gap',
    topicCategory: 'Flexbox and CSS Grid',
    difficulty: 'intermediate',
    type: 'responsive',
    question: 'Why is `flex-wrap: wrap;` combined with `gap: 1.5rem;` preferred over legacy negative margin grids for card rows?',
    code: '.card-row {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 1.5rem;\n}',
    options: [
      { id: 'A', text: 'It allows items to wrap gracefully into multiple rows as the screen narrows, without generating unwanted outer margins or horizontal scrollbars' },
      { id: 'B', text: 'It automatically limits the browser frame rate to 30 FPS' },
      { id: 'C', text: 'It converts every card into an SVG vector element' },
      { id: 'D', text: 'It forces each card to maintain a 16:9 aspect ratio' }
    ],
    correctAnswer: 'A',
    explanation: '`flex-wrap: wrap` permits flex items to break onto new lines when the container runs out of horizontal room. The modern `gap` property cleanly places space only between items, eliminating the need for hacky outer negative margins.',
    hint: 'Clean gutters between items and responsive multi-row wrapping without horizontal overflow.',
    lessonId: 'day-6-flexbox-grid',
    tags: ['flexbox', 'gap', 'flex-wrap', 'responsive']
  },
  {
    id: 'css-038',
    day: 6,
    topic: 'Flexbox vs CSS Grid Dimension',
    topicCategory: 'Flexbox and CSS Grid',
    difficulty: 'intermediate',
    type: 'comparison',
    question: 'What is the primary architectural difference between Flexbox and CSS Grid?',
    code: null,
    options: [
      { id: 'A', text: 'Flexbox is essentially one-dimensional (handles rows OR columns); CSS Grid is two-dimensional (handles rows AND columns simultaneously)' },
      { id: 'B', text: 'CSS Grid is deprecated in favor of Flexbox v2' },
      { id: 'C', text: 'Flexbox can only position text, whereas Grid is only for images' },
      { id: 'D', text: 'Flexbox requires JavaScript polyfills in mobile browsers' }
    ],
    correctAnswer: 'A',
    explanation: 'Flexbox is designed for 1D layout (content-out layout along one axis at a time). CSS Grid is a 2D layout engine (layout-in design aligning items across both columns and rows concurrently).',
    hint: 'One-dimensional (Flexbox) vs Two-dimensional (Grid).',
    lessonId: 'day-6-flexbox-grid',
    tags: ['grid', 'flexbox', 'architecture']
  },
  {
    id: 'css-039',
    day: 6,
    topic: 'CSS Grid Fr Unit Calculation',
    topicCategory: 'Flexbox and CSS Grid',
    difficulty: 'intermediate',
    type: 'css-calc',
    question: 'A 1000px wide grid container has `grid-template-columns: 200px 1fr 3fr;` and `gap: 0;`. What are the computed widths of the second and third columns?',
    code: '.grid {\n  display: grid;\n  width: 1000px;\n  grid-template-columns: 200px 1fr 3fr;\n}',
    options: [
      { id: 'A', text: 'Second column: 200px; Third column: 600px' },
      { id: 'B', text: 'Second column: 400px; Third column: 400px' },
      { id: 'C', text: 'Second column: 250px; Third column: 750px' },
      { id: 'D', text: 'Second column: 100px; Third column: 300px' }
    ],
    correctAnswer: 'A',
    explanation: 'Total width = 1000px. Column 1 takes 200px. Remaining space = 1000 - 200 = 800px. Total fr shares = 1fr + 3fr = 4fr. 1fr = 800px / 4 = 200px. Therefore: column 2 = 1fr = 200px; column 3 = 3fr = 3 * 200px = 600px.',
    hint: 'Subtract fixed column width (200px), then divide the remaining 800px among 4 fractions (1+3).',
    lessonId: 'day-6-flexbox-grid',
    tags: ['grid', 'fr-unit', 'calculations']
  },
  {
    id: 'css-040',
    day: 6,
    topic: 'Auto-Fit vs Auto-Fill with Minmax',
    topicCategory: 'Flexbox and CSS Grid',
    difficulty: 'advanced',
    type: 'comparison',
    question: 'In `grid-template-columns: repeat(______, minmax(250px, 1fr));`, how does `auto-fit` behave differently from `auto-fill` when there are fewer items than available columns?',
    code: '.cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n}',
    options: [
      { id: 'A', text: '`auto-fit` collapses empty ghost tracks to 0px, allowing the existing cards to expand and stretch to fill the row; `auto-fill` preserves empty column tracks' },
      { id: 'B', text: '`auto-fit` shrinks items to minimum width; `auto-fill` expands them' },
      { id: 'C', text: '`auto-fill` is only supported in Chromium-based browsers' },
      { id: 'D', text: 'There is no difference in rendering behavior' }
    ],
    correctAnswer: 'A',
    explanation: 'Both calculate how many 250px columns can fit. But when there are fewer items than column tracks, `auto-fit` collapses unused tracks to 0, letting remaining items stretch to take 100% of the row width. `auto-fill` keeps empty track slots reserved.',
    hint: 'auto-fit collapses empty tracks so existing items expand to fit.',
    lessonId: 'day-6-flexbox-grid',
    tags: ['grid', 'auto-fit', 'auto-fill', 'responsive']
  },
  {
    id: 'css-041',
    day: 6,
    topic: 'Grid Column Spanning',
    topicCategory: 'Flexbox and CSS Grid',
    difficulty: 'intermediate',
    type: 'syntax',
    question: 'Which declaration makes a featured card span across two columns in a grid layout?',
    code: '.featured-card {\n  ______: span 2;\n}',
    options: [
      { id: 'A', text: 'grid-column' },
      { id: 'B', text: 'grid-span' },
      { id: 'C', text: 'flex-span' },
      { id: 'D', text: 'column-count' }
    ],
    correctAnswer: 'A',
    explanation: '`grid-column: span 2;` (or `grid-column: 1 / 3;`) tells the grid item to occupy two grid column tracks.',
    hint: 'The grid-column property with the span keyword.',
    lessonId: 'day-6-flexbox-grid',
    tags: ['grid', 'grid-column', 'spanning']
  },
  {
    id: 'css-042',
    day: 6,
    topic: 'Grid Template Areas',
    topicCategory: 'Flexbox and CSS Grid',
    difficulty: 'advanced',
    type: 'syntax',
    question: 'How do you represent an empty, unassigned grid cell when using `grid-template-areas`?',
    code: '.layout {\n  display: grid;\n  grid-template-areas:\n    "header header"\n    "sidebar content"\n    "______ footer";\n}',
    options: [
      { id: 'A', text: 'A period or dot character (.)' },
      { id: 'B', text: 'The keyword "null"' },
      { id: 'C', text: 'An empty space or double quote ""' },
      { id: 'D', text: 'The keyword "empty"' }
    ],
    correctAnswer: 'A',
    explanation: 'In `grid-template-areas`, a period (`.`) or sequence of periods with no whitespace (`...`) represents an unnamed, empty cell in the grid coordinate matrix.',
    hint: 'A single dot (.) denotes a vacant track token.',
    lessonId: 'day-6-flexbox-grid',
    tags: ['grid', 'grid-template-areas', 'syntax']
  },
  {
    id: 'css-043',
    day: 6,
    topic: 'Place-Items Shorthand',
    topicCategory: 'Flexbox and CSS Grid',
    difficulty: 'beginner',
    type: 'syntax',
    question: 'What is the most concise way to center content in both dimensions inside a CSS Grid container?',
    code: '.centered-container {\n  display: grid;\n  ______: center;\n}',
    options: [
      { id: 'A', text: 'place-items' },
      { id: 'B', text: 'center-all' },
      { id: 'C', text: 'align-content' },
      { id: 'D', text: 'margin-center' }
    ],
    correctAnswer: 'A',
    explanation: '`place-items: center;` is the shorthand for `align-items: center; justify-items: center;`, offering the most concise one-line centering in CSS Grid.',
    hint: 'place-items is the shorthand for align-items + justify-items.',
    lessonId: 'day-6-flexbox-grid',
    tags: ['grid', 'place-items', 'centering']
  },
  {
    id: 'css-044',
    day: 6,
    topic: 'Min-Content vs Max-Content',
    topicCategory: 'Flexbox and CSS Grid',
    difficulty: 'advanced',
    type: 'concept',
    question: 'What is `min-content` sizing on a grid track containing English text?',
    code: 'grid-template-columns: min-content 1fr;',
    options: [
      { id: 'A', text: 'The intrinsic minimum size without overflowing, determined by the longest single unbroken word in that track' },
      { id: 'B', text: 'Always exactly 0 pixels' },
      { id: 'C', text: 'The width of the entire text sentence with zero line wrapping' },
      { id: 'D', text: 'The minimum width permitted by the mobile device CPU' }
    ],
    correctAnswer: 'A',
    explanation: '`min-content` calculates the smallest possible intrinsic dimension the box can take without overflowing. For text, it wraps at every opportunity, meaning its width is governed by the single longest word.',
    hint: 'Smallest possible width without clipping: wraps text as tightly as possible.',
    lessonId: 'day-6-flexbox-grid',
    tags: ['grid', 'sizing', 'min-content']
  }
];
