import { MCQQuestion } from '../../types';

export const htmlFundamentalsQuestions: MCQQuestion[] = [
  {
    id: 'html-001',
    day: 1,
    topic: 'HTML Fundamentals',
    topicCategory: 'HTML fundamentals and document structure',
    difficulty: 'beginner',
    type: 'concept',
    question: 'What is the primary role of HTML in modern web architecture?',
    code: null,
    options: [
      { id: 'A', text: 'To define the structural meaning, semantics, and raw content of a web page' },
      { id: 'B', text: 'To compile client-side logic into native machine code execution' },
      { id: 'C', text: 'To handle asynchronous database queries and server routing directly' },
      { id: 'D', text: 'To render vector animations and hardware-accelerated 3D shaders' }
    ],
    correctAnswer: 'A',
    explanation: 'HTML (HyperText Markup Language) describes the semantic structure and content of a web page. CSS governs presentation and visual formatting, while JavaScript supplies dynamic client behavior.',
    hint: 'Consider the classic three-layer separation of the web: structure, style, and behavior.',
    lessonId: 'day-1-html-foundations',
    tags: ['html', 'fundamentals', 'architecture']
  },
  {
    id: 'html-002',
    day: 1,
    topic: 'Document Structure',
    topicCategory: 'HTML fundamentals and document structure',
    difficulty: 'beginner',
    type: 'syntax',
    question: 'What is the mandatory first line in a modern HTML5 document, and why is it essential?',
    code: '<!DOCTYPE html>\n<html lang="en">\n  <head>...</head>\n  <body>...</body>\n</html>',
    options: [
      { id: 'A', text: 'It triggers strict standards rendering mode in browsers rather than quirks mode' },
      { id: 'B', text: 'It acts as an opening HTML tag that must be closed with </DOCTYPE>' },
      { id: 'C', text: 'It imports the default W3C stylesheet from the cloud' },
      { id: 'D', text: 'It instructs the operating system to allocate GPU memory for the tab' }
    ],
    correctAnswer: 'A',
    explanation: 'The <!DOCTYPE html> preamble tells the browser engine to render the document in full standards mode according to the HTML Living Standard, avoiding legacy quirks mode.',
    hint: 'Think about legacy browser compatibility and rendering engines.',
    lessonId: 'day-1-html-foundations',
    tags: ['doctype', 'standards', 'syntax']
  },
  {
    id: 'html-003',
    day: 1,
    topic: 'Void Elements',
    topicCategory: 'HTML fundamentals and document structure',
    difficulty: 'beginner',
    type: 'concept',
    question: 'Which of the following is an example of an HTML void (self-closing) element that cannot have children?',
    code: null,
    options: [
      { id: 'A', text: '<meta>' },
      { id: 'B', text: '<p>' },
      { id: 'C', text: '<div>' },
      { id: 'D', text: '<section>' }
    ],
    correctAnswer: 'A',
    explanation: '<meta> is a void element in HTML. It never has a closing tag and cannot contain child elements or text nodes. Other void elements include <img>, <br>, <hr>, <input>, and <link>.',
    hint: 'Look for an element placed in the document head that never wraps text or child nodes.',
    lessonId: 'day-1-html-foundations',
    tags: ['void-elements', 'syntax', 'tags']
  },
  {
    id: 'html-004',
    day: 1,
    topic: 'Document Head',
    topicCategory: 'HTML fundamentals and document structure',
    difficulty: 'intermediate',
    type: 'concept',
    question: 'Which element is placed inside <head> and provides the title displayed on the browser tab, bookmarks, and search engine results?',
    code: '<head>\n  <meta charset="UTF-8">\n  <title>CodeSprint Academy</title>\n</head>',
    options: [
      { id: 'A', text: '<title>' },
      { id: 'B', text: '<h1>' },
      { id: 'C', text: '<header>' },
      { id: 'D', text: '<meta name="heading">' }
    ],
    correctAnswer: 'A',
    explanation: '<title> defines the title of the document shown in the browser window/tab header, in browser bookmarks, and as the main clickable headline in search engine result pages. <h1> is rendered in the visible <body>.',
    hint: 'Do not confuse in-page visual headings with the window/tab metadata title.',
    lessonId: 'day-1-html-foundations',
    tags: ['head', 'title', 'seo']
  },
  {
    id: 'html-005',
    day: 1,
    topic: 'Character Encoding',
    topicCategory: 'HTML fundamentals and document structure',
    difficulty: 'intermediate',
    type: 'best-solution',
    question: 'Why should <meta charset="UTF-8"> be placed as close to the beginning of the <head> element as possible?',
    code: '<head>\n  <meta charset="UTF-8">\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n  <title>Learning HTML</title>\n</head>',
    options: [
      { id: 'A', text: 'So the browser knows how to interpret multibyte characters before parsing any text or title' },
      { id: 'B', text: 'Because browsers fail to load external CSS stylesheets unless UTF-8 is specified first' },
      { id: 'C', text: 'Because JavaScript execution is blocked until character validation finishes' },
      { id: 'D', text: 'Because UTF-8 reduces the byte payload by automatically compressing HTML text' }
    ],
    correctAnswer: 'A',
    explanation: 'Placing <meta charset="UTF-8"> within the first 1024 bytes of the document ensures the browser parses subsequent characters (such as localized titles or content) with the correct character decoding, preventing garbled mojibake text.',
    hint: 'How does an engine read bytes before it knows which encoding standard to use?',
    lessonId: 'day-1-html-foundations',
    tags: ['encoding', 'meta', 'performance']
  },
  {
    id: 'html-006',
    day: 1,
    topic: 'Nesting Rules',
    topicCategory: 'HTML fundamentals and document structure',
    difficulty: 'intermediate',
    type: 'find-error',
    question: 'Identify the structural error in the following markup:',
    code: '<p>Learn web development with <em>CodeSprint Academy</p></em>',
    options: [
      { id: 'A', text: 'The tags are incorrectly interleaved; <em> must be closed before </p>' },
      { id: 'B', text: '<p> elements are not permitted to contain inline formatting elements like <em>' },
      { id: 'C', text: 'The <em> tag must always be replaced with the obsolete <i> tag' },
      { id: 'D', text: 'Paragraphs cannot contain plain text without being enclosed in a <span>' }
    ],
    correctAnswer: 'A',
    explanation: 'HTML elements must follow strict hierarchical nesting: elements opened last must be closed first. The correct syntax is <p>Learn web development with <em>CodeSprint Academy</em></p>.',
    hint: 'Remember the rule: First In, Last Out (FILO) for nested element closing tags.',
    lessonId: 'day-1-html-foundations',
    tags: ['nesting', 'syntax', 'debugging']
  },
  {
    id: 'html-007',
    day: 1,
    topic: 'HTML Attributes',
    topicCategory: 'HTML fundamentals and document structure',
    difficulty: 'beginner',
    type: 'syntax',
    question: 'In the element `<a href="https://example.com" target="_blank" rel="noopener">Visit</a>`, what is `target="_blank"`?',
    code: null,
    options: [
      { id: 'A', text: 'An attribute name and attribute value pair providing additional element configuration' },
      { id: 'B', text: 'A CSS class selector rule applied via the DOM API' },
      { id: 'C', text: 'A JavaScript callback function executed upon click' },
      { id: 'D', text: 'A void tag nested inside the anchor element' }
    ],
    correctAnswer: 'A',
    explanation: 'HTML attributes provide additional configuration or metadata for an element. They are specified in the opening tag as name="value" pairs, where "target" is the attribute name and "_blank" is its value.',
    hint: 'Look at the syntax inside the opening tag: name="value".',
    lessonId: 'day-1-html-foundations',
    tags: ['attributes', 'syntax', 'elements']
  },
  {
    id: 'html-008',
    day: 1,
    topic: 'Document Body',
    topicCategory: 'HTML fundamentals and document structure',
    difficulty: 'beginner',
    type: 'concept',
    question: 'What is the distinction between the `<head>` and `<body>` elements of an HTML page?',
    code: '<!DOCTYPE html>\n<html lang="en">\n  <head> <!-- Area A --> </head>\n  <body> <!-- Area B --> </body>\n</html>',
    options: [
      { id: 'A', text: '<head> contains non-rendered metadata, scripts, and links; <body> contains visible user content' },
      { id: 'B', text: '<head> is only for mobile devices; <body> is only for desktop monitors' },
      { id: 'C', text: '<head> holds CSS only; <body> holds JavaScript only' },
      { id: 'D', text: 'Both elements render identical content, but <head> renders at higher z-index' }
    ],
    correctAnswer: 'A',
    explanation: '<head> holds document metadata, charset definitions, stylesheets, scripts, and SEO information. <body> contains the actual visible document structure and content rendered in the viewport.',
    hint: 'Which part holds the text, images, and buttons the user sees on screen?',
    lessonId: 'day-1-html-foundations',
    tags: ['head', 'body', 'document-structure']
  },
  {
    id: 'html-009',
    day: 1,
    topic: 'Comments',
    topicCategory: 'HTML fundamentals and document structure',
    difficulty: 'beginner',
    type: 'syntax',
    question: 'Which syntax correctly defines an HTML comment that will not be rendered on the page?',
    code: null,
    options: [
      { id: 'A', text: '<!-- This is a comment -->' },
      { id: 'B', text: '// This is a comment' },
      { id: 'C', text: '/* This is a comment */' },
      { id: 'D', text: '# This is a comment' }
    ],
    correctAnswer: 'A',
    explanation: 'HTML comments use <!-- comment text -->. // is used in JavaScript, /* */ is used in CSS/JavaScript, and # is used in Python or shell scripts.',
    hint: 'Notice the angle brackets and exclamation mark.',
    lessonId: 'day-1-html-foundations',
    tags: ['comments', 'syntax']
  },
  {
    id: 'html-010',
    day: 1,
    topic: 'Whitespace and Collapse',
    topicCategory: 'HTML fundamentals and document structure',
    difficulty: 'intermediate',
    type: 'code-output',
    question: 'How will standard browsers render the following markup?',
    code: '<p>\n  CodeSprint      Academy\n\n\n  Online\n</p>',
    options: [
      { id: 'A', text: 'As "CodeSprint Academy Online" with multiple consecutive whitespace and newlines collapsed into a single space' },
      { id: 'B', text: 'With exact character-for-character whitespace preserved identical to the source code' },
      { id: 'C', text: 'It will generate a browser parser syntax error and halt rendering' },
      { id: 'D', text: 'Every newline will be automatically converted into a horizontal divider <hr>' }
    ],
    correctAnswer: 'A',
    explanation: 'By default, HTML rendering engines collapse contiguous whitespace characters (spaces, tabs, and newlines) into a single space. Exact spacing can only be preserved with CSS white-space or the <pre> tag.',
    hint: 'How does HTML default whitespace collapsing behavior work?',
    lessonId: 'day-1-html-foundations',
    tags: ['whitespace', 'rendering', 'behavior']
  },
  {
    id: 'html-011',
    day: 1,
    topic: 'Global Attributes',
    topicCategory: 'HTML fundamentals and document structure',
    difficulty: 'advanced',
    type: 'comparison',
    question: 'What is the key difference between the `id` and `class` attributes on HTML elements?',
    code: '<div id="main-nav" class="nav-bar dark-theme"></div>',
    options: [
      { id: 'A', text: 'An `id` must be unique across the entire document; `class` can be shared across multiple elements' },
      { id: 'B', text: '`class` can only be styled with CSS; `id` can only be queried by JavaScript' },
      { id: 'C', text: 'An element can have multiple `id` values separated by commas, but only one `class`' },
      { id: 'D', text: '`id` is deprecated in HTML5 in favor of `data-id`' }
    ],
    correctAnswer: 'A',
    explanation: 'The `id` attribute specifies a unique identifier within the document and must not be duplicated. The `class` attribute assigns one or more whitespace-separated class names that can be shared across many elements.',
    hint: 'Think about document uniqueness versus reusable categorization.',
    lessonId: 'day-1-html-foundations',
    tags: ['attributes', 'id', 'class']
  },
  {
    id: 'html-012',
    day: 1,
    topic: 'Language Attribute',
    topicCategory: 'HTML fundamentals and document structure',
    difficulty: 'intermediate',
    type: 'accessibility',
    question: 'Why is defining the `lang` attribute on the root `<html>` element critical for accessibility?',
    code: '<html lang="en">',
    options: [
      { id: 'A', text: 'Screen readers rely on it to select the proper pronunciation dictionary and vocal synthesizer' },
      { id: 'B', text: 'Browsers refuse to render web fonts without a validated ISO language code' },
      { id: 'C', text: 'It automatically translates the webpage text into every visitor\'s native language' },
      { id: 'D', text: 'It sets the currency symbol for all nested form inputs' }
    ],
    correctAnswer: 'A',
    explanation: 'The `lang` attribute informs assistive technologies (like screen readers) and search engines of the document language, ensuring screen readers pronounce words correctly rather than using the wrong language rules.',
    hint: 'Consider how a screen reader knows whether to pronounce words in English, Spanish, or French.',
    lessonId: 'day-1-html-foundations',
    tags: ['accessibility', 'lang', 'screen-readers']
  }
];
