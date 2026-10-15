import { CurriculumDay } from '../types';

export const curriculumDays: CurriculumDay[] = [
  {
    day: 1,
    title: 'HTML Foundations & Document Architecture',
    tagline: 'The structural skeleton of the World Wide Web',
    description: 'Understand how browsers parse HTML, the role of <!DOCTYPE html>, head vs body, tags, void elements, parent-child nesting rules, and character encoding.',
    capstoneTitle: 'Build a Semantic Developer Profile Page',
    lessons: [
      {
        id: 'day-1-html-foundations',
        day: 1,
        title: 'How the Web Works & Document Anatomy',
        durationMinutes: 25,
        difficulty: 'beginner',
        summary: 'Explore client-server HTTP transactions, DOM parsing engines, <!DOCTYPE html>, and the structural requirements of standard web documents.',
        learningObjectives: [
          'Explain the separation of structure (HTML), style (CSS), and behavior (JavaScript)',
          'Write a syntactically valid HTML5 boilerplate from memory',
          'Differentiate metadata inside <head> from visible content inside <body>',
          'Configure UTF-8 character encoding and viewport settings for standards mode'
        ],
        prerequisites: ['Basic computer literacy', 'A modern web browser'],
        theory: [
          'When you enter a URL in a browser, your client dispatches an HTTP GET request to a remote server. The server responds with raw text bytes of HTML.',
          'The browser engine begins parsing the byte stream into tokens, nodes, and builds the Document Object Model (DOM) tree in memory.',
          'The <!DOCTYPE html> declaration is a legacy requirement that tells modern browser rendering engines to activate full standard mode rather than quirks mode.',
          'HTML is not a programming language; it is a declarative markup language that gives meaning (semantics) and structure to human content.'
        ],
        terminology: [
          { term: 'DOM (Document Object Model)', definition: 'The tree-like memory representation of HTML elements created by the browser' },
          { term: 'Void Element', definition: 'An element that cannot hold content or child nodes and has no closing tag (e.g. <meta>, <link>, <img>)' },
          { term: 'Quirks Mode', definition: 'A legacy emulation mode in browsers triggered when DOCTYPE is missing or malformed' },
          { term: 'Character Encoding', definition: 'The mapping algorithm (such as UTF-8) used to translate binary bytes into human typographic glyphs' }
        ],
        codeExamples: [
          {
            title: 'Standard HTML5 Boilerplate',
            language: 'html',
            code: '<!DOCTYPE html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>CodeSprint Academy</title>\n  </head>\n  <body>\n    <h1>Welcome to Front-End Mastery</h1>\n    <p>HTML creates the durable structural foundation of all web applications.</p>\n  </body>\n</html>',
            explanation: 'Notice <meta charset="UTF-8"> placed at the very top of <head> to decode subsequent text without character corruption, and the viewport meta tag ensuring responsive rendering on mobile displays.'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Interleaving tags like <p>Text <em>here</p></em>',
            fix: '<p>Text <em>here</em></p>',
            why: 'Elements must be closed in reverse order of opening (LIFO - Last In, First Out). Interleaving breaks the DOM hierarchy.'
          },
          {
            mistake: 'Putting visible headings or paragraphs inside <head>',
            fix: 'Keep <head> strictly for metadata, title, and stylesheet links; place all visible UI content in <body>',
            why: '<head> content is not rendered on screen. Browsers will perform error recovery by shoving elements into <body>, creating unpredictable layouts.'
          }
        ],
        bestPractices: [
          'Always specify the lang attribute on <html> to allow screen readers to choose the correct vocal pronunciation.',
          'Keep your HTML indented consistently by 2 spaces to clearly visualize parent-child relationships.',
          'Validate markup using the W3C Nu HTML Checker before releasing.'
        ],
        interactiveSnippet: {
          html: '<h1>Hello, World!</h1>\n<p>Welcome to <strong>CodeSprint Academy</strong>. We are learning HTML foundations.</p>',
          css: 'body { font-family: sans-serif; padding: 1.5rem; color: #1e293b; }\nh1 { color: #0284c7; }',
          prompt: 'Try changing the heading text or adding an <em>emphasis</em> tag to the paragraph.'
        },
        relatedLessonIds: ['day-2-html-content', 'day-3-semantics-accessibility']
      }
    ]
  },
  {
    day: 2,
    title: 'HTML Content, Navigation & Media',
    tagline: 'Text hierarchy, hyperlinking, images, and tabular data',
    description: 'Master headings, paragraphs, absolute vs relative paths, accessible image markup, list structures, and clean data tables.',
    capstoneTitle: 'Build an Interactive Technical Article',
    lessons: [
      {
        id: 'day-2-html-content',
        day: 2,
        title: 'Hyperlinks, Image Optimization & Lists',
        durationMinutes: 30,
        difficulty: 'beginner',
        summary: 'Learn how hyperlinks form the connective tissue of the web, relative folder traversal, image alt-text principles, and nested lists.',
        learningObjectives: [
          'Construct absolute, relative, and internal fragment links (#id)',
          'Implement accessible alt text for informative vs decorative graphics',
          'Structure nested ordered, unordered, and description lists',
          'Mitigate Cumulative Layout Shift with width and height image attributes'
        ],
        prerequisites: ['day-1-html-foundations'],
        theory: [
          'Hypertext is the defining innovation of the World Wide Web. The <a> tag uses the href attribute to connect documents across domain boundaries.',
          'Folder navigation uses ../ to ascend one folder level and ./ to reference the current directory.',
          'Every <img> must have an alt attribute. Decorative images take alt="" (null alt), while informative diagrams require concise textual descriptions.',
          'Intrinsic dimensions (width and height attributes) on images let the browser calculate the aspect ratio prior to asset download, preventing Cumulative Layout Shift (CLS).'
        ],
        terminology: [
          { term: 'Fragment Identifier', definition: 'The #hash portion of a URL targeting a specific element by ID on the page' },
          { term: 'Cumulative Layout Shift (CLS)', definition: 'A Core Web Vital measuring how much content jumps unexpectedly during asset loading' },
          { term: 'Description List (<dl>)', definition: 'A list of terms (<dt>) and corresponding detailed descriptions (<dd>)' }
        ],
        codeExamples: [
          {
            title: 'Accessible Image & Link Structure',
            language: 'html',
            code: '<figure>\n  <img src="/assets/profile.jpg" width="400" height="400" alt="Sarah Connor reviewing front-end code on a laptop">\n  <figcaption>Sarah Connor, Lead Front-End Engineer at CodeSprint</figcaption>\n</figure>\n\n<p>Read Sarah\'s <a href="/case-studies" rel="noopener">case studies</a> or email her <a href="mailto:sarah@codesprint.org">directly</a>.</p>',
            explanation: 'The image has width and height to reserve layout geometry, descriptive alt text, and semantic figure/figcaption encapsulation.'
          }
        ],
        commonMistakes: [
          {
            mistake: '<img src="icon.svg"> (Missing alt attribute entirely)',
            fix: '<img src="icon.svg" alt="">',
            why: 'When alt is omitted entirely, screen readers vocalize the entire noisy filename or URL to the user.'
          },
          {
            mistake: 'Directly nesting <ul> as a child of <ul>: <ul><ul><li>Item</li></ul></ul>',
            fix: '<ul><li>Category <ul><li>Item</li></ul></li></ul>',
            why: 'The HTML standard only permits <li> elements as immediate children of <ul> and <ol>.'
          }
        ],
        bestPractices: [
          'Add rel="noopener noreferrer" whenever opening external links in target="_blank".',
          'Use <ol> when sequence matters (such as recipe steps); use <ul> for unordered collections.',
          'Use <figure> and <figcaption> when an image or code snippet has an editorial caption.'
        ],
        relatedLessonIds: ['day-1-html-foundations', 'day-3-forms-tables']
      }
    ]
  },
  {
    day: 3,
    title: 'Forms, Semantics & Web Accessibility (a11y)',
    tagline: 'Designing inclusive, accessible interactive user inputs',
    description: 'Learn input types, labels, fieldsets, keyboard navigation, landmark semantics, and WCAG AA compliance.',
    capstoneTitle: 'Build a Fully Accessible Application Form',
    lessons: [
      {
        id: 'day-3-forms-tables',
        day: 3,
        title: 'Accessible Forms & Data Inputs',
        durationMinutes: 35,
        difficulty: 'intermediate',
        summary: 'Deep-dive into forms, input types, programmatic label association, client validation, and table scope headers.',
        learningObjectives: [
          'Associate labels to inputs programmatically via for and id attributes',
          'Group related controls with <fieldset> and <legend>',
          'Choose the correct input types (email, tel, number) for mobile UX',
          'Build accessible data tables with <th scope="col/row">'
        ],
        prerequisites: ['day-2-html-content'],
        theory: [
          'Forms allow two-way interaction between user and server. The method attribute dictates whether payload is appended to URL (GET) or sent in request body (POST).',
          'Labels are critical: clicking a connected <label> focuses its input, which expands mobile hit targets.',
          'Never use placeholder as a substitute for a label. Placeholders disappear when the user starts typing, causing loss of context.'
        ],
        terminology: [
          { term: 'Native Validation', definition: 'Browser-enforced constraints using required, pattern, min, and max attributes' },
          { term: 'Fieldset', definition: 'A container grouping related form controls with a single legend label' },
          { term: 'Scope Attribute', definition: 'An attribute on <th> defining whether it headers a row (row) or column (col)' }
        ],
        codeExamples: [
          {
            title: 'Accessible Form Grouping',
            language: 'html',
            code: '<form action="/register" method="POST">\n  <fieldset>\n    <legend>Account Credentials</legend>\n    <div class="field">\n      <label for="user-email">Email Address</label>\n      <input type="email" id="user-email" name="email" required autocomplete="email">\n    </div>\n    <div class="field">\n      <label for="user-pass">Password</label>\n      <input type="password" id="user-pass" name="password" required minlength="8">\n    </div>\n    <button type="submit">Create Account</button>\n  </fieldset>\n</form>',
            explanation: 'Notice explicit matching between label `for` and input `id`, the fieldset/legend grouping, and `type="submit"` on the button.'
          }
        ],
        commonMistakes: [
          {
            mistake: '<div onclick="send()">Submit</div>',
            fix: '<button type="submit">Submit</button>',
            why: 'A div is inaccessible to keyboard users (no tab focus, no Enter/Space key firing) and has no screen reader role.'
          }
        ],
        bestPractices: [
          'Always supply autocomplete hints to assist password managers and browser autofill.',
          'Provide clear, human-readable error messages adjacent to invalid inputs.'
        ],
        relatedLessonIds: ['day-3-semantics-accessibility']
      },
      {
        id: 'day-3-semantics-accessibility',
        day: 3,
        title: 'Landmarks, ARIA & Keyboard Navigation',
        durationMinutes: 30,
        difficulty: 'intermediate',
        summary: 'Master semantic landmarks (<header>, <nav>, <main>, <section>, <article>, <footer>), WCAG AA contrast, and the First Rule of ARIA.',
        learningObjectives: [
          'Replace generic divs with structural semantic landmarks',
          'Apply the First Rule of ARIA: use native HTML first',
          'Test and verify keyboard tab focusability and visual focus rings',
          'Meet WCAG 2.2 AA contrast ratios (4.5:1 text, 3:1 large text)'
        ],
        prerequisites: ['day-3-forms-tables'],
        theory: [
          'Landmarks allow assistive technologies to jump directly to sections (e.g. skipping header navigation directly into <main>).',
          'ARIA (Accessible Rich Internet Applications) attributes should only supplement HTML when no native semantic tag exists. Never override native semantics unnecessarily.'
        ],
        terminology: [
          { term: 'Landmark Region', definition: 'A top-level semantic section (<main>, <nav>, <aside>) that assistive devices can navigate to' },
          { term: 'WCAG AA', definition: 'Web Content Accessibility Guidelines international standard for digital inclusion' },
          { term: 'Skip Link', definition: 'A hidden anchor at the top of the page allowing keyboard users to bypass navigation' }
        ],
        codeExamples: [
          {
            title: 'Semantic Document Architecture',
            language: 'html',
            code: '<a href="#main-content" class="skip-link">Skip to content</a>\n<header>\n  <nav aria-label="Main Navigation">\n    <ul>\n      <li><a href="/">Home</a></li>\n      <li><a href="/curriculum">Curriculum</a></li>\n    </ul>\n  </nav>\n</header>\n<main id="main-content">\n  <article>\n    <h1>Semantic Web Architecture</h1>\n    <p>Semantic markup empowers humans and search engines alike.</p>\n  </article>\n</main>\n<footer>\n  <p>&copy; 2026 CodeSprint Academy</p>\n</footer>',
            explanation: 'A clean document skeleton with a skip link, designated nav, unique main region, and footer.'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Multiple visible <main> tags on a single page',
            fix: 'Keep exactly one <main> tag representing the unique primary content of the document.',
            why: 'Multiple <main> tags confuse screen readers and violate the HTML specification.'
          }
        ],
        bestPractices: [
          'Never remove outline: none without providing a visible :focus-visible replacement indicator.',
          'Test every page using keyboard only: Tab, Shift+Tab, Enter, Space, and Escape.'
        ],
        relatedLessonIds: ['day-4-css-fundamentals']
      }
    ]
  },
  {
    day: 4,
    title: 'CSS Fundamentals, Selectors & Typography',
    tagline: 'Cascades, specificity, units, and modern color science',
    description: 'Learn the CSS cascade, element/class/ID selectors, combinators, rem vs em units, and typography hierarchy.',
    capstoneTitle: 'Style an Unstyled Document with Precision',
    lessons: [
      {
        id: 'day-4-css-fundamentals',
        day: 4,
        title: 'The Cascade, Rulesets & Selectors',
        durationMinutes: 30,
        difficulty: 'beginner',
        summary: 'Understand how browsers parse and apply CSS rulesets, combinators, and resolve declaration conflicts through the cascade.',
        learningObjectives: [
          'Write declarations with valid properties and values',
          'Use child (>), descendant (space), and sibling (+, ~) combinators',
          'Understand cascade resolution through source order and specificity',
          'Link external stylesheets via <link rel="stylesheet">'
        ],
        prerequisites: ['day-3-semantics-accessibility'],
        theory: [
          'CSS (Cascading Style Sheets) decorates the DOM tree. The browser creates the CSSOM (CSS Object Model) and merges it with DOM to create the Render Tree.',
          'The Cascade resolves conflicting styles using three criteria: Origin & Importance, Specificity, and Source Order.',
          'When two rules have identical specificity, the one declared later in the stylesheet wins.'
        ],
        terminology: [
          { term: 'Declaration', definition: 'A property-value pair terminated by a semicolon (e.g. color: #35F2C0;)' },
          { term: 'Combinator', definition: 'A token that explains the relationship between selectors (space, >, +, ~)' },
          { term: 'CSSOM', definition: 'The CSS Object Model parsed in memory alongside the DOM' }
        ],
        codeExamples: [
          {
            title: 'Combinators in Action',
            language: 'css',
            code: '/* Direct child only */\nnav > ul {\n  list-style: none;\n  display: flex;\n}\n\n/* Descendant at any depth */\nnav a {\n  color: #78A9FF;\n  text-decoration: none;\n}\n\n/* Adjacent sibling */\nh2 + p {\n  margin-top: 0.5rem;\n}',
            explanation: 'Notice how > only targets immediate children, while the space combinator matches any nested anchor within nav.'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Using uppercase or space in class names like .Header Main',
            fix: 'Use kebab-case: .header-main',
            why: 'A space in CSS separates selectors, turning your class into a descendant combinator query!'
          }
        ],
        bestPractices: [
          'Prefer classes for styling; reserve IDs for JavaScript anchors and unique form associations.',
          'Maintain low specificity throughout your stylesheet to avoid cascade conflicts.'
        ],
        relatedLessonIds: ['day-4-css-units-typography', 'day-5-box-model-positioning']
      },
      {
        id: 'day-4-css-units-typography',
        day: 4,
        title: 'Units, Typography & Modern Colors',
        durationMinutes: 30,
        difficulty: 'intermediate',
        summary: 'Explore rem vs em scaling, viewport units (vh, vw, dvh), unitless line-height, and perceptually uniform color spaces (oklch).',
        learningObjectives: [
          'Calculate dimensions using rem (relative to root) vs em (relative to parent)',
          'Implement unitless line-height to guarantee harmonious typographic inheritance',
          'Use dynamic viewport units (dvh, svh) for mobile viewports',
          'Apply modern color spaces and alpha transparency channels'
        ],
        prerequisites: ['day-4-css-fundamentals'],
        theory: [
          'rem scales against <html> font-size (default 16px). If a user adjusts their browser default font size for vision needs, rem scales gracefully with them.',
          'Unitless line-height (e.g. 1.6) multiplies the computed font size of whatever element inherits it, avoiding text overlapping on larger headings.',
          'Modern mobile browsers show/hide URL toolbars during scroll; dvh dynamically calculates true visible height.'
        ],
        terminology: [
          { term: 'rem (Root em)', definition: 'Unit relative to the font-size of the root <html> element' },
          { term: 'dvh (Dynamic Viewport Height)', definition: 'Calculates viewport height dynamically as mobile address bars expand/collapse' },
          { term: 'oklch', definition: 'A perceptually uniform color space where equal lightness yields equal perceived human brightness' }
        ],
        codeExamples: [
          {
            title: 'Modern Typographic Stack',
            language: 'css',
            code: ':root {\n  --font-main: "Plus Jakarta Sans", system-ui, sans-serif;\n  --color-accent: oklch(0.85 0.15 165);\n}\n\nbody {\n  font-family: var(--font-main);\n  font-size: 1rem; /* 16px */\n  line-height: 1.6; /* proportional */\n  color: #F5F7FA;\n  background-color: #080C12;\n}',
            explanation: 'Clean typography with root variables, unitless line-height, and accessible contrast.'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Setting line-height in fixed pixels on body: body { line-height: 20px; }',
            fix: 'Use unitless ratio: body { line-height: 1.5; }',
            why: 'Fixed pixel line-heights are inherited by h1 and h2 headings, causing lines of large text to overlap into an unreadable mess.'
          }
        ],
        bestPractices: [
          'Always supply generic fallback families (sans-serif, serif, monospace) at the end of font-family stacks.',
          'Use rem for typography, padding, and spacing; use percentages or flex/grid fr units for layout containers.'
        ],
        relatedLessonIds: ['day-5-box-model-positioning']
      }
    ]
  },
  {
    day: 5,
    title: 'The Box Model, Display & Positioning Systems',
    tagline: 'Content, padding, border, margin, and positioning contexts',
    description: 'Master border-box vs content-box, margin collapsing, block vs inline-block, static, relative, absolute, fixed, and sticky positioning contexts.',
    capstoneTitle: 'Build a Card UI System with Overlay Badges',
    lessons: [
      {
        id: 'day-5-box-model-positioning',
        day: 5,
        title: 'Box Model Math & Positioning Contexts',
        durationMinutes: 35,
        difficulty: 'intermediate',
        summary: 'Deep-dive into box-sizing: border-box, vertical margin collapsing, positioning contexts, and z-index stacking hierarchies.',
        learningObjectives: [
          'Calculate total box width under border-box vs content-box',
          'Predict vertical margin collapse between sibling block elements',
          'Establish a positioning containing block using position: relative',
          'Debug z-index collisions and stacking context traps'
        ],
        prerequisites: ['day-4-css-units-typography'],
        theory: [
          'Every HTML element is rendered as a rectangular box consisting of: Content, Padding, Border, and Margin.',
          'Under content-box (default), padding and border add on top of declared width. Under border-box, padding and border are absorbed inside the declared width.',
          'position: absolute removes the element from flow and offsets it relative to its closest positioned ancestor (an ancestor with relative, absolute, fixed, or sticky).',
          'Stacking contexts form isolated z-index hierarchies. A child with z-index: 9999 cannot escape a parent with z-index: 1.'
        ],
        terminology: [
          { term: 'Box-Sizing: Border-Box', definition: 'The model where padding and border are included within the specified width and height' },
          { term: 'Margin Collapsing', definition: 'When adjacent vertical margins combine into a single margin equal to the larger of the two' },
          { term: 'Containing Block', definition: 'The reference rectangle against which an element calculates its size and coordinates' }
        ],
        codeExamples: [
          {
            title: 'Badge Positioned Inside a Card',
            language: 'css',
            code: '* {\n  box-sizing: border-box;\n}\n\n.card {\n  position: relative;\n  width: 320px;\n  padding: 1.5rem;\n  background: #151F2C;\n  border: 1px solid #223044;\n}\n\n.card-badge {\n  position: absolute;\n  top: 1rem;\n  right: 1rem;\n  background: #35F2C0;\n  color: #080C12;\n  font-size: 0.75rem;\n  font-weight: 700;\n  padding: 0.25rem 0.5rem;\n}',
            explanation: '.card has position: relative, establishing the containing block for .card-badge positioned absolute at top: 1rem, right: 1rem.'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Applying position: absolute without declaring position: relative on the parent container',
            fix: 'Add position: relative to the intended parent container',
            why: 'Without a positioned parent, the absolute element floats relative to the entire page body/viewport.'
          }
        ],
        bestPractices: [
          'Apply *, *::before, *::after { box-sizing: border-box; } at the top of every stylesheet.',
          'Use sticky headers with care; ensure no ancestor element has overflow: hidden.'
        ],
        relatedLessonIds: ['day-6-flexbox-grid']
      }
    ]
  },
  {
    day: 6,
    title: 'Modern Layout: Flexbox & CSS Grid',
    tagline: 'One-dimensional flows and two-dimensional layout grids',
    description: 'Harness flex axes, justify vs align, flex-grow/shrink, grid template columns, fr units, minmax, and responsive auto-fit grids without media queries.',
    capstoneTitle: 'Architect a Responsive Dashboard Layout',
    lessons: [
      {
        id: 'day-6-flexbox-grid',
        day: 6,
        title: 'Mastering Flexbox & CSS Grid',
        durationMinutes: 40,
        difficulty: 'intermediate',
        summary: 'Compare 1D vs 2D layout systems, main vs cross axes, flex shorthand, fractional fr units, and auto-fit repeat grids.',
        learningObjectives: [
          'Distinguish when to use Flexbox (1D content flow) vs CSS Grid (2D coordinate layout)',
          'Center elements effortlessly using justify-content, align-items, and place-items',
          'Calculate fractional fr track allocations with grid gaps',
          'Build auto-responsive card grids using repeat(auto-fit, minmax(280px, 1fr))'
        ],
        prerequisites: ['day-5-box-model-positioning'],
        theory: [
          'Flexbox is a 1-dimensional system designed for linear content distribution (e.g. navbar links, toolbars, card button bars).',
          'CSS Grid is a 2-dimensional system managing columns and rows concurrently (e.g. page shells, photo galleries, dashboard widget grids).',
          'The fr unit represents a fraction of available free space after non-flexible lengths and gaps have been subtracted.'
        ],
        terminology: [
          { term: 'Main Axis', definition: 'The primary direction in Flexbox determined by flex-direction (horizontal by default)' },
          { term: 'Cross Axis', definition: 'The axis perpendicular to the main axis in Flexbox' },
          { term: 'Fr (Fractional Unit)', definition: 'A CSS Grid unit representing an allocated fraction of free layout space' },
          { term: 'auto-fit', definition: 'A CSS Grid keyword that collapses empty tracks so existing items expand to fill the full container' }
        ],
        codeExamples: [
          {
            title: 'Auto-Responsive Card Grid Without Media Queries',
            language: 'css',
            code: '.product-grid {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));\n  gap: 1.5rem;\n  padding: 1.5rem;\n}',
            explanation: 'The browser automatically calculates how many 260px columns fit on screen. If 3 fit, it creates 3 columns; on mobile it gracefully drops to 1 column without requiring a media query.'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Using justify-content to center text inside a single paragraph',
            fix: 'Use text-align: center; justify-content is for flex items inside a flex container.',
            why: 'justify-content only affects flex and grid items, not inline text typography.'
          }
        ],
        bestPractices: [
          'Use the modern gap property instead of adding margins to child items.',
          'Use place-items: center; in CSS Grid for instantaneous 2D centering.'
        ],
        relatedLessonIds: ['day-7-responsive-design']
      }
    ]
  },
  {
    day: 7,
    title: 'Responsive Web Design & Mobile-First Patterns',
    tagline: 'Adaptive interfaces, fluid layouts, and breakpoint architecture',
    description: 'Learn the mobile-first philosophy, min-width media queries, fluid sizing with clamp(), and responsive touch target sizing.',
    capstoneTitle: 'Convert a Desktop Layout into a Mobile-First App',
    lessons: [
      {
        id: 'day-7-responsive-design',
        day: 7,
        title: 'Media Queries, Fluidity & Mobile Ergonomics',
        durationMinutes: 30,
        difficulty: 'intermediate',
        summary: 'Explore mobile-first development, content-driven breakpoints, clamp() fluid typography, and mobile touch ergonomics.',
        learningObjectives: [
          'Implement mobile-first responsive architecture using min-width queries',
          'Write modern range syntax: @media (768px <= width <= 1024px)',
          'Create fluid typography that scales smoothly between minimum and maximum screen sizes',
          'Comply with WCAG 2.2 touch target minimum sizes (>= 24px, ideally >= 44px)'
        ],
        prerequisites: ['day-6-flexbox-grid'],
        theory: [
          'Mobile-first means writing baseline CSS for small screens first, then using @media (min-width: ...) to progressively enhance the layout as screen real estate expands.',
          'Breakpoints should be determined by where your content breaks or looks awkward, rather than memorizing specific phone models.',
          'clamp(MIN, PREFERRED, MAX) gives fluid sizing without requiring step-by-step media query jumps.'
        ],
        terminology: [
          { term: 'Mobile-First', definition: 'Developing the mobile layout as base CSS and progressively adding styles for wider viewports' },
          { term: 'Breakpoint', definition: 'The viewport width threshold where media query styles activate' },
          { term: 'Touch Target', definition: 'The interactive clickable/tappable surface area of a control (minimum 24px, recommended 44px)' }
        ],
        codeExamples: [
          {
            title: 'Mobile-First Progressive Enhancement',
            language: 'css',
            code: '/* Base styles (Mobile) */\n.nav-menu {\n  display: flex;\n  flex-direction: column;\n  gap: 1rem;\n}\n\n/* Tablet and desktop enhancement */\n@media (min-width: 768px) {\n  .nav-menu {\n    flex-direction: row;\n    align-items: center;\n    justify-content: space-between;\n  }\n}',
            explanation: 'Mobile devices load clean, lightweight single-column styles first. Tablets and desktops receive the multi-column horizontal enhancements.'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Forgetting the viewport meta tag in HTML <head>',
            fix: '<meta name="viewport" content="width=device-width, initial-scale=1.0">',
            why: 'Without this tag, mobile phones pretend to be 980px wide desktop monitors and shrink the whole page down into microscopic text.'
          }
        ],
        bestPractices: [
          'Keep fixed/sticky header elements under 15% of mobile screen height.',
          'Always test on real mobile hardware or touch emulation in DevTools.'
        ],
        relatedLessonIds: ['day-8-advanced-css']
      }
    ]
  },
  {
    day: 8,
    title: 'Advanced CSS: Specificity, Animations & Modern Features',
    tagline: 'Cascade control, custom properties, pseudo-classes, and GPU performance',
    description: 'Master specificity vectors (A,B,C), :nth-child formulas, CSS variables scoping, transitions, keyframes, and prefers-reduced-motion.',
    capstoneTitle: 'Build an Animated Interactive Showcase',
    lessons: [
      {
        id: 'day-8-advanced-css',
        day: 8,
        title: 'Cascade Specificity & Hardware-Accelerated Motion',
        durationMinutes: 35,
        difficulty: 'advanced',
        summary: 'Calculate specificity vectors, leverage dynamic CSS variables, build silky 60fps animations, and support vestibular motion preferences.',
        learningObjectives: [
          'Calculate exact specificity vectors (IDs, classes/attributes/pseudos, elements)',
          'Scope CSS custom properties (variables) dynamically across components',
          'Animate transform and opacity for GPU compositor thread performance',
          'Respect operating system motion sensitivity with prefers-reduced-motion'
        ],
        prerequisites: ['day-7-responsive-design'],
        theory: [
          'Specificity vector (a, b, c) counts IDs (a), Classes/Attributes/Pseudo-classes (b), and Elements/Pseudo-elements (c). An ID beats 1,000 classes.',
          'CSS variables are DOM-aware and cascade down the element tree, making them vastly more powerful than static preprocessor variables.',
          'Animating transform and opacity runs entirely on the GPU compositor thread without triggering layout reflow or repainting.'
        ],
        terminology: [
          { term: 'Specificity Vector', definition: 'The (ID, Class, Element) numerical tuple determining which conflicting CSS rule wins' },
          { term: 'Compositor Thread', definition: 'The browser execution thread that handles GPU rendering for transforms and opacity' },
          { term: 'prefers-reduced-motion', definition: 'A media feature detecting if the user requested minimal motion in their OS accessibility settings' }
        ],
        codeExamples: [
          {
            title: 'High-Performance Card Hover with Reduced Motion Guard',
            language: 'css',
            code: '.card {\n  transition: transform 180ms cubic-bezier(0.16, 1, 0.3, 1), box-shadow 180ms ease;\n}\n\n.card:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.3);\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .card {\n    transition: none;\n    transform: none !important;\n  }\n}',
            explanation: 'Smooth 180ms compositor transition with an accessible fallback for users with motion sensitivity.'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Animating width, height, or top on hover',
            fix: 'Animate transform: translateY(...) or scale(...) instead',
            why: 'Changing dimensions triggers full layout reflow on every frame, causing stuttering and battery drain on mobile devices.'
          }
        ],
        bestPractices: [
          'Avoid using !important to win specificity wars; refactor selectors or use @layer instead.',
          'Always pair :hover states with equivalent :focus-visible states for keyboard accessibility.'
        ],
        relatedLessonIds: ['day-9-professional-practices']
      }
    ]
  },
  {
    day: 9,
    title: 'Professional Engineering, Audits & Web Performance',
    tagline: 'Code architecture, DevTools mastery, and production optimization',
    description: 'Learn maintainable CSS naming, Chrome DevTools computed styles, CSS cascade layers (@layer), Core Web Vitals, and HTML validation.',
    capstoneTitle: 'Conduct a Full Web Accessibility & Performance Audit',
    lessons: [
      {
        id: 'day-9-professional-practices',
        day: 9,
        title: 'Production Workflows, DevTools & Web Vitals',
        durationMinutes: 30,
        difficulty: 'advanced',
        summary: 'Master real-world front-end engineering: computed styles debugging, cascade layers (@layer), Core Web Vitals (LCP, CLS, INP), and code organization.',
        learningObjectives: [
          'Inspect computed styles in browser DevTools to isolate layout conflicts',
          'Organize styles with CSS Cascade Layers (@layer) to neutralize third-party specificity',
          'Optimize images using modern formats (<picture>, WebP, AVIF) with fallbacks',
          'Diagnose and eliminate Cumulative Layout Shift and high interaction latency'
        ],
        prerequisites: ['day-8-advanced-css'],
        theory: [
          'In production engineering, predictability and maintainability outweigh clever hacks.',
          'The Computed panel in DevTools shows the browser\'s final resolved values after all cascade rules and unit conversions.',
          'CSS Cascade Layers (@layer) provide a native standard to prioritize custom styles over external libraries regardless of internal selector specificity.'
        ],
        terminology: [
          { term: 'Cascade Layers (@layer)', definition: 'A modern CSS feature that organizes stylesheets into explicit priority order tiers' },
          { term: 'LCP (Largest Contentful Paint)', definition: 'A Core Web Vital measuring when the primary page content finishes rendering' },
          { term: 'INP (Interaction to Next Paint)', definition: 'A Core Web Vital measuring user interaction responsiveness' }
        ],
        codeExamples: [
          {
            title: 'Cascade Layers Architecture',
            language: 'css',
            code: '@layer reset, framework, components, utilities;\n\n@layer components {\n  .btn {\n    padding: 0.5rem 1rem;\n    background: #35F2C0;\n    color: #080C12;\n    border-radius: 6px;\n  }\n}',
            explanation: 'Components layer always wins over framework layer, even if framework selectors have higher specificity.'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Using unoptimized multi-megabyte PNG images for small icons',
            fix: 'Use lightweight inline SVG or modern WebP/AVIF formats',
            why: 'Heavy uncompressed assets destroy Largest Contentful Paint (LCP) and waste user mobile data.'
          }
        ],
        bestPractices: [
          'Run automated Lighthouse audits and W3C validators before deploying to production.',
          'Commit code in logical, atomic Git commits with descriptive messages.'
        ],
        relatedLessonIds: ['day-10-capstone-mastery']
      }
    ]
  },
  {
    day: 10,
    title: 'Capstone Project & Full Mastery Assessment',
    tagline: 'Synthesis, project execution, and examination readiness',
    description: 'Bring together all 10 days of knowledge: semantic HTML, responsive layout, accessible forms, animations, and sit for the 50-Question Examination.',
    capstoneTitle: 'Deploy Your Production Capstone Website',
    lessons: [
      {
        id: 'day-10-capstone-mastery',
        day: 10,
        title: 'Capstone Synthesis & Exam Readiness',
        durationMinutes: 45,
        difficulty: 'advanced',
        summary: 'Synthesize your ten-day journey, review key architectural decisions, verify the WCAG checklist, and prepare for the 50-question Comprehensive Exam.',
        learningObjectives: [
          'Apply the end-to-end HTML & CSS mastery rubric to personal projects',
          'Conduct self-assessments covering responsiveness, semantics, and keyboard accessibility',
          'Identify individual topic weaknesses and undertake targeted revision drills',
          'Attempt the 50-Question Full Course Examination'
        ],
        prerequisites: ['day-9-professional-practices'],
        theory: [
          'Mastery is demonstrated not merely by memorizing tags, but by synthesizing structure, style, ergonomics, and accessibility into cohesive web experiences.',
          'Review the 11 course topics and practice repeatedly until every concept is intuitive.'
        ],
        terminology: [
          { term: 'Capstone Rubric', definition: 'A standardized set of criteria used to verify production quality across structure, style, and a11y' },
          { term: 'Mastery Examination', definition: 'The 50-question comprehensive assessment sampling all 10 days of curriculum' }
        ],
        codeExamples: [
          {
            title: 'Complete Component Blueprint',
            language: 'mixed',
            code: '<!-- Accessible, Responsive Card Component -->\n<article class="feature-card">\n  <header class="card-header">\n    <span class="category">Curriculum</span>\n    <h3 class="title">HTML & CSS Mastery</h3>\n  </header>\n  <p class="summary">Build real-world websites with modern standards and deep understanding.</p>\n  <a href="/practice" class="cta-link">Start Practice &rarr;</a>\n</article>',
            explanation: 'Semantic tags, clean typography, visible hierarchy, and intuitive interaction.'
          }
        ],
        commonMistakes: [
          {
            mistake: 'Declaring victory without testing on keyboard and mobile screens',
            fix: 'Always complete the accessibility and responsive testing checklist before shipping',
            why: 'A desktop-only website is unusable for more than half of the world\'s internet population.'
          }
        ],
        bestPractices: [
          'Take the 50-Question Examination to identify any remaining weak topics.',
          'Use the Weak-Topic Revision tool in the Practice Center to strengthen difficult areas.'
        ],
        relatedLessonIds: ['day-1-html-foundations', 'day-6-flexbox-grid']
      }
    ]
  }
];

export function getCurriculumDay(dayNum: number): CurriculumDay | undefined {
  return curriculumDays.find((d) => d.day === dayNum);
}

export function getLessonById(lessonId: string) {
  for (const day of curriculumDays) {
    const lesson = day.lessons.find((l) => l.id === lessonId);
    if (lesson) return lesson;
  }
  return undefined;
}
