// Send test email to yourself before sending to client
// Usage: npm run test <client-email> <your-email>
// Example: npm run test costa@trollhair.com costa@innovationbound.com

import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand } from '@aws-sdk/lib-dynamodb'
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'
import { readFile } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

var __dirname = dirname(fileURLToPath(import.meta.url))
var dynamoDb = new DynamoDBClient({ region: 'us-east-1' })
var db = DynamoDBDocumentClient.from(dynamoDb)
var ses = new SESClient({ region: 'us-east-1' })
var replyToAddress = "Innovation Bound <support@innovationbound.com>"

// Pure: converts email to URL-safe slug
function emailToSlug (email) {
  return encodeURIComponent(email.toLowerCase())
}

async function sendTestEmail () {
  var clientEmail = process.argv[2]
  var testEmail = process.argv[3]

  if (!clientEmail || !testEmail) {
    console.error('Usage: npm run test <client-email> <your-email>')
    console.error('Example: npm run test costa@trollhair.com costa@innovationbound.com')
    process.exit(1)
  }

  console.log(`\nSending test email for ${clientEmail} to ${testEmail}...\n`)

  // Get applicant data from DynamoDB
  var result = await db.send(new GetCommand({
    TableName: 'www.innovationbound.com',
    Key: { pk: 'application#ai-accelerator', sk: clientEmail }
  }))

  if (!result.Item) {
    console.error(`Error: Applicant ${clientEmail} not found in DynamoDB`)
    process.exit(1)
  }

  var applicant = result.Item
  var name = applicant.name
  var company = 'Company' // TODO: Extract from website or add to application
  var emailSlug = emailToSlug(clientEmail)

  // Read email templates
  var htmlPath = join(__dirname, '..', 'personalized-deliverables.html')
  var txtPath = join(__dirname, '..', 'personalized-deliverables.txt')

  var rawHtml = await readFile(htmlPath, 'utf8')
  var rawTxt = await readFile(txtPath, 'utf8')

  // Replace placeholders
  var tracking = `email=${clientEmail}&list=ai-accelerator-applications&edition=personalized-deliverables`
  var emailSettings = `https://www.innovationbound.com/unsubscribe?email=${clientEmail}`

  var html = rawHtml
    .replace(/{{company}}/g, company)
    .replace(/{{email}}/g, clientEmail)
    .replace(/{{name}}/g, name)
    .replace(/{{emailSlug}}/g, emailSlug)
    .replace(/{{tracking}}/g, tracking)
    .replace(/{{emailSettings}}/g, emailSettings)

  var txt = rawTxt
    .replace(/{{company}}/g, company)
    .replace(/{{email}}/g, clientEmail)
    .replace(/{{name}}/g, name)
    .replace(/{{emailSlug}}/g, emailSlug)
    .replace(/{{tracking}}/g, tracking)
    .replace(/{{emailSettings}}/g, emailSettings)

  // Send email to test address
  await ses.send(new SendEmailCommand({
    Destination: {
      ToAddresses: [testEmail]
    },
    Message: {
      Body: {
        Html: { Charset: "UTF-8", Data: html },
        Text: { Charset: "UTF-8", Data: txt }
      },
      Subject: { Charset: "UTF-8", Data: `[TEST] 📑 5 Customized AI Demos To Go With Your Scholarship` }
    },
    ReplyToAddresses: [replyToAddress],
    Source: replyToAddress
  }))

  console.log(`✓ Test email sent to ${testEmail}`)
  console.log()
  console.log(`Review email and verify:`)
  console.log(`  - Links work and point to deliverables`)
  console.log(`  - Company name displays correctly`)
  console.log(`  - Video loads`)
  console.log()
  console.log(`When ready: npm run ready ${clientEmail}`)
}

sendTestEmail().catch(function(error) {
  console.error('Error:', error)
  process.exit(1)
})
