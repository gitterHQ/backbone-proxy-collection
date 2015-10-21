var assert          = require('assert');
var Backbone        = require('backbone');
var ProxyCollection = require('../../index.js');

var proxyCollection;
var collection;
var secondaryCollection;

beforeEach(function() {

  collection = new Backbone.Collection([
    {id: 5, label: 'e'},
    {id: 4, label: 'd'},
    {id: 3, label: 'c'},
    {id: 2, label: 'b'},
    {id: 1, label: 'a'},
  ]);

 secondaryCollection = new Backbone.Collection([
    {id: 10, label: 'j'},
    {id: 9, label: 'i'},
    {id: 8, label: 'h'},
    {id: 7, label: 'g'},
    {id: 6, label: 'f'},
  ]);
  proxyCollection = new ProxyCollection({
    collection: collection,
  });
});

describe('ProxyCollection.sort()', function() {

  it('Should emit a sort event when sort is called', function(done) {
    proxyCollection.on('sort', function() {
      assert.ok(true);
      done();
    });

    collection.comparator = function() {};

    proxyCollection.sort();
  });

  it('Should actually sort the Collection', function() {
    //test initial vals
    var expected = ['e', 'd', 'c', 'b', 'a'];
    var actual = proxyCollection.pluck('label');
    assert.deepEqual(expected, actual);

    //add comparator
    collection.comparator = function(a, b) {
      return a.id < b.id ? -1 : 1;
    };

    //test
    proxyCollection.sort();
    expected = ['a', 'b', 'c', 'd', 'e'];
    actual = proxyCollection.pluck('label');
    assert.deepEqual(expected, actual);

  });

  it('Should actually sort the Collection after switch Collection', function() {
    //test initial vals
    var expected = ['e', 'd', 'c', 'b', 'a'];
    var actual = proxyCollection.pluck('label');
    assert.deepEqual(expected, actual);

    proxyCollection.switchCollection(secondaryCollection);
    expected = ['j', 'i', 'h', 'g', 'f'];
    actual = proxyCollection.pluck('label');
    assert.deepEqual(expected, actual);

    //add comparator
    secondaryCollection.comparator = function(a, b) {
      return a.id < b.id ? -1 : 1;
    };

    //test
    proxyCollection.sort();
    expected = ['f', 'g', 'h', 'i', 'j'];
    actual = proxyCollection.pluck('label');
    assert.deepEqual(expected, actual);

  });
});
