var assert          = require('assert');
var Backbone        = require('backbone');
var ProxyCollection = require('../../index.js');

var proxyCollection;
var collection;

beforeEach(function() {
  collection = new Backbone.Collection([
    {id: 5, label: 'e'},
    {id: 4, label: 'd'},
    {id: 3, label: 'c'},
    {id: 2, label: 'b'},
    {id: 1, label: 'a'},
  ]);
  proxyCollection = new ProxyCollection({
    collection: collection,
  });
});

describe('Proxy Collection.sort()', function() {
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
      console.log('compare', a.id, b.id);
      return a.id < b.id ? -1 : 1;
    };

    //test
    proxyCollection.sort();
    expected = ['a', 'b', 'c', 'd', 'e'];
    actual = proxyCollection.pluck('label');
    assert.deepEqual(expected, actual);

  });
});
