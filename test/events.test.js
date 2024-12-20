import { test } from 'node:test'
import { createPage, createButtons, createInputs } from './utils.js'

test('#node.on("evt", fn) - passed an arrow function', async t => {
  t.after(() => browser.close())
  const { browser, page } = await createPage('./index.html')

  await t.test('throws a descriptive type error', async t => {	
    await t.assert.rejects(() => {
      return page.$eval('body', _ => $.$('button').on('click', () => { }))
    }, {
      name: 'TypeError',
      message: /not supported/
    })
  })
})

test('#node.on("evt", fn) - listen for event', async t => {
  t.after(() => browser.close())
  const { browser, page } = await createPage('./index.html')

  const ids = await createButtons(page, { count: 1 })

  await page.$eval('body', _ => 
    $.$('button').on('click', function() { this.$.textContent = 'clicked' }))
  
  await page.locator(ids.at(0)).click()
  const text = await page.locator('button').map(el => el.textContent).wait()

  await t.test('reacts to the event', async t => {
    await t.test('updates the textContent', t => {	
      t.assert.strictEqual(text, 'clicked')
    })
  })
})


test('#node.off("evt")', async t => {
  t.after(() => browser.close())
  const { browser, page } = await createPage('./index.html')

  const ids = await createInputs(page, { count: 1 })

  await page.$eval('body', _ => 
    $.$('input').on('click', function() { this.$.placeholder = 'clicked' }))
  await page.$eval('body', _ => 
    $.$('input').on('input', function() { this.$.placeholder = 'inputted' }))

  await page.$eval('body', _ => $.$('input').off('input'))
  
  await page.locator(ids.at(0)).click()
  await page.type(ids.at(0), 'foobar')

  const text = await page.locator('input').map(el => el.placeholder).wait()

  await t.test('stops reacting to specified event only', async t => {
    await t.test('removed event does not update placeholder', t => {	
      t.assert.strictEqual(text, 'clicked')
    })
  })
})


test('#node.off()', async t => {
  t.after(() => browser.close())
  const { browser, page } = await createPage('./index.html')

  const ids = await createInputs(page, { count: 2 })

  await page.$eval('body', _ => 
    $.$('input').on('click', function() { this.$.placeholder = 'clicked' }))
  await page.$eval('body', _ => 
    $.$('input').on('input', function() { this.$.placeholder = 'inputted' }))

  await page.$eval('body', _ => $.$('input').off())
  
  await page.locator(ids.at(0)).click()
  await page.type(ids.at(0), 'foobar')

  const text = await page.locator('input').map(el => el.placeholder).wait()

  await t.test('no longer reacts to any event', async t => {
    await t.test('no event updates the placeholder', t => {	
      t.assert.strictEqual(text, '')
    })
  })
})
