[![test-workflow][test-badge]][test-workflow]

# dom.js

enables concise & chainable DOM API operations.

Concise selectors `$('.foobar')`, event methods (`.on('event', fn)` /
`.off('event', fn)`)
plus an additional `css(..)` method.

supports method chaining without modifying native prototypes.

basic example:

```js
// if any square is clicked
$.$$('.square').on('cl3ick', function (e) {
  // toggle it's color
  this.css({ background: this.$.style.color === 'red' ? 'white' : 'red' });
})
.css({ cursor: 'pointer' });

```

## todo

- [ ] fix event tests
- [ ] snippetify that code thing

## rationale

I often need to write short HTML files as usage demos for various UI  
components I might be authoring.  
These demo files must be kept stupidly simple & dependency-free so as not 
to detract from the actual component by adding additional complexity.
Frameworks and dependencies are specifically avoided.

However, the verbosity of the native DOM API is unergonomic & ends up 
cluttering the file in and by itself.

On the other hand, if I were to dump here each and every utility I need, 
I might as well just use jQuery or an actual MVC framework. 

Ergo, this.  
The 3 methods covered here replace the most-common but unbearably 
verbose DOM API methods with consice, chainable equivalents.

You can modify the source with your own methods if you need to.

## usage

via CDN:

```html
<script type="module" src="https://cdn.jsdelivr.net/gh/nicholaswmin/dom@main/dom.js"></script>
```

or just copy/paste the [source](./dom.js) in your own project.    
Its intentionally small & simple.

## examples

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

install deps:

```bash
npm i
```

run tests:

```bash
node --import ./test/setup.js --experimental-test-isolation=none --test
```

> requires: node `v22+`


## license

> [ISC License][isc]
>
> @nicholaswmin, 2024
>
> Permission to use, copy, modify, and/or distribute or resell this software 
> for *any purpose* is hereby granted *without fee*, provided that the above 
> copyright notice and this permission notice appear in all copies.

[test-badge]: https://github.com/nicholaswmin/dom/actions/workflows/test.yml/badge.svg
[test-workflow]: https://github.com/nicholaswmin/dom/actions/workflows/test.yml
[website]: https://nicholaswmin.github.io/dom
[nicholaswmin]: https://githhub.com/nicholaswmin
[fluent-api]: https://en.wikipedia.org/wiki/Method_chaining
[dom-api]: https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction
[isc]: https://spdx.org/licenses/ISC.html
