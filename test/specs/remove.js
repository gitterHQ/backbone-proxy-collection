var assert          = require('assert');
var ProxyCollection = require('../../index.js');
var Backbone        = require('backbone');

var proxyCollection;
var collection;
var model;

beforeEach(function() {
  var model = new Backbone.Model({id: 1, label: 'a'});
  collection = new Backbone.Collection([
    model,
    {id: 2, label: 'b'},
  ]);
  proxyCollection = new ProxyCollection({
    collection: collection,
  });
});

describe('ProxyCollection.remove()', function() {
  it('Should remove a model from its collection', function() {
    proxyCollection.remove(model);
    assert.equal('a', proxyCollection.at(0).get('label'));
  });
});
