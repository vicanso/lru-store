const store = require('store');

const namespaceSymbol = Symbol('namespace');
const maxSymbol = Symbol('max');
const cacheSymbol = Symbol('cache');

class LRUStore {
  /**
   * Create a LRU Store. The namespace for store's definition
   * and the max for the limit of store
   */
  constructor(namespace, max) {
    if (!namespace || !max) {
      throw new Error('namespace and max param can\'t be null');
    }
    this[namespaceSymbol] = namespace;
    this[maxSymbol] = max;
    const arr = store.get(namespace) || [];
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
    return this[namespaceSymbol];
  }
  /**
   * Get the limit size of store
   * @return {Integer} the max value
   */
  get max() {
    return this[maxSymbol];
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
    this.remove(key);
    const cache = this[cacheSymbol];
    cache.push({
      key,
      value,
    });
    if (cache.length > this.max) {
      cache.shift();
    }
    store.set(this.namespace, cache);
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
    const item = cache.splice(index, 1)[0];
    cache.push(item);
    store.set(this.namespace, cache);
    return item.value;
  }
  /**
   * Remove the value of key from the store
   * @param {String} key - the key of store data
   */
  remove(key) {
    const cache = this[cacheSymbol];
    const index = cache.findIndex(item => item.key === key);
    if (index !== -1) {
      cache.splice(index, 1);
      store.set(this.namespace, cache);
    }
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
    store.remove(this.namespace);
  }
}

module.exports = LRUStore;
