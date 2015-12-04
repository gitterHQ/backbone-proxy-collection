var assert          = require('assert');
var ProxyCollection = require('../../index');
var Backbone        = require('backbone');
var _               = require('underscore');

var proxyCollection;
var collection;
var CustomCollection;

beforeEach(function() {

  CustomCollection = Backbone.Collection.extend({
    customMethod1: function() {},

    customMethod2: function() {},

    customProp1: 'a',
    customProp2: 2,
    _privateProp1: 1,
    _privateProp2: 2,
  });

  collection = new CustomCollection();

  proxyCollection = new ProxyCollection({
    collection: collection,
    klass: CustomCollection
  });
});

describe('ProxyCollection should extend a custom collection', function() {

  it('Should not copy private methods', function(){
    assert(!proxyCollection._privateProp1);
    assert(!proxyCollection._privateProp2);
  });

  it('Should contain custom methods', function() {
    assert.ok(_.isFunction(proxyCollection.customMethod1));
    assert.ok(_.isFunction(proxyCollection.customMethod2));
  });

  it('Should contain custom props', function() {
    assert.ok('a', proxyCollection.customProp1);
    assert.ok(2, proxyCollection.customProp2);
  });

});
