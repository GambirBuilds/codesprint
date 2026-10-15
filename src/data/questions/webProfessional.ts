import { MCQQuestion } from '../../types';

export const webProfessionalQuestions: MCQQuestion[] = [
  {
    id: 'web-001',
    day: 9,
    topic: 'CSS Specificity Wars & !important',
    topicCategory: 'Professional practices, debugging, and mixed scenarios',
    difficulty: 'advanced',
    type: 'best-solution',
    question: 'Why is scattering `!important` declarations considered a serious anti-pattern in professional web codebases?',
    code: '/* ❌ Problematic codebase snippet */\n.text-muted { color: #64748B !important; }\n.header-text { color: #F5F7FA !important; }',
    options: [
      { id: 'A', text: 'It breaks the natural cascade hierarchy, forcing developers into an unmaintainable "specificity arms race" where only further `!important` rules can override previous ones' },
      { id: 'B', text: 'Browsers charge higher memory fees for `!important` AST tokens' },
      { id: 'C', text: 'It disables CSS grid and flexbox properties on that element' },
      { id: 'D', text: 'W3C validators immediately blacklist domains with more than three `!important` occurrences' }
    ],
    correctAnswer: 'A',
    explanation: '`!important` overrides the natural specificity cascade rules. Once introduced, overriding that style later requires an even higher specificity selector also carrying `!important`, quickly turning maintenance into a nightmare. Instead, manage specificity using BEM, CSS modules, or native `@layer`.',
    hint: 'Cascade breakage and specificity arms races.',
    lessonId: 'day-9-professional-practices',
    tags: ['best-practices', 'specificity', 'important', 'maintainability']
  },
  {
    id: 'web-002',
    day: 9,
    topic: 'CSS Cascade Layers (@layer)',
    topicCategory: 'Professional practices, debugging, and mixed scenarios',
    difficulty: 'advanced',
    type: 'concept',
    question: 'How do modern CSS Cascade Layers (`@layer`) solve specificity conflicts between third-party framework styles and author custom styles?',
    code: '@layer reset, framework, components, utilities;\n\n@layer framework {\n  .btn#submit-btn { background: blue; /* High specificity! */ }\n}\n\n@layer components {\n  .btn { background: teal; /* Low specificity */ }\n}',
    options: [
      { id: 'A', text: 'Styles in a higher layer (components) always win over styles in a lower layer (framework), regardless of selector specificity within those layers' },
      { id: 'B', text: 'They compile CSS files into separate WebAssembly binaries' },
      { id: 'C', text: 'They only apply when the user is offline' },
      { id: 'D', text: 'They force all selectors to have an ID specificity of 100' }
    ],
    correctAnswer: 'A',
    explanation: 'CSS Cascade Layers introduce an explicit layer priority order. A rule declared in a later layer (`components`) will always triumph over a rule in an earlier layer (`framework`), even if the framework rule has a much higher selector specificity (like an ID).',
    hint: 'Layer declaration order overrides raw selector specificity.',
    lessonId: 'day-9-professional-practices',
    tags: ['cascade-layers', 'modern-css', 'specificity', 'architecture']
  },
  {
    id: 'web-003',
    day: 9,
    topic: 'DevTools Inspection & Computed Styles',
    topicCategory: 'Professional practices, debugging, and mixed scenarios',
    difficulty: 'intermediate',
    type: 'real-world',
    question: 'When debugging an element in Chrome/Firefox Developer Tools, why should you check the "Computed" styles panel rather than only the "Styles" panel?',
    code: null,
    options: [
      { id: 'A', text: 'The "Computed" panel displays the final, resolved pixel values after all specificity matches, inheritance, relative unit calculations, and user-agent defaults are reconciled' },
      { id: 'B', text: 'The Computed panel runs unit tests in the background' },
      { id: 'C', text: 'The Styles panel is only available on paid enterprise dev tools' },
      { id: 'D', text: 'The Computed panel is the only place where HTML tags can be edited' }
    ],
    correctAnswer: 'A',
    explanation: 'The Styles panel shows all matching rules (many of which are crossed out or overridden). The Computed panel shows the single, definitive calculated value that the browser rendering engine actually applied to the DOM node (e.g. converting `2rem` to `32px`).',
    hint: 'Final resolved values after all cascading calculations are completed.',
    lessonId: 'day-9-professional-practices',
    tags: ['devtools', 'debugging', 'computed-styles']
  },
  {
    id: 'web-004',
    day: 9,
    topic: 'Modern Image Formats: AVIF and WebP',
    topicCategory: 'Professional practices, debugging, and mixed scenarios',
    difficulty: 'intermediate',
    type: 'best-solution',
    question: 'What is the most performant, progressive enhancement pattern for serving modern image formats (AVIF/WebP) with a JPEG fallback?',
    code: '<picture>\n  <source srcset="photo.avif" type="image/avif">\n  <source srcset="photo.webp" type="image/webp">\n  <img src="photo.jpg" alt="Team meeting" width="800" height="600">\n</picture>',
    options: [
      { id: 'A', text: 'The `<picture>` element with `<source>` elements specifying modern MIME types, falling back to a standard `<img>` tag' },
      { id: 'B', text: 'Renaming the .jpg file extension to .avif in the file system' },
      { id: 'C', text: 'Using JavaScript to fetch the binary buffer and convert on a canvas' },
      { id: 'D', text: 'Embedding the images as raw base64 strings inside inline HTML attributes' }
    ],
    correctAnswer: 'A',
    explanation: 'The `<picture>` element allows browsers to select the first `<source>` format they support (such as ultra-compressed AVIF or WebP), with the nested `<img>` ensuring full backward compatibility with older browsers while defining layout dimensions and alt text.',
    hint: 'The picture element with multiple source tags.',
    lessonId: 'day-9-professional-practices',
    tags: ['performance', 'picture', 'avif', 'webp', 'images']
  },
  {
    id: 'web-005',
    day: 10,
    topic: 'Core Web Vitals & Web Performance',
    topicCategory: 'Professional practices, debugging, and mixed scenarios',
    difficulty: 'advanced',
    type: 'concept',
    question: 'Which of the following front-end optimization techniques directly protects against Cumulative Layout Shift (CLS)?',
    code: null,
    options: [
      { id: 'A', text: 'Always specifying explicit width/height or `aspect-ratio` on images, embeds, and iframes, and reserving placeholder space for dynamic ads/banners' },
      { id: 'B', text: 'Minifying JavaScript bundles using tree shaking' },
      { id: 'C', text: 'Enabling Gzip compression on CSS files' },
      { id: 'D', text: 'Using async instead of defer on script tags' }
    ],
    correctAnswer: 'A',
    explanation: 'Cumulative Layout Shift (CLS) occurs when elements move around unexpectedly as resources load. Giving images, iframes, and video elements explicit aspect ratios or intrinsic dimensions reserves layout space in advance, guaranteeing zero unexpected content jumping.',
    hint: 'Reserving space for media and dynamic content in advance.',
    lessonId: 'day-10-capstone-mastery',
    tags: ['performance', 'core-web-vitals', 'cls', 'best-practices']
  }
];
