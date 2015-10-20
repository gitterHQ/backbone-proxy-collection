'use strict';

var Backbone = require('backbone');
var _ = require('underscore');

function ProxyCollection(attrs, options) {
  attrs = (attrs || {});
  attrs.collection = (attrs.collection || new Backbone.Collection());
  _.extend(this, attrs);

  this._syncWithCollection();

  this.listenTo(this.collection, 'all', this._onCollectionEvent, this);
}

ProxyCollection.prototype = _.extend({}, Backbone.Events, {

  initialize: function() {},

  add: function(models, options) {
    return this.collection.add(models, options);
  },

  pluck: function() {
    return this.collection.pluck.apply(this.collection, arguments);
  },

  sort: function() {
    return this.collection.sort.apply(this.collection, arguments);
  },

  parse: function() {
    return this.collection.parse.apply(this.collection, arguments);
  },

  at: function(index) {
    return this.collection.at(index);
  },

  clone: function() {
    //TODO: what about other attributes passed to ProxyCollection?
    return new ProxyCollection({
      collection: this.collection.clone(),
    });
  },

  remove: function(model) {
    return this.collection.remove.apply(this.collection, arguments);
  },

  destroy: function() {
    this.stopListening(this.collection, 'all', this._onCollectionEvent, this);
  },

  toJSON: function() {
    return this.collection.toJSON();
  },

  sync: function() {
    return this.collection.sync.apply(this.collection, arguments);
  },

  set: function() {
    return this.collection.set.apply(this.collection, arguments);
  },

  reset: function() {
    return this.collection.reset();
  },

  push: function() {
    return this.collection.push.apply(this.collection, arguments);
  },

  pop: function() {
    return this.collection.pop.apply(this.collection, arguments);
  },

  unshift: function() {
    return this.collection.unshift.apply(this.collection, arguments);
  },

  shift: function() {
    return this.collection.shift.apply(this.collection, arguments);
  },

  slice: function() {
    return this.collection.slice.apply(this.collection, arguments);
  },

  get: function() {
    return this.collection.get.apply(this.collection, arguments);
  },

  where: function() {
    return this.collection.where.apply(this.collection, arguments);
  },

  findWhere: function() {
    return this.collection.findWhere.apply(this.collection, arguments);
  },

  fetch: function() {
    return this.collection.fetch.apply(this.collection, arguments);
  },

  create: function() {
    return this.collection.create.apply(this.collection, arguments);
  },

  forEach: function() {
    return this.collection.forEach.apply(this.collection, arguments);
  },

  each: function() {
    return this.collection.each.apply(this.collection, arguments);
  },

  map: function() {
    return this.collection.map.apply(this.collection, arguments);
  },

  reduce: function() {
    this.collection.reduce.apply(this.collection, arguments);
  },

  foldl: function() {
    return this.collection.fodl.apply(this.collection, arguments);
  },

  foldr: function() {
    return this.collection.fodr.apply(this.collection, arguments);
  },

  inject: function() {
    return this.collection.inject.apply(this.collection, arguments);
  },

  reduceRight: function() {
    return this.collection.reduceRight.apply(this.collection, arguments);
  },

  find: function() {
    this.collection.find.apply(this.collection, arguments);
  },

  detect: function() {
    this.collection.detect.apply(this.collection, arguments);
  },

  _onCollectionEvent: function() {
    this._syncWithCollection();
    this.trigger.apply(this, arguments);
  },

  _syncWithCollection: function() {
    this.length = this.collection.length;
    this.models = this.collection.models;
    this.model  = this.collection.model;
  },
});

module.exports = ProxyCollection;
