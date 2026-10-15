import { MCQQuestion } from '../../types';

export const htmlSemanticsA11yQuestions: MCQQuestion[] = [
  {
    id: 'html-037',
    day: 3,
    topic: 'Semantic HTML Benefits',
    topicCategory: 'Semantic HTML and accessibility',
    difficulty: 'beginner',
    type: 'concept',
    question: 'Why are semantic elements like `<nav>`, `<main>`, and `<article>` preferred over generic `<div>` containers?',
    code: null,
    options: [
      { id: 'A', text: 'They convey clear architectural roles to assistive tech, search engines, and browsers, and define landmark regions' },
      { id: 'B', text: 'They cause browsers to bypass CSS styling rules entirely' },
      { id: 'C', text: 'They automatically encrypt all text contained within their boundaries' },
      { id: 'D', text: 'They force child elements to render with Flexbox display by default' }
    ],
    correctAnswer: 'A',
    explanation: 'Semantic elements give structural meaning to web content. Screen readers use them as landmark regions for quick keyboard navigation, and search engines use them to accurately index page sections.',
    hint: 'Semantic means meaning and purpose, especially for screen reader navigation landmarks.',
    lessonId: 'day-3-semantics-accessibility',
    tags: ['semantics', 'landmarks', 'accessibility']
  },
  {
    id: 'html-038',
    day: 3,
    topic: 'The Main Landmark',
    topicCategory: 'Semantic HTML and accessibility',
    difficulty: 'intermediate',
    type: 'best-solution',
    question: 'What is the correct usage rule for the `<main>` element in an HTML document?',
    code: '<body>\n  <header>...</header>\n  <main>\n    <!-- Unique page content -->\n  </main>\n  <footer>...</footer>\n</body>',
    options: [
      { id: 'A', text: 'There should only be one visible `<main>` per page, containing content unique to this document rather than repeated across pages' },
      { id: 'B', text: '`<main>` must be nested directly inside the `<footer>`' },
      { id: 'C', text: 'Every section and article must have its own nested `<main>` element' },
      { id: 'D', text: '`<main>` is exclusively reserved for web video streaming canvases' }
    ],
    correctAnswer: 'A',
    explanation: '`<main>` represents the dominant content unique to the document. It must not be duplicated across a page, nor should it contain repeated site navigation, headers, or footers.',
    hint: 'A single page should only have one primary central focus.',
    lessonId: 'day-3-semantics-accessibility',
    tags: ['semantics', 'main', 'landmarks']
  },
  {
    id: 'html-039',
    day: 3,
    topic: 'Article vs Section',
    topicCategory: 'Semantic HTML and accessibility',
    difficulty: 'advanced',
    type: 'comparison',
    question: 'How do you choose between `<article>` and `<section>`?',
    code: null,
    options: [
      { id: 'A', text: '`<article>` is for self-contained syndicatable content that makes sense on its own; `<section>` is a thematic grouping of content' },
      { id: 'B', text: '`<article>` is only for newspaper websites; `<section>` is for all other websites' },
      { id: 'C', text: '`<section>` requires a JavaScript controller; `<article>` does not' },
      { id: 'D', text: '`<article>` must always be a child of `<section>`, never the other way around' }
    ],
    correctAnswer: 'A',
    explanation: 'An `<article>` is a complete, self-contained composition (blog post, forum topic, product card) that could stand alone or be syndicated. A `<section>` is a generic thematic grouping of content typically with a heading.',
    hint: 'Could this piece of content be syndicated in an RSS feed or shared independently?',
    lessonId: 'day-3-semantics-accessibility',
    tags: ['semantics', 'article', 'section']
  },
  {
    id: 'html-040',
    day: 3,
    topic: 'Aside Element',
    topicCategory: 'Semantic HTML and accessibility',
    difficulty: 'intermediate',
    type: 'concept',
    question: 'What type of content is appropriately marked up using the `<aside>` element?',
    code: '<aside>\n  <h3>Related Articles</h3>\n  <ul>...</ul>\n</aside>',
    options: [
      { id: 'A', text: 'Content tangentially related to the main content, such as sidebars, pull quotes, glossaries, or author bios' },
      { id: 'B', text: 'The legal copyright statement at the very bottom of the window' },
      { id: 'C', text: 'Hidden CSS styles that are aside from the DOM flow' },
      { id: 'D', text: 'Unused JavaScript variables awaiting garbage collection' }
    ],
    correctAnswer: 'A',
    explanation: '`<aside>` represents a portion of a document whose content is only indirectly or tangentially related to the document\'s main flow (e.g., sidebars, callout notes, glossaries, related links).',
    hint: 'Tangential content placed to the side or in a callout.',
    lessonId: 'day-3-semantics-accessibility',
    tags: ['semantics', 'aside', 'landmarks']
  },
  {
    id: 'html-041',
    day: 3,
    topic: 'Keyboard Usability & Button vs Div',
    topicCategory: 'Semantic HTML and accessibility',
    difficulty: 'advanced',
    type: 'find-error',
    question: 'Why is `<div class="btn" onclick="submit()">Submit</div>` severely flawed for accessibility compared to `<button>`?',
    code: '<!-- ❌ Anti-pattern -->\n<div class="btn" onclick="submit()">Submit</div>',
    options: [
      { id: 'A', text: 'A `<div>` lacks native keyboard focusability (Tab key), Space/Enter key handlers, and the "button" accessibility role' },
      { id: 'B', text: 'Browsers block JavaScript events dispatched from `<div>` tags' },
      { id: 'C', text: 'Divs cannot be styled with CSS hover states' },
      { id: 'D', text: 'The HTML5 validator converts all divs into spans automatically' }
    ],
    correctAnswer: 'A',
    explanation: 'Native `<button>` elements are natively focusable via Tab, announce as buttons to screen readers, and activate on both Enter and Space keys. A `<div>` requires manual `tabindex="0"`, `role="button"`, and custom `keydown` listeners to approximate native button behavior.',
    hint: 'Think about keyboard navigation (Tab/Enter/Space) and screen reader roles.',
    lessonId: 'day-3-semantics-accessibility',
    tags: ['accessibility', 'keyboard', 'button', 'a11y']
  },
  {
    id: 'html-042',
    day: 3,
    topic: 'Skip Navigation Links',
    topicCategory: 'Semantic HTML and accessibility',
    difficulty: 'intermediate',
    type: 'accessibility',
    question: 'What is the purpose of a "skip to main content" link placed at the very top of a web page?',
    code: '<a href="#main-content" class="skip-link">Skip to main content</a>',
    options: [
      { id: 'A', text: 'It allows keyboard and screen reader users to bypass long header navigation bars and jump straight to primary content' },
      { id: 'B', text: 'It speeds up page load time by canceling image downloads' },
      { id: 'C', text: 'It bypasses browser ad-blockers and pop-up filters' },
      { id: 'D', text: 'It forces search engine spiders to index the page faster' }
    ],
    correctAnswer: 'A',
    explanation: 'A skip link is an essential accessibility feature (WCAG 2.4.1 Bypass Blocks). It allows keyboard-only users and screen reader users to skip having to tab through dozens of navigation links on every page view.',
    hint: 'Imagine having to press Tab 30 times through a header menu on every single page load.',
    lessonId: 'day-3-semantics-accessibility',
    tags: ['accessibility', 'skip-link', 'wcag']
  },
  {
    id: 'html-043',
    day: 3,
    topic: 'Color Contrast Requirements',
    topicCategory: 'Semantic HTML and accessibility',
    difficulty: 'intermediate',
    type: 'accessibility',
    question: 'According to WCAG 2.2 AA guidelines, what is the minimum required contrast ratio for standard body text against its background?',
    code: null,
    options: [
      { id: 'A', text: '4.5:1 (or 3:1 for large text $\\ge$ 18pt or 14pt bold)' },
      { id: 'B', text: '1.5:1' },
      { id: 'C', text: '10:1' },
      { id: 'D', text: 'Contrast ratio is not regulated by WCAG standards' }
    ],
    correctAnswer: 'A',
    explanation: 'WCAG Level AA requires a minimum visual contrast ratio of 4.5:1 for regular text and 3:1 for large text (at least 18pt or 14pt bold). This ensures readability for users with low vision or color perception variations.',
    hint: 'The standard minimum ratio for normal text under Level AA.',
    lessonId: 'day-3-semantics-accessibility',
    tags: ['accessibility', 'contrast', 'wcag']
  },
  {
    id: 'html-044',
    day: 3,
    topic: 'ARIA First Rule',
    topicCategory: 'Semantic HTML and accessibility',
    difficulty: 'advanced',
    type: 'concept',
    question: 'What is the official "First Rule of ARIA use" by the W3C Web Accessibility Initiative?',
    code: null,
    options: [
      { id: 'A', text: 'If you can use a native HTML element or attribute with the semantics and behavior you require, do so instead of re-purposing an element and adding ARIA' },
      { id: 'B', text: 'Always add `role` attributes to every standard HTML tag in the document' },
      { id: 'C', text: 'ARIA must only be defined in external CSS stylesheets' },
      { id: 'D', text: 'Only use ARIA on desktop browsers, never on mobile viewports' }
    ],
    correctAnswer: 'A',
    explanation: 'The First Rule of ARIA is: "If you can use a native HTML element or attribute with the semantics and behavior already built in, then do so." Native elements like `<button>`, `<dialog>`, and `<nav>` provide built-in keyboard behavior and accessibility semantics for free.',
    hint: 'Favor native HTML elements over custom elements patched with ARIA.',
    lessonId: 'day-3-semantics-accessibility',
    tags: ['aria', 'accessibility', 'w3c']
  },
  {
    id: 'html-045',
    day: 3,
    topic: 'Aria-hidden Attribute',
    topicCategory: 'Semantic HTML and accessibility',
    difficulty: 'intermediate',
    type: 'syntax',
    question: 'When should `aria-hidden="true"` be added to an element in the DOM?',
    code: '<button>\n  <svg aria-hidden="true" focusable="false">...</svg>\n  <span>Delete Account</span>\n</button>',
    options: [
      { id: 'A', text: 'When visual content (like an icon or decoration) should be hidden from assistive technologies because text already provides the meaning' },
      { id: 'B', text: 'To visually hide an element from sighted users while keeping it visible to screen readers' },
      { id: 'C', text: 'To encrypt sensitive password characters on the screen' },
      { id: 'D', text: 'To temporarily disable a button from receiving mouse clicks' }
    ],
    correctAnswer: 'A',
    explanation: '`aria-hidden="true"` removes an element and all its children from the accessibility tree while keeping it visually visible. It is commonly applied to decorative icons next to readable text labels to avoid redundant vocalization.',
    hint: 'Hides from the accessibility tree without hiding visually from sighted users.',
    lessonId: 'day-3-semantics-accessibility',
    tags: ['aria', 'aria-hidden', 'accessibility']
  },
  {
    id: 'html-046',
    day: 3,
    topic: 'Dialog Element',
    topicCategory: 'Semantic HTML and accessibility',
    difficulty: 'advanced',
    type: 'syntax',
    question: 'What is the primary accessibility benefit of invoking the native `<dialog>` element with `dialog.showModal()` instead of `dialog.show()`?',
    code: 'const modal = document.querySelector("dialog");\nmodal.showModal();',
    options: [
      { id: 'A', text: 'It renders in the top-layer, traps keyboard focus inside the dialog, and renders content outside inert' },
      { id: 'B', text: 'It automatically saves form data to browser LocalStorage' },
      { id: 'C', text: 'It converts the dialog into a fullscreen 3D canvas' },
      { id: 'D', text: 'It prevents the user from closing the browser window' }
    ],
    correctAnswer: 'A',
    explanation: '`dialog.showModal()` opens a true modal dialog: it places the element in the browser\'s top layer, creates a native `::backdrop`, traps keyboard focus inside the modal, marks the rest of the document as inert, and enables closing via the Escape key.',
    hint: 'Think about focus trapping and making background content inert.',
    lessonId: 'day-3-semantics-accessibility',
    tags: ['dialog', 'modal', 'accessibility']
  }
];
