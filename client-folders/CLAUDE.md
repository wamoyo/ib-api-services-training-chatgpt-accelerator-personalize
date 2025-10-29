# Client Tracking

Progress tracking for all AI Accelerator personalized deliverables.

## Active Clients

| Client Email | Email Slug | Status | Deliverables Complete | Deployed to S3 | Email Sent |
|--------------|------------|--------|-----------------------|----------------|------------|
| - | - | - | 0/5 | No | No |

## Status Values

- **Not Started** - Client folder not yet created
- **Research** - Gathering brand data from website
- **In Progress** - Building deliverables
- **Ready to Deploy** - All 5 deliverables complete, not yet on S3
- **Deployed** - On S3, ready to send email
- **Complete** - Email sent to client

## Deliverable Checklist (Per Client)

Each client needs 5 deliverables:

1. **Brand Guidelines** - `brand-guidelines-for-{email-slug}/`
2. **100 AI Ideas** - `100-ideas-for-{email-slug}/`
3. **Competitor Report** - `competitor-report-for-{email-slug}/`
4. **Writing Style Guide** - `writing-style-guide-for-{email-slug}/`
5. **Podcast Guest List** - `podcast-list-for-{email-slug}/`

## Adding a New Client

```bash
cd client-folders
EMAIL_SLUG=$(node -p "encodeURIComponent('email@company.com'.toLowerCase())")
mkdir $EMAIL_SLUG
cp ../templates/client-template/CLAUDE.md $EMAIL_SLUG/CLAUDE.md
mkdir $EMAIL_SLUG/research
mkdir $EMAIL_SLUG/research/screenshots
mkdir $EMAIL_SLUG/deliverables
```

Then update the table above with client info.

## Deployment Workflow

Once all 5 deliverables are complete for a client:

1. Upload to S3:
```bash
aws s3 sync \
  client-folders/{email-slug}/deliverables/ \
  s3://www.innovationbound.com/private/five-customized-ai-demos/ \
  --profile ibound \
  --region us-east-1 \
  --exclude ".*"
```

2. Verify URLs work (check each deliverable)
3. Update table: Change "Deployed to S3" to "Yes"
4. Send personalized email with links
5. Update table: Change "Email Sent" to "Yes", Status to "Complete"

## Archive

Completed clients (moved here after email sent):

| Client Email | Email Slug | Completed Date | S3 URLs |
|--------------|------------|----------------|---------|
| - | - | - | - |
