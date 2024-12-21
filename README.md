
[![test-workflow][test-badge]][test-workflow]

## `dom.js`

> concise [DOM][dom-api] in `~ 400 bytes`

<a href="https://nicholaswmin.github.io/dom">
<img width="700px" alt="Carbon codesnippet showing a usage example" src="https://github.com/user-attachments/assets/2e5fac8c-70f4-43e1-b1f4-e9203e32b307"></img></a>


- concise selectors: `$('.foobar')`
- concise event methods: `.on('event', fn)` / `.off('event', fn)`
- an additional `css(..)` method.
- [method-chaining][fluent-api]

## todo

- [x] fix CI tests
- [ ] fix event tests
- [x] add a carbon snippet here
- [ ] snippetify that code thing

## rationale

I often need to write short HTML snippets as sandboxes for testing 
a component I'm working on.   
These snippet files are best kept stupidly simple & dependency-free so as not 
to distract from the actual component itself.

However, the native DOM API is annoyingly verbose which ends up cluttering 
the file in and by itself.

On the other hand, if I were to dump here each and every utility I need, 
I might as well just use jQuery or an actual MVC framework. 

Ergo, this.   
The 3 methods covered here replace the most-common but unbearably verbose 
DOM API methods with consice, chainable equivalents.   

It does 80% instead of 100% but there's nothing to memorise,  
it's impossible to break & easy to figure out what their intent is,    
even if you've never read a single word of this doc.

## usage

drop this:

```html
<script type="module" src="https://cdn.jsdelivr.net/gh/nicholaswmin/dom@main/dom.js"></script>
```

or just copy/paste the [source](./dom.js) in your own project. 

I use it as an editor code-snippet.

## api

selecting elements:

```js
$.$$('div') // select all divs
$.$('div') // select first matching
```

style props:

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


## tests

```bash
node --import ./test/setup.js --experimental-test-isolation=none --test
```

> requires: node `v22+`

## misc

> serve demo

```bash
npx serve
```

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
