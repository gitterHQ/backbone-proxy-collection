var assert = require('assert');
var ProxyCollection = require('../../index.js');
var Backbone = require('backbone');

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

describe('ProxyRequire.reset()', function() {

  it('Should reset it\'s collection when reset is called', function() {
    assert.equal(2, proxyCollection.length);
    assert.equal(proxyCollection.at(0).get('label'), 'a');
    proxyCollection.reset();
    assert.equal(0, proxyCollection.length);
    assert.equal(0, collection.length);
  });

});
