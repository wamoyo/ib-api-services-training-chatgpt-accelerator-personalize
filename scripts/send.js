// Send emails to all ready clients and update DynamoDB
// Usage: npm run send

import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, GetCommand, UpdateCommand } from '@aws-sdk/lib-dynamodb'
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'
import { readFile, writeFile } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createHash } from 'crypto'

var __dirname = dirname(fileURLToPath(import.meta.url))
var dynamoDb = new DynamoDBClient({ region: 'us-east-1' })
var db = DynamoDBDocumentClient.from(dynamoDb)
var ses = new SESClient({ region: 'us-east-1' })
var replyToAddress = "Innovation Bound <support@innovationbound.com>"

// Pure: converts email to hex hash slug (first 12 chars of SHA256)
function emailToSlug (email) {
  return createHash('sha256').update(email.toLowerCase()).digest('hex').substring(0, 12)
}

// Pure: extracts ready clients from tracking markdown
function getReadyClients (tracking) {
  var lines = tracking.split('\n')
  var readyClients = []

  for (let line of lines) {
    if (line.includes('| Ready |')) {
      var parts = line.split('|').map(p => p.trim())
      if (parts[1] && parts[1] !== 'Client Email') {
        readyClients.push(parts[1].toLowerCase())
      }
    }
  }

  return readyClients
}

async function sendEmails () {
  console.log('\nChecking for clients ready to send...\n')

  // Read tracking file
  var trackingPath = join(__dirname, '..', 'client-folders', 'CLAUDE.md')
  var tracking = await readFile(trackingPath, 'utf8')
  var readyClients = getReadyClients(tracking)

  if (readyClients.length === 0) {
    console.log('No clients marked as ready.')
    console.log('Mark clients ready with: npm run ready <client-email>')
    return
  }

  console.log(`Found ${readyClients.length} clients ready to send:\n`)
  readyClients.forEach(email => console.log(`  • ${email}`))
  console.log()

  // Read email templates
  var htmlPath = join(__dirname, '..', 'personalized-deliverables.html')
  var txtPath = join(__dirname, '..', 'personalized-deliverables.txt')
  var rawHtml = await readFile(htmlPath, 'utf8')
  var rawTxt = await readFile(txtPath, 'utf8')

  // Send email to each client
  for (let clientEmail of readyClients) {
    console.log(`Sending to ${clientEmail}...`)

    // Get applicant data from DynamoDB
    var result = await db.send(new GetCommand({
      TableName: 'www.innovationbound.com',
      Key: { pk: 'application#ai-accelerator', sk: clientEmail }
    }))

    if (!result.Item) {
      console.error(`  ✗ Applicant not found in DynamoDB, skipping`)
      continue
    }

    var applicant = result.Item
    var name = applicant.name
    var company = 'Company' // TODO: Extract from website or add to application
    var emailSlug = emailToSlug(clientEmail)

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

    // Send email
    try {
      await ses.send(new SendEmailCommand({
        Destination: {
          ToAddresses: [clientEmail],
          BccAddresses: [replyToAddress]
        },
        Message: {
          Body: {
            Html: { Charset: "UTF-8", Data: html },
            Text: { Charset: "UTF-8", Data: txt }
          },
          Subject: { Charset: "UTF-8", Data: `📑 5 Customized AI Demos To Go With Your Scholarship` }
        },
        ReplyToAddresses: [replyToAddress],
        Source: replyToAddress
      }))

      // Update DynamoDB with emailPSent timestamp
      await db.send(new UpdateCommand({
        TableName: 'www.innovationbound.com',
        Key: { pk: 'application#ai-accelerator', sk: clientEmail },
        UpdateExpression: 'SET emailPSent = :timestamp',
        ExpressionAttributeValues: {
          ':timestamp': new Date().toJSON()
        }
      }))

      console.log(`  ✓ Sent successfully`)
    } catch (error) {
      console.error(`  ✗ Error sending:`, error.message)
    }
  }

  console.log()
  console.log('✓ Batch send complete')
  console.log()
  console.log('Next: npm run metrics (to see updated stats)')
}

sendEmails().catch(function(error) {
  console.error('Error:', error)
  process.exit(1)
})
