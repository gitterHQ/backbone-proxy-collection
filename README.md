Backbone.Collection Proxy
----------------------------

A simple utility to help switching out collections whilst allowing their respective views to function normally.

Examples:

```js

//Make a new collection
var privateCollection = new Backbone.Collection();
var publicCollection  = new ProxyCollection({
  collection: privateCollection
});

```

Now at any point if you want to switch the collection call:

``js`

var newCollection = new Backbone.Collection();
publicCollection.switchCollection(newCollection);

```

This will maintain you event bindings etc. Simples.
