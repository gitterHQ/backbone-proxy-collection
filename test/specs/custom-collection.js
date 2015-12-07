var assert          = require('assert');
var ProxyCollection = require('../../index');
var Backbone        = require('backbone');
var _               = require('underscore');

var proxyCollection;
var collection;
var CustomCollection;
var EvenMoreCustomCollection;

beforeEach(function() {

  CustomCollection = Backbone.Collection.extend({
    customMethod1: function() {},

    customMethod2: function() {},

    customProp1: 'a',
    customProp2: 2,
    _privateProp1: 1,
    _privateProp2: 2,
  });

  EvenMoreCustomCollection = CustomCollection.extend({
    customMethod3: function() {}
  });

  collection = new CustomCollection();

  proxyCollection = new ProxyCollection({
    collection: collection,
    klass: EvenMoreCustomCollection
  });
});

describe('ProxyCollection should extend a custom collection', function() {

  it('Should not copy private methods', function(){
    assert(!proxyCollection._privateProp1);
    assert(!proxyCollection._privateProp2);
  });

  it('Should contain custom methods', function() {
    assert.ok(_.isFunction(proxyCollection.customMethod1), 'should contain customMethod1');
    assert.ok(_.isFunction(proxyCollection.customMethod2), 'should contain customMethod2');
    assert.ok(_.isFunction(proxyCollection.customMethod3), 'should contain customMethod3');
  });

});
