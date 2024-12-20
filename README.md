[![test-workflow][test-badge]][test-workflow]

# dom.js

> fluent DOM in ~400 bytes

adds `${selector}`, `on`,`off`,`css` chainable methods   
for quick DOM operations without the verbosity of the native API.

[demo/sandbox][website]

## install

via CDN:

```html
<script type="module" src="https://cdn.jsdelivr.net/gh/nicholaswmin/dom@main/dom.js"></script>
```

or just copy/paste the [source](./dom.js). Its intentionally tiny.

## usage

selecting elements:

```js
$.$$('div') // select all divs
$.$('div') // select first matching
```

flip CSS properties:

```js
$.$$('div').css({ background: 'red' })
// all divs are now red
```

listen for events:

```js
c.on('click', function(e) {
  this.css({ color: 'red', cursor: 'pointer' }) // set color to red
})
.on('mouseover', function(e) {
  // is chainable
})
.css({ color: 'black' })
```

remove listeners:

```js
// remove all click listeners for all divs
$.$$('div').off('click')

// remove all listeners for all divs
$.$$('div').off()
```

## run dev/demo

```bash
node --run demo
```

## test

install deps

```bash
npm i
```

run unit tests

```bash
node --test
```

> requires: node `v22+`

## authors

[@nicholaswmin][nicholaswmin]

## license

[The ISC License][isc]

[test-badge]: https://github.com/nicholaswmin/dom/actions/workflows/test.yml/badge.svg
[test-workflow]: https://github.com/nicholaswmin/dom/actions/workflows/test.yml
[website]: https://nicholaswmin.github.io/dom
[nicholaswmin]: https://githhub.com/nicholaswmin
[isc]: https://spdxt.org/licenses/ISC
