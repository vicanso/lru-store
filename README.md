# lru-store

A lru store for browser. It is better to use with [store](https://github.com/marcuswestin/store.js)

[![Build Status](https://travis-ci.org/vicanso/lru-store.svg?branch=master)](https://travis-ci.org/vicanso/lru-store)
[![Coverage Status](https://img.shields.io/coveralls/vicanso/lru-store/master.svg?style=flat)](https://coveralls.io/r/vicanso/lru-store?branch=master)
[![npm](http://img.shields.io/npm/v/lru-store.svg?style=flat-square)](https://www.npmjs.org/package/lru-store)
[![Github Releases](https://img.shields.io/npm/dm/lru-store.svg?style=flat-square)](https://github.com/vicanso/lru-store)

## Installation

```bash
$ npm install lru-store
```

## API

### constructor

- `options`

  - `options.namespace` The namespace for store

  - `options.max` The limit of store

- `store` The store client for lru, default is `MemoryStore`. It's better to use [store](https://github.com/marcuswestin/store.js).

```js
const LRUStore = require('lru-store');
const store = new LRUStore({
  namespace: 'my-cache',
  max: 10,
});
store.set('tree', {
  vip: false,
  amount: 10,
});
const info = store.get('tree');
```

### set

Set the value to store

- `key` The key of value

- `value` The value to store

```js
const LRUStore = require('lru-store');
const store = new LRUStore({
  namespace: 'my-cache',
  max: 10,
});
store.set('tree', {
  vip: false,
  amount: 10,
});
```


### get

Get the value from store

- `key` The key of value

```js
const LRUStore = require('lru-store');
const store = new LRUStore({
  namespace: 'my-cache',
  max: 10,
});
const info = store.get('tree');
```

### remove

Remove the value from store

- `key` The key of value

```js
const LRUStore = require('lru-store');
const store = new LRUStore({
  namespace: 'my-cache',
  max: 10,
});
store.remove('tree');
```

### keys

List all key of the store

```js
const LRUStore = require('lru-store');
const store = new LRUStore({
  namespace: 'my-cache',
  max: 10,
});
const keys = store.keys();
```

### clearAll

Clear all data from store

```js
const LRUStore = require('lru-store');
const store = new LRUStore({
  namespace: 'my-cache',
  max: 10,
});
store.clearAll();
```

## License

MIT
