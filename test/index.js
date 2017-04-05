const assert = require('assert');
const LRUStore = require('..');

describe('LRU-Store', (done) => {
  const defaultNamespace = 'test';
  it('constructor', () => {
    try {
      new LRUStore()
    } catch (e) {
      assert.equal(e.message, 'namespace and max param can\'t be null');
    }
    const tmp = new LRUStore('abc', 3);
    tmp.set('a', {});
    tmp.set('b', {});
    tmp.set('c', {});
    const cutStore = new LRUStore('abc', 1);
    assert.equal(cutStore.keys().join(','), 'c');
  });

  it('getter', () => {
    const store = new LRUStore(defaultNamespace, 2);
    assert.equal(store.namespace, 'test');
    assert.equal(store.max, 2);
    assert.equal(store.length, 0);
  });

  it('get/set value', () => {
    const store = new LRUStore(defaultNamespace, 2);
    store.set('tree', {
      vip: false,
      amount: 10,
    });
    assert.equal(store.length, 1);
    store.set('jenny', {
      vip: false,
      amount: 11,
    });
    store.set('vicanso', {
      vip: false,
      amount: 12,
    });
    assert.equal(store.length, 2);
    assert.equal(store.get('tree'), null);
    assert.equal(store.get('jenny').vip, false);
    assert.equal(store.get('jenny').amount, 11);
    store.set('jenny', {
      vip: true,
      amount: 15,
    });
    store.set('tree', {
      vip: false,
      amount: 10,
    });
    assert.equal(store.length, 2);
    assert.equal(store.get('vicanso'), null);
    assert.equal(store.get('jenny').vip, true);
    assert.equal(store.get('jenny').amount, 15);
  });

  it('keys', () => {
    const store = new LRUStore(defaultNamespace, 2);
    assert.equal(store.keys().join(','), 'tree,jenny');
    // refresh tree
    store.get('tree');
    assert.equal(store.keys().join(','), 'jenny,tree');
  });

  it('remove value', () => {
    const store = new LRUStore(defaultNamespace, 2);
    assert.equal(store.length, 2);
    store.remove('tree');
    assert.equal(store.length, 1);
  });

  it('clear all', () => {
    const store = new LRUStore(defaultNamespace, 2);
    assert.equal(store.length, 1);
    store.clearAll();
    assert.equal(store.length, 0);
  });

});
