var assert          = require('assert');
var ProxyCollection = require('../../index');
var Backbone        = require('backbone');

var proxyCollection;
var collection;
beforeEach(function() {
  collection = new Backbone.Collection([
    {id: 1, label: 'a'},
    {id: 2, label: 'b'},
  ]);
  proxyCollection = new ProxyCollection({
    collection: collection,
  });
});

describe('ProxyCollection.shift()', function() {

  it('Should remove the first model in the collection', function() {
    var result = proxyCollection.shift();
    assert.equal('a', result.get('label'));
    assert.equal(1, proxyCollection.length);
    assert.equal(1, collection.length);
  });

});
