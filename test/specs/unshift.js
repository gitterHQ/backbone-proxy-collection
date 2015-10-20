var assert          = require('assert');
var ProxyCollection = require('../../index');
var Backbone        = require('backbone');

var proxyCollection;
var collection;
beforeEach(function() {
  collection = new Backbone.Collection([
    {label: 'b'},
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

});
