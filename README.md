### waitUntil

[![npm](https://img.shields.io/npm/v/waitil)](https://www.npmjs.com/package/waitil)
![author](https://img.shields.io/badge/author-xiaotuoyang-red.svg)

### Install
`npm i waitil`

### Usage

```
const waitUntil = require("waitil");

condition = async function() {
    await new Promise(res => setTimeout(res, 1000));
    return true;
}

;(async () => {
    console.log(1);
    await waitUntil(condition, 200, 5000);
    console.log(2);
})()

```

### Params
```
/**
 *
 * @param {Function} condition: A Synchronous or asynchronous function waits to return true or false
 * @param {Number|String} interval: Interval(ms) to call this condition function
 * @param {Number|String} timeout: Timeout(ms) to reject an error
 * @return {Promise}
 */
```
