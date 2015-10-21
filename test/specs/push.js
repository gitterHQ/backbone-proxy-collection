var assert          = require('assert');
var ProxyCollection = require('../../index');
var Backbone        = require('backbone');

var proxyCollection;
var collection;
 var secondaryCollection;

beforeEach(function() {
  collection = new Backbone.Collection([
    {id: 2, label: 'b'}
  ]);

  secondaryCollection = new Backbone.Collection([
    {id: 4, label: 'd'}
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

  it('Should push a model onto the collection after sewitch Collection', function() {
    proxyCollection.switchCollection(secondaryCollection);
    proxyCollection.push({id: 1, label: 'a'});
    assert.notEqual(proxyCollection.at(0), collection.at(0));
    assert.notEqual(proxyCollection.at(1), collection.at(1));
    assert.deepEqual(proxyCollection.at(0), secondaryCollection.at(0));
    assert.deepEqual(proxyCollection.at(1), secondaryCollection.at(1));
  });

});
