const EventEmitter = require('events');

const optionsSymbol = Symbol('options');
const cacheSymbol = Symbol('cache');

class MemoryStore {
  constructor() {
    this.data = {};
  }
  set(key, value) {
    this.data[key] = value;
    return value;
  }
  get(key) {
    return this.data[key];
  }
  remove(key) {
    delete this.data[key];
  }
}

const defaultStore = new MemoryStore();

class LRUStore extends EventEmitter {
  /**
   * Create a LRU Store. The namespace for store's definition
   * and the max for the limit of store
   * @param {Object} options - {namespace: String, max: Integer}
   * @param {Store} store - the store client
   */
  constructor(options, store) {
    if (!options || !options.namespace || !options.max) {
      throw new Error('namespace and max param can\'t be null');
    }
    super();
    this[optionsSymbol] = options;
    const {
      max,
      namespace,
    } = options;
    this.store = store || defaultStore;
    const arr = this.store.get(namespace) || [];
    if (arr.length > max) {
      arr.splice(0, arr.length - max);
    }
    this[cacheSymbol] = arr;
  }
  /**
   * Get the namespace of lru store
   * @return {String} the namespace name
   */
  get namespace() {
    return this[optionsSymbol].namespace;
  }
  /**
   * Get the limit size of store
   * @return {Integer} the max value
   */
  get max() {
    return this[optionsSymbol].max;
  }
  /**
   * Get the length of store
   * @return {Integer} the length of store
   */
  get length() {
    return this[cacheSymbol].length;
  }
  /**
   * Set the Key:value data to store
   * @param {String} key - the key of store data
   * @param {Any} value - the value of store data
   * @return {Any}
   */
  set(key, value) {
    const updateItem = this.remove(key);
    const cache = this[cacheSymbol];
    let removeItem = null;
    cache.push({
      key,
      value,
    });
    if (cache.length > this.max) {
      removeItem = cache.shift();
    }
    this.store.set(this.namespace, cache);
    if (updateItem) {
      this.emit('update', key);
    } else {
      this.emit('add', key);
    }
    if (removeItem) {
      this.emit('remove', removeItem.key);
    }
    return value;
  }
  /**
   * Get the value of key from the store
   * @param {String} key - the key of store data
   * @return {Any} the value of store data
   */
  get(key) {
    const cache = this[cacheSymbol];
    const index = cache.findIndex(item => item.key === key);
    if (index === -1) {
      return null;
    }
    // the latest one
    if (index === cache.length - 1) {
      return cache[index].value;
    }
    const item = cache.splice(index, 1)[0];
    cache.push(item);
    this.store.set(this.namespace, cache);
    this.emit('hit', key);
    return item.value;
  }
  /**
   * Remove the value of key from the store
   * @param {String} key - the key of store data
   */
  remove(key) {
    const cache = this[cacheSymbol];
    const index = cache.findIndex(item => item.key === key);
    let removeItem = null;
    if (index !== -1) {
      removeItem = cache.splice(index, 1)[0];
      this.store.set(this.namespace, cache);
    }
    return removeItem && removeItem.value;
  }
  /**
   * List all key of the store
   * @return {Array}
   */
  keys() {
    const cache = this[cacheSymbol];
    return cache.map(item => item.key);
  }
  /**
   * Clear all data from store
   */
  clearAll() {
    this[cacheSymbol] = [];
    this.store.remove(this.namespace);
  }
}

module.exports = LRUStore;
