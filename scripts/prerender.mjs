import { mkdir, writeFile } from 'node:fs/promises'
import { dirname, resolve } from 'node:path'
import { chromium } from 'playwright'
import { preview } from 'vite'

const DEFAULT_ROUTES = ['/', '/damage', '/magic', '/creatures']
const routes = ['/ru'].map(locale => DEFAULT_ROUTES.map(route => `${locale}${route}`)).flat().concat(DEFAULT_ROUTES)
const port = 4173
const origin = `http://localhost:${port}`

function removeLocalhostLinks(html) {
  return html.replace(
    /<link\b(?=[^>]*\bhref=["'][^"']*localhost[^"']*["'])[^>]*>\s*/gi,
    ''
  )
}
function outputFile(route) {
  return route === '/' ? resolve('dist/index.html') : resolve('dist', route.slice(1), 'index.html')
}
function closeServer(server) {
  return new Promise((resolve, reject) => server.httpServer.close(error => error ? reject(error) : resolve()))
}
async function renderRoute(browser, route) {
  const page = await browser.newPage()
  await page.goto(new URL(route, origin).href, { waitUntil: 'networkidle' })
  await page.waitForFunction(
    expectedRoute => document.documentElement.dataset.prerenderReady === expectedRoute,
    route,
  )
  await page.evaluate(() => document.documentElement.removeAttribute('data-prerender-ready'))
  const html = await page.content()
  const cleanedHtml = removeLocalhostLinks(html)
  const file = outputFile(route)
  await mkdir(dirname(file), { recursive: true })
  await writeFile(file, cleanedHtml)
  console.info(`${file} created`)
  await page.close()
}
async function startPreviewServer() {
  try {
    const server = await preview({
      preview: {
        host: 'localhost',
        port,
        strictPort: true,
      },
    })
    console.info('Preview server started')
    return server
  }
  catch (error) {
    console.error(`Failed to start server: ${error}`)
  }
}
const server = await startPreviewServer()
async function render() {
  try {
    const browser = await chromium.launch()
    const context = await browser.newContext({ locale: 'en-US' })
    try {
      console.info('Prerender routes:')
      await Promise.all(routes.map(route => renderRoute(context, route)))
    }
    finally {
      browser.close()
    }
  }
  finally {
    closeServer(server)
  }
}
render()
