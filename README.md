[![npm version](http://img.shields.io/npm/v/knex.svg)](https://npmjs.org/package/simple-redis-store)
[![Build Status](https://travis-ci.org/pasupulaphani/angular-gist-embed.svg?branch=master)](https://travis-ci.org/pasupulaphani/simple-redis-store)
[![Test Coverage](https://codeclimate.com/github/pasupulaphani/simple-redis-store/badges/coverage.svg)](https://codeclimate.com/github/pasupulaphani/simple-redis-store/coverage)
[![Code Climate](https://codeclimate.com/github/pasupulaphani/simple-redis-store/badges/gpa.svg)](https://codeclimate.com/github/pasupulaphani/simple-redis-store)

# simple-redis-store
Redis store ready to scale with node-pool support

> Note: This lib is still in alpha

### Getting started

    npm install simple-redis-store

    var RedisStore = require("simple-redis-store");
    var store = new RedisStore();

    // set
    store.set("key", "value");

### Run tests

    bash test.sh


### todo

- acquire timeout
- move to es7 and support compile to others to support
