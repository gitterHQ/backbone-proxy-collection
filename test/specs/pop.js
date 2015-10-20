var assert          = require('assert');
var ProxyCollection = require('../../index');
var Backbone        = require('backbone');

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

describe('ProxyCollection.pop()', function() {

  it('Should pop a model off it\'s collection', function() {
    var resultModel = proxyCollection.pop();
    assert.equal('b', resultModel.get('label'));
    assert.equal(1, proxyCollection.length);
  });

});
