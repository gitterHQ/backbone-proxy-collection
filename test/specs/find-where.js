var assert          = require('assert');
var ProxyCollection = require('../../index');
var Backbone        = require('backbone');

var proxyCollection;
var collection;
beforeEach(function() {
  collection = new Backbone.Collection([
    {id: 1, label: 'a', type: true},
    {id: 2, label: 'b' },
    {id: 3, label: 'c', type: true},
    {id: 4, label: 'd'},

  ]);
  proxyCollection = new ProxyCollection({
    collection: collection,
  });
});

describe('ProxyCollection.findWhere()', function() {

  it('Should return the first model that passes the check', function() {
    var result = proxyCollection.findWhere({type: true});
    assert.ok(result);
    assert.equal('a', result.get('label'));
  });

});
