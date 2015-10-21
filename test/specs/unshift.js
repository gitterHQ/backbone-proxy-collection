var assert          = require('assert');
var ProxyCollection = require('../../index');
var Backbone        = require('backbone');

var proxyCollection;
var collection;
var secondaryCollection;

beforeEach(function() {
  collection = new Backbone.Collection([
    {label: 'b'},
  ]);


 secondaryCollection = new Backbone.Collection([
    {label: 'c'},
  ]);

  proxyCollection = new ProxyCollection({
    collection: collection,
  });
});

describe('ProxyCollection.unshift()', function() {

  it('Should push a model onto the begining of a collection', function() {
    proxyCollection.unshift({label: 'a'});
    assert.equal(2, proxyCollection.length);
    assert.equal(2, collection.length);
    assert.equal('a', proxyCollection.at(0).get('label'));
  });

  it('Should push a model onto the begining of a collection after switch Collection', function() {
    proxyCollection.switchCollection(secondaryCollection);
    proxyCollection.unshift({label: 'a'});
    assert.equal(2, proxyCollection.length);
    assert.equal(2, secondaryCollection.length);
    assert.equal(1, collection.length);
    assert.equal('a', proxyCollection.at(0).get('label'));
    assert.equal('b', collection.at(0).get('label'));
  });

});
