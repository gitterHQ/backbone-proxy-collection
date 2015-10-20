var assert          = require('assert');
var Backbone        = require('backbone');
var ProxyCollection = require('../../index.js');

var proxyCollection;
var primaryCollection;
var secondaryCollection;

beforeEach(function() {
  primaryCollection   = new Backbone.Collection();
  secondaryCollection = new Backbone.Collection();
  proxyCollection     = new ProxyCollection({
    collection: primaryCollection,
  });
});

describe('ProxyCollection.add()', function() {

  it('Should emit an add event when a model is added', function(done) {
    proxyCollection.on('add', function() {
      assert.ok(true);
      assert.equal(1, proxyCollection.length, 'proxy-collection length prop is consistent');
      assert.equal(1, proxyCollection.models.length, 'proxy-collection models prop is consistent');
      done();
    });

    proxyCollection.add({});
  });

  it('Should emit an event when a model is added to it\'s collection', function(done) {
    proxyCollection.on('add', function() {
      assert.ok(true);
      assert.equal(1, proxyCollection.length, 'proxy-collection length prop is consistent');
      assert.equal(1, proxyCollection.models.length, 'proxy-collection models prop is consistent');
      done();
    });

    primaryCollection.add({});
  });

});
