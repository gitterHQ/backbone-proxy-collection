var assert          = require('assert');
var ProxyCollection = require('../../index');
var Backbone        = require('backbone');

var proxyCollection;
var collection;
var secondaryCollection;

beforeEach(function() {
  collection = new Backbone.Collection([
    {id: 1, label: 'a', type: true},
    {id: 2, label: 'b' },
    {id: 3, label: 'c', type: true},
    {id: 4, label: 'd'},
  ]);

  secondaryCollection = new Backbone.Collection([
    {id: 5, label: 'e' },
    {id: 6, label: 'f', type: true},
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

  it('Should return the first model that passes the check after switch collection is called', function() {
    proxyCollection.switchCollection(secondaryCollection);
    var result = proxyCollection.findWhere({type: true});
    assert.ok(result);
    assert.equal('f', result.get('label'));
  });

});
