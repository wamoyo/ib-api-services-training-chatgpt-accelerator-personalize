# Competitor Report Template

Instructions for building personalized competitor analysis reports with automated tracking.

## ⚠️ CRITICAL: Use Client's Brand Guidelines

**This deliverable must follow the client's brand guidelines created in deliverable #1.**

Before starting, READ:
- `../brand-guidelines/index.html` - See their colors, fonts, and design patterns
- `../../research/brand-research.md` - Review documented brand details

Use their:
- **Colors** (exact hex codes from brand guidelines)
- **Fonts** (same font families)
- **Design patterns** (buttons, cards, spacing that matches their brand)
- **Visual style** (professional, playful, technical, etc.)

**DO NOT use generic Innovation Bound styling or make up your own colors/fonts.**

## Overview

Build a single-page HTML website that identifies the client's top competitors and provides a ChatGPT Schedules prompt for weekly automated competitor monitoring. The report analyzes competitors based on the client's specific market positioning.

## Output

Self-contained HTML file with:
- Inline CSS matching their brand (colors, fonts from brand guidelines)
- Analysis of what problem they solve and for whom
- 5-8 top competitors with brief profiles
- ChatGPT Schedules prompt for weekly competitor tracking (click-to-copy)
- Instructions on setting up automated weekly monitoring

## Phase 1: Understand Client's Business

### 1.1 Analyze Their Market Position

Use WebFetch on their website:

```
WebFetch(url: "https://example.com/",
         prompt: "What problem does this business solve? Who are their target customers? What makes them unique? What industry are they in?")

WebFetch(url: "https://example.com/about",
         prompt: "What is their mission? What are their core values? How do they position themselves in the market?")

WebFetch(url: "https://example.com/products" or "/services",
         prompt: "What specific products or services do they offer? What are the key features? Who is this for?")
```

### 1.2 Document Key Information

Extract and document:
- **Problem They Solve** (1-2 sentences): The core problem/pain point they address
- **Target Customers** (1 sentence): Who specifically they serve
- **Unique Value** (1 sentence): What makes them different
- **Industry/Category** (2-3 words): e.g., "SaaS Marketing Tools", "Residential Real Estate"
- **Geographic Focus** (if relevant): Local, regional, national, global

## Phase 2: Find Competitors

### 2.1 Web Search for Competitors

Use WebSearch to find competitors:

```
WebSearch(query: "[INDUSTRY] companies [LOCATION] [PROBLEM THEY SOLVE]")
WebSearch(query: "best [PRODUCT/SERVICE TYPE] for [TARGET CUSTOMERS]")
WebSearch(query: "alternatives to [CLIENT COMPANY NAME]")
WebSearch(query: "top [INDUSTRY] businesses [YEAR]")
```

**Examples:**
- "residential real estate agents Tampa Florida"
- "best CRM software for small businesses"
- "alternatives to Mailchimp"
- "top e-commerce marketing agencies 2025"

### 2.2 Research Each Competitor

For each competitor found, use WebFetch:

```
WebFetch(url: "https://competitor.com/",
         prompt: "What do they offer? Who are their customers? What's their market position? How do they compare to [CLIENT]?")
```

Look for:
- Company size (employees, revenue if public)
- Key offerings
- Target market
- Recent news/funding/launches
- Social media presence
- Pricing model (if visible)

### 2.3 Select Top 5-8 Competitors

Choose competitors that are:
- **Direct competitors** (same problem, same customers)
- **Indirect competitors** (different solution to same problem)
- **Aspirational competitors** (where client wants to be)

Prioritize:
- Active and established companies
- Similar target market
- Geographic relevance
- Market visibility

## Phase 3: Build HTML Structure

### 3.1 Header

```html
<header>
  <h1>Competitor Report for [Company Name]</h1>
  <p class="subtitle">Market Analysis & Weekly Tracking | Prepared by Innovation Bound</p>
</header>
```

### 3.2 Market Position Section

```html
<section class="market-position">
  <h2>Your Market Position</h2>

  <div class="position-card">
    <h3>Problem You Solve</h3>
    <p>[1-2 sentences about the core problem they address]</p>
  </div>

  <div class="position-card">
    <h3>Your Target Customers</h3>
    <p>[Description of who they serve]</p>
  </div>

  <div class="position-card">
    <h3>Your Unique Value</h3>
    <p>[What makes them different from competitors]</p>
  </div>
</section>
```

### 3.3 Competitors Section

```html
<section class="competitors-section">
  <h2>Your Top Competitors</h2>
  <p>Based on market analysis, here are the businesses competing for your customers:</p>

  <div class="competitor-grid">
    <div class="competitor-card">
      <h3>Competitor Name</h3>
      <p class="competitor-website"><a href="https://competitor.com" target="_blank">competitor.com</a></p>

      <div class="competitor-details">
        <p><strong>What They Do:</strong> [Brief description of their offering]</p>
        <p><strong>Target Market:</strong> [Who they serve]</p>
        <p><strong>Key Strength:</strong> [What they do well]</p>
        <p><strong>Market Position:</strong> [How they compare - e.g., "Larger, more established" or "Niche focus on X"]</p>
      </div>
    </div>

    <!-- Repeat for 5-8 competitors -->
  </div>
</section>
```

### 3.4 Weekly Tracking Section

```html
<section class="tracking-section">
  <h2>Weekly Competitor Tracking with ChatGPT</h2>

  <div class="instructions">
    <p><strong>Set up automated weekly competitor monitoring:</strong></p>
    <ol>
      <li>Copy the prompt below</li>
      <li>Go to ChatGPT and click on "Schedules" in the sidebar</li>
      <li>Create a new schedule, set it to run weekly (e.g., every Monday at 9am)</li>
      <li>Paste the prompt</li>
      <li>ChatGPT will research your competitors weekly and send you a summary</li>
    </ol>
  </div>

  <button class="copy-btn" onclick="copyPrompt()">Click to Copy Tracking Prompt</button>

  <div class="prompt-box">
    <pre id="tracking-prompt">[Generated prompt - see Phase 4]</pre>
  </div>

  <div class="tracking-info">
    <p><strong>What This Tracks:</strong></p>
    <ul>
      <li>New hires and job postings</li>
      <li>Press releases and news mentions</li>
      <li>Product launches or updates</li>
      <li>Social media activity and engagement</li>
      <li>Pricing or positioning changes</li>
      <li>Funding announcements</li>
    </ul>
  </div>
</section>
```

### 3.5 Footer

```html
<footer>
  <p>Report prepared by Innovation Bound | [Date]</p>
  <p>This is 3 of 5 Customized AI Demos for your business</p>
</footer>
```

## Phase 4: Generate Tracking Prompt

### 4.1 Build the Prompt

The prompt should be specific to their competitors:

```
I run [COMPANY NAME], a [INDUSTRY] business serving [TARGET CUSTOMERS].

Please research my top competitors and provide a weekly summary of any significant changes or updates:

COMPETITORS TO TRACK:
1. [Competitor 1 Name] - [competitor1.com]
2. [Competitor 2 Name] - [competitor2.com]
3. [Competitor 3 Name] - [competitor3.com]
4. [Competitor 4 Name] - [competitor4.com]
5. [Competitor 5 Name] - [competitor5.com]

For each competitor, check for:
- New hires, job postings, or team changes
- Press releases, news articles, or media appearances
- Product launches, feature updates, or service changes
- Social media announcements (LinkedIn, Twitter/X)
- Pricing changes or new pricing tiers
- Funding announcements or acquisitions
- Industry awards or recognition

FORMAT YOUR RESPONSE:
- Start with "Weekly Competitor Update - [Date]"
- List only competitors with noteworthy updates
- For each update, include: What happened, when, and why it matters to my business
- End with "Strategic Insights" highlighting any trends or opportunities I should act on

If no significant changes, reply: "No major competitor updates this week. Your position remains stable."
```

### 4.2 Customize the Prompt

Replace placeholders:
- `[COMPANY NAME]` - Their company name
- `[INDUSTRY]` - Their industry (e.g., "real estate", "SaaS marketing")
- `[TARGET CUSTOMERS]` - Who they serve
- List of 5-8 competitors with names and websites

## Phase 5: JavaScript for Copy Functionality

```javascript
<script>
// Side effect: Copies tracking prompt to clipboard
function copyPrompt () {
  var promptText = document.getElementById('tracking-prompt').textContent

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

## Phase 6: Styling with Client's Brand

### 6.1 Extract Colors from Brand Guidelines

Open `../brand-guidelines/index.html` and copy the exact CSS variables:

```css
:root {
  /* Copy these EXACT values from brand-guidelines/index.html */
  --primary-color: #hexcode;
  --secondary-color: #hexcode;
  --accent-color: #hexcode;
  /* Add any other colors they defined */
}
```

Apply to cards, buttons, and interactive elements to match their brand.

### 6.2 Use Their Fonts

Copy the exact Google Fonts link and font-family from brand-guidelines:

```html
<link href="https://fonts.googleapis.com/css2?family=TheirFont&display=swap" rel="stylesheet">

<style>
body {
  font-family: 'TheirFont', Arial, sans-serif; /* Use their actual font */
}
</style>
```

### 6.3 Match Their Design Patterns

Look at how cards, buttons, and spacing are styled in brand-guidelines, then replicate that aesthetic.

**IMPORTANT:** Don't use generic CSS patterns. Study their brand guidelines and create CSS that matches THEIR visual style.

## Success Criteria

Before marking complete, verify:

- ✅ Market position clearly defined (problem, customers, unique value)
- ✅ 5-8 relevant competitors identified
- ✅ Each competitor has: name, website, what they do, target market, strength, position
- ✅ ChatGPT Schedules prompt is complete and specific
- ✅ Competitor list in prompt matches competitor cards
- ✅ Instructions for setting up ChatGPT Schedules are clear
- ✅ Click-to-copy functionality works
- ✅ Styled with client's brand colors and fonts
- ✅ Professional, actionable, easy to read
- ✅ Screenshot shows complete page

## Tips for Quality Competitor Analysis

1. **Be Realistic**: Include actual competitors, not just aspirational ones
2. **Be Specific**: "Larger with 50+ employees" not just "bigger"
3. **Be Helpful**: Note what makes each competitor strong (learn from them)
4. **Be Honest**: If they're a market leader, say so
5. **Mix Types**: Direct competitors + indirect + aspirational

## What ChatGPT Schedules Is

ChatGPT Schedules is a feature in ChatGPT that allows you to:
- Set up recurring automated tasks
- Schedule them weekly, monthly, etc.
- Receive results automatically via email or in ChatGPT
- Perfect for ongoing monitoring like competitor tracking

Users copy the prompt, create a schedule, and ChatGPT automatically runs the research weekly.

## Common Competitor Categories

**By Competition Type:**
- Direct: Same solution, same customers
- Indirect: Different solution, same problem
- Aspirational: Where they want to be in 3-5 years

**By Size:**
- Larger established players
- Similar-sized peers
- Emerging newcomers

**By Geography:**
- Local/regional competitors
- National players
- International (if relevant)

## Final Steps

1. Test copy-to-clipboard functionality
2. Verify all competitor websites are accessible
3. Take screenshot
4. Update client's CLAUDE.md checklist
5. Mark "Competitor Report" as complete
