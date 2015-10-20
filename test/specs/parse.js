var assert          = require('assert');
var sinon           = require('sinon');
var Backbone        = require('backbone');
var ProxyCollection = require('../../index.js');

//TODO this need to be more robust
//ie testing that proxyCollection.models is actually parsed
describe('ProxyCollection.parse()', function() {
  it('call parse on the child collection', function() {
    var spy = sinon.spy();
    var Collection = Backbone.Collection.extend({
      parse: spy,
    });
    var collection = new Collection();
    var proxyCollection = new ProxyCollection({
      collection: collection,
    });
    proxyCollection.parse();
    assert.equal(1, spy.callCount);
  });
});
