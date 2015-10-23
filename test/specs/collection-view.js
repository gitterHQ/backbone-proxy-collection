var assert          = require('assert');
var ProxyCollection = require('../../index');
var Backbone        = require('backbone');
var _ = require('underscore');
var Marionette = require('backbone.marionette');

var proxyCollection;
var collection;
var ItemView;
var CollectionView;
var el;

beforeEach(function(){

  collection = new Backbone.Collection([
    { id:1, label: 'a'},
    { id:2, label: 'b'},
    { id:3, label: 'c'},
  ]);

  proxyCollection = new ProxyCollection({
    collection: collection,
  });

  ItemView = Marionette.ItemView.extend({
    template: _.template('<span><%- label %></span>'),
  });

  el = document.createElement('div');

  CollectionView = Marionette.CollectionView.extend({
    childView: ItemView,
    collection: proxyCollection,
    el: el
  });

});

describe('Working with Marionette\'s Collection View', function(){

  it('Should render correctly', function(){
    var collectionView = new CollectionView();
    collectionView.render();
    var result = collectionView.$el.find('span');
    assert.equal('a', result[0].innerHTML);
    assert.equal('b', result[1].innerHTML);
    assert.equal('c', result[2].innerHTML);
  });


  it('Should re-render correctly', function(){
    var collectionView = new CollectionView();
    collectionView.render();

    var result = collectionView.$el.find('span');
    assert.equal('a', result[0].innerHTML);
    assert.equal('b', result[1].innerHTML);
    assert.equal('c', result[2].innerHTML);

    proxyCollection.reset();
    proxyCollection.add({ id: 4, label: 'd' });
    proxyCollection.add({ id: 5, label: 'e' });
    proxyCollection.add({ id: 6, label: 'f' });

    collectionView.render();
    result = collectionView.$el.find('span');
    assert.equal('d', result[0].innerHTML);
    assert.equal('e', result[1].innerHTML);
    assert.equal('f', result[2].innerHTML);
  });

});
