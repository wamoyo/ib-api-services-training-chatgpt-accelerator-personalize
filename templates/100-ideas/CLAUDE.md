# 100 AI Ideas Template

Instructions for building personalized "100 Ideas to Grow Your Business with AI" pages.

## Overview

Build a single-page HTML website with 100 actionable AI ideas tailored to the client's specific business, industry, and customers. Each idea has a checkbox, and checked ideas automatically populate a custom AI prompt at the bottom for expansion.

## Output

Self-contained HTML file with:
- Inline CSS matching their brand (colors, fonts from brand guidelines research)
- Inline JavaScript for checkbox handling and dynamic prompt generation
- 100 ideas organized by category (6-8 categories)
- Each idea: checkbox, bold title, 1-2 sentence description
- Auto-updating prompt at bottom with click-to-copy functionality

## Phase 1: Research

### 1.1 Understand the Business

Use the research already done for brand guidelines:
- Read `research/brand-research.md`
- Review website screenshots
- Understand their products/services, customers, industry

### 1.2 Additional Research if Needed

Use WebFetch to gather more detail:
```
WebFetch(url: "https://example.com/products",
         prompt: "What products/services do they offer? Who are their customers? What problems do they solve?")

WebFetch(url: "https://example.com/about",
         prompt: "What is their business model? What makes them unique? What are their goals?")
```

### 1.3 Identify Key Information

Document these for prompt generation:
- **Company Description** (1-2 sentences): What they do
- **Target Customers** (1 sentence): Who they serve
- **Products/Services** (1 sentence): What they offer
- **Industry** (1-2 words): e.g., "Real Estate", "E-commerce", "Professional Services"

## Phase 2: Generate 100 Ideas

### 2.1 Categories (6-8 categories)

Organize ideas into relevant categories like:
- **Marketing & Lead Generation** (12-15 ideas)
- **Customer Service & Support** (10-12 ideas)
- **Content Creation** (12-15 ideas)
- **Operations & Automation** (10-12 ideas)
- **Sales & Conversions** (10-12 ideas)
- **Data & Analytics** (8-10 ideas)
- **Product/Service Development** (8-10 ideas)
- **Team & Training** (8-10 ideas)

Tailor categories to their industry.

### 2.2 Idea Format

Each idea should be:
- **Specific** to their business/industry
- **Actionable** (not vague)
- **AI-powered** (uses AI tools)
- **Practical** (can actually implement)

**Example Structure:**
```
☐ **Automated Customer Email Responses**
Use AI to draft personalized email responses to common customer inquiries, saving 5-10 hours per week.

☐ **SEO-Optimized Blog Post Generator**
Generate monthly blog posts optimized for your target keywords, maintaining brand voice and driving organic traffic.
```

### 2.3 Tailoring to Industry

**Real Estate:**
- AI-generated property descriptions
- Virtual staging recommendations
- Market analysis reports
- Lead qualification chatbots

**E-commerce:**
- Product description generation
- Customer review analysis
- Personalized product recommendations
- Abandoned cart recovery emails

**Professional Services:**
- Proposal drafting
- Client research summaries
- Meeting note automation
- Content marketing

## Phase 3: Build HTML Structure

### 3.1 Header

```html
<header>
  <h1>100 Ideas to Grow [Company Name] with AI</h1>
  <p class="subtitle">Tailored for [Industry] | Prepared by Innovation Bound</p>
</header>
```

### 3.2 Instructions Section

```html
<div class="instructions">
  <p><strong>How to use this:</strong></p>
  <ol>
    <li>Read through the ideas below</li>
    <li>Check the boxes for your favorite ideas</li>
    <li>Copy the AI prompt at the bottom to have ChatGPT expand on your selections</li>
  </ol>
</div>
```

### 3.3 Ideas Grid

```html
<section class="ideas-section">
  <h2>Marketing & Lead Generation</h2>

  <div class="idea-grid">
    <div class="idea-card">
      <input type="checkbox" id="idea-1" class="idea-checkbox" data-title="Automated Customer Email Responses" data-description="Use AI to draft personalized email responses to common customer inquiries, saving 5-10 hours per week.">
      <label for="idea-1">
        <h3>Automated Customer Email Responses</h3>
        <p>Use AI to draft personalized email responses to common customer inquiries, saving 5-10 hours per week.</p>
      </label>
    </div>

    <!-- Repeat for all 100 ideas - IMPORTANT: Add both data-title AND data-description to each checkbox -->
  </div>
</section>
```

### 3.4 Generated Prompt Section

```html
<section class="prompt-section">
  <h2>Your Custom AI Prompt</h2>
  <p>Based on your selections, here's a prompt to copy into ChatGPT:</p>

  <button class="copy-btn" onclick="copyPrompt()">Click to Copy Prompt</button>

  <div class="prompt-box">
    <pre id="generated-prompt">Select your favorite ideas above to generate a custom prompt...</pre>
  </div>
</section>
```

## Phase 4: JavaScript Functionality

### 4.1 Update Prompt on Checkbox Change

```javascript
<script>
// Pure: generates company context for prompt
function getCompanyContext () {
  return `I run a [INDUSTRY] business called [COMPANY NAME].

Our company: [1-2 sentence description]
Our customers: [1 sentence about target customers]
Our products/services: [1 sentence about what they offer]`
}

// Pure: builds prompt from selected ideas
function buildPrompt (selectedIdeas) {
  if (selectedIdeas.length === 0) {
    return 'Select your favorite ideas above to generate a custom prompt...'
  }

  var context = getCompanyContext()
  var ideasList = selectedIdeas.map(function(idea, index) {
    return `${index + 1}. ${idea.title}: ${idea.description}`
  }).join('\n')

  return `${context}

I want to explore these AI-powered ideas to grow my business:

${ideasList}

For each idea above, please provide:
1. A detailed implementation plan
2. Specific AI tools or prompts I can use
3. Expected time savings or ROI
4. Any potential challenges to watch out for

Format each response clearly so I can take action immediately.`
}

// Side effect: Updates the prompt display
function updatePrompt () {
  var checkboxes = document.querySelectorAll('.idea-checkbox:checked')
  var selectedIdeas = Array.from(checkboxes).map(function(cb) {
    return {
      title: cb.getAttribute('data-title'),
      description: cb.getAttribute('data-description')
    }
  })

  var prompt = buildPrompt(selectedIdeas)
  document.getElementById('generated-prompt').textContent = prompt
}

// Side effect: Copies prompt to clipboard
function copyPrompt () {
  var promptText = document.getElementById('generated-prompt').textContent

  if (promptText === 'Select your favorite ideas above to generate a custom prompt...') {
    alert('Please select some ideas first!')
    return
  }

  navigator.clipboard.writeText(promptText).then(function() {
    var btn = document.querySelector('.copy-btn')
    var originalText = btn.textContent
    btn.textContent = 'Copied!'
    btn.style.background = '#4caf50'

    setTimeout(function() {
      btn.textContent = originalText
      btn.style.background = ''
    }, 2000)
  })
}

// Add change listeners to all checkboxes
document.querySelectorAll('.idea-checkbox').forEach(function(checkbox) {
  checkbox.addEventListener('change', updatePrompt)
})
</script>
```

### 4.2 Fill in Company Context

Replace the placeholders in `getCompanyContext()`:
- `[INDUSTRY]` - e.g., "real estate", "e-commerce"
- `[COMPANY NAME]` - Their company name
- `[1-2 sentence description]` - What they do
- `[1 sentence about target customers]` - Who they serve
- `[1 sentence about what they offer]` - Products/services

## Phase 5: Styling with Brand

### 5.1 Use Brand Colors

```css
:root {
  --primary-color: #hexcode; /* From brand guidelines */
  --secondary-color: #hexcode;
  --accent-color: #hexcode;
}

.idea-card {
  border-left: 3px solid var(--accent-color);
}

.copy-btn {
  background: var(--primary-color);
  color: white;
}
```

### 5.2 Use Brand Fonts

```html
<link href="https://fonts.googleapis.com/css2?family=FontName&display=swap" rel="stylesheet">

<style>
body {
  font-family: 'FontName', Arial, sans-serif;
}
</style>
```

### 5.3 Checkbox Styling

```css
.idea-card {
  display: flex;
  gap: 1rem;
  padding: 1.5rem;
  background: white;
  border-radius: 8px;
  border-left: 3px solid var(--accent-color);
  margin-bottom: 1rem;
  transition: all 0.3s;
}

.idea-card:hover {
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.idea-checkbox {
  width: 20px;
  height: 20px;
  cursor: pointer;
  flex-shrink: 0;
  margin-top: 0.2rem;
}

.idea-card label {
  cursor: pointer;
  flex: 1;
}

.idea-card h3 {
  font-size: 1.1rem;
  margin-bottom: 0.5rem;
  color: var(--primary-color);
}

.idea-card p {
  color: #555;
  line-height: 1.5;
}
```

## Success Criteria

Before marking complete, verify:

- ✅ All 100 ideas are tailored to client's business/industry
- ✅ Ideas organized in 6-8 relevant categories
- ✅ Each idea has checkbox, bold title, 1-2 sentence description
- ✅ Instructions clear at top
- ✅ Checkboxes work (can check/uncheck)
- ✅ Prompt updates automatically when boxes checked/unchecked
- ✅ Company context filled in (not placeholder text)
- ✅ Click-to-copy button works
- ✅ Styled with client's brand colors and fonts
- ✅ Mobile responsive
- ✅ Screenshot shows page looking professional

## Tips for Quality Ideas

1. **Be Specific**: "AI-generated weekly market reports for your listings" not "Use AI for reports"
2. **Show Value**: Include time savings or benefits
3. **Vary Complexity**: Mix quick wins with bigger projects
4. **Stay Relevant**: Every idea should make sense for their business
5. **Be Actionable**: They should know what to do next

## Common Categories by Industry

**Service Businesses:**
- Client communication, Proposal generation, Scheduling, Follow-ups

**Product Businesses:**
- Product descriptions, Customer support, Inventory, Marketing

**Content Creators:**
- Content ideas, SEO, Social media, Repurposing

**B2B:**
- Lead qualification, Sales emails, Research, Presentations

## Final Steps

1. Test checkbox functionality
2. Test prompt generation with different selections
3. Test copy-to-clipboard
4. Take screenshot
5. Update client's CLAUDE.md checklist
6. Mark "100 Ideas" as complete
