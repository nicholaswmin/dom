# tests

This project avoids `package.json` files.

However, the tests require `puppeteer`, the browser automation driver.
To get around this, `./setup.js` must run before any tests so as to install
`puppeteer`, our only `devDependency`.

example:

```bash
node --import ./test/setup.js --experimental-test-isolation=none --test
```

`--experimental-isolation-mode=1` is required otherwise the multiple 
"threads" will remove each others traffc.
