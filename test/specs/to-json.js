var assert = require('assert');
var ProxyCollection = require('../../index.js');
var Backbone = require('backbone');

var collection;
var proxyCollection;
var secondaryCollection;

beforeEach(function() {
  collection = new Backbone.Collection([{id: 1}]);
  secondaryCollection = new Backbone.Collection([{id: 2}]);
  proxyCollection = new ProxyCollection({
    collection: collection,
  });
});

describe('ProxyCollection.toJSON()', function() {

  it('Should return the same json as the collection', function() {
    assert.deepEqual(proxyCollection.toJSON(), collection.toJSON(),
                     'collection & proxyCollection should return the same JSON from toJSON()');
  });

  it('Should return the same json as the secondaryCollection after switch', function() {
    assert.deepEqual(proxyCollection.toJSON(), collection.toJSON(),
                     'collection & proxyCollection should return the same JSON from toJSON()');
    proxyCollection.switchCollection(secondaryCollection);
    assert.notEqual(proxyCollection.toJSON(), collection.toJSON(), 'ProxyCollection no longer exports collections json');
    assert.deepEqual(proxyCollection.toJSON(), secondaryCollection.toJSON(),
                     'secondaryCollection & proxyCollection should return the same JSON from toJSON()');
  });

});
