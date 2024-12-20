let listeners = []

class Listener {
  constructor (el, name, bound, ...arg) {
    if (!el.hasAttribute('data-id'))
      el.setAttribute('data-id', crypto.randomUUID()) 

    this.id = el.dataset.id
    this.el = el; this.name = name; this.bound = bound;
    this.el.addEventListener(name, bound, ...arg) 
  }

  off() { this.el.removeEventListener(this.name, this.bound); return this.id }
  
  matches(name, id) { 
    return name 
      ? this.name === name && this.el.getAttribute('data-id') === id 
      : true
  }
}

export class Node {
  get $() { return this.el }

  constructor(el) { 
    this.el = el
  }
  
  on(name, fn, ...arg) { 
    if (this.#isArrowFn(fn))
      throw new TypeError('Arrow funcs not supported. Use func. decl. instead.')
    listeners.push(new Listener(this.el, name, fn.bind(this), ...arg))
    
    return this    
  }
  
  off(_name) {
    listeners
      .filter(l => l.matches(_name, this.el.dataset.id))
      .map(l => l.off())
      .forEach(id => listeners.splice(listeners.findIndex(l => l.id === id), 1))
    
    this.el.removeAttribute('data-id')
  }

  css(style) { 
    Object.assign(this.el.style, style)
    return this 
  }
  
  #isArrowFn(fn) { return fn.toString().includes('=>') }
}

export class NodeList {
  get $$() { return this.els }

  constructor(els) { this.els = Array.from(els).map(el => new Node(el)) }
  css(...arg)  { this.els.map(el => el.css(...arg));   return this }
  off (...arg) { this.els.map(el => el.off(...arg) );  return this }
  on (...arg)  { this.els.map(el => el.on(...arg) );   return this }

  static {
    (globalThis || window)['$'] = {
      $$: (...args) => new NodeList(document.querySelectorAll(...args)),
      $:  (...args) => new Node(document.querySelector(...args))
    }
  }
}
