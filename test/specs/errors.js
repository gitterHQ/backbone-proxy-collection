var assert          = require('assert');
var ProxyCollection = require('../../index');
var Backbone        = require('backbone');

var proxyCollection;
var collection;
beforeEach(function() {
  collection = new Backbone.Collection();
  proxyCollection = new ProxyCollection({
    collection: collection,
  });
});

describe('ProxyCollection errors', function() {

  it('Should throw an error if no collection is passed to switchCollection', function() {
    assert.throws(
      function(){
        return proxyCollection.switchCollection(null);
      },
      function(err) {
        return err.message === 'A valid collection must be passed to ProxyCollection.switchCollection';
      }
    );
  });

});
