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
│           ├── brand-guidelines-for-{email-slug}/
│           │   ├── index.html (self-contained)
│           │   ├── logo.png (deployed)
│           │   └── fonts/ (if Google Fonts fails)
│           ├── 100-ideas-for-{email-slug}/
│           ├── competitor-report-for-{email-slug}/
│           ├── writing-style-guide-for-{email-slug}/
│           └── podcast-list-for-{email-slug}/
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

All client folders and deliverable URLs use **URL encoding** for email addresses to guarantee uniqueness.

Use JavaScript's `encodeURIComponent()` for email addresses:

```javascript
// Pure: converts email to URL-safe slug
function emailToSlug (email) {
  return encodeURIComponent(email.toLowerCase())
}
```

**Examples:**
- `costa@trollhair.com` → `costa%40trollhair.com`
- `John.Doe@Company.com` → `john.doe%40company.com`
- `sales+info@tech-startup.io` → `sales%2Binfo%40tech-startup.io`

**File Paths:**
```
client-folders/costa%40trollhair.com/
deliverables/brand-guidelines-for-costa%40trollhair.com/
```

**URLs:**
```
https://www.innovationbound.com/private/five-customized-ai-demos/brand-guidelines-for-costa%40trollhair.com/
```

**S3 Paths:**
```
s3://www.innovationbound.com/private/five-customized-ai-demos/brand-guidelines-for-costa%40trollhair.com/
```

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
1. Open `personalize/` directory in Claude Code
2. Work through each client folder independently (parallel work)
3. Check off deliverables in each client's `CLAUDE.md`
4. Deploy to S3 when ready

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

### Step 2: Build Deliverables (One at a Time)

For each deliverable:
1. Copy template to `deliverables/{resource}-for-{email-slug}/`
2. Follow template's `CLAUDE.md` instructions
3. Use research data to populate content
4. Take screenshots with `tools/screenshot.js`
5. Iterate until perfect
6. Mark complete in client's CLAUDE.md

### Step 3: Deploy to S3

Each deliverable folder uploads to S3 (bypasses Pug build process):

**Command:**
```bash
aws s3 sync \
  client-folders/costa%40trollhair.com/deliverables/brand-guidelines-for-costa%40trollhair.com/ \
  s3://www.innovationbound.com/private/five-customized-ai-demos/brand-guidelines-for-costa%40trollhair.com/ \
  --profile ibound \
  --region us-east-1
```

**S3 Buckets:**
- Production: `s3://www.innovationbound.com`
- Dev: `s3://dev.innovationbound.com`

**Public URL:**
```
https://www.innovationbound.com/private/five-customized-ai-demos/brand-guidelines-for-costa%40trollhair.com/
```

S3 automatically serves `index.html` when accessing the folder URL.

## Progress Tracking

### Client-Level Tracking

`client-folders/CLAUDE.md` contains table of all clients:

```markdown
| Client Email | Email Slug | Status | Deliverables | Deployed |
|--------------|------------|--------|--------------|----------|
| costa@trollhair.com | costa%40trollhair.com | In Progress | 2/5 | No |
```

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
- Example: `node screenshot-fullpage.js ../client-folders/{email-slug}/deliverables/brand-guidelines-for-{email-slug}/index.html`

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
