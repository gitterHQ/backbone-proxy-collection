var assert          = require('assert');
var ProxyCollection = require('../../index.js');
var Backbone        = require('backbone');

describe('ProxyCollection.clone()', function() {
  it('should return a clone Proxy collection', function() {

    var compare    = function(model) { return model.id; };
    var collection = new Backbone.Collection([{label: 'a'}], {
      comparator: compare,
    });

    var proxyCollection = new ProxyCollection({
      collection: collection,
    }).clone();

    proxyCollection.add({label: 'b'});

    assert.equal('a', proxyCollection.at(0).get('label'));
    assert.equal('b', proxyCollection.at(1).get('label'));
    assert.strictEqual(proxyCollection.collection.comparator, compare);
  });
});
