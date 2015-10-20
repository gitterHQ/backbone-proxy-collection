var assert          = require('assert');
var Backbone        = require('backbone');
var ProxyCollection = require('../../index.js');

var proxyCollection;
var primryCollection;

beforeEach(function() {
  primryCollection = new Backbone.Collection([
    { label: 'a' },
    { label: 'b' },
    { label: 'c' },
  ]);
  proxyCollection = new ProxyCollection({
    collection: primryCollection,
  });
});

describe('ProxyCollection.at()', function() {

  it('Should return the right member of the collection', function() {
    assert.deepEqual('a', proxyCollection.at(0).get('label'));
    assert.deepEqual('b', proxyCollection.at(1).get('label'));
    assert.deepEqual('c', proxyCollection.at(2).get('label'));
  });

});
