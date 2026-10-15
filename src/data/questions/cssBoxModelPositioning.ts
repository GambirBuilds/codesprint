import { MCQQuestion } from '../../types';

export const cssBoxModelPositioningQuestions: MCQQuestion[] = [
  {
    id: 'css-021',
    day: 5,
    topic: 'Box Sizing: Border-Box',
    topicCategory: 'Box model, display, and positioning',
    difficulty: 'intermediate',
    type: 'css-calc',
    question: 'An element has `width: 300px; padding: 20px; border: 5px solid black; box-sizing: border-box;`. What is its total rendered horizontal layout width?',
    code: '.box {\n  box-sizing: border-box;\n  width: 300px;\n  padding: 20px;\n  border: 5px solid black;\n  margin: 15px;\n}',
    options: [
      { id: 'A', text: '300px (padding and border are absorbed inside the declared width)' },
      { id: 'B', text: '350px (300 + 40 padding + 10 border)' },
      { id: 'C', text: '380px (including margins)' },
      { id: 'D', text: '250px' }
    ],
    correctAnswer: 'A',
    explanation: 'With `box-sizing: border-box;`, the declared `width` (300px) includes content, padding, and border. The content area shrinks to accommodate the 40px horizontal padding and 10px horizontal borders, keeping the outer box width at exactly 300px.',
    hint: 'Under border-box, padding and border do not add extra width to the declared 300px.',
    lessonId: 'day-5-box-model-positioning',
    tags: ['box-model', 'border-box', 'calculations']
  },
  {
    id: 'css-022',
    day: 5,
    topic: 'Box Sizing: Content-Box',
    topicCategory: 'Box model, display, and positioning',
    difficulty: 'intermediate',
    type: 'css-calc',
    question: 'An element has `width: 200px; padding: 15px; border: 2px solid green; box-sizing: content-box;`. What is its total rendered outer width (excluding margin)?',
    code: '.box {\n  box-sizing: content-box;\n  width: 200px;\n  padding: 15px;\n  border: 2px solid green;\n}',
    options: [
      { id: 'A', text: '234px (200 content + 30 left/right padding + 4 left/right borders)' },
      { id: 'B', text: '200px' },
      { id: 'C', text: '217px' },
      { id: 'D', text: '260px' }
    ],
    correctAnswer: 'A',
    explanation: 'In the default `content-box` model, the declared `width` applies only to the content area. Total width = content (200px) + left/right padding (15 + 15 = 30px) + left/right borders (2 + 2 = 4px) = 234px.',
    hint: 'Add left and right padding and left and right border to the content width.',
    lessonId: 'day-5-box-model-positioning',
    tags: ['box-model', 'content-box', 'calculations']
  },
  {
    id: 'css-023',
    day: 5,
    topic: 'Margin Collapsing',
    topicCategory: 'Box model, display, and positioning',
    difficulty: 'advanced',
    type: 'code-output',
    question: 'Two consecutive vertical sibling block elements are styled: the first has `margin-bottom: 30px;` and the second has `margin-top: 20px;`. What is the actual rendered vertical gap between them?',
    code: '<div style="margin-bottom: 30px;">Box 1</div>\n<div style="margin-top: 20px;">Box 2</div>',
    options: [
      { id: 'A', text: '30px (margins collapse into the single largest margin)' },
      { id: 'B', text: '50px (margins add together: 30 + 20)' },
      { id: 'C', text: '10px (the difference between them)' },
      { id: 'D', text: '20px' }
    ],
    correctAnswer: 'A',
    explanation: 'In normal flow, adjacent vertical margins between sibling block elements collapse: instead of summing up, they combine into a single margin equal to the maximum of the two margins (max(30, 20) = 30px).',
    hint: 'Vertical margins in normal document flow collapse into the largest value.',
    lessonId: 'day-5-box-model-positioning',
    tags: ['box-model', 'margin-collapsing', 'layout']
  },
  {
    id: 'css-024',
    day: 5,
    topic: 'Display Inline vs Block',
    topicCategory: 'Box model, display, and positioning',
    difficulty: 'beginner',
    type: 'comparison',
    question: 'How does an inline element (like `<span>`) behave differently from a block element (like `<div>`) by default?',
    code: null,
    options: [
      { id: 'A', text: 'Inline elements do not start on a new line and ignore top/bottom width and height declarations; block elements fill 100% parent width and stack vertically' },
      { id: 'B', text: 'Inline elements can only contain images; block elements can only contain text' },
      { id: 'C', text: 'Block elements cannot have background colors' },
      { id: 'D', text: 'Inline elements are always positioned fixed on screen' }
    ],
    correctAnswer: 'A',
    explanation: 'Block elements take up the full available width of their parent container and start on a new line. Inline elements flow along with the text line, take only the width of their content, and do not respect explicit `width`, `height`, or vertical margins.',
    hint: 'Can you set an explicit width and height on a default inline `<span>`?',
    lessonId: 'day-5-box-model-positioning',
    tags: ['display', 'inline', 'block']
  },
  {
    id: 'css-025',
    day: 5,
    topic: 'Display Inline-Block',
    topicCategory: 'Box model, display, and positioning',
    difficulty: 'intermediate',
    type: 'concept',
    question: 'When is `display: inline-block;` used instead of `display: inline;`?',
    code: '.badge {\n  display: inline-block;\n  width: 120px;\n  height: 32px;\n  padding: 6px;\n}',
    options: [
      { id: 'A', text: 'When you want an element to flow horizontally inline with adjacent elements while still honoring explicit width, height, and vertical padding/margins' },
      { id: 'B', text: 'To convert table cells into flex containers' },
      { id: 'C', text: 'To hide elements from assistive technologies' },
      { id: 'D', text: 'To prevent elements from ever wrapping to a new line' }
    ],
    correctAnswer: 'A',
    explanation: '`display: inline-block` provides the best of both worlds: the element flows inline with surrounding text/elements without forcing a line break, but respects `width`, `height`, `padding`, and `margin`.',
    hint: 'Inline flow behavior + block-level dimensions capability.',
    lessonId: 'day-5-box-model-positioning',
    tags: ['display', 'inline-block', 'box-model']
  },
  {
    id: 'css-026',
    day: 5,
    topic: 'Position Relative Context',
    topicCategory: 'Box model, display, and positioning',
    difficulty: 'intermediate',
    type: 'concept',
    question: 'What happens when you declare `position: relative;` on an element without specifying any top/left/right/bottom offsets?',
    code: '.card {\n  position: relative;\n}',
    options: [
      { id: 'A', text: 'The element stays in its normal layout position, but now serves as a positioning context containing block for any nested absolute children' },
      { id: 'B', text: 'The element jumps to the top-left coordinate (0,0) of the viewport' },
      { id: 'C', text: 'The element is removed from the normal document flow' },
      { id: 'D', text: 'All child elements become invisible' }
    ],
    correctAnswer: 'A',
    explanation: 'An element with `position: relative` remains in its exact natural flow position if no offsets are given. Crucially, it establishes a new containing block context for any descendant with `position: absolute`.',
    hint: 'It anchors nested absolute elements.',
    lessonId: 'day-5-box-model-positioning',
    tags: ['position', 'relative', 'containing-block']
  },
  {
    id: 'css-027',
    day: 5,
    topic: 'Position Absolute Containing Block',
    topicCategory: 'Box model, display, and positioning',
    difficulty: 'advanced',
    type: 'code-output',
    question: 'To which element is a `position: absolute; top: 0; right: 0;` child positioned relative to?',
    code: '<div class="grandparent">\n  <div class="parent">\n    <div class="child" style="position: absolute; top: 0; right: 0;"></div>\n  </div>\n</div>',
    options: [
      { id: 'A', text: 'To the nearest ancestor element that has a `position` other than `static` (or the initial viewport containing block if none exists)' },
      { id: 'B', text: 'Always directly to its immediate parent element regardless of parent styles' },
      { id: 'C', text: 'Always directly to the <body> element' },
      { id: 'D', text: 'To the nearest element with `display: flex`' }
    ],
    correctAnswer: 'A',
    explanation: 'An absolutely positioned element is removed from normal flow and positioned relative to its closest positioned ancestor (an ancestor with `position: relative`, `absolute`, `fixed`, or `sticky`). If none exists, it positions against the initial containing block (viewport).',
    hint: 'Nearest ancestor with non-static position.',
    lessonId: 'day-5-box-model-positioning',
    tags: ['position', 'absolute', 'containing-block']
  },
  {
    id: 'css-028',
    day: 5,
    topic: 'Position Fixed vs Absolute',
    topicCategory: 'Box model, display, and positioning',
    difficulty: 'intermediate',
    type: 'comparison',
    question: 'How does `position: fixed;` differ from `position: absolute;` during user scrolling?',
    code: '.nav-header {\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n}',
    options: [
      { id: 'A', text: '`fixed` positions relative to the viewport window and stays pinned on screen while scrolling; `absolute` scrolls along with the page' },
      { id: 'B', text: '`fixed` elements cannot have child elements' },
      { id: 'C', text: '`fixed` only works when JavaScript window event listeners are running' },
      { id: 'D', text: '`absolute` is hardware accelerated; `fixed` is rendered on the CPU' }
    ],
    correctAnswer: 'A',
    explanation: '`position: fixed` takes the element out of flow and anchors it relative to the viewport. As the user scrolls through long content, the fixed element remains static in view at the configured offsets.',
    hint: 'Pinned to the viewport screen vs scrolling with the page.',
    lessonId: 'day-5-box-model-positioning',
    tags: ['position', 'fixed', 'scrolling']
  },
  {
    id: 'css-029',
    day: 5,
    topic: 'Position Sticky Requirements',
    topicCategory: 'Box model, display, and positioning',
    difficulty: 'advanced',
    type: 'find-error',
    question: 'A developer applies `position: sticky; top: 0;` to a table header, but it fails to stick when scrolling. What is the most common reason?',
    code: '.sticky-header {\n  position: sticky;\n  top: 0;\n}',
    options: [
      { id: 'A', text: 'An ancestor element has `overflow: hidden`, `overflow: auto`, or `overflow: scroll`, which restricts the scroll container boundary' },
      { id: 'B', text: 'The element is missing a `z-index: 9999` declaration' },
      { id: 'C', text: 'Sticky positioning requires HTML5 canvas support' },
      { id: 'D', text: 'The top property must be written as `top: 0px !important`' }
    ],
    correctAnswer: 'A',
    explanation: 'Sticky elements scroll normally within their containing block until reaching a threshold (e.g. `top: 0`). If any ancestor has `overflow: hidden`, `auto`, or `clip`, that ancestor captures the scrolling context, breaking the sticky effect on page scroll.',
    hint: 'Check parent and ancestor `overflow` properties.',
    lessonId: 'day-5-box-model-positioning',
    tags: ['position', 'sticky', 'overflow', 'debugging']
  },
  {
    id: 'css-030',
    day: 5,
    topic: 'Z-Index and Stacking Contexts',
    topicCategory: 'Box model, display, and positioning',
    difficulty: 'advanced',
    type: 'concept',
    question: 'Why does an element with `z-index: 9999` sometimes appear BEHIND an element with `z-index: 1`?',
    code: null,
    options: [
      { id: 'A', text: 'The element with `z-index: 9999` is inside a lower stacking context whose parent has a lower z-index than the other element\'s stacking context' },
      { id: 'B', text: 'Values over 1000 overflow the browser 8-bit integer register' },
      { id: 'C', text: 'z-index is calculated in reverse descending alphabetical order' },
      { id: 'D', text: 'z-index only applies to CSS grid items' }
    ],
    correctAnswer: 'A',
    explanation: 'Stacking contexts are hierarchical. No matter how high a child’s `z-index` is within its local stacking context, its rendering plane is bound by its parent’s stacking context. If Parent A has `z-index: 1` and Parent B has `z-index: 2`, all children of B render in front of all children of A.',
    hint: 'Stacking contexts isolate child z-indexes within their parent context.',
    lessonId: 'day-5-box-model-positioning',
    tags: ['z-index', 'stacking-context', 'layout']
  },
  {
    id: 'css-031',
    day: 5,
    topic: 'Overflow Hidden vs Clip',
    topicCategory: 'Box model, display, and positioning',
    difficulty: 'intermediate',
    type: 'syntax',
    question: 'What property prevents content that spills outside a container\'s boundaries from showing or causing unwanted scrollbars?',
    code: '.card-container {\n  width: 300px;\n  height: 200px;\n  ______: hidden;\n}',
    options: [
      { id: 'A', text: 'overflow' },
      { id: 'B', text: 'display' },
      { id: 'C', text: 'visibility' },
      { id: 'D', text: 'clip-path' }
    ],
    correctAnswer: 'A',
    explanation: '`overflow: hidden;` clips any content extending beyond the element\'s padding box, preventing spillover or page scrollbars.',
    hint: 'The property controlling content overflow.',
    lessonId: 'day-5-box-model-positioning',
    tags: ['overflow', 'clipping', 'box-model']
  },
  {
    id: 'css-032',
    day: 5,
    topic: 'Display None vs Visibility Hidden',
    topicCategory: 'Box model, display, and positioning',
    difficulty: 'intermediate',
    type: 'comparison',
    question: 'How does `display: none;` differ from `visibility: hidden;` in terms of page geometry?',
    code: null,
    options: [
      { id: 'A', text: '`display: none` completely removes the element from layout calculation (releasing its space); `visibility: hidden` hides it visually while still reserving its geometric space' },
      { id: 'B', text: '`visibility: hidden` removes the element from the DOM entirely' },
      { id: 'C', text: '`display: none` preserves clickable hitboxes' },
      { id: 'D', text: 'There is zero difference; they are aliases' }
    ],
    correctAnswer: 'A',
    explanation: '`display: none` removes the element entirely from the rendered layout tree, freeing its space. `visibility: hidden` makes the element invisible (like setting opacity to 0), but the empty space it occupies remains preserved in the layout.',
    hint: 'Releasing layout space vs keeping invisible blank space.',
    lessonId: 'day-5-box-model-positioning',
    tags: ['display', 'visibility', 'layout']
  }
];
