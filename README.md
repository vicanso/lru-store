# lru-store

A lru store for browser, it's based on [store](https://github.com/marcuswestin/store.js)

## Installation

```bash
$ npm install lru-store
```

## API


```js
const LRUStore = require('lru-store');
const store = new LRUStore('my-cache', 10);
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
const store = new LRUStore('my-cache', 10);
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
const store = new LRUStore('my-cache', 10);
const info = store.get('tree');
```

### remove

Remove the value from store

- `key` The key of value

```js
const LRUStore = require('lru-store');
const store = new LRUStore('my-cache', 10);
store.remove('tree');
```

### keys

List all key of the store

```js
const LRUStore = require('lru-store');
const store = new LRUStore('my-cache', 10);
const keys = store.keys();
```

### clearAll

Clear all data from store

```js
const LRUStore = require('lru-store');
const store = new LRUStore('my-cache', 10);
store.clearAll();
```

## License

MIT
