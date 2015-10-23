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
    {id: 5, label: 'e', type: true},
    {id: 6, label: 'f' },
    {id: 7, label: 'g', type: true},
    {id: 8, label: 'h'},
  ]);

  proxyCollection = new ProxyCollection({
    collection: collection,
  });
});

describe('ProxyCollection.where()', function() {

  it('Should return the correct models', function() {
    var result = proxyCollection.where({type: true});
    assert.equal(2, result.length);
    assert.equal('a', result[0].get('label'));
    assert.equal('c', result[1].get('label'));
  });

  it('Should return the correct models after switch Collection', function() {
    proxyCollection.switchCollection(secondaryCollection);
    var result = proxyCollection.where({type: true});
    assert.equal(2, result.length);
    assert.equal('e', result[0].get('label'));
    assert.equal('g', result[1].get('label'));
  });

});
