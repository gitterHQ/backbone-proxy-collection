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

  it('Should emit a collection:change event when swicthCollection is called', function(done){
    proxyCollection.on('collection:change', function(){
      assert.ok(true);
      done();
    });
    proxyCollection.switchCollection(new Backbone.Collection());
  });

});
