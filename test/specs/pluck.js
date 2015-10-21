var assert          = require('assert');
var Backbone        = require('backbone');
var ProxyCollection = require('../../index.js');

var collection;
var proxyCollection;
var secondaryCollection;

beforeEach(function() {

  collection = new Backbone.Collection([
    { id: 1, label: 'a'},
    { id: 2, label: 'b'},
    { id: 3, label: 'c'},
    { id: 4, label: 'd'},
  ]);

 secondaryCollection = new Backbone.Collection([
    { id: 1, label: 'e'},
    { id: 2, label: 'f'},
    { id: 3, label: 'g'},
    { id: 4, label: 'h'},
  ]);

  proxyCollection = new ProxyCollection({
    collection: collection,
  });
});

describe('ProxyCollection.pluck()', function() {
  it('Should pluck attributes', function() {

    var expectd = ['a', 'b', 'c', 'd'];
    var actual = proxyCollection.pluck('label');
    assert.deepEqual(expectd, actual);

  });

  it('Should pluck attributes after swirchCollection is called', function() {

    proxyCollection.switchCollection(secondaryCollection);
    var expectd = ['e', 'f', 'g', 'h'];
    var actual = proxyCollection.pluck('label');
    assert.deepEqual(expectd, actual);

  });
});
