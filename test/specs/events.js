var assert          = require('assert');
var ProxyCollection = require('../../index');
var Backbone        = require('backbone');

var proxyCollection;
var collection;
beforeEach(function(){
  collection = new Backbone.Collection();
  proxyCollection = new ProxyCollection({
    collection: collection,
  });
});

describe('ProxyCollection.trigger()', function(){

  it('Should emit a reset event when swicthCollection is called', function(done){
    proxyCollection.on('reset', function(collection, options) {
      assert.strictEqual(collection, proxyCollection);
      assert.deepEqual(options, { switched: true });
      done();
    });
    proxyCollection.switchCollection(new Backbone.Collection());
  });

});
