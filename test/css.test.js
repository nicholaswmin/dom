import { test } from 'node:test'
import { createPage, createButtons } from './utils.js'

test('#node.css(styles)', async t => {
  t.after(() => browser.close())
  const { browser, page } = await createPage('./index.html')

  await createButtons(page, { count: 1 })

  await page.$eval('body', _ => $.$('button')
    .css({ left: '5px', top: '10px' }))

  const style = await page.locator('button')
    .map(el => ({ left: el.style.left, top:  el.style.top })).wait()

  await t.test('updates with style properties', t => {	
    t.assert.strictEqual(style.left, '5px')
    t.assert.strictEqual(style.top, '10px')
  })
})
