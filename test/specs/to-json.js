var assert = require('assert');
var ProxyCollection = require('../../index.js');
var Backbone = require('backbone');

var collection;
var proxyCollection;

beforeEach(function() {
  collection = new Backbone.Collection([{id: 1}]);
  proxyCollection = new ProxyCollection({
    collection: collection,
  });
});

describe('ProxyCollection.toJSON()', function() {

  it('Should return the same json as the collection', function() {
    assert.deepEqual(proxyCollection.toJSON(), collection.toJSON(),
                     'collection & proxyCollection should return the same JSON from toJSON()');
  });

});
