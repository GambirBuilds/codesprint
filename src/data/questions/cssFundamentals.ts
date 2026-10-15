import { MCQQuestion } from '../../types';

export const cssFundamentalsQuestions: MCQQuestion[] = [
  {
    id: 'css-001',
    day: 4,
    topic: 'CSS Ruleset Anatomy',
    topicCategory: 'CSS fundamentals and selectors',
    difficulty: 'beginner',
    type: 'syntax',
    question: 'In the CSS rule `h1 { color: #35F2C0; font-size: 2rem; }`, what is `color`?',
    code: null,
    options: [
      { id: 'A', text: 'A property name being assigned the value #35F2C0' },
      { id: 'B', text: 'A CSS class selector targeting an element' },
      { id: 'C', text: 'A CSS pseudo-element pseudo-class' },
      { id: 'D', text: 'An HTML void attribute' }
    ],
    correctAnswer: 'A',
    explanation: 'In CSS syntax, a declaration consists of a property (`color`) and a value (`#35F2C0`), separated by a colon and terminated with a semicolon. The whole block is associated with a selector (`h1`).',
    hint: 'Property : Value;',
    lessonId: 'day-4-css-fundamentals',
    tags: ['css', 'syntax', 'ruleset']
  },
  {
    id: 'css-002',
    day: 4,
    topic: 'External Stylesheets',
    topicCategory: 'CSS fundamentals and selectors',
    difficulty: 'beginner',
    type: 'syntax',
    question: 'Which HTML tag and attribute configuration correctly links an external CSS stylesheet into a web document?',
    code: null,
    options: [
      { id: 'A', text: '<link rel="stylesheet" href="styles.css">' },
      { id: 'B', text: '<style src="styles.css">' },
      { id: 'C', text: '<css link="styles.css">' },
      { id: 'D', text: '<script type="text/css" href="styles.css">' }
    ],
    correctAnswer: 'A',
    explanation: 'The `<link>` void element with `rel="stylesheet"` and `href="path/to/style.css"` placed in the `<head>` is the standard method for linking external style sheets.',
    hint: 'rel="stylesheet" and href.',
    lessonId: 'day-4-css-fundamentals',
    tags: ['css', 'link', 'external-styles']
  },
  {
    id: 'css-003',
    day: 4,
    topic: 'Class vs ID Selectors',
    topicCategory: 'CSS fundamentals and selectors',
    difficulty: 'beginner',
    type: 'syntax',
    question: 'Which symbol prefixes a class selector, and which prefixes an ID selector in CSS?',
    code: null,
    options: [
      { id: 'A', text: 'Dot (.) for class selectors; hash (#) for ID selectors' },
      { id: 'B', text: 'Hash (#) for class selectors; dot (.) for ID selectors' },
      { id: 'C', text: 'At-symbol (@) for class selectors; dollar ($) for ID selectors' },
      { id: 'D', text: 'Slash (/) for class selectors; percent (%) for ID selectors' }
    ],
    correctAnswer: 'A',
    explanation: 'In CSS, `.my-class` matches elements with `class="my-class"`, while `#my-id` matches the unique element with `id="my-id"`.',
    hint: '.card vs #header.',
    lessonId: 'day-4-css-fundamentals',
    tags: ['selectors', 'class', 'id']
  },
  {
    id: 'css-004',
    day: 4,
    topic: 'Descendant Selector',
    topicCategory: 'CSS fundamentals and selectors',
    difficulty: 'intermediate',
    type: 'syntax',
    question: 'What does the descendant combinator (a single space: `nav a`) match in CSS?',
    code: 'nav a {\n  color: #78A9FF;\n}',
    options: [
      { id: 'A', text: 'Any <a> element that is nested at any depth inside a <nav> container' },
      { id: 'B', text: 'Only <a> elements that are direct immediate children of <nav>' },
      { id: 'C', text: 'Only <a> elements that immediately follow a closing </nav> tag' },
      { id: 'D', text: 'An element that has both "nav" and "a" in its class name' }
    ],
    correctAnswer: 'A',
    explanation: 'The descendant selector (separated by whitespace, `A B`) targets any element matching `B` that is a descendant (children, grandchildren, etc.) of an element matching `A`.',
    hint: 'Whitespace matches descendants at any nesting depth.',
    lessonId: 'day-4-css-fundamentals',
    tags: ['selectors', 'combinators', 'descendant']
  },
  {
    id: 'css-005',
    day: 4,
    topic: 'Child Combinator',
    topicCategory: 'CSS fundamentals and selectors',
    difficulty: 'intermediate',
    type: 'code-output',
    question: 'Given the rule `ul > li`, which `<li>` elements will be selected?',
    code: '<ul>\n  <li>Item 1</li>\n  <li>\n    <div>\n      <li>Sub-item</li>\n    </div>\n  </li>\n</ul>',
    options: [
      { id: 'A', text: 'Only direct children of `<ul>` ("Item 1" and the outer `<li>`), but NOT "Sub-item"' },
      { id: 'B', text: 'All three `<li>` elements regardless of depth' },
      { id: 'C', text: 'Only "Sub-item" because it is the deepest leaf node' },
      { id: 'D', text: 'None, because `>` is only valid in CSS media queries' }
    ],
    correctAnswer: 'A',
    explanation: 'The child combinator `>` targets only immediate direct children. Because "Sub-item" is inside a `<div>`, it is a grandchild of `<ul>`, not a direct child, so `ul > li` does not select it.',
    hint: 'The `>` combinator requires direct, immediate parenthood.',
    lessonId: 'day-4-css-fundamentals',
    tags: ['selectors', 'child-combinator', 'specificity']
  },
  {
    id: 'css-006',
    day: 4,
    topic: 'Adjacent Sibling Combinator',
    topicCategory: 'CSS fundamentals and selectors',
    difficulty: 'intermediate',
    type: 'concept',
    question: 'What does the adjacent sibling combinator `+` in `h2 + p` match?',
    code: '<h2>Section Title</h2>\n<p>First paragraph.</p>\n<p>Second paragraph.</p>',
    options: [
      { id: 'A', text: 'Only the `<p>` element that immediately follows `<h2>` in the DOM ("First paragraph.")' },
      { id: 'B', text: 'Both paragraphs because they share the same parent' },
      { id: 'C', text: 'Any paragraph that has an h2 nested inside it' },
      { id: 'D', text: 'The sum of the margins of h2 and p' }
    ],
    correctAnswer: 'A',
    explanation: 'The adjacent sibling selector `A + B` targets element `B` only if it directly and immediately follows element `A` and shares the same parent.',
    hint: 'Adjacent means immediately next door in the DOM tree.',
    lessonId: 'day-4-css-fundamentals',
    tags: ['selectors', 'adjacent-sibling', 'combinators']
  },
  {
    id: 'css-007',
    day: 4,
    topic: 'General Sibling Combinator',
    topicCategory: 'CSS fundamentals and selectors',
    difficulty: 'advanced',
    type: 'comparison',
    question: 'How does the general sibling combinator `~` differ from the adjacent sibling combinator `+`?',
    code: 'h2 ~ p {\n  color: #A3ADBA;\n}',
    options: [
      { id: 'A', text: '`~` matches ALL sibling `<p>` elements that follow `<h2>`, whereas `+` matches only the single immediately subsequent `<p>`' },
      { id: 'B', text: '`~` matches preceding siblings that come before `<h2>`' },
      { id: 'C', text: '`~` only works with flex containers' },
      { id: 'D', text: 'There is no difference; they are interchangeable aliases' }
    ],
    correctAnswer: 'A',
    explanation: '`A ~ B` matches any and all sibling elements `B` that appear after `A` anywhere under the same parent. In contrast, `A + B` matches only if `B` is the immediate, adjacent next sibling.',
    hint: 'Tilde (~) matches all subsequent siblings; plus (+) matches only the immediate next sibling.',
    lessonId: 'day-4-css-fundamentals',
    tags: ['selectors', 'general-sibling', 'combinators']
  },
  {
    id: 'css-008',
    day: 4,
    topic: 'Attribute Selectors',
    topicCategory: 'CSS fundamentals and selectors',
    difficulty: 'intermediate',
    type: 'syntax',
    question: 'Which CSS selector targets all links whose `href` attribute starts with "https://"?',
    code: null,
    options: [
      { id: 'A', text: 'a[href^="https://"]' },
      { id: 'B', text: 'a[href$="https://"]' },
      { id: 'C', text: 'a[href*="https://"]' },
      { id: 'D', text: 'a[href~="https://"]' }
    ],
    correctAnswer: 'A',
    explanation: 'In CSS attribute selectors, `^=` matches the beginning of a string ("starts with"), `$=` matches the end ("ends with"), and `*=` matches anywhere within the string ("contains").',
    hint: 'Carat (^) matches the beginning (prefix) of the attribute string.',
    lessonId: 'day-4-css-fundamentals',
    tags: ['selectors', 'attributes', 'regex']
  },
  {
    id: 'css-009',
    day: 4,
    topic: 'Universal Selector',
    topicCategory: 'CSS fundamentals and selectors',
    difficulty: 'beginner',
    type: 'concept',
    question: 'What is the function of the universal selector `*` in CSS?',
    code: '* {\n  box-sizing: border-box;\n  margin: 0;\n}',
    options: [
      { id: 'A', text: 'It targets every single element of any type in the document' },
      { id: 'B', text: 'It targets only the <body> and <html> roots' },
      { id: 'C', text: 'It targets only elements that have an inline style attribute' },
      { id: 'D', text: 'It creates a global CSS variable' }
    ],
    correctAnswer: 'A',
    explanation: 'The universal selector `*` matches any element in the DOM tree. It is widely used in CSS resets, such as applying `box-sizing: border-box` globally.',
    hint: 'Asterisk stands for wildcard / all elements.',
    lessonId: 'day-4-css-fundamentals',
    tags: ['selectors', 'universal', 'reset']
  },
  {
    id: 'css-010',
    day: 4,
    topic: 'Grouping Selectors',
    topicCategory: 'CSS fundamentals and selectors',
    difficulty: 'beginner',
    type: 'syntax',
    question: 'How do you apply identical styling declarations to `h1`, `h2`, and `h3` simultaneously in a single ruleset?',
    code: null,
    options: [
      { id: 'A', text: 'h1, h2, h3 { font-family: "Plus Jakarta Sans"; }' },
      { id: 'B', text: 'h1 + h2 + h3 { font-family: "Plus Jakarta Sans"; }' },
      { id: 'C', text: 'h1 & h2 & h3 { font-family: "Plus Jakarta Sans"; }' },
      { id: 'D', text: '[h1 h2 h3] { font-family: "Plus Jakarta Sans"; }' }
    ],
    correctAnswer: 'A',
    explanation: 'Separating selectors with commas (`h1, h2, h3`) groups them, applying the same declaration block to all matching elements.',
    hint: 'Comma is the selector grouping operator in CSS.',
    lessonId: 'day-4-css-fundamentals',
    tags: ['selectors', 'grouping', 'syntax']
  },
  {
    id: 'css-011',
    day: 4,
    topic: 'CSS Cascade & Source Order',
    topicCategory: 'CSS fundamentals and selectors',
    difficulty: 'intermediate',
    type: 'code-output',
    question: 'What color will the button text be, assuming equal specificity between the two rules?',
    code: '.button { color: #78A9FF; }\n.button { color: #35F2C0; }',
    options: [
      { id: 'A', text: '#35F2C0 (the latter rule wins due to source order)' },
      { id: 'B', text: '#78A9FF (the first rule takes precedence)' },
      { id: 'C', text: 'The browser renders black text due to a collision error' },
      { id: 'D', text: 'An average blend of both hexadecimal colors' }
    ],
    correctAnswer: 'A',
    explanation: 'When two rules have identical specificity and origin, the CSS Cascade resolves the tie using source order: the declaration appearing latest in the stylesheet wins.',
    hint: 'When specificity is identical, the rule declared last wins.',
    lessonId: 'day-4-css-fundamentals',
    tags: ['cascade', 'source-order', 'specificity']
  },
  {
    id: 'css-012',
    day: 4,
    topic: 'Inline Styles Disadvantages',
    topicCategory: 'CSS fundamentals and selectors',
    difficulty: 'intermediate',
    type: 'best-solution',
    question: 'Why are inline styles `<p style="color: red;">` strongly discouraged in production web applications?',
    code: null,
    options: [
      { id: 'A', text: 'They violate separation of concerns, cannot be reused across pages, and carry high specificity that makes overriding difficult' },
      { id: 'B', text: 'They cause modern browsers to disable all hardware rendering' },
      { id: 'C', text: 'Inline styles are completely ignored on mobile devices' },
      { id: 'D', text: 'They prevent HTML documents from being transmitted over HTTP/2' }
    ],
    correctAnswer: 'A',
    explanation: 'Inline styles mix presentation with markup, prevent stylesheet caching, cannot be easily reused, cannot support media queries or pseudo-classes (:hover), and have high specificity (1,0,0,0) that complicates maintainability.',
    hint: 'Think about maintainability, reuse, and high specificity overrides.',
    lessonId: 'day-4-css-fundamentals',
    tags: ['inline-styles', 'maintainability', 'best-practices']
  }
];
