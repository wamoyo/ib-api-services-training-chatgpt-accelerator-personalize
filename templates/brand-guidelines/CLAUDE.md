# Brand Guidelines Template

Instructions for building personalized brand guidelines websites using Claude Code.

## ⚠️ CRITICAL: Extract Client's ACTUAL Brand

**DO NOT use Innovation Bound's brand or any prescriptive styling!**

This deliverable must:
- Extract the client's ACTUAL colors from their website CSS
- Use the client's ACTUAL fonts
- Use the client's ACTUAL logo
- Match the client's ACTUAL brand personality

**The brand guidelines you create will be used as the source for styling ALL other deliverables (100 ideas, competitor report, writing guide, podcast list).**

## Overview

Build a single-page HTML website that showcases a company's actual brand guidelines while following those same guidelines. Extract real brand data (logo, colors, fonts, messaging) from their website and present it in a professional, polished format.

## Output

Self-contained HTML file with:
- Inline CSS in `<style>` tag
- Optional inline JavaScript in `<script>` tag
- Click-to-copy JavaScript functionality (required for ChatGPT prompt and style suggestions)
- Google Fonts via CDN link
- Relative paths for assets (logo.png, fonts/)
- Explainer video at top (reference videos from https://www.innovationbound.com/videos/)
- 12-17 sections covering visual identity, brand voice, and AI usage guidelines

## Phase 1: Research & Data Extraction

### 1.1 Initial Website Analysis

Use WebFetch to understand the business:

```
WebFetch(url: "https://example.com/",
         prompt: "Extract SEO meta tags, navigation structure, key messaging,
                  company overview, value propositions, target markets, and brand positioning")
```

### 1.2 Download Homepage HTML

```bash
curl -s https://example.com/ > research/homepage.html
```

If content is compressed:
```bash
curl -s -H "Accept-Encoding: gzip, deflate" https://example.com/ | gunzip > research/homepage.html
```

### 1.3 Find and Download CSS Files

```bash
# Find stylesheet links
grep -oP 'href="[^"]*\.css[^"]*"' research/homepage.html

# Download main CSS file
curl -sL https://example.com/path/to/style.css -o research/main.css
```

### 1.4 Extract Colors

```bash
# Find hex codes in HTML
curl -s https://example.com/ | grep -oP '#[0-9a-fA-F]{6}' | sort -u

# Find colors in CSS
grep -oP '#[0-9a-fA-F]{6}' research/main.css | sort -u
```

Document 3-6 primary brand colors.

### 1.5 Extract Fonts

```bash
# Find font-family declarations
grep -oP 'font-family:[^;]+' research/homepage.html | head -10

# Look for Google Fonts or custom fonts
grep -i "fonts.googleapis\|@font-face" research/homepage.html
```

Document primary and secondary fonts.

### 1.6 Download Logo

```bash
# Find logo in HTML
curl -s https://example.com/ | grep -i "logo" | grep -oP 'src="[^"]*"'

# Download logo
curl -sL https://example.com/path/to/logo.png -o research/logo.png

# Verify it downloaded correctly
file research/logo.png
```

Use Read tool to view logo and confirm it's correct.

### 1.7 Analyze Additional Pages

Use WebFetch on multiple pages to understand brand voice:

```
WebFetch(url: "https://example.com/about/",
         prompt: "Extract tone, writing style, key messaging, company values, mission")

WebFetch(url: "https://example.com/products/",
         prompt: "Note technical language, product descriptions, value propositions")
```

### 1.8 Take Screenshots

Use Puppeteer to capture full-page screenshots:

```bash
# Install puppeteer (if not already installed)
cd ../../tools
npm install puppeteer

# Take homepage screenshot
node screenshot.js https://example.com/ ../client-folders/{email-slug}/research/screenshots/homepage.png
```

### 1.9 Document Research

Create `research/brand-research.md` with all findings:

```markdown
# Company Name Brand Research

## Company Overview
- Name:
- Website:
- Industry:
- Target Market:

## Colors
- Primary: #hexcode
- Secondary: #hexcode
- Accent: #hexcode

## Fonts
- Primary: Font Name
- Secondary: Font Name
- Google Fonts: Yes/No

## Logo
- Location: research/logo.png
- File type: PNG/SVG
- Notes: (transparency, colors, etc.)

## Brand Voice
- Tone: (professional, friendly, technical, etc.)
- Key Messages:
- Value Propositions:

## Technical Details
- CSS file analyzed
- SEO meta description
- Tagline/slogan
```

## Phase 2: Build HTML Brand Guidelines

### 2.1 Start with Template

Copy `templates/brand-guidelines/index.html` to:
```
deliverables/brand-guidelines/index.html
```

### 2.2 HTML Structure Requirements

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Company Name - Brand Guidelines</title>

    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=FontName:wght@300;400;600;700&display=swap" rel="stylesheet">

    <style>
        :root {
            /* Brand colors as CSS variables */
            --primary-color: #hexcode;
            --secondary-color: #hexcode;
            --accent-color: #hexcode;
        }

        body {
            font-family: 'FontName', Arial, sans-serif;
            margin: 0;
            padding: 0;
            color: #333;
        }

        /* Let CSS handle layout - no manual heights */
        /* Use flexbox, grid, auto margins */
    </style>
</head>
<body>
    <!-- Content sections here -->
</body>
</html>
```

### 2.3 Key CSS Techniques

**Use CSS Variables for Brand Colors:**
```css
:root {
    --brand-primary: #003d71;
    --brand-secondary: #289dcc;
}

.primary-button {
    background: var(--brand-primary);
}
```

**Handle Logo Visibility on Dark Backgrounds:**
```css
.dark-background img {
    filter: brightness(0) invert(1);
}
```

**Create Live Design Elements (Not Images):**
```html
<!-- Real buttons -->
<button class="btn-primary">Primary Button</button>

<!-- Real color swatches -->
<div style="background: var(--brand-primary); height: 180px;"></div>

<!-- Live typography examples -->
<h1 class="type-h1">This is a Real Heading</h1>
```

## Phase 3: Required Sections

Build these sections in order (13-18 sections depending on client needs):

### 1. Header
- Company logo
- Title: "Brand Guidelines for [Company Name]"
- Attribution: "Prepared for [Client Name] by Innovation Bound"
- **THIS MUST BE FIRST** so people know what they're looking at

### 2. Introduction Text
- Positioned immediately after header
- Clear, professional instructions highlighting the two AI-ready features
- Styled as an info box or callout

**Example text:**
```
📌 How to Use These Brand Guidelines with AI

Two features below help you maintain brand consistency when using AI tools:

1. AI Brand Prompt (collapsed section below) — Copy this into ChatGPT to ensure AI-generated content follows your brand guidelines

2. AI Image Style Suggestions (scroll down) — Pre-written prompts for AI image generators, no design degree required

This is 1 of 5 Customized AI Demos prepared for your business.
```

### 3. AI Brand Prompt
- **IMPORTANT:** This section comes RIGHT AFTER THE VIDEO
- **Title:** "AI Brand Prompt" (not "ChatGPT Brand Prompt")
- **COLLAPSED BY DEFAULT** - Use collapsible/expandable UI so it's compact
- Use show/hide toggle button or details/summary HTML element
- Copy-paste ready prompt with click-to-copy functionality
- Includes:
  - Brand colors (hex codes)
  - Font choices
  - Writing style guidelines
  - Key messaging
  - DO/DON'Ts

### 4. Brand Overview
- Company name and tagline
- Mission statement or positioning
- Industry/expertise
- Target markets

### 5. Brand Personality
- 6 trait cards with icons/descriptions
- Examples: Professional, Innovative, Trustworthy, Customer-Focused, Technical, Approachable

### 6. Visual Identity Divider
- Section break/heading

### 7. Color Palette
- Primary color with hex code
- 3-5 supporting colors with hex codes
- Live color swatches (actual `<div>` elements, not images)

### 8. Typography
- Primary font family
- Font hierarchy (h1, h2, h3, body)
- Live typography examples (actual headings and text)
- **IMPORTANT:** Typography examples must be LEFT-ALIGNED (not centered) so readers can see the actual font styling
- If you need centered headings elsewhere on the page, use a specific class like `.centered-heading`, don't apply `text-align: center` to all h1, h2, h3 tags globally

### 9. Logo Usage
- Logo on white background
- Logo on dark background (use CSS filter if needed)
- Spacing guidelines

### 10. Design Elements
- Primary button style (live button)
- Secondary button style
- Card/container styles
- Other UI patterns

### 11. Style Suggestions for AI Generated Images
- **NEW SECTION:** Multiple copyable style suggestions for AI image generation
- **Positioned AFTER visual identity sections** (colors, typography, logo, design) so users understand brand first
- Each suggestion has:
  - Title/name of the style
  - Brief description of when to use it
  - **VISIBLE full prompt text** that will be copied (don't hide it with display:none)
  - Click-to-copy button
- Tailored to brand personality and industry
- 4-6 style suggestions that match their brand
- **IMPORTANT:** Users must see exactly what they're copying before they click

### 12. Brand Voice Divider
- Section break/heading

### 13. Key Messaging
- Tagline/slogan
- Value propositions (3-5 bullet points)
- Target audience description

### 14. Writing Style
- Tone characteristics (3-5 attributes)
- DO/DON'T guidelines for copy
- Examples of good brand voice

### 15. Technical Language (Optional)
- Industry terminology (if applicable)
- Preferred terms
- Terms to avoid
- Skip if not relevant to client

### 16. Usage Guidelines
- Comprehensive do's and don'ts
- Brand consistency requirements

### 17. Footer
- Company contact information
- "Prepared by Innovation Bound" credit
- Date generated

## Phase 4: Screenshot & Iterate

### 4.1 Generate Screenshot

```bash
cd ../../tools
node screenshot.js ../client-folders/{email-slug}/deliverables/brand-guidelines/index.html
```

### 4.2 Review Screenshot

Use Read tool to view the screenshot:
```
Read(file_path: "client-folders/{email-slug}/deliverables/brand-guidelines/screenshots/preview.png")
```

### 4.3 Check For Issues

Look carefully for:
- ✅ Content cut off or overflow?
- ✅ Text too small or too large?
- ✅ Logo visible on both light/dark backgrounds?
- ✅ Colors accurate to brand?
- ✅ Layout broken or misaligned?
- ✅ Fonts loading correctly?
- ✅ All 15 sections present?

### 4.4 Fix and Regenerate

Fix any issues in the HTML/CSS, then regenerate screenshot. **Repeat until perfect.**

**DO NOT declare work "done" without visually verifying the output.**

## Phase 5: Copy Logo and Assets

### 5.1 Copy Logo

```bash
cp research/logo.png deliverables/brand-guidelines/logo.png
```

### 5.2 Copy Custom Fonts (If Needed)

Only if Google Fonts doesn't have the font:
```bash
mkdir deliverables/brand-guidelines/fonts
cp research/fonts/* deliverables/brand-guidelines/fonts/
```

Update HTML to reference local fonts:
```html
<link href="fonts/custom-font.woff2" rel="stylesheet">
```

## Success Criteria

Before marking complete, verify:

- ✅ Header with title/attribution comes FIRST (section 1)
- ✅ Explainer video embedded right after header (section 2)
- ✅ AI Brand Prompt positioned right after video (section 3)
- ✅ AI Brand Prompt is COLLAPSED by default (show/hide or details/summary)
- ✅ Click-to-copy JavaScript working for AI Brand Prompt
- ✅ Style Suggestions section positioned AFTER visual identity (section 11)
- ✅ Style suggestion prompts are VISIBLE (not hidden with display:none)
- ✅ Click-to-copy JavaScript working for all style suggestions (4-6 suggestions)
- ✅ Full-page screenshot shows all content (no cut-off)
- ✅ Logo visible on both light and dark backgrounds
- ✅ Fonts load correctly (Google Fonts or local)
- ✅ Colors match actual brand colors
- ✅ All required sections present and properly formatted (12-17 sections)
- ✅ Design elements are live (real buttons, real swatches)
- ✅ Looks professional and polished
- ✅ HTML file is self-contained with inline CSS and JavaScript
- ✅ Assets use relative paths

## Click-to-Copy JavaScript Implementation

Add this JavaScript before the closing `</body>` tag:

```javascript
<script>
// Click-to-copy functionality
function copyToClipboard (text, button) {
  navigator.clipboard.writeText(text).then(function() {
    var originalText = button.textContent
    button.textContent = 'Copied!'
    button.style.background = '#4caf50'

    setTimeout(function() {
      button.textContent = originalText
      button.style.background = ''
    }, 2000)
  })
}

// Add click handlers to all copy buttons
document.querySelectorAll('.copy-btn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var targetId = this.getAttribute('data-copy-target')
    var textElement = document.getElementById(targetId)
    var textToCopy = textElement.textContent || textElement.innerText
    copyToClipboard(textToCopy, this)
  })
})
</script>
```

**HTML Structure for Copyable Content:**

```html
<!-- AI Brand Prompt (COLLAPSED by default using details/summary) -->
<details class="prompt-collapsible">
  <summary>
    AI Brand Prompt
    <span class="toggle-indicator">▼ Click to expand</span>
  </summary>
  <div class="prompt-content-wrapper">
    <p>Copy this prompt and paste it into ChatGPT or another AI tool:</p>
    <button class="copy-btn" data-copy-target="ai-brand-prompt">Click to Copy Prompt</button>
    <div class="prompt-box">
      <pre id="ai-brand-prompt">Your prompt text here...</pre>
    </div>
  </div>
</details>

<!-- Style Suggestion Example (prompt text VISIBLE) -->
<div class="style-card">
  <h3>Photorealistic</h3>
  <p>Description of when to use this style</p>
  <div id="style-1" class="style-prompt">
    photorealistic, high resolution, natural lighting, professional photography
  </div>
  <button class="copy-btn" data-copy-target="style-1">Click to Copy</button>
</div>
```

**CSS Note:** Do NOT use `display: none` on `.style-prompt` - the text must be visible so users can see what they're copying.

**CSS for Collapsible Prompt:**

```css
details.prompt-collapsible summary {
  cursor: pointer;
  list-style: none;
}

details.prompt-collapsible summary::-webkit-details-marker {
  display: none;
}

details.prompt-collapsible[open] .toggle-indicator::before {
  content: "▲ Click to collapse";
}
```

## Common Issues & Solutions

**Logo Not Visible on Dark Background:**
```css
.dark-background img {
    filter: brightness(0) invert(1);
}
```

**Content Overflow:**
- Use CSS flexbox/grid instead of fixed heights
- Let content determine size naturally
- Never declare work done without screenshot verification

**Fonts Not Loading:**
- Use Google Fonts (most reliable)
- Include proper `<link>` tag in `<head>`
- Specify fallback fonts: `font-family: 'Open Sans', Arial, sans-serif;`

**Colors Look Wrong:**
- Extract actual hex codes from CSS, don't guess
- Use browser dev tools if needed
- Define as CSS variables for consistency

**Typography Examples Centered (h2 centered but h1/h3 not):**
- Don't apply `text-align: center` to h1, h2, h3 tags globally
- Typography section must show LEFT-ALIGNED examples so readers see the actual font styling
- If you need centered headings elsewhere, use a specific class like `.hero-heading { text-align: center; }`

## Generating AI Image Style Suggestions

For the "Style Suggestions for AI Generated Images" section, create 4-6 suggestions tailored to the client's brand. Each style suggestion must be:

**IMPORTANT FORMAT REQUIREMENTS:**
1. **Instructional Tone** - Write as clear instructions, not keyword lists
2. **Style-Focused** - Focus ONLY on visual style, not composition or content
3. **Conversational** - Use natural language: "Use a...", "Keep it...", "Make it..."
4. **No Subjects** - Don't mention people, objects, or scenes (that's composition, not style)

**Good Example:**
```
Use a modern flat illustration style with a vibrant color palette (golden yellow #FCCD06, cyan #25D7F2). Add decorative dots and circles with geometric shapes and clean lines. Make it playful and energetic with a vector art style. Keep it professional but fun.
```

**Bad Example (keyword-stuffed, includes composition):**
```
diverse group of women at laptop, vibrant colors, golden yellow, cyan, modern coworking space, colorful decorative elements, professional photography style
```

**What to Include in Style Suggestions:**
1. **Brand Personality:** Match the tone (professional, playful, technical, artistic, etc.)
2. **Industry Appropriateness:** Consider what visual styles fit their industry
3. **Brand Colors:** Always reference their actual hex codes from brand guidelines
4. **Visual Techniques:** Mention lighting, textures, art styles, but NOT specific subjects

## Final Steps

1. Add explainer video at top (use placeholder from /videos/)
2. Test click-to-copy functionality for ChatGPT prompt
3. Test click-to-copy functionality for all style suggestions
4. Take final screenshot
5. Verify all assets are in deliverable folder
6. Update client's CLAUDE.md checklist
7. Mark "Brand Guidelines" as complete
8. Move to next deliverable or deploy to S3
