import { rmSync  }   from 'node:fs'
import { resolve } from 'node:path'
import { styleText } from 'node:util'
import { spawnSync } from 'node:child_process'
import { pathToFileURL } from 'node:url'

export async function install(deps = ['puppeteer']) {
  console.log(styleText(['cyanBright'],'Installing dependencies ... wait ...'))
  const npm = process.platform === 'win32' ? 'npm.cmd' : 'npm'

  const { stdout, stderr } = spawnSync(npm, ['i', ...deps, '--no-save'], {
    cwd: resolve(import.meta.dirname, '../')
  })

  if (stderr.toString().trim().length)
    throw new Error(stderr.toString().trim())

  ;['SIGTERM', 'SIGINT', 'disconnect', 'beforeExit', 'exit'].forEach(event => {
    process.on(event, () => {
      const path = resolve(import.meta.dirname, '../node_modules')
      rmSync(path, { recursive: true, force: true })
    })
  })

} 

export async function createPage(url) {
  const puppeteer = await import('puppeteer')
  
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--allow-file-access-from-files']
  })
  const page = await browser.newPage()

  await page.goto(pathToFileURL(resolve(import.meta.dirname, url)))
  await page.waitForSelector('body')
  await page.setViewport({ width: 1080, height: 1024 })

  return { browser, page }
}

export async function createButtons(page, { count = 1 } = {}) {
  return await page.$eval('body', (body, count) => {
    for (let i = 0; i < count; i++) {
      const button = document.createElement('button')
      
      button.classList.add('test-btn')
      button.textContent = '0'
      button.id = `test-btn-${i}`
      
      body.appendChild(button)
    }
    return [...body.querySelectorAll('button')].map(el => el.id)
  }, count)
}

export async function createInputs(page, { count = 1 } = {}) {
  const puppeteer = await import('puppeteer')

  return await page.$eval('body', (body, count) => {
    for (let i = 0; i < count; i++) {
      const input = document.createElement('input')
      
      input.classList.add('test-input')
      input.placeholder = ''
      input.id = `test-input-${i}`
      
      body.appendChild(input)
    }
    return [...body.querySelectorAll('input')].map(el => el.id)
  }, count)
}
