var assert          = require('assert');
var ProxyCollection = require('../../index.js');
var Backbone        = require('backbone');

var proxyCollection;
var collection;
beforeEach(function() {
  collection = new Backbone.Collection();
  proxyCollection = new ProxyCollection({
    collection: collection,
  });
});

describe('ProxyCollection.destroy()', function() {
  it.only('Should remove all event listeners', function(done) {

    proxyCollection.on('all', function() {
      assert.ok(false);
    });

    proxyCollection.destroy();
    collection.add({id: 1});
    done();

  });
});
