var assert          = require('assert');
var ProxyCollection = require('../../index.js');
var Backbone        = require('backbone');

var proxyCollection;
var collection;
var secondaryCollection;
var model;

beforeEach(function() {
  var model = new Backbone.Model({id: 1, label: 'a'});

  collection = new Backbone.Collection([
    model,
    {id: 2, label: 'b'},
  ]);

  secondaryCollection = new Backbone.Collection([
    model,
    {id: 3, label: 'c'},
  ]);

  proxyCollection = new ProxyCollection({
    collection: collection,
  });
});

describe('ProxyCollection.remove()', function() {

  it('Should remove a model from its collection', function() {
    proxyCollection.remove(1);
    assert.equal('b', proxyCollection.at(0).get('label'));
  });

  it('Should remove a model from its collection after switch Collection', function() {
    proxyCollection.switchCollection(secondaryCollection);
    secondaryCollection.remove(1);
    assert.equal('c', proxyCollection.at(0).get('label'));
    assert.equal(2, collection.length);
    assert.equal(1, secondaryCollection.length);
    assert.equal(1, proxyCollection.length);
  });
});
