[![npm version](http://img.shields.io/npm/v/simple-redis-store.svg)](https://npmjs.org/package/simple-redis-store)
[![Build Status](https://travis-ci.org/pasupulaphani/simple-redis-store.svg?branch=master)](https://travis-ci.org/pasupulaphani/simple-redis-store)
[![Coverage Status](https://coveralls.io/repos/github/pasupulaphani/simple-redis-store/badge.svg?branch=master)](https://coveralls.io/github/pasupulaphani/simple-redis-store?branch=master)
[![dependencies Status](https://david-dm.org/pasupulaphani/simple-redis-store/status.svg)](https://david-dm.org/pasupulaphani/simple-redis-store)
[![Donate to help support David development](http://img.shields.io/gratipay/pasupulaphani.svg?style=flat)](https://www.gittip.com/pasupulaphani/)

# simple-redis-store
Redis store ready to scale with node-pool support

> Note: This lib is still in alpha

## Prerequisites

This module requires nodejs v4 or above as it has dependencies on various es6 components such as Map, Set, Promise etc.

### Getting started

    npm install simple-redis-store

    var RedisStore = require("simple-redis-store");
    var store = new RedisStore();

    // set
    store.set("key", "value");

### Run tests

    bash test.sh
