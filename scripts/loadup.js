// Pull batch of applicants from DynamoDB and create client folders
// Usage: npm run loadup <number>
// Example: npm run loadup 10

import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb'
import { readFile, writeFile, mkdir } from 'fs/promises'
import { existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'
import { createHash } from 'crypto'

var __dirname = dirname(fileURLToPath(import.meta.url))
var dynamoDb = new DynamoDBClient({ region: 'us-east-1' })
var db = DynamoDBDocumentClient.from(dynamoDb)

// Pure: converts email to hex hash slug (first 12 chars of SHA256)
function emailToSlug (email) {
  return createHash('sha256').update(email.toLowerCase()).digest('hex').substring(0, 12)
}

// Pure: gets command line argument
function getBatchSize () {
  var size = parseInt(process.argv[2], 10)
  return isNaN(size) ? 10 : size
}

async function loadup () {
  var batchSize = getBatchSize()

  console.log(`Loading up ${batchSize} applicants from DynamoDB...\n`)

  // Query for applicants ready for deliverables
  var result = await db.send(new QueryCommand({
    TableName: 'www.innovationbound.com',
    KeyConditionExpression: 'pk = :pk',
    FilterExpression: 'attribute_exists(email2Sent) AND attribute_not_exists(emailPSent)',
    ExpressionAttributeValues: {
      ':pk': 'application#ai-accelerator'
    }
  }))

  var applicants = result.Items || []

  if (applicants.length === 0) {
    console.log('No applicants ready for deliverables.')
    return
  }

  // Take requested batch size
  var batch = applicants.slice(0, batchSize)

  console.log(`Found ${applicants.length} ready, loading ${batch.length}:\n`)

  // Create folders for each
  var clientFoldersPath = join(__dirname, '..', 'client-folders')

  for (let applicant of batch) {
    var email = applicant.sk
    var name = applicant.name
    var website = applicant.website
    var emailSlug = emailToSlug(email)

    console.log(`  • ${name} (${email})`)

    // Create folder structure
    var clientPath = join(clientFoldersPath, emailSlug)
    var researchPath = join(clientPath, 'research')
    var screenshotsPath = join(researchPath, 'screenshots')
    var deliverablesPath = join(clientPath, 'deliverables')

    if (!existsSync(clientPath)) {
      await mkdir(clientPath, { recursive: true })
      await mkdir(researchPath, { recursive: true })
      await mkdir(screenshotsPath, { recursive: true })
      await mkdir(deliverablesPath, { recursive: true })

      // Create client CLAUDE.md from template
      var template = await readFile(join(clientFoldersPath, 'example%40company.com', 'CLAUDE.md'), 'utf8')
      var clientMd = template
        .replace(/example@company\.com/g, email)
        .replace(/example%40company\.com/g, emailSlug)
        .replace(/John Doe/g, name)
        .replace(/Example Company/g, 'Company Name')
        .replace(/https:\/\/example\.com/g, website)

      await writeFile(join(clientPath, 'CLAUDE.md'), clientMd, 'utf8')
    }
  }

  console.log()
  console.log('✓ Client folders created')
  console.log()
  console.log('Next steps:')
  console.log('  1. Build deliverables with Claude Code')
  console.log('  2. Test: npm run test <client-email> <your-email>')
  console.log('  3. Mark ready: npm run ready <client-email>')
  console.log('  4. Send batch: npm run send')
}

loadup().catch(function(error) {
  console.error('Error:', error)
  process.exit(1)
})
