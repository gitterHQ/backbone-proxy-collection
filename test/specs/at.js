var assert          = require('assert');
var Backbone        = require('backbone');
var ProxyCollection = require('../../index.js');

var proxyCollection;
var primryCollection;
var secondaryCollection;

beforeEach(function() {
  primryCollection = new Backbone.Collection([
    { label: 'a' },
    { label: 'b' },
    { label: 'c' },
  ]);

  secondaryCollection = new Backbone.Collection([
    { label: 'd' },
    { label: 'e' },
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

  it('Should return the right member of the collection after switchCollectoin is called', function() {
    proxyCollection.switchCollection(secondaryCollection);
    console.log(proxyCollection.at(0).toJSON(), proxyCollection.collection);
    assert.deepEqual('d', proxyCollection.at(0).get('label'));
    assert.deepEqual('e', proxyCollection.at(1).get('label'));
  });

});
