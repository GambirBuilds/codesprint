import { MCQQuestion } from '../../types';

export const htmlContentQuestions: MCQQuestion[] = [
  {
    id: 'html-013',
    day: 2,
    topic: 'Headings Hierarchy',
    topicCategory: 'Headings, text, links, lists, and images',
    difficulty: 'beginner',
    type: 'best-solution',
    question: 'What is the recommended heading structure practice for accessibility and document hierarchy?',
    code: '<h1>CodeSprint Academy</h1>\n<h2>Course Modules</h2>\n<h3>HTML Basics</h3>',
    options: [
      { id: 'A', text: 'Use exactly one <h1> for the page title and never skip heading levels when descending' },
      { id: 'B', text: 'Choose heading levels based solely on which font size looks aesthetically pleasing' },
      { id: 'C', text: 'Nest <h1> inside every paragraph to ensure high search ranking keywords' },
      { id: 'D', text: 'Skip directly from <h1> to <h4> to create greater visual margin separation' }
    ],
    correctAnswer: 'A',
    explanation: 'A document should have a single <h1> representing the primary subject, with subheadings progressing sequentially (<h1> -> <h2> -> <h3>) without skipping levels. Heading levels communicate document outline to screen readers and search engines, not visual styling.',
    hint: 'Headings form the logical table of contents for assistive devices.',
    lessonId: 'day-2-html-content',
    tags: ['headings', 'accessibility', 'semantics']
  },
  {
    id: 'html-014',
    day: 2,
    topic: 'Inline Text Semantics',
    topicCategory: 'Headings, text, links, lists, and images',
    difficulty: 'intermediate',
    type: 'comparison',
    question: 'What is the semantic difference between `<strong>` and `<b>` in modern HTML5?',
    code: '<p>Pay <strong>urgent</strong> attention to the <b>bolded</b> text.</p>',
    options: [
      { id: 'A', text: '`<strong>` conveys strong importance and vocal emphasis; `<b>` provides visual bolding without semantic weight' },
      { id: 'B', text: '`<strong>` is deprecated and converted by browsers to `<b>`' },
      { id: 'C', text: '`<b>` is an inline element while `<strong>` is a block-level container' },
      { id: 'D', text: '`<b>` triggers GPU acceleration while `<strong>` relies on software rasterization' }
    ],
    correctAnswer: 'A',
    explanation: '`<strong>` denotes high importance, seriousness, or urgency (and is vocalized emphatically by screen readers). `<b>` draws attention for utilitarian purposes (like keywords or product names) without conveying extra semantic importance.',
    hint: 'Semantic meaning vs pure stylistic presentation.',
    lessonId: 'day-2-html-content',
    tags: ['strong', 'text-formatting', 'semantics']
  },
  {
    id: 'html-015',
    day: 2,
    topic: 'Hyperlinks and URLs',
    topicCategory: 'Headings, text, links, lists, and images',
    difficulty: 'beginner',
    type: 'syntax',
    question: 'Which anchor attribute specifies the destination URL or document fragment of the hyperlink?',
    code: '<a href="/curriculum">View Curriculum</a>',
    options: [
      { id: 'A', text: 'href' },
      { id: 'B', text: 'src' },
      { id: 'C', text: 'link' },
      { id: 'D', text: 'target' }
    ],
    correctAnswer: 'A',
    explanation: 'The `href` (Hypertext REFerence) attribute specifies the hyperlink target URL or fragment identifier. `src` is used for embedding media resources like images or scripts.',
    hint: 'Short for Hypertext Reference.',
    lessonId: 'day-2-html-content',
    tags: ['links', 'anchor', 'href']
  },
  {
    id: 'html-016',
    day: 2,
    topic: 'Relative Path Navigation',
    topicCategory: 'Headings, text, links, lists, and images',
    difficulty: 'intermediate',
    type: 'syntax',
    question: 'If `index.html` is inside `/courses/web/` and you want to link to an image in `/images/logo.png`, which relative path is correct?',
    code: null,
    options: [
      { id: 'A', text: '../../images/logo.png' },
      { id: 'B', text: './../logo.png' },
      { id: 'C', text: '~/images/logo.png' },
      { id: 'D', text: '.../images/logo.png' }
    ],
    correctAnswer: 'A',
    explanation: 'Each `../` moves up one directory level. From `/courses/web/`, the first `../` ascends to `/courses/`, and the second `../` ascends to root `/`, allowing navigation into `images/logo.png`.',
    hint: 'How many directory levels must you traverse upward from `/courses/web/`?',
    lessonId: 'day-2-html-content',
    tags: ['paths', 'relative-urls', 'links']
  },
  {
    id: 'html-017',
    day: 2,
    topic: 'Internal Fragment Links',
    topicCategory: 'Headings, text, links, lists, and images',
    difficulty: 'beginner',
    type: 'syntax',
    question: 'How do you create an anchor link that smoothly jumps to an element with `id="faq"` on the current page?',
    code: '<a href="______">Jump to FAQ</a>\n...\n<section id="faq">...</section>',
    options: [
      { id: 'A', text: 'href="#faq"' },
      { id: 'B', text: 'href="@faq"' },
      { id: 'C', text: 'href="id:faq"' },
      { id: 'D', text: 'href="goTo(faq)"' }
    ],
    correctAnswer: 'A',
    explanation: 'The hash symbol `#` followed by an element ID creates an in-page fragment identifier link that scrolls the browser viewport directly to the matching element.',
    hint: 'Think of the fragment hash syntax in the browser URL bar.',
    lessonId: 'day-2-html-content',
    tags: ['links', 'fragments', 'navigation']
  },
  {
    id: 'html-018',
    day: 2,
    topic: 'Target Security',
    topicCategory: 'Headings, text, links, lists, and images',
    difficulty: 'advanced',
    type: 'real-world',
    question: 'When using `target="_blank"` on an external anchor, why should `rel="noopener noreferrer"` also be specified?',
    code: '<a href="https://external-site.com" target="_blank" rel="noopener noreferrer">Partner</a>',
    options: [
      { id: 'A', text: 'To prevent the opened window from accessing `window.opener` and redirecting your original page to a malicious phishing site' },
      { id: 'B', text: 'To encrypt all HTTP headers transmitted during DNS prefetching' },
      { id: 'C', text: 'Because browsers will throw a Cross-Origin Request Block (CORS) error without it' },
      { id: 'D', text: 'To force the new tab to open in incognito private browsing mode' }
    ],
    correctAnswer: 'A',
    explanation: 'Without `rel="noopener"`, the new page runs in the same process context and can use `window.opener.location.replace()` to maliciously redirect the user’s parent tab (reverse tabnabbing). Modern browsers default to `noopener` for `_blank`, but explicit inclusion is best practice.',
    hint: 'Consider the security vulnerability known as reverse tabnabbing via `window.opener`.',
    lessonId: 'day-2-html-content',
    tags: ['security', 'target', 'noopener']
  },
  {
    id: 'html-019',
    day: 2,
    topic: 'Image Accessibility',
    topicCategory: 'Headings, text, links, lists, and images',
    difficulty: 'intermediate',
    type: 'accessibility',
    question: 'What is the appropriate `alt` attribute for a decorative background pattern image that conveys no informational content?',
    code: '<img src="decorative-swirl.svg" alt="______">',
    options: [
      { id: 'A', text: 'alt="" (empty alt attribute)' },
      { id: 'B', text: 'alt="Image"' },
      { id: 'C', text: 'Omit the alt attribute entirely' },
      { id: 'D', text: 'alt="Decorative graphic icon picture illustration"' }
    ],
    correctAnswer: 'A',
    explanation: 'A decorative image should have an empty `alt=""` attribute (null alt). This informs assistive technologies to gracefully ignore the image. Omitting the `alt` entirely causes screen readers to read the full file path/URL, creating confusion.',
    hint: 'An empty string instructs screen readers to skip the decorative graphic silently.',
    lessonId: 'day-2-html-content',
    tags: ['images', 'accessibility', 'alt-text']
  },
  {
    id: 'html-020',
    day: 2,
    topic: 'Image Dimensions and CLS',
    topicCategory: 'Headings, text, links, lists, and images',
    difficulty: 'advanced',
    type: 'best-solution',
    question: 'Why should explicit `width` and `height` attributes always be provided on `<img>` tags even when sizing with responsive CSS?',
    code: '<img src="hero.jpg" width="1200" height="600" alt="Student coding" class="w-full h-auto">',
    options: [
      { id: 'A', text: 'Browsers calculate the aspect ratio upfront to reserve layout space and prevent Cumulative Layout Shift (CLS)' },
      { id: 'B', text: 'Without them, browsers download the image at only 1x display resolution' },
      { id: 'C', text: 'HTML validation strictly fails any image tag missing inline pixel units' },
      { id: 'D', text: 'It forces the browser to bypass CDN caching on subsequent requests' }
    ],
    correctAnswer: 'A',
    explanation: 'Providing intrinsic `width` and `height` allows the browser to compute the aspect ratio before the image file finishes downloading, reserving the necessary vertical space and eliminating annoying layout jumps (Cumulative Layout Shift, a Core Web Vital).',
    hint: 'Think about layout shifts and Core Web Vitals while images are still loading.',
    lessonId: 'day-2-html-content',
    tags: ['images', 'performance', 'layout-shift']
  },
  {
    id: 'html-021',
    day: 2,
    topic: 'Lists Comparison',
    topicCategory: 'Headings, text, links, lists, and images',
    difficulty: 'beginner',
    type: 'comparison',
    question: 'When should an ordered list `<ol>` be chosen over an unordered list `<ul>`?',
    code: null,
    options: [
      { id: 'A', text: 'When the sequence or chronological order of items is essential to their meaning (such as recipe steps)' },
      { id: 'B', text: 'Whenever a list contains more than five items' },
      { id: 'C', text: 'Only when applying custom numerical CSS counters via JavaScript' },
      { id: 'D', text: 'When styling list items as horizontal navbar pills' }
    ],
    correctAnswer: 'A',
    explanation: '`<ol>` denotes an ordered list where changing the sequence changes the meaning (e.g., cooking instructions, ranked rankings, step-by-step tutorials). `<ul>` is for collections where order is arbitrary.',
    hint: 'Sequential steps vs unordered bullet points.',
    lessonId: 'day-2-html-content',
    tags: ['lists', 'ordered-lists', 'semantics']
  },
  {
    id: 'html-022',
    day: 2,
    topic: 'List Nesting Syntax',
    topicCategory: 'Headings, text, links, lists, and images',
    difficulty: 'intermediate',
    type: 'find-error',
    question: 'What is wrong with the following nested list syntax?',
    code: '<ul>\n  <li>Front-End</li>\n  <ul>\n    <li>HTML</li>\n    <li>CSS</li>\n  </ul>\n  <li>Back-End</li>\n</ul>',
    options: [
      { id: 'A', text: 'The nested `<ul>` must be placed inside an enclosing `<li>` element, not directly as a child of the outer `<ul>`' },
      { id: 'B', text: 'HTML forbids nesting lists more than one level deep' },
      { id: 'C', text: 'The nested list items must be enclosed in `<ol>` tags instead of `<ul>`' },
      { id: 'D', text: 'All list items require an explicit `value` attribute' }
    ],
    correctAnswer: 'A',
    explanation: 'In HTML specification, the direct children of `<ul>` and `<ol>` can only be `<li>` elements (or script-supporting elements). Nested sublists must be inside a parent `<li>`, e.g.: `<li>Front-End <ul><li>HTML</li></ul></li>`.',
    hint: 'Check what tags are legally allowed as immediate children of `<ul>`.',
    lessonId: 'day-2-html-content',
    tags: ['lists', 'nesting', 'syntax']
  },
  {
    id: 'html-023',
    day: 2,
    topic: 'Description Lists',
    topicCategory: 'Headings, text, links, lists, and images',
    difficulty: 'intermediate',
    type: 'concept',
    question: 'Which elements compose an HTML description/definition list for key-value terms and definitions?',
    code: '<dl>\n  <dt>CSS</dt>\n  <dd>Cascading Style Sheets</dd>\n</dl>',
    options: [
      { id: 'A', text: '<dl> container with <dt> (description term) and <dd> (description details/definition)' },
      { id: 'B', text: '<list> container with <term> and <def> items' },
      { id: 'C', text: '<glossary> container with <key> and <value> items' },
      { id: 'D', text: '<ol> container with <li> and <sub-li> items' }
    ],
    correctAnswer: 'A',
    explanation: 'A description list uses `<dl>` (description list), `<dt>` (description term), and `<dd>` (description details). It is ideal for glossaries, metadata displays, and key-value pairs.',
    hint: 'dl stands for description list, dt for term, dd for details.',
    lessonId: 'day-2-html-content',
    tags: ['description-list', 'dl', 'dt', 'dd']
  },
  {
    id: 'html-024',
    day: 2,
    topic: 'Figure and Figcaption',
    topicCategory: 'Headings, text, links, lists, and images',
    difficulty: 'intermediate',
    type: 'concept',
    question: 'What is the semantic purpose of the `<figure>` and `<figcaption>` elements?',
    code: '<figure>\n  <img src="chart.png" alt="Sales growth from Q1 to Q4">\n  <figcaption>Figure 1: Annual quarterly revenue trends.</figcaption>\n</figure>',
    options: [
      { id: 'A', text: 'To encapsulate self-contained visual media, code snippets, or diagrams along with an optional caption' },
      { id: 'B', text: 'To automatically draw SVG geometric vector shapes on screen' },
      { id: 'C', text: 'To force images into a 3D perspective tilt container' },
      { id: 'D', text: 'To embed external Flash animations inside an iframe' }
    ],
    correctAnswer: 'A',
    explanation: '`<figure>` represents self-contained content (images, diagrams, code listings) that is referenced from the main flow. `<figcaption>` provides an accessible caption directly bound to that figure.',
    hint: 'Think of academic or editorial figure captions in books and articles.',
    lessonId: 'day-2-html-content',
    tags: ['figure', 'figcaption', 'semantics']
  }
];
