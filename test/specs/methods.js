var assert          = require('assert');
var ProxyCollection = require('../../index.js');
var Backbone        = require('backbone');

describe('ProxyCollection methods compared to Backbone.Collection', function() {

  it('should contain all the same methods', function() {
    var collection = new Backbone.Collection();
    var proxyCollection = new ProxyCollection({
      collection: collection,
    });

    for (var key in collection) {
      //ignore methods starting with _
      if (/^_/.test(key)) continue;
      if (key === 'modelId') continue;
      if (key === 'collect') continue;

      assert.equal(typeof proxyCollection[key], typeof collection[key], 'Proxy collection should contain a property of ' + key);
    }
  });

});
