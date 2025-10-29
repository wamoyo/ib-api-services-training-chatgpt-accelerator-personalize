// Show metrics dashboard for personalized deliverables
// Usage: npm run metrics

import { DynamoDBClient } from '@aws-sdk/client-dynamodb'
import { DynamoDBDocumentClient, QueryCommand } from '@aws-sdk/lib-dynamodb'

var dynamoDb = new DynamoDBClient({ region: 'us-east-1' })
var db = DynamoDBDocumentClient.from(dynamoDb)

async function getMetrics () {
  console.log('Querying DynamoDB for application metrics...\n')

  // Query for all AI Accelerator applications
  var result = await db.send(new QueryCommand({
    TableName: 'www.innovationbound.com',
    KeyConditionExpression: 'pk = :pk',
    ExpressionAttributeValues: {
      ':pk': 'application#ai-accelerator'
    }
  }))

  var applications = result.Items || []
  var totalApps = applications.length
  var gotEmail2 = applications.filter(app => app.email2Sent).length
  var gotEmailP = applications.filter(app => app.emailPSent).length
  var readyToBuild = applications.filter(app => app.email2Sent && !app.emailPSent).length

  console.log('='.repeat(50))
  console.log('  PERSONALIZED DELIVERABLES METRICS')
  console.log('='.repeat(50))
  console.log()
  console.log(`  Total Applications:           ${totalApps}`)
  console.log(`  Got Email 2 (Scholarship):    ${gotEmail2}`)
  console.log(`  Got Email P (Deliverables):   ${gotEmailP}`)
  console.log()
  console.log(`  Ready to Build:               ${readyToBuild}`)
  console.log()
  console.log('='.repeat(50))
  console.log()

  if (readyToBuild > 0) {
    console.log(`Next step: npm run loadup ${Math.min(readyToBuild, 10)}`)
  } else {
    console.log('No applicants ready for deliverables.')
  }
}

getMetrics().catch(function(error) {
  console.error('Error:', error)
  process.exit(1)
})
