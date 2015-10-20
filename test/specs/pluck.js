var assert          = require('assert');
var Backbone        = require('backbone');
var ProxyCollection = require('../../index.js');

describe('Proxy Collection.pluck()', function() {
  it('Should pluck attributes', function() {

    var collection = new Backbone.Collection([
      { id: 1, label: 'a'},
      { id: 2, label: 'b'},
      { id: 3, label: 'c'},
      { id: 4, label: 'd'},
    ]);

    var proxyCollection = new ProxyCollection({
      collection: collection,
    });

    var expectd = ['a', 'b', 'c', 'd'];
    var actual = proxyCollection.pluck('label');
    assert.deepEqual(expectd, actual);

  });
});
