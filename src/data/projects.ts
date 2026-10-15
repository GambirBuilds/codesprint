import { ProjectBrief } from '../types';

export const guidedProjects: ProjectBrief[] = [
  {
    id: 'project-1-profile',
    title: 'Project 1: Personal Developer Profile',
    day: 1,
    difficulty: 'beginner',
    description: 'Construct a structured personal developer profile page using semantic HTML tags, headings, lists, external links, and clean typography.',
    objectives: [
      'Write a standard HTML5 boilerplate',
      'Use proper heading hierarchy (h1, h2, h3)',
      'Include a profile image with descriptive alt text',
      'Add social links opening securely in new tabs'
    ],
    checklist: [
      'Document includes <!DOCTYPE html> and lang="en"',
      'Exactly one <h1> element for your name/headline',
      'Skills list using an unordered <ul> list',
      'At least two external links with rel="noopener noreferrer"',
      'Mobile-responsive card styling with border-box'
    ],
    starterHtml: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Developer Profile</title>
</head>
<body>
  <!-- Add your profile structure here -->
  <main class="profile-card">
    <h1>Your Name Here</h1>
    <p>Aspiring Front-End Developer</p>
  </main>
</body>
</html>`,
    starterCss: `* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
body {
  font-family: sans-serif;
  background: #080C12;
  color: #F5F7FA;
  display: grid;
  place-items: center;
  min-height: 100vh;
  padding: 1rem;
}
.profile-card {
  background: #151F2C;
  border: 1px solid #223044;
  border-radius: 12px;
  padding: 2rem;
  max-width: 420px;
  width: 100%;
}`,
    solutionHtml: `<main class="profile-card">
  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150" alt="Alex Chen smiling in front of a computer monitor" class="avatar">
  <h1>Alex Chen</h1>
  <p class="tagline">Junior Front-End Software Engineer</p>
  
  <h2>Core Skills</h2>
  <ul class="skills">
    <li>Semantic HTML5</li>
    <li>Modern CSS3 & Flexbox</li>
    <li>Responsive Web Design</li>
  </ul>

  <h2>Connect</h2>
  <nav class="links">
    <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
    <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">LinkedIn</a>
  </nav>
</main>`,
    solutionCss: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  background-color: #080C12;
  color: #F5F7FA;
  display: grid;
  place-items: center;
  min-height: 100vh;
  padding: 1.5rem;
}
.profile-card {
  background: #151F2C;
  border: 1px solid #223044;
  border-radius: 12px;
  padding: 2rem;
  max-width: 400px;
  width: 100%;
  text-align: center;
}
.avatar {
  width: 96px;
  height: 96px;
  border-radius: 50%;
  border: 2px solid #35F2C0;
  margin-bottom: 1rem;
  object-fit: cover;
}
h1 { font-size: 1.5rem; margin-bottom: 0.25rem; }
.tagline { color: #A3ADBA; font-size: 0.9rem; margin-bottom: 1.5rem; }
h2 { font-size: 1rem; color: #78A9FF; margin-top: 1.25rem; margin-bottom: 0.5rem; text-align: left; }
.skills { list-style-position: inside; text-align: left; color: #CBD5E1; font-size: 0.9rem; }
.links { display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem; }
.links a {
  color: #35F2C0;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.9rem;
  padding: 0.5rem 1rem;
  border: 1px solid #223044;
  border-radius: 6px;
}
.links a:hover { background: #223044; }`,
    rubric: [
      { criterion: 'Valid semantic structure and single <h1>', weight: 25 },
      { criterion: 'Accessible image with proper alt text', weight: 25 },
      { criterion: 'Proper unordered list and secure external links', weight: 25 },
      { criterion: 'Clean responsive CSS styling and contrast', weight: 25 }
    ]
  },
  {
    id: 'project-2-article',
    title: 'Project 2: Technical Editorial Article',
    day: 2,
    difficulty: 'intermediate',
    description: 'Format a long-form technical article with figures, captions, blockquotes, callout sidebars, and high-readability responsive typography.',
    objectives: [
      'Use <article>, <header>, <section>, and <aside>',
      'Format figures with <figure> and <figcaption>',
      'Implement comfortable reading measure (65-75 characters per line)',
      'Style blockquotes and code listings'
    ],
    checklist: [
      'Document enclosed in <article>',
      'Figure contains valid image and figcaption',
      'Body line-height set proportionally (1.6 - 1.8)',
      'Aside provides supplementary glossary information'
    ],
    starterHtml: `<article class="article-container">
  <h1>Understanding CSS Cascade Layers</h1>
  <p>Learn how @layer revolutionizes stylesheet architecture.</p>
</article>`,
    starterCss: `body {
  background: #080C12;
  color: #F5F7FA;
  font-family: sans-serif;
  padding: 2rem;
}`,
    solutionHtml: `<article class="article-container">
  <header>
    <span class="meta">Architecture · 6 min read</span>
    <h1>Demystifying the CSS Cascade</h1>
    <p class="lead">How modern web standards bring order to styling conflicts.</p>
  </header>
  
  <section class="content">
    <p>The CSS Cascade is the algorithm browsers use to reconcile multiple conflicting declarations targeting the same DOM element.</p>
    
    <figure>
      <div class="code-box">
        <code>@layer reset, base, components;</code>
      </div>
      <figcaption>Figure 1: Declaring cascade layer precedence order</figcaption>
    </figure>

    <blockquote>
      "Specificity should be managed deliberately, not accumulated accidentally."
    </blockquote>
  </section>

  <aside class="callout">
    <h3>Key Takeaway</h3>
    <p>Higher layer styles always triumph over lower layers, eliminating !important hacks.</p>
  </aside>
</article>`,
    solutionCss: `* { box-sizing: border-box; }
body {
  background: #080C12;
  color: #F5F7FA;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  line-height: 1.7;
  padding: 2rem 1rem;
}
.article-container {
  max-width: 680px;
  margin: 0 auto;
}
.meta { color: #35F2C0; font-size: 0.85rem; font-weight: 600; }
h1 { font-size: 2.25rem; line-height: 1.25; margin: 0.5rem 0 1rem; }
.lead { font-size: 1.2rem; color: #A3ADBA; margin-bottom: 2rem; }
p { margin-bottom: 1.25rem; color: #CBD5E1; }
figure { margin: 2rem 0; }
.code-box {
  background: #101722;
  border: 1px solid #223044;
  padding: 1rem;
  border-radius: 8px;
  font-family: 'JetBrains Mono', monospace;
  color: #78A9FF;
}
figcaption { font-size: 0.85rem; color: #A3ADBA; margin-top: 0.5rem; text-align: center; }
blockquote {
  border-left: 3px solid #35F2C0;
  padding-left: 1.25rem;
  margin: 2rem 0;
  font-style: italic;
  color: #F5F7FA;
}
.callout {
  background: #151F2C;
  border: 1px solid #223044;
  border-radius: 8px;
  padding: 1.25rem;
  margin-top: 2rem;
}
.callout h3 { color: #35F2C0; font-size: 1rem; margin-bottom: 0.5rem; }`,
    rubric: [
      { criterion: 'Semantic article and header structure', weight: 25 },
      { criterion: 'Accessible figure and caption integration', weight: 25 },
      { criterion: 'Optimal typographic reading measure', weight: 25 },
      { criterion: 'Responsive mobile layout without horizontal overflow', weight: 25 }
    ]
  },
  {
    id: 'project-3-form',
    title: 'Project 3: Accessible Contact & Inquiry Form',
    day: 3,
    difficulty: 'intermediate',
    description: 'Design and code a fully accessible, mobile-optimized form with validation, radio button groups, error handling, and visible focus rings.',
    objectives: [
      'Associate all inputs with labels via for and id attributes',
      'Group options with <fieldset> and <legend>',
      'Apply native HTML5 validation constraints (required, email, minlength)',
      'Style high-visibility :focus-visible states for keyboard users'
    ],
    checklist: [
      'Every input has a paired <label>',
      'Radio button group shares identical name attribute',
      'Submit button has explicit type="submit"',
      'Focus indicator is clearly visible on keyboard tab'
    ],
    starterHtml: `<form class="contact-form">
  <h2>Get in Touch</h2>
  <!-- Build your accessible form fields here -->
</form>`,
    starterCss: `body {
  background: #080C12;
  color: #F5F7FA;
  font-family: sans-serif;
  display: grid;
  place-items: center;
  min-height: 100vh;
  padding: 1rem;
}`,
    solutionHtml: `<form class="contact-form" action="#" method="POST">
  <h2>Send an Inquiry</h2>
  
  <div class="field">
    <label for="full-name">Full Name *</label>
    <input type="text" id="full-name" name="name" required minlength="2" placeholder="Jane Doe">
  </div>

  <div class="field">
    <label for="work-email">Email Address *</label>
    <input type="email" id="work-email" name="email" required placeholder="jane@example.com">
  </div>

  <fieldset class="field-group">
    <legend>Inquiry Type</legend>
    <label class="radio-label">
      <input type="radio" name="inquiry_type" value="course" checked>
      Course Questions
    </label>
    <label class="radio-label">
      <input type="radio" name="inquiry_type" value="enterprise">
      Enterprise Training
    </label>
  </fieldset>

  <div class="field">
    <label for="message">Message *</label>
    <textarea id="message" name="message" rows="4" required minlength="10"></textarea>
  </div>

  <button type="submit" class="submit-btn">Send Message</button>
</form>`,
    solutionCss: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background-color: #080C12;
  color: #F5F7FA;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  display: grid;
  place-items: center;
  min-height: 100vh;
  padding: 1.5rem;
}
.contact-form {
  background: #151F2C;
  border: 1px solid #223044;
  border-radius: 12px;
  padding: 2rem;
  max-width: 480px;
  width: 100%;
}
h2 { font-size: 1.5rem; margin-bottom: 1.5rem; color: #35F2C0; }
.field { margin-bottom: 1.25rem; }
label { display: block; font-size: 0.85rem; font-weight: 600; margin-bottom: 0.5rem; color: #A3ADBA; }
input[type="text"], input[type="email"], textarea {
  width: 100%;
  padding: 0.75rem 1rem;
  background: #101722;
  border: 1px solid #223044;
  border-radius: 6px;
  color: #F5F7FA;
  font-size: 0.95rem;
  outline: none;
}
input:focus-visible, textarea:focus-visible {
  border-color: #35F2C0;
  box-shadow: 0 0 0 2px rgba(53, 242, 192, 0.2);
}
.field-group {
  border: 1px solid #223044;
  border-radius: 6px;
  padding: 1rem;
  margin-bottom: 1.25rem;
}
legend { padding: 0 0.5rem; font-size: 0.85rem; color: #78A9FF; font-weight: 600; }
.radio-label { display: flex; align-items: center; gap: 0.5rem; margin-top: 0.5rem; cursor: pointer; color: #CBD5E1; }
.submit-btn {
  width: 100%;
  padding: 0.85rem;
  background: #35F2C0;
  color: #080C12;
  border: none;
  border-radius: 6px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
}
.submit-btn:hover { background: #2dd4a8; }`,
    rubric: [
      { criterion: 'Correct programmatic label associations', weight: 25 },
      { criterion: 'Fieldset and legend grouping for radio choices', weight: 25 },
      { criterion: 'HTML5 client validation attributes', weight: 25 },
      { criterion: 'High-contrast accessible focus outlines', weight: 25 }
    ]
  },
  {
    id: 'project-4-landing',
    title: 'Project 4: Product Landing Page with Bento Grid',
    day: 6,
    difficulty: 'advanced',
    description: 'Develop a responsive product landing page featuring a top navigation bar, hero showcase, and a responsive CSS Grid feature section.',
    objectives: [
      'Build a sticky header with semantic navigation',
      'Implement an auto-responsive bento grid using repeat(auto-fit, minmax(...))',
      'Use fluid typography with clamp()',
      'Craft smooth hover transitions with GPU transform'
    ],
    checklist: [
      'Header follows the top bar contract (Brand, Links, CTA)',
      'Grid adjusts smoothly from 1 column on mobile to 3 on desktop',
      'All buttons have interactive hover and active states',
      'No horizontal overflow on 375px mobile viewport'
    ],
    starterHtml: `<header class="site-header">
  <div class="brand">NovaEngine</div>
  <nav class="nav-links">
    <a href="#features">Features</a>
    <a href="#pricing">Pricing</a>
  </nav>
  <button class="cta-btn">Get Started</button>
</header>`,
    starterCss: `body {
  background: #080C12;
  color: #F5F7FA;
  font-family: sans-serif;
}`,
    solutionHtml: `<header class="site-header">
  <div class="brand">NovaEngine</div>
  <nav class="nav-links">
    <a href="#features">Features</a>
    <a href="#docs">Documentation</a>
    <a href="#pricing">Pricing</a>
  </nav>
  <button class="cta-btn">Start Free</button>
</header>

<main>
  <section class="hero">
    <h1>Supercharge Your Front-End Skills</h1>
    <p>The definitive 10-day intensive curriculum designed for modern engineering excellence.</p>
  </section>

  <section class="bento-grid" id="features">
    <article class="bento-card featured">
      <h3>Interactive Sandboxes</h3>
      <p>Write live HTML and CSS inside isolated preview environments with immediate visual feedback.</p>
    </article>
    <article class="bento-card">
      <h3>105+ Exam MCQs</h3>
      <p>Test deep conceptual understanding across 11 core curriculum topics.</p>
    </article>
    <article class="bento-card">
      <h3>6 Educational Games</h3>
      <p>Reinforce selectors, debugging, and flex layouts through hands-on challenges.</p>
    </article>
  </section>
</main>`,
    solutionCss: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: #080C12;
  color: #F5F7FA;
  font-family: 'Plus Jakarta Sans', system-ui, sans-serif;
  line-height: 1.6;
}
.site-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.25rem 2rem;
  border-bottom: 1px solid #223044;
  position: sticky;
  top: 0;
  background: rgba(8, 12, 18, 0.9);
  backdrop-filter: blur(8px);
  z-index: 100;
}
.brand { font-size: 1.25rem; font-weight: 800; color: #35F2C0; }
.nav-links { display: flex; gap: 1.5rem; }
.nav-links a { color: #A3ADBA; text-decoration: none; font-size: 0.9rem; transition: color 150ms; }
.nav-links a:hover { color: #F5F7FA; }
.cta-btn {
  background: #35F2C0;
  color: #080C12;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 6px;
  font-weight: 700;
  cursor: pointer;
}
.hero { text-align: center; padding: 4rem 1.5rem 3rem; max-width: 800px; margin: 0 auto; }
.hero h1 { font-size: clamp(2rem, 5vw, 3.5rem); line-height: 1.2; margin-bottom: 1rem; }
.hero p { color: #A3ADBA; font-size: 1.15rem; }
.bento-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
}
.bento-card {
  background: #151F2C;
  border: 1px solid #223044;
  border-radius: 12px;
  padding: 2rem;
  transition: transform 180ms ease, border-color 180ms ease;
}
.bento-card:hover { transform: translateY(-4px); border-color: #35F2C0; }
.bento-card h3 { color: #78A9FF; margin-bottom: 0.5rem; }
.bento-card p { color: #CBD5E1; font-size: 0.95rem; }`,
    rubric: [
      { criterion: 'Top bar layout and navigation contract', weight: 25 },
      { criterion: 'Fluid hero typography using clamp()', weight: 25 },
      { criterion: 'Auto-responsive bento grid without horizontal overflow', weight: 25 },
      { criterion: 'Smooth GPU compositor hover effects', weight: 25 }
    ]
  },
  {
    id: 'project-5-portfolio',
    title: 'Project 5: Complete Master Developer Portfolio',
    day: 10,
    difficulty: 'advanced',
    description: 'The final capstone: combine semantic HTML, responsive layout, dark theme design tokens, accessible contact forms, and polished CSS transitions into a production-grade portfolio.',
    objectives: [
      'Build a multi-section single page portfolio application',
      'Use CSS custom properties for coherent brand themes',
      'Meet WCAG AA accessibility standards throughout',
      'Verify mobile, tablet, and desktop layout integrity'
    ],
    checklist: [
      'Skip navigation link included for keyboard users',
      'All image elements include explicit width/height to avoid CLS',
      'Projects showcase built with responsive CSS Grid',
      'Forms equipped with valid labels and keyboard focus outlines'
    ],
    starterHtml: `<!-- Capstone Master Portfolio -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Your Master Portfolio</title>
</head>
<body>
  <!-- Build your portfolio sections -->
</body>
</html>`,
    starterCss: `:root {
  --bg-main: #080C12;
  --accent: #35F2C0;
}`,
    solutionHtml: `<a href="#main-work" class="skip-link">Skip to work</a>
<header class="navbar">
  <span class="logo">Sarah.Dev</span>
  <nav>
    <a href="#about">About</a>
    <a href="#projects">Work</a>
    <a href="#contact">Contact</a>
  </nav>
</header>
<main id="main-work">
  <section class="intro" id="about">
    <h1>Building Accessible, High-Performance Web Software</h1>
    <p>Specialized in clean HTML semantics, modern CSS architectures, and user-centric design.</p>
  </section>
  <section class="projects" id="projects">
    <h2>Featured Work</h2>
    <div class="grid">
      <div class="card">
        <h3>CodeSprint Academy</h3>
        <p>Comprehensive 10-day learning platform with 105+ validated MCQs.</p>
      </div>
      <div class="card">
        <h3>E-Commerce Core</h3>
        <p>Accessible checkout flow and fluid product catalog.</p>
      </div>
    </div>
  </section>
</main>`,
    solutionCss: `* { box-sizing: border-box; margin: 0; padding: 0; }
body {
  background: #080C12;
  color: #F5F7FA;
  font-family: 'Plus Jakarta Sans', sans-serif;
  line-height: 1.6;
}
.skip-link {
  position: absolute;
  top: -40px;
  left: 0;
  background: #35F2C0;
  color: #080C12;
  padding: 8px 16px;
  z-index: 999;
}
.skip-link:focus { top: 0; }
.navbar {
  display: flex;
  justify-content: space-between;
  padding: 1.5rem 2rem;
  border-bottom: 1px solid #223044;
}
.logo { font-weight: 800; color: #35F2C0; }
.navbar nav a { color: #A3ADBA; margin-left: 1.5rem; text-decoration: none; }
.intro { padding: 4rem 2rem; max-width: 800px; }
.intro h1 { font-size: 2.5rem; margin-bottom: 1rem; }
.projects { padding: 2rem; }
.projects h2 { margin-bottom: 1.5rem; color: #78A9FF; }
.grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; }
.card { background: #151F2C; border: 1px solid #223044; border-radius: 8px; padding: 1.5rem; }`,
    rubric: [
      { criterion: 'Overall semantic architecture & skip-to-content accessibility', weight: 25 },
      { criterion: 'Responsive CSS Grid & Flexbox layouts', weight: 25 },
      { criterion: 'Accessible color contrast and focus rings', weight: 25 },
      { criterion: 'Production polish, visual rhythm, and zero layout shift', weight: 25 }
    ]
  }
];
