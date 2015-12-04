var assert          = require('assert');
var ProxyCollection = require('../../index');
var Backbone        = require('backbone');

var proxyCollection;
var collection;
var secondaryCollection;

beforeEach(function() {
  collection = new Backbone.Collection([
  ]);
  collection.customProperty = 'one';

  secondaryCollection = new Backbone.Collection([
  ]);
  secondaryCollection.customProperty = 'two';


  proxyCollection = new ProxyCollection({
    collection: collection,
    properties: ['customProperty']
  });
});

describe('ProxyCollection.properties', function() {

  it('Should handle properties', function() {
    var result = proxyCollection.customProperty;
    assert.equal('one', result);
  });

  it('Should handle properties after switch', function() {
    proxyCollection.switchCollection(secondaryCollection);

    var result = proxyCollection.customProperty;
    assert.equal('two', result);
  });

});
