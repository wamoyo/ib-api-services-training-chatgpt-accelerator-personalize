// Deploy client deliverables to S3
// Usage: npm run bootup <client-email>
// Example: npm run bootup costa@trollhair.com

import { spawn } from 'child_process'
import { existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

var __dirname = dirname(fileURLToPath(import.meta.url))

// Pure: converts email to URL-safe slug
function emailToSlug (email) {
  return encodeURIComponent(email.toLowerCase())
}

// Side effect: Runs AWS S3 sync command
function syncToS3 (sourcePath, s3Path) {
  return new Promise(function(resolve, reject) {
    console.log(`\nSyncing to S3...`)
    console.log(`  Source: ${sourcePath}`)
    console.log(`  Destination: ${s3Path}\n`)

    var args = [
      's3', 'sync',
      sourcePath,
      s3Path,
      '--profile', 'ibound',
      '--region', 'us-east-1'
    ]

    var awsProcess = spawn('aws', args, { stdio: 'inherit' })

    awsProcess.on('close', function(code) {
      if (code === 0) {
        resolve()
      } else {
        reject(new Error(`AWS CLI exited with code ${code}`))
      }
    })

    awsProcess.on('error', function(error) {
      reject(error)
    })
  })
}

async function bootup () {
  var clientEmail = process.argv[2]

  if (!clientEmail) {
    console.error('Usage: npm run bootup <client-email>')
    console.error('Example: npm run bootup costa@trollhair.com')
    process.exit(1)
  }

  var emailSlug = emailToSlug(clientEmail)
  var clientFoldersPath = join(__dirname, '..', 'client-folders')
  var clientPath = join(clientFoldersPath, emailSlug)
  var deliverablesPath = join(clientPath, 'deliverables')

  // Verify client folder exists
  if (!existsSync(clientPath)) {
    console.error(`Error: Client folder not found: ${clientPath}`)
    console.error(`Run: npm run loadup first`)
    process.exit(1)
  }

  // Verify deliverables folder exists
  if (!existsSync(deliverablesPath)) {
    console.error(`Error: Deliverables folder not found: ${deliverablesPath}`)
    console.error(`Create deliverables first`)
    process.exit(1)
  }

  // Verify at least one deliverable exists
  var deliverables = [
    'brand-guidelines',
    '100-ideas',
    'competitor-report',
    'writing-style-guide',
    'podcast-list'
  ]

  var existing = deliverables.filter(function(d) {
    return existsSync(join(deliverablesPath, d))
  })

  if (existing.length === 0) {
    console.error(`Error: No deliverable folders found in ${deliverablesPath}`)
    console.error(`Expected one of: ${deliverables.join(', ')}`)
    process.exit(1)
  }

  console.log(`\nDeploying ${existing.length} deliverable(s) for ${clientEmail}:`)
  existing.forEach(d => console.log(`  • ${d}`))

  // S3 paths
  var s3Bucket = 's3://www.innovationbound.com'
  var s3Path = `${s3Bucket}/private/five-customized-ai-demos/${emailSlug}/`

  try {
    await syncToS3(deliverablesPath, s3Path)

    console.log('\n✓ Deployment successful!\n')
    console.log('URLs:')
    existing.forEach(function(deliverable) {
      var url = `https://www.innovationbound.com/private/five-customized-ai-demos/${emailSlug}/${deliverable}/`
      console.log(`  ${url}`)
    })
    console.log()
  } catch (error) {
    console.error('\n✗ Deployment failed:', error.message)
    process.exit(1)
  }
}

bootup().catch(function(error) {
  console.error('Error:', error)
  process.exit(1)
})
