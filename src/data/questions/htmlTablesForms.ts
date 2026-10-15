import { MCQQuestion } from '../../types';

export const htmlTablesFormsQuestions: MCQQuestion[] = [
  {
    id: 'html-025',
    day: 3,
    topic: 'Table Accessibility & Structure',
    topicCategory: 'Tables, forms, and input types',
    difficulty: 'intermediate',
    type: 'accessibility',
    question: 'Which element and attribute combination establishes an accessible column header cell in an HTML data table?',
    code: '<table>\n  <thead>\n    <tr>\n      <______ ______="col">Student Name</______>\n    </tr>\n  </thead>\n</table>',
    options: [
      { id: 'A', text: '<th scope="col">' },
      { id: 'B', text: '<td header="true">' },
      { id: 'C', text: '<col heading="column">' },
      { id: 'D', text: '<tr type="header">' }
    ],
    correctAnswer: 'A',
    explanation: '`<th>` designates a table header cell, and the `scope="col"` attribute explicitly informs screen readers that this header applies to all cells in that vertical column.',
    hint: 'th stands for table header; scope indicates direction.',
    lessonId: 'day-3-forms-tables',
    tags: ['tables', 'th', 'scope', 'accessibility']
  },
  {
    id: 'html-026',
    day: 3,
    topic: 'Table Cell Spanning',
    topicCategory: 'Tables, forms, and input types',
    difficulty: 'intermediate',
    type: 'code-output',
    question: 'What is the effect of `<td colspan="3">Total Summary</td>` on a table row?',
    code: '<tr>\n  <td colspan="3">Total Summary</td>\n  <td>$4,500</td>\n</tr>',
    options: [
      { id: 'A', text: 'The cell merges horizontally across 3 columns of space' },
      { id: 'B', text: 'The cell spans vertically down across 3 rows' },
      { id: 'C', text: 'The text inside the cell is repeated 3 times' },
      { id: 'D', text: 'The column width is fixed at exactly 300 pixels' }
    ],
    correctAnswer: 'A',
    explanation: '`colspan="3"` expands the table cell horizontally so that it occupies the width of 3 table columns. `rowspan` is used for vertical row spanning.',
    hint: 'colspan = column span (horizontal).',
    lessonId: 'day-3-forms-tables',
    tags: ['tables', 'colspan', 'layout']
  },
  {
    id: 'html-027',
    day: 3,
    topic: 'Accessible Form Labels',
    topicCategory: 'Tables, forms, and input types',
    difficulty: 'beginner',
    type: 'best-solution',
    question: 'What is the gold standard method to programmatically associate an explicit `<label>` with its corresponding `<input>`?',
    code: null,
    options: [
      { id: 'A', text: 'Match the label\'s `for` attribute with the input\'s unique `id` attribute' },
      { id: 'B', text: 'Give both the label and input identical CSS `class` names' },
      { id: 'C', text: 'Place the label and input inside the same `<div>` with no attributes' },
      { id: 'D', text: 'Set the label\'s `name` attribute equal to the input\'s `value`' }
    ],
    correctAnswer: 'A',
    explanation: 'Setting `<label for="email-field">Email</label>` and `<input id="email-field">` creates a programmatic association recognized by all assistive technologies and expands the clickable target area to the label text.',
    hint: 'The label\'s `for` matches the input\'s `id`.',
    lessonId: 'day-3-forms-tables',
    tags: ['forms', 'labels', 'accessibility']
  },
  {
    id: 'html-028',
    day: 3,
    topic: 'Placeholder vs Label',
    topicCategory: 'Tables, forms, and input types',
    difficulty: 'intermediate',
    type: 'accessibility',
    question: 'Why should a form input `placeholder` attribute never be used as a replacement for a visible `<label>`?',
    code: '<!-- ❌ Anti-pattern -->\n<input type="text" placeholder="Enter your full name">',
    options: [
      { id: 'A', text: 'Placeholders disappear upon typing (causing cognitive load/loss of context) and usually have poor color contrast' },
      { id: 'B', text: 'Placeholders prevent modern browsers from submitting form data over HTTPS' },
      { id: 'C', text: 'HTML5 deprecated the placeholder attribute in 2024' },
      { id: 'D', text: 'Screen readers completely crash when encountering placeholder text' }
    ],
    correctAnswer: 'A',
    explanation: 'Placeholders are temporary sample hints. When a user starts typing, the placeholder vanishes, removing the field context for users with memory impairments or distractions. Furthermore, default placeholder styling fails WCAG AA 4.5:1 color contrast requirements.',
    hint: 'What happens to the placeholder text the moment the user types their first character?',
    lessonId: 'day-3-forms-tables',
    tags: ['forms', 'placeholder', 'accessibility']
  },
  {
    id: 'html-029',
    day: 3,
    topic: 'Input Types and Mobile Keyboards',
    topicCategory: 'Tables, forms, and input types',
    difficulty: 'intermediate',
    type: 'real-world',
    question: 'Why is specifying `<input type="email">` better than `<input type="text">` for user email entry?',
    code: '<input type="email" name="user_email" required>',
    options: [
      { id: 'A', text: 'It prompts mobile devices to display an optimized keyboard layout with "@" and provides native browser syntax validation' },
      { id: 'B', text: 'It automatically sends an encrypted verification ping to the user\'s mail server' },
      { id: 'C', text: 'It replaces the user\'s typing with an autocomplete dropdown of their contacts' },
      { id: 'D', text: 'It prevents spam robots from scraping the form submission endpoint' }
    ],
    correctAnswer: 'A',
    explanation: '`type="email"` tells mobile operating systems (iOS and Android) to customize the virtual software keyboard (displaying "@", period, and domain shortcuts) and activates native HTML5 email pattern validation upon form submission.',
    hint: 'Think about virtual keyboards on smartphones and built-in client validation.',
    lessonId: 'day-3-forms-tables',
    tags: ['inputs', 'mobile', 'validation']
  },
  {
    id: 'html-030',
    day: 3,
    topic: 'Radio Buttons vs Checkboxes',
    topicCategory: 'Tables, forms, and input types',
    difficulty: 'beginner',
    type: 'comparison',
    question: 'How do you configure multiple radio buttons so that choosing one automatically unchecks the others in that question group?',
    code: '<input type="radio" name="plan" value="monthly">\n<input type="radio" name="plan" value="annual">',
    options: [
      { id: 'A', text: 'Assign identical `name` attribute values to all radio inputs in the group' },
      { id: 'B', text: 'Assign identical `id` attribute values to all radio inputs' },
      { id: 'C', text: 'Nest them all inside a single `<fieldset>` with no attributes' },
      { id: 'D', text: 'Set `multiple="false"` on each radio button' }
    ],
    correctAnswer: 'A',
    explanation: 'Radio buttons that share the same `name` attribute form a mutually exclusive radio group. The browser ensures only one option in that group can be checked at any given time.',
    hint: 'All radio buttons in the set must share the exact same `name`.',
    lessonId: 'day-3-forms-tables',
    tags: ['forms', 'radio-buttons', 'syntax']
  },
  {
    id: 'html-031',
    day: 3,
    topic: 'Fieldset and Legend',
    topicCategory: 'Tables, forms, and input types',
    difficulty: 'intermediate',
    type: 'concept',
    question: 'What is the purpose of grouping form controls with `<fieldset>` and `<legend>`?',
    code: '<fieldset>\n  <legend>Shipping Address</legend>\n  <label for="street">Street:</label>\n  <input id="street" name="street">\n</fieldset>',
    options: [
      { id: 'A', text: 'To group related controls together and announce the legend as shared context for assistive technologies' },
      { id: 'B', text: 'To encrypt that specific group of fields before transmission' },
      { id: 'C', text: 'To automatically center the inputs inside a modal popup' },
      { id: 'D', text: 'To convert text inputs into masked password inputs' }
    ],
    correctAnswer: 'A',
    explanation: '`<fieldset>` groups related form controls (such as payment details or radio button groups), and `<legend>` provides an accessible caption that screen readers read when users navigate into any control in the group.',
    hint: 'fieldset groups the elements; legend provides the accessible group caption.',
    lessonId: 'day-3-forms-tables',
    tags: ['forms', 'fieldset', 'legend', 'accessibility']
  },
  {
    id: 'html-032',
    day: 3,
    topic: 'Form Submission Methods',
    topicCategory: 'Tables, forms, and input types',
    difficulty: 'intermediate',
    type: 'comparison',
    question: 'What is the crucial difference between `<form method="GET">` and `<form method="POST">`?',
    code: '<form action="/process" method="POST">...</form>',
    options: [
      { id: 'A', text: 'GET appends form data to the URL query string; POST sends form data in the HTTP request body' },
      { id: 'B', text: 'GET requires SSL encryption; POST transmits data in plaintext only' },
      { id: 'C', text: 'POST can only transfer files under 2 kilobytes in size' },
      { id: 'D', text: 'GET is only supported on Google Chrome browsers' }
    ],
    correctAnswer: 'A',
    explanation: 'GET encodes field data into URL query parameters (`/process?name=value`), making it visible in browser history and bookmarks (great for search queries). POST includes the data inside the HTTP message body, which is essential for sensitive data (passwords) and state-changing requests.',
    hint: 'URL query string vs HTTP request payload body.',
    lessonId: 'day-3-forms-tables',
    tags: ['forms', 'http-methods', 'get-vs-post']
  },
  {
    id: 'html-033',
    day: 3,
    topic: 'Native HTML5 Form Validation',
    topicCategory: 'Tables, forms, and input types',
    difficulty: 'intermediate',
    type: 'syntax',
    question: 'Which HTML5 attribute ensures a user cannot submit a form while leaving a specific field blank?',
    code: '<input type="text" id="username" name="username" ______>',
    options: [
      { id: 'A', text: 'required' },
      { id: 'B', text: 'validate="strict"' },
      { id: 'C', text: 'mandatory' },
      { id: 'D', text: 'disallow-empty="true"' }
    ],
    correctAnswer: 'A',
    explanation: 'The boolean `required` attribute specifies that the user must fill in a value before the browser allows submitting the form, activating native browser validation dialogs.',
    hint: 'A single boolean attribute keyword meaning mandatory.',
    lessonId: 'day-3-forms-tables',
    tags: ['forms', 'validation', 'required']
  },
  {
    id: 'html-034',
    day: 3,
    topic: 'Textarea vs Input',
    topicCategory: 'Tables, forms, and input types',
    difficulty: 'beginner',
    type: 'comparison',
    question: 'How do `<textarea>` and `<input type="text">` differ in syntax and capabilities?',
    code: '<textarea rows="4" cols="50">Default content</textarea>',
    options: [
      { id: 'A', text: '`<textarea>` supports multiline text and uses closing tags wrapping default text; `<input>` is a single-line void element' },
      { id: 'B', text: '`<textarea>` cannot be submitted in a standard HTML form' },
      { id: 'C', text: '`<input type="text">` automatically wraps text across multiple lines when width is exceeded' },
      { id: 'D', text: '`<textarea>` is an obsolete tag replaced by `<div contenteditable>`' }
    ],
    correctAnswer: 'A',
    explanation: '`<textarea>` allows users to enter multiple lines of text, has opening and closing tags `<textarea>...</textarea>`, and default content is placed between the tags. `<input type="text">` is single-line, void, and uses the `value` attribute.',
    hint: 'One is a single-line void element; the other is a multi-line container element.',
    lessonId: 'day-3-forms-tables',
    tags: ['forms', 'textarea', 'inputs']
  },
  {
    id: 'html-035',
    day: 3,
    topic: 'Select Dropdowns and Options',
    topicCategory: 'Tables, forms, and input types',
    difficulty: 'intermediate',
    type: 'syntax',
    question: 'What is the correct markup to create a dropdown menu with "CSS" preselected by default?',
    code: null,
    options: [
      { id: 'A', text: '<select><option value="html">HTML</option><option value="css" selected>CSS</option></select>' },
      { id: 'B', text: '<select default="css"><option>HTML</option><option>CSS</option></select>' },
      { id: 'C', text: '<dropdown><item active>CSS</item></dropdown>' },
      { id: 'D', text: '<select><option value="css" checked>CSS</option></select>' }
    ],
    correctAnswer: 'A',
    explanation: '`<select>` contains `<option>` elements. The boolean attribute `selected` preselects an option in a `<select>` list. (`checked` is used for radio buttons and checkboxes).',
    hint: 'Use `selected` on the `<option>`, not `checked`.',
    lessonId: 'day-3-forms-tables',
    tags: ['forms', 'select', 'option']
  },
  {
    id: 'html-036',
    day: 3,
    topic: 'Form Button Types',
    topicCategory: 'Tables, forms, and input types',
    difficulty: 'advanced',
    type: 'find-error',
    question: 'A developer adds `<button>Cancel</button>` inside a `<form>`, but clicking it submits the form unexpectedly. Why?',
    code: '<form action="/save" method="POST">\n  <input type="text" name="bio">\n  <button>Cancel</button>\n  <button type="submit">Save</button>\n</form>',
    options: [
      { id: 'A', text: 'The default `type` of a `<button>` inside a `<form>` is "submit"; it must be set to `type="button"` to avoid submission' },
      { id: 'B', text: 'Forms only allow a single button element in the DOM' },
      { id: 'C', text: 'The word "Cancel" is a reserved keyword in HTML parser specifications' },
      { id: 'D', text: 'The Cancel button must be placed in a separate `<footer>` element' }
    ],
    correctAnswer: 'A',
    explanation: 'Per the HTML standard, the default `type` attribute for `<button>` elements is `"submit"`. Any button inside a form that should not trigger submission must explicitly declare `type="button"`.',
    hint: 'What is the default type attribute value of a `<button>` tag?',
    lessonId: 'day-3-forms-tables',
    tags: ['forms', 'buttons', 'pitfalls']
  }
];
