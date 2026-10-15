import { MCQQuestion } from '../../types';

export const cssStylingUnitsQuestions: MCQQuestion[] = [
  {
    id: 'css-013',
    day: 4,
    topic: 'CSS Units: rem vs em',
    topicCategory: 'Colors, typography, units, and backgrounds',
    difficulty: 'intermediate',
    type: 'comparison',
    question: 'What is the key difference between the `rem` and `em` units in CSS?',
    code: null,
    options: [
      { id: 'A', text: '`rem` is relative to the root (`<html>`) element font-size, while `em` is relative to its immediate parent (or element\'s own font-size)' },
      { id: 'B', text: '`rem` stands for responsive pixels; `em` stands for exact millimeters' },
      { id: 'C', text: '`em` is fixed at 16px forever; `rem` changes with viewport width' },
      { id: 'D', text: '`rem` is only usable for padding; `em` is only usable for font-size' }
    ],
    correctAnswer: 'A',
    explanation: '`rem` (root em) always scales relative to the root element (`<html>`, typically 16px by default), preventing compound scaling issues. `em` scales relative to the element’s parent font size (or its own font size when used for margins/padding).',
    hint: 'rem stands for Root em.',
    lessonId: 'day-4-css-units-typography',
    tags: ['units', 'rem', 'em', 'typography']
  },
  {
    id: 'css-014',
    day: 4,
    topic: 'Viewport Units',
    topicCategory: 'Colors, typography, units, and backgrounds',
    difficulty: 'intermediate',
    type: 'concept',
    question: 'What does a declaration of `height: 100vh;` represent?',
    code: '.hero-section {\n  height: 100vh;\n}',
    options: [
      { id: 'A', text: '100% of the viewport height (the visible browser window height)' },
      { id: 'B', text: '100 virtual horizontal pixels' },
      { id: 'C', text: '100% of the parent container\'s height' },
      { id: 'D', text: 'The height of the entire document scrollable body' }
    ],
    correctAnswer: 'A',
    explanation: '`1vh` equals 1% of the viewport height. `100vh` fills 100% of the visible viewport height, regardless of parent container dimensions.',
    hint: 'vh stands for Viewport Height.',
    lessonId: 'day-4-css-units-typography',
    tags: ['units', 'vh', 'viewport']
  },
  {
    id: 'css-015',
    day: 4,
    topic: 'Modern Dynamic Viewport Units',
    topicCategory: 'Colors, typography, units, and backgrounds',
    difficulty: 'advanced',
    type: 'responsive',
    question: 'Why were `dvh` (dynamic viewport height) and `svh` (small viewport height) introduced to replace `vh` on mobile browsers?',
    code: '.mobile-modal {\n  height: 100dvh;\n}',
    options: [
      { id: 'A', text: 'To account for expanding and retracting mobile browser address bars and toolbars that previously caused content cutoff' },
      { id: 'B', text: 'To reduce SVG file sizes on retina screens' },
      { id: 'C', text: 'Because iOS devices blocked all `vh` calculations in Safari' },
      { id: 'D', text: 'To enable 3D parallax scrolling calculations' }
    ],
    correctAnswer: 'A',
    explanation: 'On mobile browsers, `100vh` uses the largest possible viewport, ignoring whether the URL bar is expanded, causing bottom navigation to be clipped. `dvh` dynamically adjusts as toolbars show or hide, and `svh` calculates against the smallest viewport when toolbars are visible.',
    hint: 'Consider what happens to the mobile URL bar when you scroll down and up.',
    lessonId: 'day-4-css-units-typography',
    tags: ['viewport', 'dvh', 'mobile', 'responsive']
  },
  {
    id: 'css-016',
    day: 4,
    topic: 'Hex Colors and Alpha Transparency',
    topicCategory: 'Colors, typography, units, and backgrounds',
    difficulty: 'beginner',
    type: 'syntax',
    question: 'In modern CSS, what do the last two digits represent in an 8-digit hexadecimal color code like `#35F2C080`?',
    code: null,
    options: [
      { id: 'A', text: 'The alpha transparency channel (opacity), where 80 in hex corresponds to ~50% opacity' },
      { id: 'B', text: 'The blur radius for subpixel antialiasing' },
      { id: 'C', text: 'The hue angle in HSL color coordinates' },
      { id: 'D', text: 'The color depth bits per pixel' }
    ],
    correctAnswer: 'A',
    explanation: 'An 8-digit hex code `#RRGGBBAA` adds an alpha channel: `00` is completely transparent (0%), `FF` is completely opaque (100%), and `80` (128 in decimal) represents approximately 50% opacity.',
    hint: 'RR GG BB AA: Alpha is the last pair.',
    lessonId: 'day-4-css-units-typography',
    tags: ['colors', 'hex', 'alpha', 'transparency']
  },
  {
    id: 'css-017',
    day: 4,
    topic: 'Modern Color Spaces',
    topicCategory: 'Colors, typography, units, and backgrounds',
    difficulty: 'advanced',
    type: 'concept',
    question: 'Why is `oklch()` becoming the preferred color format in modern design systems over `hsl()`?',
    code: 'color: oklch(0.7 0.15 160);',
    options: [
      { id: 'A', text: 'It is perceptually uniform: colors with the same lightness value appear equally bright to human eyes across all hues' },
      { id: 'B', text: 'It uses 50% fewer bytes over network compression than RGB' },
      { id: 'C', text: 'It automatically generates dark mode themes without CSS variables' },
      { id: 'D', text: 'It works on legacy Netscape 4 browsers' }
    ],
    correctAnswer: 'A',
    explanation: '`oklch` (Lightness, Chroma, Hue in Oklab space) is perceptually uniform. In `hsl()`, pure yellow at 50% lightness looks vastly brighter than pure blue at 50% lightness. In `oklch`, equal lightness translates to identical perceived brightness, making accessible color generation mathematically predictable.',
    hint: 'Perceptual uniformity across human vision.',
    lessonId: 'day-4-css-units-typography',
    tags: ['colors', 'oklch', 'design-systems']
  },
  {
    id: 'css-018',
    day: 4,
    topic: 'Line Height & Typography Scale',
    topicCategory: 'Colors, typography, units, and backgrounds',
    difficulty: 'intermediate',
    type: 'best-solution',
    question: 'Why is unitless `line-height: 1.6;` strongly recommended over fixed pixel line-heights like `line-height: 24px;`?',
    code: 'body {\n  font-size: 16px;\n  line-height: 1.6;\n}',
    options: [
      { id: 'A', text: 'Unitless line-height scales proportionally when child elements define their own larger font sizes, avoiding text collision' },
      { id: 'B', text: 'Unitless numbers are converted into percentage by the GPU' },
      { id: 'C', text: 'Fixed pixel line-height is deprecated in CSS3' },
      { id: 'D', text: 'Browsers reject pixel line-height on headings' }
    ],
    correctAnswer: 'A',
    explanation: 'When `line-height` is unitless (e.g., `1.6`), child elements inherit the raw ratio factor and multiply it by their own computed font-size. If a pixel value (`24px`) is set on body, an `h1` at `40px` would inherit `24px`, resulting in overlapping text lines.',
    hint: 'Inheritance: a ratio factor multiplies child font sizes, whereas pixel values lock children into cramped fixed heights.',
    lessonId: 'day-4-css-units-typography',
    tags: ['typography', 'line-height', 'inheritance']
  },
  {
    id: 'css-019',
    day: 4,
    topic: 'Background Sizing: Cover vs Contain',
    topicCategory: 'Colors, typography, units, and backgrounds',
    difficulty: 'intermediate',
    type: 'comparison',
    question: 'How do `background-size: cover;` and `background-size: contain;` differ in image rendering?',
    code: '.hero {\n  background-image: url("banner.jpg");\n  background-size: cover;\n}',
    options: [
      { id: 'A', text: '`cover` scales the image to completely fill the container (cropping excess edges); `contain` scales the entire image to fit inside without cropping (potentially leaving empty space)' },
      { id: 'B', text: '`cover` repeats the image as a tile pattern; `contain` displays it once in the top-left' },
      { id: 'C', text: '`contain` stretches the image non-proportionally; `cover` preserves aspect ratio' },
      { id: 'D', text: '`cover` only works on PNG images; `contain` only works on WebP' }
    ],
    correctAnswer: 'A',
    explanation: '`cover` ensures the background image covers the entire surface area of the container, preserving aspect ratio by clipping any overflow. `contain` ensures the entire image is visible within the container without clipping, potentially showing letterbox background gaps.',
    hint: 'Cover fills every pixel with potential cropping; contain fits the whole image inside with potential letterboxing.',
    lessonId: 'day-4-css-units-typography',
    tags: ['background', 'cover', 'contain', 'images']
  },
  {
    id: 'css-020',
    day: 4,
    topic: 'Font Fallbacks & Generic Families',
    topicCategory: 'Colors, typography, units, and backgrounds',
    difficulty: 'beginner',
    type: 'syntax',
    question: 'Why should the `font-family` property always end with a generic font family such as `sans-serif` or `monospace`?',
    code: 'body {\n  font-family: "Plus Jakarta Sans", system-ui, sans-serif;\n}',
    options: [
      { id: 'A', text: 'It acts as an ultimate browser fallback if none of the preceding custom or system fonts are installed or loaded' },
      { id: 'B', text: 'It triggers the browser to preload Google Fonts from CDN' },
      { id: 'C', text: 'The CSS specification requires font-family strings to have at least three entries' },
      { id: 'D', text: 'It forces italics on screen readers' }
    ],
    correctAnswer: 'A',
    explanation: 'Font stacks are read left-to-right. If the first choice is unavailable (e.g. web font failed to load), the browser checks the next font. Ending with a generic family (`sans-serif`, `serif`, `monospace`) guarantees a suitable system fallback is rendered.',
    hint: 'Graceful fallback if web fonts fail to load.',
    lessonId: 'day-4-css-units-typography',
    tags: ['typography', 'font-family', 'fallbacks']
  }
];
