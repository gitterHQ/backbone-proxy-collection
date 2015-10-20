var assert          = require('assert');
var ProxyCollection = require('../../index');
var Backbone        = require('backbone');

var proxyCollection;
var collection;
var model;
beforeEach(function() {
  model = new Backbone.Model({id: 123, label: 'a'});
  collection = new Backbone.Collection([
    model,
    {id: 234, label: 'b'},
  ]);
  proxyCollection = new ProxyCollection({
    collection: collection,
  });
});

describe('ProxyRequire.get()', function() {

  it('Should return the correct model', function() {
    var result = proxyCollection.get(model);
    assert.equal('a', result.get('label'));
    result = proxyCollection.get(123);
    assert.equal('a', result.get('label'));
  });

});
