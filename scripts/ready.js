// Mark client as ready to send (after testing)
// Usage: npm run ready <client-email>
// Example: npm run ready costa@trollhair.com

import { readFile, writeFile } from 'fs/promises'
import { existsSync } from 'fs'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

var __dirname = dirname(fileURLToPath(import.meta.url))

// Pure: converts email to URL-safe slug
function emailToSlug (email) {
  return encodeURIComponent(email.toLowerCase())
}

async function markReady () {
  var clientEmail = process.argv[2]

  if (!clientEmail) {
    console.error('Usage: npm run ready <client-email>')
    console.error('Example: npm run ready costa@trollhair.com')
    process.exit(1)
  }

  var emailSlug = emailToSlug(clientEmail)
  var clientFoldersPath = join(__dirname, '..', 'client-folders')
  var clientPath = join(clientFoldersPath, emailSlug)
  var clientMdPath = join(clientPath, 'CLAUDE.md')

  // Verify client folder exists
  if (!existsSync(clientPath)) {
    console.error(`Error: Client folder not found: ${clientPath}`)
    console.error(`Run: npm run loadup first`)
    process.exit(1)
  }

  // Verify deliverables folders exist
  var deliverables = [
    'brand-guidelines',
    '100-ideas',
    'competitor-report',
    'writing-style-guide',
    'podcast-list'
  ]

  var deliverablesPath = join(clientPath, 'deliverables')
  var missing = []

  for (let deliverable of deliverables) {
    var path = join(deliverablesPath, deliverable)
    if (!existsSync(path)) {
      missing.push(deliverable)
    }
  }

  if (missing.length > 0) {
    console.error(`Error: Missing deliverable folders:`)
    missing.forEach(d => console.error(`  - ${d}`))
    console.error(`\nComplete all deliverables before marking ready.`)
    process.exit(1)
  }

  // Read client's CLAUDE.md and verify all completed
  var clientMd = await readFile(clientMdPath, 'utf8')

  if (!clientMd.includes('- [x] Completed') || clientMd.match(/- \[x\] Completed/g).length < 5) {
    console.warn('Warning: Not all deliverables marked complete in client CLAUDE.md')
    console.warn('Continue anyway? (This will mark as ready to send)')
  }

  // Update client-folders/CLAUDE.md tracking
  var trackingPath = join(clientFoldersPath, 'CLAUDE.md')
  var tracking = await readFile(trackingPath, 'utf8')

  // Check if already in tracking
  if (!tracking.includes(clientEmail)) {
    // Add new row to table
    var newRow = `| ${clientEmail} | ${emailSlug} | Ready | 5/5 | No | No |`
    // Insert after header row
    tracking = tracking.replace(
      /(\| Client Email.*\n\|.*\n)/,
      `$1${newRow}\n`
    )
  } else {
    // Update existing row to mark as ready
    var regex = new RegExp(`\\| ${clientEmail.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')} \\| [^|]+ \\| [^|]+ \\| [^|]+ \\|`, 'g')
    tracking = tracking.replace(regex, `| ${clientEmail} | ${emailSlug} | Ready | 5/5 |`)
  }

  await writeFile(trackingPath, tracking, 'utf8')

  console.log(`\n✓ ${clientEmail} marked as ready to send`)
  console.log()
  console.log(`When all clients are ready: npm run send`)
}

markReady().catch(function(error) {
  console.error('Error:', error)
  process.exit(1)
})
