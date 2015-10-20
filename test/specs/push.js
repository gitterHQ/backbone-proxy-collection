var assert          = require('assert');
var ProxyCollection = require('../../index');
var Backbone        = require('backbone');

var proxyCollection;
var collection;
beforeEach(function() {
  collection = new Backbone.Collection([
    {id: 2, label: 'b'}
  ]);
  proxyCollection = new ProxyCollection({
    collection: collection,
  });
});

describe('ProxyCollection.push()', function() {

  it('Should push a model onto the collection', function() {
    proxyCollection.push({id: 1, label: 'a'});
    assert.deepEqual(proxyCollection.at(0), collection.at(0));
    assert.deepEqual(proxyCollection.at(1), collection.at(1));
  });

});
