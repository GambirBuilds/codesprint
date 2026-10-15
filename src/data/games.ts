export interface GameDefinition {
  id: string;
  title: string;
  tagline: string;
  description: string;
  levels: {
    level: number;
    challengeTitle: string;
    instructions: string;
    codeSnippet?: string;
    question: string;
    options: { id: string; text: string; correct: boolean; feedback: string }[];
    hint: string;
  }[];
}

export const educationalGames: GameDefinition[] = [
  {
    id: 'game-tag-master',
    title: 'Game 1: Tag Master',
    tagline: 'Master semantic tag roles and correct nesting order',
    description: 'Test your reflexes and technical precision by identifying valid document structures and void elements.',
    levels: [
      {
        level: 1,
        challengeTitle: 'Landmark Selection',
        instructions: 'Choose the appropriate tag to encapsulate the main content of an article.',
        codeSnippet: '<header>...</header>\n<______>\n  <h2>Breaking Web Standards</h2>\n  <p>The new CSS specification is out!</p>\n</______>',
        question: 'Which element correctly marks up this self-contained blog story?',
        options: [
          { id: '1', text: '<article>', correct: true, feedback: 'Correct! <article> represents self-contained syndicatable content.' },
          { id: '2', text: '<section>', correct: false, feedback: 'Incorrect. While acceptable, <article> is more specific for a standalone post.' },
          { id: '3', text: '<aside>', correct: false, feedback: 'Incorrect. <aside> is for tangentially related content like sidebars.' },
          { id: '4', text: '<main>', correct: false, feedback: 'Incorrect. <main> is the page-level landmark, not an individual post wrapper.' }
        ],
        hint: 'Think about content that could be distributed in an RSS reader independently.'
      },
      {
        level: 2,
        challengeTitle: 'Void Element Spotting',
        instructions: 'Identify which of these elements is a void element that must never have a closing tag in HTML5.',
        question: 'Which of the following is an HTML void element?',
        options: [
          { id: '1', text: '<hr>', correct: true, feedback: 'Correct! <hr> (horizontal rule) is void and cannot have children or a closing tag.' },
          { id: '2', text: '<p>', correct: false, feedback: 'Incorrect. <p> requires a closing tag.' },
          { id: '3', text: '<button>', correct: false, feedback: 'Incorrect. <button> contains label text or icons.' },
          { id: '4', text: '<time>', correct: false, feedback: 'Incorrect. <time> wraps date/time text.' }
        ],
        hint: 'Think of elements that create thematic breaks or load resources without inner text.'
      }
    ]
  },
  {
    id: 'game-selector-showdown',
    title: 'Game 2: Selector Showdown',
    tagline: 'Pinpoint elements with targeted CSS selector mastery',
    description: 'Craft and match CSS selectors to target specific DOM nodes without unwanted side effects.',
    levels: [
      {
        level: 1,
        challengeTitle: 'Targeting Direct Children',
        instructions: 'Select only the top-level list items, excluding nested submenu items.',
        codeSnippet: '<ul class="menu">\n  <li>Home</li>\n  <li>Services\n    <ul><li>Web Design</li></ul>\n  </li>\n</ul>',
        question: 'Which selector targets ONLY "Home" and "Services", but NOT "Web Design"?',
        options: [
          { id: '1', text: '.menu > li', correct: true, feedback: 'Spot on! The child combinator (>) strictly matches immediate children.' },
          { id: '2', text: '.menu li', correct: false, feedback: 'Incorrect. The descendant selector matches all <li> elements at any depth.' },
          { id: '3', text: '.menu + li', correct: false, feedback: 'Incorrect. + matches an adjacent sibling, not children.' },
          { id: '4', text: '.menu ~ li', correct: false, feedback: 'Incorrect. ~ matches general siblings.' }
        ],
        hint: 'Use the child combinator token: >'
      },
      {
        level: 2,
        challengeTitle: 'Attribute Selector Precision',
        instructions: 'Target external secure links to apply an external link icon.',
        question: 'Which selector targets links whose href begins with "https://"?',
        options: [
          { id: '1', text: 'a[href^="https://"]', correct: true, feedback: 'Correct! The ^= operator matches values starting with the specified string.' },
          { id: '2', text: 'a[href$="https://"]', correct: false, feedback: 'Incorrect. $= matches the end of the string.' },
          { id: '3', text: 'a[href*="https://"]', correct: false, feedback: 'Incorrect. *= matches anywhere within the string.' },
          { id: '4', text: 'a[href="https://"]', correct: false, feedback: 'Incorrect. Exact match fails on full URLs with domains.' }
        ],
        hint: 'The caret (^) symbol denotes starting-with.'
      }
    ]
  },
  {
    id: 'game-bug-hunter',
    title: 'Game 3: Bug Hunter',
    tagline: 'Track down syntax errors, broken tags, and layout killers',
    description: 'Inspect broken HTML and CSS snippets, diagnose the failure, and pick the production repair.',
    levels: [
      {
        level: 1,
        challengeTitle: 'The Accidental Form Submission',
        instructions: 'A cancel button in a form triggers a submit and page reload when clicked.',
        codeSnippet: '<form action="/save" method="POST">\n  <input type="text" name="notes">\n  <button>Cancel</button>\n  <button type="submit">Save</button>\n</form>',
        question: 'How do you fix the Cancel button so it stops submitting the form?',
        options: [
          { id: '1', text: 'Add type="button" to the Cancel button', correct: true, feedback: 'Correct! Default button type inside forms is "submit".' },
          { id: '2', text: 'Change the form method to GET', correct: false, feedback: 'Incorrect. This changes how data is sent, not the button behavior.' },
          { id: '3', text: 'Remove the button text', correct: false, feedback: 'Incorrect. This harms accessibility without fixing the issue.' },
          { id: '4', text: 'Add target="_blank"', correct: false, feedback: 'Incorrect. That would open the submit in a new tab!' }
        ],
        hint: 'HTML buttons inside forms default to submit unless overridden with type="button".'
      },
      {
        level: 2,
        challengeTitle: 'Collapsing Margins Conundrum',
        instructions: 'Top margin on a child heading pushes down the entire parent container instead of spacing inside.',
        codeSnippet: '<div class="banner">\n  <h1 style="margin-top: 40px;">Welcome</h1>\n</div>',
        question: 'What CSS property applied to `.banner` prevents child margin collapse?',
        options: [
          { id: '1', text: 'padding-top: 1px; or display: flow-root;', correct: true, feedback: 'Brilliant! A border, padding, or flow-root creates a new BFC and stops margin collapse.' },
          { id: '2', text: 'color: white;', correct: false, feedback: 'Incorrect. Color does not impact the box model.' },
          { id: '3', text: 'text-align: center;', correct: false, feedback: 'Incorrect.' },
          { id: '4', text: 'font-weight: bold;', correct: false, feedback: 'Incorrect.' }
        ],
        hint: 'A Block Formatting Context (flow-root) or padding stops margin collapsing through parent bounds.'
      }
    ]
  },
  {
    id: 'game-layout-architect',
    title: 'Game 4: Layout Architect',
    tagline: 'Solve Flexbox and CSS Grid spatial puzzles',
    description: 'Align items, build fluid layouts, and position items precisely into target zones.',
    levels: [
      {
        level: 1,
        challengeTitle: 'Navigation Space Distribution',
        instructions: 'Push the brand logo to the left and navigation links to the far right inside a flex header.',
        codeSnippet: '<header class="nav-bar">\n  <div class="brand">Logo</div>\n  <nav class="links">Links</nav>\n</header>',
        question: 'Which declaration distributes the two items to opposite edges?',
        options: [
          { id: '1', text: 'justify-content: space-between;', correct: true, feedback: 'Correct! space-between places first item at start, last item at end.' },
          { id: '2', text: 'justify-content: center;', correct: false, feedback: 'Incorrect. That clusters them together in the middle.' },
          { id: '3', text: 'align-items: stretch;', correct: false, feedback: 'Incorrect. align-items governs the cross axis.' },
          { id: '4', text: 'flex-direction: column;', correct: false, feedback: 'Incorrect. That stacks them vertically.' }
        ],
        hint: 'Think of maximum space between items.'
      },
      {
        level: 2,
        challengeTitle: 'Two-Column Sidebar Grid',
        instructions: 'Create a fixed 280px sidebar and a fluid content area taking all remaining space.',
        question: 'Which grid-template-columns declaration achieves this?',
        options: [
          { id: '1', text: 'grid-template-columns: 280px 1fr;', correct: true, feedback: 'Perfect! The fixed column takes 280px and 1fr claims 100% of the rest.' },
          { id: '2', text: 'grid-template-columns: 280px 100%;', correct: false, feedback: 'Incorrect. 100% causes overflow.' },
          { id: '3', text: 'grid-template-columns: repeat(2, 280px);', correct: false, feedback: 'Incorrect. That makes both columns 280px.' },
          { id: '4', text: 'grid-template-columns: auto auto;', correct: false, feedback: 'Incorrect.' }
        ],
        hint: 'Pair a fixed pixel width with 1fr.'
      }
    ]
  },
  {
    id: 'game-code-detective',
    title: 'Game 5: Code Detective',
    tagline: 'Inspect code snippets and predict their rendered behavior',
    description: 'Calculate computed pixel dimensions, cascade specificity winners, and layout output.',
    levels: [
      {
        level: 1,
        challengeTitle: 'Box Model Width Mystery',
        instructions: 'Calculate the total horizontal layout width of the following element.',
        codeSnippet: '.box {\n  box-sizing: border-box;\n  width: 400px;\n  padding: 30px;\n  border: 10px solid #35F2C0;\n}',
        question: 'What is the final computed width on screen?',
        options: [
          { id: '1', text: '400px', correct: true, feedback: 'Correct! border-box absorbs the padding and border inside the declared 400px.' },
          { id: '2', text: '480px', correct: false, feedback: 'Incorrect. That would be true for content-box (400 + 60 + 20).' },
          { id: '3', text: '320px', correct: false, feedback: 'Incorrect. 320px is the content box, but total rendered box width is 400px.' },
          { id: '4', text: '440px', correct: false, feedback: 'Incorrect.' }
        ],
        hint: 'Remember border-box rules!'
      },
      {
        level: 2,
        challengeTitle: 'Cascade Winner',
        instructions: 'Predict which color rule wins on this link.',
        codeSnippet: 'nav a { color: blue; } /* (0,0,2) */\n.nav-link { color: teal; } /* (0,1,0) */\n#main a { color: purple; } /* (1,0,1) */',
        question: 'What color will the link be rendered?',
        options: [
          { id: '1', text: 'Purple (Highest specificity: 1 ID, 0 classes, 1 element)', correct: true, feedback: 'Correct! (1,0,1) beats (0,1,0) and (0,0,2).' },
          { id: '2', text: 'Teal', correct: false, feedback: 'Incorrect. Class selector has lower specificity than an ID selector.' },
          { id: '3', text: 'Blue', correct: false, feedback: 'Incorrect. Elements have lowest specificity.' },
          { id: '4', text: 'Black', correct: false, feedback: 'Incorrect.' }
        ],
        hint: 'IDs beat classes, classes beat element tags.'
      }
    ]
  },
  {
    id: 'game-responsive-rescue',
    title: 'Game 6: Responsive Rescue',
    tagline: 'Rescue broken mobile layouts from overflow disaster',
    description: 'Diagnose horizontal scrolling, text clipping, and cramped mobile controls.',
    levels: [
      {
        level: 1,
        challengeTitle: 'Image Horizontal Scroll Disaster',
        instructions: 'An image with fixed 1200px width causes horizontal scrolling on smartphones.',
        codeSnippet: 'img {\n  width: 1200px;\n}',
        question: 'What modern CSS declaration makes the image fluid without blowing past its parent container?',
        options: [
          { id: '1', text: 'max-width: 100%; height: auto;', correct: true, feedback: 'Spot on! max-width: 100% caps the width at container bounds while height: auto preserves aspect ratio.' },
          { id: '2', text: 'width: 100vw;', correct: false, feedback: 'Incorrect. 100vw can still cause overflow with scrollbars.' },
          { id: '3', text: 'overflow: hidden;', correct: false, feedback: 'Incorrect. That clips the image instead of resizing it.' },
          { id: '4', text: 'transform: scale(0.5);', correct: false, feedback: 'Incorrect.' }
        ],
        hint: 'The classic responsive image formula: max-width 100% and height auto.'
      },
      {
        level: 2,
        challengeTitle: 'Small Touch Target Violation',
        instructions: 'A mobile close button is only 14px by 14px, making it nearly impossible to tap with a finger.',
        question: 'What is the recommended accessible touch target dimension for mobile devices?',
        options: [
          { id: '1', text: 'At least 44px by 44px (or 48px by 48px) with appropriate padding', correct: true, feedback: 'Correct! Touch targets should be at least 44x44px for comfortable finger tapping.' },
          { id: '2', text: '16px by 16px', correct: false, feedback: 'Incorrect. Much too small for adult finger pads.' },
          { id: '3', text: '100px by 100px', correct: false, feedback: 'Incorrect. Unnecessarily large for standard buttons.' },
          { id: '4', text: 'Touch target size does not matter', correct: false, feedback: 'Incorrect.' }
        ],
        hint: 'Apple HIG and Material Design recommend 44px to 48px.'
      }
    ]
  }
];
