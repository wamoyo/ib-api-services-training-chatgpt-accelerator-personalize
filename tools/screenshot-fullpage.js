// Full-page screenshot tool for VERIFYING OUR DELIVERABLES
// Takes one tall screenshot showing entire page (compressed if very long)
// Usage: node screenshot-fullpage.js <path-to-html-file>

import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

var __dirname = path.dirname(fileURLToPath(import.meta.url))

// Pure: gets command line argument
function getHtmlPath () {
  return process.argv[2]
}

// Pure: generates output filename from input path
function getOutputPath (htmlPath) {
  var dir = path.dirname(htmlPath)
  var filename = path.basename(htmlPath, '.html')
  var screenshotsDir = path.join(dir, 'screenshots')
  return {
    dir: screenshotsDir,
    path: path.join(screenshotsDir, filename + '-preview.png')
  }
}

// Side effect: Creates directory if it doesn't exist
function ensureDirectory (dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

// Side effect: Captures full-page screenshot
async function captureScreenshot () {
  var htmlPath = getHtmlPath()

  if (!htmlPath) {
    console.error('Error: No HTML file specified')
    console.log('Usage: node screenshot.js <path-to-html-file>')
    process.exit(1)
  }

  if (!fs.existsSync(htmlPath)) {
    console.error('Error: File not found:', htmlPath)
    process.exit(1)
  }

  var output = getOutputPath(htmlPath)
  ensureDirectory(output.dir)

  var browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  var page = await browser.newPage()
  await page.setViewport({ width: 1400, height: 1000 })

  var fileUrl = 'file://' + path.resolve(htmlPath)
  console.log('Loading:', fileUrl)

  await page.goto(fileUrl, { waitUntil: 'networkidle0' })

  console.log('Capturing screenshot...')
  await page.screenshot({
    path: output.path,
    fullPage: true
  })

  console.log('✓ Screenshot saved to:', output.path)
  await browser.close()
}

captureScreenshot().catch(function(error) {
  console.error('Error:', error)
  process.exit(1)
})
