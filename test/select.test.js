import { test } from 'node:test'
import { createPage, createButtons } from './utils.js'

test('#$.$("selector") - select single', async t => {
  t.after(() => browser.close())

  const { browser, page } = await createPage('./index.html')

  const result = await page.$eval('body', _ => $.$('body')?.$?.tagName)
  
  await t.test('finds the element', async t => {
    await t.test('returns its tagname', t => {	
      t.assert.strictEqual(result, 'BODY')
    })
  })
})


test('#$.$$("selector") - select multiple', async t => {
  t.after(() => browser.close())
  const { browser, page } = await createPage('./index.html')

  await createButtons(page, { count: 2 })

  const result = await page.$eval('body', _ => 
    $.$$('button').els.map(v => v.$.tagName))
  
  await t.test('finds the elements', async t => {
    await t.test('returns their tagnames', t => {	
      t.assert.deepStrictEqual(result, ['BUTTON', 'BUTTON'])
    })
  })
})
