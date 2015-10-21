'use strict';

var Backbone = require('backbone');
var _        = require('underscore');

var methods = [
  'add',
  'at',
  'findWhere',
  'get',
  'parse',
  'pluck',
  'pop',
  'push',
  'remove',
  'reset',
  'shift',
  'slice',
  'sort',
  'toJSON',
  'unshift',
  'where'
];

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
    this._unbind();
  },

  switchCollection: function (collection){
    this._unbind();
    this.collection = collection;
    this._bindToCollection();
    this._syncWithCollection();
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
    var self = this;
    methods.forEach(function(key){
      self[key] = null;
      self[key] = collection[key].bind(collection);
    });

    //listen to every event
    this.listenTo(collection, 'all', this._onCollectionEvent, this);
  },

  _unbind: function (){
    this.stopListening(this.collection, 'all', this._onCollectionEvent, this);
  },
});

module.exports = ProxyCollection;
