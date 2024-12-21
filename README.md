[![test-workflow][test-badge]][test-workflow]

# dom.js

> fluent DOM in ~400 bytes

[example][website]

- adds concise `$('selector')` selectors
- adds concise `.on('event', fn)`,`.off('event', fn)` methods
- adds a `.css(rules)` method
- enables [method chaining][fluent-api]. 

w/o messing with native prototypes.

## why

I often need to write a demo/usage HTML snippet file for.. 
say a WebComponent I'm authoring.   
You want these demo snippets to be stupidly simple so as not to detract from 
the actual component, but the verbosity of the native API makes it 
unergonomic & clutters up the file.   

On the other hand, if I were to keep adding utilities here, 
I might as well just use jQuery or an actual MVC framework. 

Ergo, this. These 3 methods are good enough.

You can modify the source with your own methods if you need to.

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

## run demo

```bash
node --run demo
```

## test

```bash
npm i

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
[fluent-api]: https://en.wikipedia.org/wiki/Method_chaining
[dom-api]: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction
[isc]: https://spdxt.org/licenses/ISC
