const store = require('store');
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
    const tmp = new LRUStore({
      namespace: 'abc',
      max: 3,
    });
    tmp.set('a', {});
    tmp.set('b', {});
    tmp.set('c', {});
    const cutStore = new LRUStore({
      namespace: 'abc',
      max: 1,
    });
    assert.equal(cutStore.keys().join(','), 'c');
  });

  it('getter', () => {
    const lruStore = new LRUStore({
      namespace: defaultNamespace,
      max: 2,
    });
    assert.equal(lruStore.namespace, 'test');
    assert.equal(lruStore.max, 2);
    assert.equal(lruStore.length, 0);
  });

  it('get/set value', () => {
    const lruStore = new LRUStore({
      namespace: defaultNamespace,
      max: 2,
    });
    lruStore.set('tree', {
      vip: false,
      amount: 10,
    });
    assert.equal(lruStore.length, 1);
    lruStore.set('jenny', {
      vip: false,
      amount: 11,
    });
    lruStore.set('vicanso', {
      vip: false,
      amount: 12,
    });
    assert.equal(lruStore.length, 2);
    assert.equal(lruStore.get('tree'), null);
    assert.equal(lruStore.get('jenny').vip, false);
    assert.equal(lruStore.get('jenny').amount, 11);
    lruStore.set('jenny', {
      vip: true,
      amount: 15,
    });
    lruStore.set('tree', {
      vip: false,
      amount: 10,
    });
    assert.equal(lruStore.length, 2);
    assert.equal(lruStore.get('vicanso'), null);
    assert.equal(lruStore.get('jenny').vip, true);
    assert.equal(lruStore.get('jenny').amount, 15);
  });

  it('keys', () => {
    const lruStore = new LRUStore({
      namespace: defaultNamespace,
      max: 2,
    });
    assert.equal(lruStore.keys().join(','), 'tree,jenny');
    // refresh tree
    lruStore.get('tree');
    assert.equal(lruStore.keys().join(','), 'jenny,tree');
  });

  it('remove value', () => {
    const lruStore = new LRUStore({
      namespace: defaultNamespace,
      max: 2,
    });
    assert.equal(lruStore.length, 2);
    lruStore.remove('tree');
    assert.equal(lruStore.length, 1);
  });

  it('clear all', () => {
    const lruStore = new LRUStore({
      namespace: defaultNamespace,
      max: 2,
    });
    assert.equal(lruStore.length, 1);
    lruStore.clearAll();
    assert.equal(lruStore.length, 0);
  });

  it('use custom store', () => {
    const lruStore = new LRUStore({
      namespace: 'my-custom-store',
      max: 2,
    }, store);

    lruStore.set('tree', {
      vip: false,
      amount: 10,
    });
    assert.equal(lruStore.length, 1);
    lruStore.set('jenny', {
      vip: false,
      amount: 11,
    });
    lruStore.set('vicanso', {
      vip: false,
      amount: 12,
    });
    assert.equal(lruStore.length, 2);
    assert.equal(lruStore.get('tree'), null);
    assert.equal(lruStore.get('jenny').vip, false);
    assert.equal(lruStore.get('jenny').amount, 11);
    lruStore.set('jenny', {
      vip: true,
      amount: 15,
    });
    lruStore.set('tree', {
      vip: false,
      amount: 10,
    });
    assert.equal(lruStore.length, 2);
    assert.equal(lruStore.get('vicanso'), null);
    assert.equal(lruStore.get('jenny').vip, true);
    assert.equal(lruStore.get('jenny').amount, 15);
  });
});
