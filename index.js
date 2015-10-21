'use strict';

var Backbone = require('backbone');
var _        = require('underscore');

function ProxyCollection(attrs, options) {
  attrs = (attrs || {});
  attrs.collection = (attrs.collection || new Backbone.Collection());
  _.extend(this, attrs);
  this._bindToCollection();
  this._syncWithCollection();
}

ProxyCollection.prototype = _.extend({}, Backbone.Events, {

  initialize: function() {},

  clone: function() {
    //TODO: what about other attributes passed to ProxyCollection?
    return new ProxyCollection({
      collection: this.collection.clone(),
    });
  },

  destroy: function() {
    this.stopListening(this.collection, 'all', this._onCollectionEvent, this);
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

  _bindToCollection: function() {
    var collection = this.collection;
    for (var key in collection) {
      //don't copy private methods
      if (/^_/.test(key)) continue;

      //if we already have a method move on
      if (typeof this[key] != 'undefined') continue;

      //only copy methods as they are the only things that can bind
      if (_.isFunction(collection[key])) {
        this[key] = this.collection[key].bind(this.collection);
      }
    }

    //listen to every event
    this.listenTo(collection, 'all', this._onCollectionEvent, this);
  },
});

module.exports = ProxyCollection;
