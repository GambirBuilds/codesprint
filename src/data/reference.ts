import { ReferenceItem } from '../types';

export const referenceItems: ReferenceItem[] = [
  // HTML Structure & Content
  {
    id: 'ref-doctype',
    name: '<!DOCTYPE html>',
    type: 'html',
    category: 'Document Structure',
    definition: 'Declares the document type and tells the browser to render in HTML5 standards mode.',
    syntax: '<!DOCTYPE html>',
    exampleCode: '<!DOCTYPE html>\n<html lang="en">\n  <head>...</head>\n  <body>...</body>\n</html>',
    commonMistake: 'Omitting it, which triggers legacy quirks mode and unpredictable rendering.',
    relatedLessonId: 'day-1-html-foundations'
  },
  {
    id: 'ref-meta-viewport',
    name: '<meta name="viewport">',
    type: 'html',
    category: 'Metadata',
    definition: 'Configures the viewport width and initial scaling for responsive mobile rendering.',
    syntax: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
    valuesOrAttributes: ['width=device-width', 'initial-scale=1.0'],
    exampleCode: '<head>\n  <meta name="viewport" content="width=device-width, initial-scale=1.0">\n</head>',
    commonMistake: 'Forgetting this causes smartphones to render desktop sites zoomed out at 980px.',
    relatedLessonId: 'day-7-responsive-design'
  },
  {
    id: 'ref-anchor',
    name: '<a href="...">',
    type: 'html',
    category: 'Links',
    definition: 'Creates hyperlinks to other web pages, email addresses, files, or in-page fragment IDs.',
    syntax: '<a href="URL" target="_blank" rel="noopener">Label</a>',
    valuesOrAttributes: ['href', 'target', 'rel', 'download'],
    exampleCode: '<a href="https://codesprint.org" target="_blank" rel="noopener noreferrer">Visit CodeSprint</a>',
    commonMistake: 'Using target="_blank" without rel="noopener noreferrer" exposes security risks.',
    relatedLessonId: 'day-2-html-content'
  },
  {
    id: 'ref-image',
    name: '<img src="...">',
    type: 'html',
    category: 'Media',
    definition: 'Embeds an image into the document. Requires src and alt attributes.',
    syntax: '<img src="path.jpg" alt="Description" width="600" height="400">',
    valuesOrAttributes: ['src', 'alt', 'width', 'height', 'loading="lazy"'],
    exampleCode: '<img src="hero.webp" alt="Learners in a computer lab" width="800" height="400" loading="lazy">',
    commonMistake: 'Omitting alt causes screen readers to read noisy file paths.',
    relatedLessonId: 'day-2-html-content'
  },
  {
    id: 'ref-form',
    name: '<form>',
    type: 'html',
    category: 'Forms',
    definition: 'Represents an interactive document section containing controls for submitting data.',
    syntax: '<form action="/submit" method="POST">...</form>',
    valuesOrAttributes: ['action', 'method="GET|POST"', 'enctype'],
    exampleCode: '<form action="/login" method="POST">\n  <label for="u">User</label>\n  <input id="u" name="username">\n  <button type="submit">Log In</button>\n</form>',
    relatedLessonId: 'day-3-forms-tables'
  },
  {
    id: 'ref-main',
    name: '<main>',
    type: 'html',
    category: 'Semantic Elements',
    definition: 'Represents the dominant content of the <body> unique to this document.',
    syntax: '<main id="main-content">...</main>',
    exampleCode: '<main>\n  <h1>Main Heading</h1>\n  <p>Unique page content here.</p>\n</main>',
    commonMistake: 'Including more than one visible <main> element per document.',
    relatedLessonId: 'day-3-semantics-accessibility'
  },
  {
    id: 'ref-dialog',
    name: '<dialog>',
    type: 'html',
    category: 'Interactive Elements',
    definition: 'Represents a native dialog box, modal, or inspector window with built-in focus trapping.',
    syntax: '<dialog id="myModal"><p>Modal content</p><button>Close</button></dialog>',
    exampleCode: 'const modal = document.querySelector("dialog");\nmodal.showModal();',
    relatedLessonId: 'day-3-semantics-accessibility'
  },

  // CSS Layout & Styling
  {
    id: 'ref-box-sizing',
    name: 'box-sizing',
    type: 'css',
    category: 'Box Model',
    definition: 'Defines how the total width and height of an element are calculated.',
    syntax: 'box-sizing: border-box | content-box;',
    valuesOrAttributes: ['border-box', 'content-box'],
    exampleCode: '* {\n  box-sizing: border-box;\n}',
    commonMistake: 'Sticking with content-box, which causes padding to expand declared widths and break layouts.',
    relatedLessonId: 'day-5-box-model-positioning'
  },
  {
    id: 'ref-flexbox',
    name: 'display: flex',
    type: 'css',
    category: 'Flexbox',
    definition: 'Enables a 1-dimensional flex container layout for distributing items along a main axis.',
    syntax: 'display: flex; justify-content: center; align-items: center;',
    valuesOrAttributes: ['flex', 'inline-flex'],
    exampleCode: '.container {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  gap: 1rem;\n}',
    relatedLessonId: 'day-6-flexbox-grid'
  },
  {
    id: 'ref-grid',
    name: 'display: grid',
    type: 'css',
    category: 'Grid',
    definition: 'Enables a 2-dimensional grid layout engine managing rows and columns simultaneously.',
    syntax: 'grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));',
    valuesOrAttributes: ['grid', 'inline-grid'],
    exampleCode: '.cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));\n  gap: 1.5rem;\n}',
    relatedLessonId: 'day-6-flexbox-grid'
  },
  {
    id: 'ref-position',
    name: 'position',
    type: 'css',
    category: 'Positioning',
    definition: 'Specifies how an element is positioned in the document flow and establishes coordinate contexts.',
    syntax: 'position: static | relative | absolute | fixed | sticky;',
    valuesOrAttributes: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
    exampleCode: '.badge {\n  position: absolute;\n  top: 1rem;\n  right: 1rem;\n}',
    commonMistake: 'Using absolute without a relative parent, causing the element to float against the viewport.',
    relatedLessonId: 'day-5-box-model-positioning'
  },
  {
    id: 'ref-clamp',
    name: 'clamp()',
    type: 'css',
    category: 'Responsive & Math',
    definition: 'Clamps a value between an allowable minimum, preferred fluid value, and maximum limit.',
    syntax: 'font-size: clamp(min, val, max);',
    exampleCode: 'h1 {\n  font-size: clamp(1.75rem, 4vw, 3.5rem);\n}',
    relatedLessonId: 'day-7-responsive-design'
  },
  {
    id: 'ref-transform',
    name: 'transform',
    type: 'css',
    category: 'Transitions & Transforms',
    definition: 'Applies 2D or 3D rotation, scaling, skewing, or translation to an element on the GPU compositor.',
    syntax: 'transform: translate(x, y) scale(s) rotate(deg);',
    valuesOrAttributes: ['translate()', 'scale()', 'rotate()', 'skew()'],
    exampleCode: '.card:hover {\n  transform: translateY(-6px);\n}',
    relatedLessonId: 'day-8-advanced-css'
  },
  {
    id: 'ref-custom-properties',
    name: 'var() & Custom Properties',
    type: 'css',
    category: 'Modern CSS',
    definition: 'Declares reusable CSS custom properties (variables) that cascade down the DOM tree.',
    syntax: '--property-name: value; var(--property-name, fallback);',
    exampleCode: ':root {\n  --brand-cyan: #35F2C0;\n}\n.button {\n  background: var(--brand-cyan);\n}',
    relatedLessonId: 'day-8-advanced-css'
  }
];
