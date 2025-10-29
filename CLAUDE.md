# Personalized Deliverables Generator

A Claude Code workspace for generating 5 customized AI demonstration resources for AI Accelerator applicants.

## Purpose

This system generates personalized business resources (brand guidelines, AI ideas lists, competitor reports, etc.) that prove AI can add real value to a specific business. These deliverables used to take 15-30 hours to create manually, but can now be built in 30-50 minutes using AI - demonstrating an 18-60x productivity boost.

## System Architecture

### File Structure

```
personalize/
├── CLAUDE.md (this file - main guide)
├── client-folders/
│   ├── CLAUDE.md (client tracking table)
│   └── {email-slug}/
│       ├── CLAUDE.md (progress checklist)
│       ├── research/
│       │   ├── screenshots/
│       │   ├── logo.png
│       │   ├── fonts/ (if needed)
│       │   └── brand-research.md
│       └── deliverables/
│           ├── brand-guidelines/
│           │   ├── index.html (self-contained)
│           │   ├── logo.png (deployed)
│           │   └── fonts/ (if Google Fonts fails)
│           ├── 100-ideas/
│           ├── competitor-report/
│           ├── writing-style-guide/
│           └── podcast-list/
├── templates/
│   ├── brand-guidelines/
│   ├── 100-ideas/
│   ├── competitor-report/
│   ├── writing-style-guide/
│   └── podcast-list/
└── tools/
    └── screenshot.js
```

## Email Slug Naming Convention

All client folders and deliverable URLs use **hex hash slugs** (first 12 characters of SHA256) for clean, collision-free URLs.

Use Node's `crypto` module to generate the hash:

```javascript
import { createHash } from 'crypto'

// Pure: converts email to hex hash slug (first 12 chars of SHA256)
function emailToSlug (email) {
  return createHash('sha256').update(email.toLowerCase()).digest('hex').substring(0, 12)
}
```

**Example:**
```javascript
import { createHash } from 'crypto'

// Example calculation
var email = 'example@company.com'
var slug = createHash('sha256').update(email.toLowerCase()).digest('hex').substring(0, 12)
console.log(slug) // Output: 8e5e16f6e873
```

**Why hex hash?**
- Clean URLs (no special characters, no double-encoding issues)
- Guaranteed unique (SHA256 collision-resistant)
- Works everywhere (emails, social media, texts)
- URL-safe (alphanumeric only)

**File Paths:**
```
client-folders/{emailSlug}/
deliverables/brand-guidelines/
```

**URLs:**
```
https://www.innovationbound.com/private/five-customized-ai-demos/{emailSlug}/brand-guidelines/
```

**S3 Paths:**
```
s3://www.innovationbound.com/private/five-customized-ai-demos/{emailSlug}/brand-guidelines/
```

Where `{emailSlug}` is calculated using the `emailToSlug()` function shown above.

**Mapping:** The email→slug mapping is stored in each client's CLAUDE.md file and in the main tracking table.

## Deliverable Structure

Each deliverable is a **folder** containing:
- `index.html` - Main file with inline CSS/JS
- Supporting assets (logo, fonts, images, etc.)

### HTML File Requirements

**Self-contained where possible:**
- All CSS in `<style>` tag in `<head>`
- All JavaScript in `<script>` tag before `</body>`
- Google Fonts via CDN link (most reliable)

**Assets use relative paths:**
```html
<img src="logo.png" alt="Company Logo">
<link href="fonts/custom-font.woff2" rel="stylesheet">
```

**Explainer videos reference main site:**
```html
<video src="https://www.innovationbound.com/videos/brand-guidelines-explainer.mp4">
```

## The 5 Deliverables

### 1. Brand Guidelines + ChatGPT Prompt
- Single-page website showcasing actual brand
- Extracted: SEO meta tags, CSS colors, fonts, logo
- Includes custom ChatGPT prompt for AI to follow brand
- Template: `templates/brand-guidelines/`

### 2. 100 AI Growth Ideas + Custom Prompts
- List of 100 ideas specific to business/industry
- Tool to customize ChatGPT for building out ideas
- Based on common business problems
- Template: `templates/100-ideas/`

### 3. Competitor Report + Tracking System
- Analysis of top competitors
- ChatGPT prompt for weekly tracking
- Automated competitor activity reporting
- Template: `templates/competitor-report/`

### 4. Writing Style Guide + AI Instructions
- Derived from website copy
- Documents brand's style, tone, voice
- Instructions for AI to match writing style
- Template: `templates/writing-style-guide/`

### 5. Podcast Guest List + Marketing Training
- Curated guests networked with target customers
- Personalized outreach messages
- Podcast marketing training (28% avg response rate)
- Template: `templates/podcast-list/`

## Workflow

## ⚠️ CRITICAL: Build Order and Branding Consistency

**ALWAYS build deliverables in this order:**

1. **Brand Guidelines FIRST** - This extracts the client's actual colors, fonts, logo, and design patterns
2. **All other deliverables** - Use the brand guidelines as the styling source

**Each client's deliverables must follow THEIR brand, not Innovation Bound's brand or generic styling.**

When building deliverables #2-5:
- Open `brand-guidelines/index.html` to see their colors, fonts, design patterns
- Copy CSS variables from their brand guidelines
- Match their visual style (professional, playful, technical, etc.)
- DON'T use prescriptive Innovation Bound styling

### Step 1: Check Stats

```bash
npm run metrics
```

Shows dashboard:
- Total applications
- Got email2 (scholarship notification)
- Got emailP (personalized deliverables)
- **Ready to build** (got email2, no emailP)

### Step 2: Load Batch

```bash
npm run loadup 10
```

- Queries DynamoDB for applicants ready for deliverables
- Creates folder structure for each client
- Adds to `client-folders/CLAUDE.md` tracking table
- Each gets their own `CLAUDE.md` checklist

### Step 3: Build Deliverables

Use Claude Code to build 5 resources for each client:
1. **Start with Brand Guidelines** (always first!)
2. Use brand guidelines as styling source for all other deliverables
3. Work through each client folder independently (parallel work possible)
4. Check off deliverables in each client's `CLAUDE.md`
5. Deploy to S3 when ready

### Step 4: Test Email

```bash
npm run test costa@trollhair.com costa@innovationbound.com
```

- Sends personalized email to YOUR email (not client)
- Verify links work, content looks good
- Does NOT update DynamoDB

### Step 5: Mark Ready

```bash
npm run ready costa@trollhair.com
```

- Validates all 5 deliverable folders exist
- Updates tracking to mark as "Ready"
- Does NOT send email yet

### Step 6: Send Batch

```bash
npm run send
```

- Sends emails to all clients marked "Ready"
- Updates DynamoDB: adds `emailPSent` timestamp
- BCC's support@innovationbound.com

## Detailed Workflow for Each Client

### Step 0: After Loadup Creates Folder

Folder structure automatically created:
```
client-folders/{email-slug}/
├── CLAUDE.md (progress checklist)
├── research/
│   └── screenshots/
└── deliverables/
```

### Step 1: Research Phase

**Goal**: Gather all brand data before building deliverables.

**Tools:**
- `curl` - Download HTML, CSS files
- `WebFetch` - Extract content, messaging, structure
- `puppeteer` - Take full-page screenshots
- `grep` - Find colors, fonts, patterns

**Outputs:**
- `research/screenshots/` - Homepage, about, products pages
- `research/logo.png` - Company logo
- `research/brand-research.md` - All findings documented

### Step 2: Build Deliverables (In Order!)

**BUILD ORDER MATTERS!** Always build brand guidelines first, then use it for styling all others.

**Deliverable #1: Brand Guidelines (FIRST)**
1. Extract client's actual colors, fonts, logo from their website
2. Create brand guidelines that showcase THEIR brand
3. This becomes the styling source for all other deliverables

**Deliverables #2-5: Use Client's Brand Guidelines**
For each remaining deliverable:
1. **READ `brand-guidelines/index.html` first** to see their colors, fonts, design patterns
2. Follow template's `CLAUDE.md` instructions
3. **Copy CSS variables from their brand guidelines** (don't make up colors/fonts)
4. Match their visual style (professional, playful, technical, etc.)
5. Use research data to populate content
6. Take screenshots with `tools/screenshot.js`
7. Iterate until perfect
8. Mark complete in client's CLAUDE.md

### Step 3: Deploy to S3

Each deliverable folder uploads to S3 (bypasses Pug build process):

**Command:**
```bash
npm run bootup costa@trollhair.com
```

Or manually (replace {emailSlug} with calculated hash):
```bash
aws s3 sync \
  client-folders/{emailSlug}/deliverables/ \
  s3://www.innovationbound.com/private/five-customized-ai-demos/{emailSlug}/ \
  --profile ibound \
  --region us-east-1
```

**S3 Buckets:**
- Production: `s3://www.innovationbound.com`
- Dev: `s3://dev.innovationbound.com`

**Public URL:**
```
https://www.innovationbound.com/private/five-customized-ai-demos/{emailSlug}/brand-guidelines/
```

S3 automatically serves `index.html` when accessing the folder URL.

## Progress Tracking

### Client-Level Tracking

`client-folders/CLAUDE.md` contains table of all clients:

```markdown
| Client Email | Email Slug | Status | Deliverables | Deployed |
|--------------|------------|--------|--------------|----------|
| example@company.com | {calculated-slug} | In Progress | 2/5 | No |
```

The Email Slug is calculated using `emailToSlug(email)` function.

### Per-Client Tracking

Each `client-folders/{email-slug}/CLAUDE.md` has checklist:

```markdown
# Client: costa@trollhair.com

## Research
- [x] Website screenshots
- [x] Logo extracted
- [x] Colors/fonts documented
- [x] Brand research complete

## Deliverables
- [x] Brand Guidelines - Completed
- [x] 100 Ideas - Completed
- [ ] Competitor Report - Not Started
- [ ] Writing Style Guide - Not Started
- [ ] Podcast Guest List - Not Started

## Deployment
- [ ] Uploaded to S3
- [ ] URLs verified
- [ ] Email sent to client
```

## Tools

### Screenshot Tools

**screenshot-viewport.js** - For researching client websites:
- Takes 1920x1080 viewport screenshots at full quality
- Use for analyzing brand details (fonts, colors, UI)
- Example: `node screenshot-viewport.js https://example.com homepage`

**screenshot-fullpage.js** - For verifying our deliverables:
- Takes full-page screenshots (compressed if tall)
- Use to check nothing is cut off in our HTML
- Example: `node screenshot-fullpage.js ../client-folders/{email-slug}/deliverables/brand-guidelines/index.html`

Puppeteer installed at system level.

## Templates

Each template directory contains:
- `CLAUDE.md` - Detailed build instructions
- `index.html` - Starting template structure

Templates provide:
- Section structure
- CSS baseline
- Best practices
- Common patterns

## Key Principles

### 1. Screenshot and Verify
- Always take screenshots after changes
- Actually look at them and identify issues
- Iterate until design is perfect

### 2. Extract Real Data
- Don't guess colors, fonts, or messaging
- Pull actual data from website
- Download actual logo files

### 3. Use HTML/CSS (Not PowerPoint)
- HTML is more reliable
- Google Fonts work consistently
- CSS handles layout automatically
- Can iterate quickly

### 4. Keep Assets Organized
- Research data in `research/`
- Final deliverables in `deliverables/`
- Each deliverable has its own folder with assets

### 5. Track Progress Meticulously
- Update checklists as you work
- Document what you've built
- Makes it easy to resume later

## Next Steps

1. Start with brand guidelines (most detail/experience)
2. Build templates for other 4 deliverables
3. Test end-to-end with real client
4. Refine process based on learnings
5. Scale to multiple clients
