# Podcast Guest List Template

Instructions for building personalized podcast guest prospect lists with ready-to-send outreach messages and marketing training.

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

Build a single-page HTML website that identifies 3-5 ideal podcast guests who are either target customers OR well-networked with target customers. For each prospect, find specific content they created, and draft a personalized outreach message referencing that content. Link to Innovation Bound's proven podcast marketing training that achieves 28% response rates.

## Output

Self-contained HTML file with:
- Inline CSS matching their brand (colors, fonts from brand guidelines)
- Analysis of client's target customers and ideal guest profile
- 3-5 curated podcast guest prospects with:
  - LinkedIn profile link
  - Link to specific content they created (article, post, video, etc.)
  - Personalized draft message referencing that content (click-to-copy)
- Link to Innovation Bound's podcast marketing training
- Why podcasting works for their business

## Phase 1: Understand Target Customers

### 1.1 Analyze Client's Business

Use WebFetch to understand who they serve:

```
WebFetch(url: "https://example.com/",
         prompt: "Who are their target customers? What problems do these customers have? What demographics? What industries?")

WebFetch(url: "https://example.com/about",
         prompt: "What is their ideal customer profile? Who do they want to reach? What markets are they targeting?")

WebFetch(url: "https://example.com/services" or "/products",
         prompt: "Who would buy this? What buyer personas? What decision-makers are they trying to reach?")
```

### 1.2 Document Target Customer Profile

Extract and document:
- **Target Customer Description** (2-3 sentences): Who they want to reach
- **Industries/Sectors** (comma-separated): Where their customers work
- **Job Titles/Roles** (list): Decision-makers who buy from them
- **Pain Points** (3-5 items): Problems their customers face
- **Geographic Focus** (if relevant): Where their customers are located

**Example:**
```
Target Customers: Small business owners in professional services (accounting, law, consulting) who struggle with inefficient client management and want to grow without hiring more staff.

Industries: Accounting, Legal, Consulting, Financial Advisory
Job Titles: Managing Partners, Firm Owners, Practice Leaders
Pain Points:
- Inefficient client onboarding
- Manual processes eating up billable hours
- Difficulty scaling without increasing headcount
- Poor client communication systems
```

## Phase 2: Find 3-5 Ideal Podcast Guests

### 2.1 Identify Guest Profile

**Two Key Questions:**
1. Who are the client's target customers?
2. Who is well-networked with those target customers?

**Guest should be one of these:**
- **Target Customers Themselves:** The client's ideal buyers
- **Complementary Service Providers:** Non-competing businesses serving same customers
- **Technology Vendors:** Software/tool companies their customers use
- **Industry Influencers:** Thought leaders their customers follow
- **Authors/Educators:** People who train their target customers

### 2.2 Web Search for 3-5 Prospects

**IMPORTANT:** For each prospect, you MUST find specific content they created to compliment.

Use WebSearch to find prospects:

```
WebSearch(query: "[TARGET CUSTOMER JOB TITLE] LinkedIn posts about [TOPIC]")
WebSearch(query: "[COMPLEMENTARY SERVICE PROVIDER] for [TARGET CUSTOMERS] LinkedIn")
WebSearch(query: "[VENDOR/TOOL] founder CEO LinkedIn articles")
```

**Examples:**
- "accounting firm owner LinkedIn posts about AI automation"
- "marketing consultant for law firms LinkedIn"
- "practice management software CEO LinkedIn articles"

### 2.3 Research Each Prospect and Find Their Content

For each prospect:

1. **Find their LinkedIn profile** (WebSearch or WebFetch)
2. **Search for content they created:**
   - LinkedIn articles or posts
   - Blog posts on their website
   - YouTube videos
   - Instagram posts
   - Podcast guest appearances

Use WebFetch to find specific content:

```
WebFetch(url: "https://linkedin.com/in/prospect-name",
         prompt: "Find recent posts or articles they've published. What topics do they post about? Look for content related to [RELEVANT TOPIC].")

WebFetch(url: "https://prospect-website.com/blog",
         prompt: "Find recent blog posts. Look for content about [RELEVANT TOPIC] that aligns with [CLIENT]'s business.")
```

### 2.4 Document Each Prospect

For each of the 3-5 prospects, document:

- **Name**
- **Title and Company**
- **LinkedIn Profile URL**
- **Specific Content URL** (LinkedIn post, blog article, YouTube video, etc.)
- **What they said** (1-2 sentences summarizing the content)
- **Why they're a great fit** (1-2 sentences about alignment with client's target customers)

**Example:**
```
Name: Sarah Johnson
Title: Managing Partner at Johnson & Associates CPA
LinkedIn: https://linkedin.com/in/sarahjohnsoncpa
Content: https://linkedin.com/posts/sarahjohnsoncpa/ai-automation-accounting-firms
What she said: "AI is transforming how accounting firms handle client communications, saving 10+ hours per week on email responses."
Why she's great: Runs a successful accounting firm, actively posts about AI adoption, networks with accounting firm owners (our target customers).
```

## Phase 3: Build HTML Structure

### 3.1 Header

```html
<header>
  <h1>Podcast Guest Prospects for [Company Name]</h1>
  <p class="subtitle">Curated Guests + Outreach Templates | Prepared by Innovation Bound</p>
</header>
```

### 3.2 Why Podcasting Section

```html
<section class="why-podcasting">
  <h2>Why Podcasting Works for Your Business</h2>

  <p>Hosting a podcast lets you have authentic, long-form conversations with people who network with your ideal customers. Here's why it's powerful:</p>

  <div class="benefit-cards">
    <div class="benefit-card">
      <h3>🎯 Direct Access to Your Market</h3>
      <p>Your guests bring their audience (your target customers) to your show.</p>
    </div>

    <div class="benefit-card">
      <h3>🤝 Build Strategic Partnerships</h3>
      <p>60-90 minute conversations create deeper relationships than any networking event.</p>
    </div>

    <div class="benefit-card">
      <h3>📈 Content That Works for You</h3>
      <p>One episode becomes: blog posts, social media content, email newsletters, video clips.</p>
    </div>

    <div class="benefit-card">
      <h3>💼 Position as Industry Authority</h3>
      <p>Hosting a show elevates your credibility and thought leadership.</p>
    </div>
  </div>
</section>
```

### 3.3 Your Target Customers Section

```html
<section class="target-customers">
  <h2>Your Target Customers</h2>

  <p>[2-3 sentence description of who they want to reach]</p>

  <div class="customer-details">
    <div class="detail-card">
      <h3>Industries</h3>
      <p>[List of industries/sectors]</p>
    </div>

    <div class="detail-card">
      <h3>Decision Makers</h3>
      <p>[List of job titles/roles]</p>
    </div>

    <div class="detail-card">
      <h3>Key Challenges</h3>
      <ul>
        <li>[Pain point 1]</li>
        <li>[Pain point 2]</li>
        <li>[Pain point 3]</li>
      </ul>
    </div>
  </div>
</section>
```

### 3.4 Podcast Guest Prospects Section

```html
<section class="prospects-section">
  <h2>Your Top 3-5 Podcast Guest Prospects</h2>
  <p>These individuals either are your target customers or network directly with them. Each prospect has a personalized outreach message ready to send that references specific content they created.</p>

  <div class="prospects-grid">
    <div class="prospect-card">
      <h3>Sarah Johnson</h3>
      <p class="prospect-title">Managing Partner at Johnson & Associates CPA</p>

      <div class="prospect-details">
        <p><strong>Content They Posted:</strong></p>
        <p class="content-summary">"AI is transforming how accounting firms handle client communications, saving 10+ hours per week on email responses."</p>
        <p><a href="https://linkedin.com/posts/sarahjohnsoncpa/ai-automation-accounting-firms" target="_blank">View Post on LinkedIn »</a></p>

        <p><strong>Why They're a Great Fit:</strong> Runs a successful accounting firm, actively posts about AI adoption, networks with accounting firm owners (your target customers).</p>

        <p><strong>Outreach Message:</strong></p>
        <button class="copy-btn" data-copy-target="message-1">Click to Copy Message</button>
        <div class="message-box">
          <pre id="message-1">Hi Sarah,

I loved what you said about AI transforming client communications in accounting firms! The 10+ hours saved per week really resonated with me.

Would you like to be the next guest on my podcast to talk about that and other passions/interests? I think my audience would really benefit from your insights.

Let me know if you're interested!

Best,
[Your Name]</pre>
        </div>

        <p><strong>LinkedIn Profile:</strong> <a href="https://linkedin.com/in/sarahjohnsoncpa" target="_blank">View Profile »</a></p>
      </div>
    </div>

    <!-- Repeat for 3-5 prospects total -->
  </div>
</section>
```

### 3.5 Podcast Training Section

```html
<section class="training-section">
  <h2>Master the Complete Podcast Outreach Tactic</h2>

  <p>Innovation Bound's podcast outreach system achieves a <strong>28% positive response rate</strong> from cold outreach. This isn't just about hosting a podcast—it's a complete marketing and partnership strategy.</p>

  <div class="training-cta">
    <h3>Get the Full Training</h3>
    <p>Learn the complete step-by-step process:</p>
    <ul>
      <li>How to prospect and identify ideal guests (including automation with ChatGPT Deep Research)</li>
      <li>Messaging techniques that get 28% positive replies (and how one employee got 50%)</li>
      <li>Running prep sessions and drafting questions with AI</li>
      <li>Recording, producing, and editing your podcast with AI tools</li>
      <li>The critical follow-up strategy (understanding reciprocity and lead magnets)</li>
      <li>Nurturing your network long-term for referrals and partnerships</li>
    </ul>

    <a href="https://www.innovationbound.com/chatgpt-training/podcast-invite-marketing-tactic-with-ai" class="cta-button" target="_blank">
      View Complete Training »
    </a>
  </div>
</section>
```

### 3.6 Footer

```html
<footer>
  <p>Podcast guest list prepared by Innovation Bound | [Date]</p>
  <p>This is 5 of 5 Customized AI Demos for your business</p>
</footer>
```

## Phase 4: JavaScript for Copy Functionality

```javascript
<script>
// Side effect: Copies outreach message to clipboard
function copyToClipboard (text, button) {
  navigator.clipboard.writeText(text).then(function() {
    var originalText = button.textContent
    button.textContent = 'Copied!'
    button.style.background = '#4caf50'

    setTimeout(function() {
      button.textContent = originalText
      button.style.background = ''
    }, 2000)
  }).catch(function(err) {
    alert('Failed to copy. Please select and copy manually.')
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

## Phase 5: Styling with Client's Brand

### 5.1 Extract Colors from Brand Guidelines

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

### 5.2 Use Their Fonts

Copy the exact Google Fonts link and font-family from brand-guidelines:

```html
<link href="https://fonts.googleapis.com/css2?family=TheirFont&display=swap" rel="stylesheet">

<style>
body {
  font-family: 'TheirFont', Arial, sans-serif; /* Use their actual font */
}
</style>
```

### 5.3 Match Their Design Patterns

Look at how cards, buttons, and spacing are styled in brand-guidelines, then replicate that aesthetic.

**IMPORTANT:** Don't use generic CSS patterns. Study their brand guidelines and create CSS that matches THEIR visual style.

## Success Criteria

Before marking complete, verify:

- ✅ Target customer profile clearly documented
- ✅ 3-5 curated podcast guest prospects identified
- ✅ Each prospect has:
  - Name, title, company
  - LinkedIn profile link
  - Link to specific content they created (LinkedIn post, blog article, YouTube video, etc.)
  - Summary of what they said in that content
  - Why they're a great fit (alignment with target customers)
  - Personalized outreach message referencing that specific content
- ✅ Outreach messages follow format: "I loved what you said about [TOPIC] here [LINK]. Would you like to be the next guest on my podcast?"
- ✅ Click-to-copy functionality works for all outreach messages (3-5 buttons)
- ✅ Link to actual podcast training page: `/chatgpt-training/podcast-invite-marketing-tactic-with-ai`
- ✅ Why podcasting section explains benefits specific to their business
- ✅ Styled with client's brand colors and fonts
- ✅ Professional, actionable, ready to use immediately
- ✅ Screenshot shows complete page

## Tips for Quality Guest Curation

1. **Find Specific Content First**: Don't invite someone unless you've found content they created that you genuinely appreciate. This is critical for authenticity.

2. **Be Genuine**: Only reach out to people whose content actually resonated with you. The 28% response rate comes from genuine interest, not mass outreach.

3. **Personalize Each Message**: Each outreach message should reference the specific content (with link). Never use generic templates.

4. **Prioritize Alignment**: Target customers OR people well-networked with target customers. No one else.

5. **Active on LinkedIn**: Verify their LinkedIn profile is public and active. LinkedIn is the preferred platform for outreach.

6. **Quality Over Quantity**: 3-5 perfect prospects with genuine personalized messages beats 25 generic outreaches.

## Finding Content Examples

**LinkedIn Posts:**
- Search "[Name] LinkedIn" to find their profile
- WebFetch their profile page to see recent posts
- Look for posts about relevant topics

**Blog Articles:**
- WebSearch "[Name] blog" or "[Company Name] blog"
- WebFetch blog page to find recent articles
- Look for articles aligned with client's business

**YouTube Videos:**
- WebSearch "[Name] YouTube"
- Look for talks, interviews, or educational content

**Podcast Guest Appearances:**
- WebSearch "[Name] podcast guest"
- Find episodes where they've been interviewed

## Message Format

Each personalized message should follow this structure:

```
Hi [First Name],

I loved what you said about [SPECIFIC TOPIC] [here/in your post/in your article]. [One sentence about what resonated - optional but recommended]

Would you like to be the next guest on my podcast to talk about that and other passions/interests? I think my audience would really benefit from your insights.

Let me know if you're interested!

Best,
[Client Name]
```

**Key elements:**
- Use first name only
- Reference specific content with link
- Optional: One sentence about what you liked
- Standard podcast invitation
- Keep it short and friendly

## Final Steps

1. Test click-to-copy functionality for all 3-5 outreach messages
2. Verify all prospect LinkedIn profile links work
3. Verify all content links work (LinkedIn posts, blog articles, etc.)
4. Verify training link goes to: `/chatgpt-training/podcast-invite-marketing-tactic-with-ai`
5. Replace `[Your Name]` placeholder in outreach messages with client's actual name
6. Take screenshot
7. Update client's CLAUDE.md checklist
8. Mark "Podcast List" as complete
