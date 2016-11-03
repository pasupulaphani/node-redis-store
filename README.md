# simple-redis-store
Redis store ready to scale with node-pool support

> Note: This lib is still in alpha

### Getting started

    npm install simple-redis-store

    var RedisStore = require("simple-redis-store");
    var store = new RedisStore();

    // set
    store.set("key", "value");
