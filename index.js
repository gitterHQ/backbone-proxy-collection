'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

function ProxyCollection(attrs, options) {
  attrs = (attrs || {});
  attrs.collection = (attrs.collection || new Backbone.Collection());
  _.extend(this, attrs);

  this._syncWithCollection();

  this.listenTo(this.collection, 'add', this._onCollectionAdd, this);
  this.listenTo(this.collection, 'sort', this._onCollectionSort, this);
}

ProxyCollection.prototype = _.extend({}, Backbone.Events, {
  add: function(models, options) {
    this.collection.add(models, options);
  },

  pluck: function() {
    return this.collection.pluck.apply(this.collection, arguments);
  },

  sort: function() {
    return this.collection.sort.apply(this.collection, arguments);
  },

  parse: function() {
    this.collection.parse.apply(this.collection, arguments);
    this._syncWithCollection();
  },

  at: function (index){
    return this.collection.at(index);
  },

  clone: function (){
    //TODO: what about other attributes passed to ProxyCollection?
    return new ProxyCollection({
      collection: this.collection.clone()
    });
  },

  _onCollectionAdd: function(models, collection, options) {
    this._syncWithCollection();
    this.trigger('add', models, this, options);
  },

  _onCollectionSort: function(collection, options) {
    this._syncWithCollection();
    this.trigger('sort', collection, options);
  },

  _syncWithCollection: function() {
    this.length = this.collection.length;
    this.models = this.collection.models;
  },
});

module.exports = ProxyCollection;
