# Client: example@company.com

Email Slug: `example%40company.com`

## Client Information

- **Name:** John Doe
- **Company:** Example Company
- **Website:** https://example.com
- **Industry:** [To be filled]
- **Target Market:** [To be filled]

## Research Phase

- [ ] Homepage screenshot captured
- [ ] About page screenshot captured
- [ ] Additional pages screenshotted
- [ ] Logo downloaded
- [ ] Colors extracted from CSS
- [ ] Fonts identified
- [ ] Brand research documented
- [ ] Multiple pages analyzed with WebFetch

## Deliverables Progress

### 1. Brand Guidelines
- [ ] Started
- [ ] HTML built
- [ ] Screenshot taken and verified
- [ ] Completed

### 2. 100 AI Ideas
- [ ] Started
- [ ] HTML built
- [ ] Screenshot taken and verified
- [ ] Completed

### 3. Competitor Report
- [ ] Started
- [ ] HTML built
- [ ] Screenshot taken and verified
- [ ] Completed

### 4. Writing Style Guide
- [ ] Started
- [ ] HTML built
- [ ] Screenshot taken and verified
- [ ] Completed

### 5. Podcast Guest List
- [ ] Started
- [ ] HTML built
- [ ] Screenshot taken and verified
- [ ] Completed

## Deployment

- [ ] All 5 deliverables uploaded to S3
- [ ] URLs verified working
- [ ] Links updated in main CLAUDE.md tracker
- [ ] Email sent to client

## S3 URLs

**CALCULATE THE SLUG:** Use the email address from "# Client: EMAIL" at the top of this file:

```javascript
import { createHash } from 'crypto'
var clientEmail = 'EMAIL_FROM_TOP' // Get from "# Client: EMAIL" line above
var emailSlug = createHash('sha256').update(clientEmail.toLowerCase()).digest('hex').substring(0, 12)
console.log(emailSlug) // Use this value in URLs below
```

Once deployed, replace {emailSlug} with the calculated hash:
- Brand Guidelines: `https://www.innovationbound.com/private/five-customized-ai-demos/{emailSlug}/brand-guidelines/`
- 100 Ideas: `https://www.innovationbound.com/private/five-customized-ai-demos/{emailSlug}/100-ideas/`
- Competitor Report: `https://www.innovationbound.com/private/five-customized-ai-demos/{emailSlug}/competitor-report/`
- Writing Style Guide: `https://www.innovationbound.com/private/five-customized-ai-demos/{emailSlug}/writing-style-guide/`
- Podcast List: `https://www.innovationbound.com/private/five-customized-ai-demos/{emailSlug}/podcast-list/`

## Notes

Add any client-specific notes, special requests, or issues encountered here.
