# Writing Style Guide Template

Instructions for building personalized writing style guides that help AI tools match the client's brand voice.

## Overview

Build a single-page HTML website that analyzes the client's website copy, documents their writing style characteristics, and provides a comprehensive AI prompt for maintaining consistent brand voice across all content.

## Output

Self-contained HTML file with:
- Inline CSS matching their brand (colors, fonts from brand guidelines research)
- Analysis of voice, tone, and style from actual website content
- Writing characteristics with examples from their site
- DO/DON'T guidelines
- Comprehensive AI prompt for content generation (click-to-copy)
- Before/after examples showing brand voice in action

## Phase 1: Collect Website Content

### 1.1 Gather Copy from Multiple Pages

Use WebFetch on various pages to collect writing samples:

```
WebFetch(url: "https://example.com/",
         prompt: "Extract all the written content. Pay attention to tone, word choice, sentence structure, and personality.")

WebFetch(url: "https://example.com/about",
         prompt: "How do they describe themselves? What language do they use? Is it formal or casual? Technical or accessible?")

WebFetch(url: "https://example.com/services" or "/products",
         prompt: "How do they describe their offerings? What benefits do they emphasize? What's the tone?")

WebFetch(url: "https://example.com/blog" or latest blog post,
         prompt: "What's the writing style in their content? Conversational? Educational? Authoritative?")
```

### 1.2 Look for Patterns

As you read the content, note:
- **Sentence length**: Short and punchy? Long and detailed?
- **Vocabulary**: Simple words? Industry jargon? Technical terms?
- **Person**: First person (we/our), second person (you/your), third person?
- **Tone**: Professional, friendly, casual, authoritative, playful, serious?
- **Personality traits**: Confident, humble, innovative, traditional, bold, careful?
- **Formatting**: Bullet points, numbered lists, paragraphs, headers?

## Phase 2: Analyze Writing Characteristics

### 2.1 Voice Attributes (3-5 key traits)

Identify the dominant characteristics:

**Examples:**
- Professional yet approachable
- Confident and authoritative
- Friendly and conversational
- Technical but accessible
- Bold and innovative
- Warm and empathetic

### 2.2 Tone Consistency

Determine overall tone:
- **Formal** (business documents, legal, finance)
- **Casual** (lifestyle brands, creative agencies)
- **Educational** (coaches, consultants, SaaS)
- **Inspirational** (personal development, coaching)
- **Straightforward** (B2B services, technical)

### 2.3 Style Elements

Document specific patterns:

**Sentence Structure:**
- "Uses short, direct sentences"
- "Varies sentence length for rhythm"
- "Favors complex sentences with multiple clauses"

**Word Choice:**
- "Plain language, avoids jargon"
- "Industry-specific terminology"
- "Action-oriented verbs"
- "Metaphors and analogies"

**Grammar & Mechanics:**
- "Contractions (we're, you'll) for conversational tone"
- "No contractions for formal tone"
- "Oxford comma usage"
- "Active voice preferred"

**Formatting Preferences:**
- "Frequent use of bullet points"
- "Numbered lists for processes"
- "Short paragraphs (2-3 sentences)"
- "Bold text for emphasis"

## Phase 3: Build HTML Structure

### 3.1 Header

```html
<header>
  <h1>Writing Style Guide for [Company Name]</h1>
  <p class="subtitle">Brand Voice & AI Content Guidelines | Prepared by Innovation Bound</p>
</header>
```

### 3.2 Introduction

```html
<section class="intro">
  <h2>📝 Using This Guide with AI</h2>
  <p>This guide captures your brand's writing style based on your website content. Use the AI prompt at the bottom to ensure ChatGPT and other AI tools match your voice.</p>
</section>
```

### 3.3 Voice Overview

```html
<section class="voice-overview">
  <h2>Your Brand Voice</h2>

  <div class="voice-cards">
    <div class="voice-card">
      <h3>Voice Attribute 1</h3>
      <p>Brief explanation of this characteristic</p>
    </div>

    <div class="voice-card">
      <h3>Voice Attribute 2</h3>
      <p>Brief explanation of this characteristic</p>
    </div>

    <!-- 3-5 voice attributes total -->
  </div>
</section>
```

### 3.4 Writing Characteristics

```html
<section class="characteristics">
  <h2>Writing Characteristics</h2>

  <div class="characteristic">
    <h3>Tone</h3>
    <p>[Overall tone description - e.g., "Professional yet approachable"]</p>
    <p class="example"><strong>Example from your site:</strong> "[Pull actual quote from their website]"</p>
  </div>

  <div class="characteristic">
    <h3>Sentence Structure</h3>
    <p>[Description - e.g., "Short, direct sentences averaging 10-15 words"]</p>
    <p class="example"><strong>Example from your site:</strong> "[Pull actual quote]"</p>
  </div>

  <div class="characteristic">
    <h3>Word Choice</h3>
    <p>[Description - e.g., "Plain language with occasional industry terms, always explained"]</p>
    <p class="example"><strong>Example from your site:</strong> "[Pull actual quote]"</p>
  </div>

  <div class="characteristic">
    <h3>Perspective</h3>
    <p>[Description - e.g., "Second person (you/your) to engage directly with readers"]</p>
    <p class="example"><strong>Example from your site:</strong> "[Pull actual quote]"</p>
  </div>
</section>
```

### 3.5 DO/DON'T Guidelines

```html
<section class="guidelines">
  <h2>Writing Guidelines</h2>

  <div class="guidelines-grid">
    <div class="do-column">
      <h3>✓ DO</h3>
      <ul>
        <li>Use contractions for a conversational tone</li>
        <li>Keep paragraphs short (2-3 sentences)</li>
        <li>Use active voice</li>
        <li>Address the reader directly with "you"</li>
        <li>Bold key points for emphasis</li>
        <li>Use bullet points for lists</li>
      </ul>
    </div>

    <div class="dont-column">
      <h3>✗ DON'T</h3>
      <ul>
        <li>Use overly formal or stiff language</li>
        <li>Write long, dense paragraphs</li>
        <li>Use passive voice</li>
        <li>Use unexplained jargon</li>
        <li>Make unsubstantiated claims</li>
        <li>Use corporate buzzwords</li>
      </ul>
    </div>
  </div>
</section>
```

### 3.6 Before/After Examples

```html
<section class="examples">
  <h2>Voice in Action</h2>

  <div class="example-card">
    <div class="before">
      <h4>❌ Off-Brand</h4>
      <p>"Our organization facilitates the optimization of operational workflows through innovative technological solutions."</p>
    </div>

    <div class="after">
      <h4>✓ On-Brand</h4>
      <p>"We help you work smarter with tools that actually make sense."</p>
    </div>
  </div>

  <!-- Add 2-3 more before/after examples -->
</section>
```

### 3.7 AI Prompt Section

```html
<section class="ai-prompt-section">
  <h2>AI Writing Prompt</h2>

  <div class="instructions">
    <p><strong>How to use:</strong></p>
    <ol>
      <li>Copy the prompt below</li>
      <li>Paste it into ChatGPT or your AI tool of choice</li>
      <li>Add your specific content request (e.g., "Write a blog post about...")</li>
      <li>AI will generate content matching your brand voice</li>
    </ol>
  </div>

  <button class="copy-btn" onclick="copyPrompt()">Click to Copy AI Prompt</button>

  <div class="prompt-box">
    <pre id="ai-prompt">[Generated prompt - see Phase 4]</pre>
  </div>
</section>
```

### 3.8 Footer

```html
<footer>
  <p>Style guide prepared by Innovation Bound | [Date]</p>
  <p>This is 4 of 5 Customized AI Demos for your business</p>
</footer>
```

## Phase 4: Generate AI Writing Prompt

### 4.1 Build Comprehensive Prompt

Create a detailed prompt that captures their voice:

```
Write all content for [COMPANY NAME] following these brand voice guidelines:

COMPANY CONTEXT:
[1-2 sentences about what they do and who they serve]

VOICE ATTRIBUTES:
- [Attribute 1]: [Brief description]
- [Attribute 2]: [Brief description]
- [Attribute 3]: [Brief description]

TONE: [Overall tone - e.g., "Professional yet approachable, confident but not arrogant"]

WRITING STYLE:

Sentence Structure:
- [Description - e.g., "Use short, direct sentences. Vary length for rhythm."]

Word Choice:
- [Description - e.g., "Plain language. Avoid jargon unless explaining it."]

Perspective:
- [Description - e.g., "Second person (you/your). Direct engagement."]

Grammar & Mechanics:
- [Specific preferences - e.g., "Use contractions. Active voice. Oxford comma."]

DO:
• [Specific guideline from DO list]
• [Specific guideline from DO list]
• [Specific guideline from DO list]

DON'T:
• [Specific guideline from DON'T list]
• [Specific guideline from DON'T list]
• [Specific guideline from DON'T list]

EXAMPLES OF OUR VOICE:
✓ "[Pull actual quote from their website]"
✓ "[Pull another actual quote]"

When writing content, maintain this voice consistently. If you're unsure, err on the side of being more [key attribute - e.g., "conversational" or "professional"].
```

### 4.2 Customize with Real Content

**IMPORTANT:**
- Use actual quotes from their website as examples
- Be specific about their patterns (not generic advice)
- Include company context
- Reference their specific DO/DON'T preferences

## Phase 5: JavaScript for Copy Functionality

```javascript
<script>
// Side effect: Copies AI prompt to clipboard
function copyPrompt () {
  var promptText = document.getElementById('ai-prompt').textContent

  navigator.clipboard.writeText(promptText).then(function() {
    var btn = document.querySelector('.copy-btn')
    var originalText = btn.textContent
    btn.textContent = 'Copied!'
    btn.style.background = '#4caf50'

    setTimeout(function() {
      btn.textContent = originalText
      btn.style.background = ''
    }, 2000)
  }).catch(function(err) {
    alert('Failed to copy. Please select and copy manually.')
  })
}
</script>
```

## Phase 6: Styling with Brand

### 6.1 Use Brand Colors

```css
:root {
  --primary-color: #hexcode;
  --secondary-color: #hexcode;
  --accent-color: #hexcode;
}

.voice-card {
  border-left: 4px solid var(--accent-color);
  padding: 1.5rem;
  background: #f9f9f9;
  border-radius: 8px;
}

.do-column {
  border-left: 4px solid #4caf50;
}

.dont-column {
  border-left: 4px solid #e74c3c;
}

.example .before {
  background: #ffebee;
  border-left: 4px solid #e74c3c;
}

.example .after {
  background: #e8f5e9;
  border-left: 4px solid #4caf50;
}
```

### 6.2 Use Brand Fonts

```html
<link href="https://fonts.googleapis.com/css2?family=FontName&display=swap" rel="stylesheet">

<style>
body {
  font-family: 'FontName', Arial, sans-serif;
}
</style>
```

## Success Criteria

Before marking complete, verify:

- ✅ Analyzed content from at least 3-4 different pages
- ✅ 3-5 voice attributes clearly defined
- ✅ Tone, sentence structure, word choice, perspective documented
- ✅ DO/DON'T guidelines specific to their brand (not generic)
- ✅ 2-3 before/after examples showing voice difference
- ✅ Examples pulled from actual website content
- ✅ AI prompt is comprehensive and actionable
- ✅ Click-to-copy functionality works
- ✅ Styled with client's brand colors and fonts
- ✅ Professional and easy to understand
- ✅ Screenshot shows complete page

## Tips for Quality Analysis

1. **Pull Real Quotes**: Don't paraphrase, use their actual words as examples
2. **Be Specific**: "Uses 10-15 word sentences" not "writes clearly"
3. **Find Patterns**: Look for consistency across multiple pages
4. **Be Honest**: If they're inconsistent, note it (and suggest consistency)
5. **Make It Actionable**: Every guideline should be something AI can follow

## Common Voice Types

**Professional Services:**
- Authoritative but accessible
- Educational without being condescending
- Confident in expertise

**Creative/Agency:**
- Bold and innovative
- Conversational and friendly
- Storytelling-oriented

**B2B SaaS:**
- Clear and straightforward
- Problem-solution focused
- Data-driven

**Consumer/Lifestyle:**
- Warm and relatable
- Aspirational
- Emotion-driven

**Technical/Engineering:**
- Precise and accurate
- Technical but explained
- Evidence-based

## Content Sources to Analyze

**High Priority:**
- Homepage (main messaging)
- About page (brand story, values)
- Service/product descriptions (how they sell)
- Blog posts (consistent voice in content)

**Additional Sources:**
- FAQ pages (how they help)
- Case studies (how they showcase results)
- Team bios (personality)
- Social media (if accessible)

## Final Steps

1. Test copy-to-clipboard functionality
2. Verify all examples are actual quotes from their site
3. Take screenshot
4. Update client's CLAUDE.md checklist
5. Mark "Writing Style Guide" as complete
