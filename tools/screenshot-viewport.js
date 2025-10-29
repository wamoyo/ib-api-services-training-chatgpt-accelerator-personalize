// Viewport screenshot tool for ANALYZING CLIENT WEBSITES
// Takes standard 16:9 screenshots at full quality
// Better for spotting brand details (fonts, colors, UI elements)
// Usage: node screenshot-viewport.js <url> <output-name>
// Example: node screenshot-viewport.js https://example.com homepage

import puppeteer from 'puppeteer'
import path from 'path'
import fs from 'fs'
import { fileURLToPath } from 'url'

var __dirname = path.dirname(fileURLToPath(import.meta.url))

// Pure: gets command line arguments
function getArgs () {
  return {
    url: process.argv[2],
    outputPath: process.argv[3]
  }
}

// Pure: generates output path (accepts full path or just name)
function getOutputPath (outputPath) {
  // If no path provided, use default
  if (!outputPath) {
    var screenshotsDir = path.join(__dirname, '..', 'screenshots')
    return {
      dir: screenshotsDir,
      path: path.join(screenshotsDir, 'screenshot.png')
    }
  }

  // If full path provided (contains directory separator)
  if (outputPath.includes('/') || outputPath.includes('\\')) {
    var dir = path.dirname(outputPath)
    return {
      dir: dir,
      path: outputPath
    }
  }

  // If just a name, use default directory
  var screenshotsDir = path.join(__dirname, '..', 'screenshots')
  return {
    dir: screenshotsDir,
    path: path.join(screenshotsDir, outputPath + '.png')
  }
}

// Side effect: Creates directory if it doesn't exist
function ensureDirectory (dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

// Side effect: Captures viewport screenshot
async function captureScreenshot () {
  var args = getArgs()

  if (!args.url) {
    console.error('Error: No URL specified')
    console.log('Usage: node screenshot-viewport.js <url> <output-path>')
    console.log('Example: node screenshot-viewport.js https://example.com homepage.png')
    process.exit(1)
  }

  var output = getOutputPath(args.outputPath)
  ensureDirectory(output.dir)

  var browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })

  var page = await browser.newPage()

  // Standard 16:9 viewport for full-quality screenshots
  await page.setViewport({ width: 1920, height: 1080 })

  console.log('Loading:', args.url)
  await page.goto(args.url, {
    waitUntil: 'networkidle0',
    timeout: 30000
  })

  console.log('Capturing screenshot...')
  await page.screenshot({
    path: output.path,
    fullPage: false  // Only capture viewport
  })

  console.log('✓ Screenshot saved to:', output.path)
  await browser.close()
}

captureScreenshot().catch(function(error) {
  console.error('Error:', error)
  process.exit(1)
})
