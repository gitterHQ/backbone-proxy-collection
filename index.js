/* jshint unused:strict */
'use strict';

var Backbone = require('backbone');
var _        = require('underscore');

var BackboneCollectionPrototype = Backbone.Collection.prototype;
var Events = Backbone.Events;

function makeProxyFunction(key) {
  return function() {
    return this.collection[key].apply(this.collection, arguments);
  };
}

function ProxyCollection(attrs, options) {
  this.collection = attrs && attrs.collection || new Backbone.Collection();
  this._bindToCollection();

  if(!options || !options.dontDefineProps) {
    Object.defineProperty(this, 'length', {
      get: function() {
        return this.collection.length;
      }
    });

    Object.defineProperty(this, 'models', {
      get: function() {
        return this.collection.models;
      }
    });

    Object.defineProperty(this, 'model', {
      get: function() {
        return this.collection.model;
      }
    });

    Object.defineProperty(this, 'comparator', {
      get: function() {
        return this.collection.comparator;
      },
      set: function(value) {
        return (this.collection.comparator = value);
      }
    });
  }

  // Define additional properties
  var additionalProperties = attrs.properties;
  if (additionalProperties) {
    additionalProperties.forEach(function(property) {
      Object.defineProperty(this, property, {
        get: function() {
          return this.collection[property];
        },
        set: function(value) {
          return (this.collection[property] = value);
        }
      });
    }, this);
  }

  // Add any additional methods for this klass
  var klass = attrs && attrs.klass;
  if (klass && klass.prototype) {

    for (var key in klass.prototype) {
      var entry = klass.prototype[key];

      if (allowMethod(key, entry)) {
        this[key] = makeProxyFunction(key);
      }
    }

  }
}

ProxyCollection.prototype = _.extend({

    clone: function() {
      //TODO: what about other attributes passed to ProxyCollection?
      return new ProxyCollection({
        collection: this.collection.clone(),
      });
    },

    destroy: function() {
      this._unbind();
    },

    switchCollection: function (collection) {
      if (!collection) {
        throw new Error('A valid collection must be passed to ProxyCollection.switchCollection');
      }

      if (this.collection === collection) return;

      this._unbind();
      this.collection = collection;
      this._bindToCollection();
      this.trigger('reset', this, { switched: true });
    },

    _onCollectionEvent: function() {
      this.trigger.apply(this, arguments);
    },

    _bindToCollection: function() {
      this.listenTo(this.collection, 'all', this._onCollectionEvent);
    },

    _unbind: function (){
      this.stopListening(this.collection, 'all', this._onCollectionEvent);
    }
}, Events);

Object.keys(BackboneCollectionPrototype).forEach(function(key) {
  var entry = BackboneCollectionPrototype[key];
  if (allowMethod(key, entry)) {
    ProxyCollection.prototype[key] = makeProxyFunction(key);
  }
});

function allowMethod(key, entry) {
  if (key[0] === '_') return;
  if (typeof entry !== 'function') return;

  // Skip Event's methods
  if (Events.hasOwnProperty(key)) return;

  // Skip custom implementations
  if (ProxyCollection.prototype.hasOwnProperty(key)) return;

  // Skip Object
  if (Object.prototype.hasOwnProperty(key)) return;

  if (key === 'constructor' || key === 'initialize' || key === 'comparator') return;

  return true;
}

module.exports = ProxyCollection;
