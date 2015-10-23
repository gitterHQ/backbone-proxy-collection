'use strict';

var Backbone = require('backbone');
var _        = require('underscore');

var protectedMethods = [
  'listenTo',
  'on',
  'trigger',
  'clone',
  'destroy',
  'initialize',
  'stopListening',
  'length',
  'model',
  'models'
];

function ProxyCollection(attrs, options) {
  attrs = (attrs || {});
  attrs.collection = (attrs.collection || new Backbone.Collection());
  this.collection = attrs.collection;
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
    this.trigger('collection:change');
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

    for(var key in collection){
      if(/^_/.test(key)) continue;
      if(protectedMethods.indexOf(key) != -1) continue;
      if(_.isFunction(collection[key])) this[key] = collection[key].bind(collection);
    }

    //avoid multipl bindings
    this.stopListening(collection, 'all', this._onCollectionEvent, this);

    //listen to every event
    this.listenTo(collection, 'all', this._onCollectionEvent, this);
  },

  _unbind: function (){
    this.stopListening(this.collection, 'all', this._onCollectionEvent, this);
  },
});

module.exports = ProxyCollection;
