[![test-workflow][test-badge]][test-workflow]

# dom.js

> fluent DOM in ~400 bytes

The native [DOM API][dom-api] is *extremely* verbose.    

This is just a tiny wrapper around it, that:

- adds concise `$('selector')` selectors
- adds concise `on('event', fn)`,`off('event', fn)`,`css(styles)` methods. 
- enables [method chaining][fluent-api]. 

without messing with native prototypes.

## Why these 3 methods?

They're the ones *we* commonly use 80% of the time
when writing  demo HTMLs for WebComponents.

If I were to keep adding, I might as well just use jQuery or
an actual MVC framework.

The source is tiny and can be modified very easily
if you need to but doing so probably misses the point.

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

CSS properties:

```js
$.$$('div').css({ background: 'red' })  
// all divs are now red
```

event listeners:

```js
c.on('click', function(e) {
  this.css({ color: 'red', cursor: 'pointer' })
  // set styles
})
.on('mouseover', function(e) {
  // is chainable
})
.css({ color: 'black' })
```

remove listeners:

```js
// remove all click listeners
$.$$('div').off('click')

// remove all listeners, for all divs
$.$$('div').off()
```

actual DOM elements:

```js
// actual DOM element
$.$('div').$ 

// actual DOM elements
$.$$('div').$$ 

// example
$.$('div').$.textContent = 'hello world'
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

[ISC License][isc]

[test-badge]: https://github.com/nicholaswmin/dom/actions/workflows/test.yml/badge.svg
[test-workflow]: https://github.com/nicholaswmin/dom/actions/workflows/test.yml
[website]: https://nicholaswmin.github.io/dom
[nicholaswmin]: https://githhub.com/nicholaswmin
[fluent-api]: https://en.wikipedia.org/wiki/Fluent_interface
[dom-api]: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction
[isc]: https://spdxt.org/licenses/ISC
