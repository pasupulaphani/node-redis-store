[![npm version](http://img.shields.io/npm/v/simple-redis-store.svg?style=flat-square)](https://npmjs.org/package/simple-redis-store)
[![Build Status](https://travis-ci.org/pasupulaphani/simple-redis-store.svg?branch=master)](https://travis-ci.org/pasupulaphani/simple-redis-store)
[![Coverage Status](https://coveralls.io/repos/github/pasupulaphani/simple-redis-store/badge.svg?branch=master)](https://coveralls.io/github/pasupulaphani/simple-redis-store?branch=master)
[![Dependency Status](https://www.versioneye.com/user/projects/583c5221d2fd570034b96f95/badge.svg?style=flat-square)](https://www.versioneye.com/user/projects/583c5221d2fd570034b96f95)
[![Gratipay donate button](https://img.shields.io/badge/gratipay-donate-yellow.svg?style=flat-square)](https://gratipay.com/simple-redis-store/)

# simple-redis-store
Redis store ready to scale with node-pool support

> Note: This lib is in beta

## Prerequisites

This module requires nodejs v4 or above as it has dependencies on es6 components such as Map, Set, Promise etc.

### Getting started

    npm install simple-redis-store

    const RedisStore = require("simple-redis-store");
    const store = new RedisStore();

    // set
    store.set("key", "value");

#### API

- RedisStore([options])

#### `options` object properties

| Property  | Default   | Description |
|-----------|-----------|-------------|
| name      | Random unique string | Name your pool |
| redisOptions      | ```{url: redis://127.0.0.1:6379}```      | opts from  https://github.com/NodeRedis/node_redis#options-object-properties |
| poolOptions      | null      | opts from https://github.com/coopernurse/node-pool#createpool |
| logger       | null      | Inject your custom logger |


### Run tests

    bash test.sh

## Contribute

[Discover how you can contribute by heading on over to the `CONTRIBUTING.md` file.](https://github.com/pasupulaphani/simple-redis-store/blob/master/CONTRIBUTING.md)

## Backers

### Maintainers

These amazing people are maintaining this project:

*   [Phani](https://github.com/pasupulaphani) — [view contributions](https://github.com/pasupulaphani/simple-redis-store/commits?author=pasupulaphani)

### Sponsors

No sponsors yet! Will you be the first?

[![Patreon donate button](https://img.shields.io/badge/patreon-donate-yellow.svg)](http://patreon.com/phaninder "Donate to this project using Patreon")
[![Gratipay donate button](https://img.shields.io/badge/gratipay-donate-yellow.svg)](https://gratipay.com/~pasupulaphani/ "Donate weekly to this project using Gratipay")
[![Flattr donate button](https://img.shields.io/badge/flattr-donate-yellow.svg)](https://flattr.com/profile/pasupulaphani "Donate to this project using Flattr")
<!-- [![PayPal donate button](https://img.shields.io/badge/paypal-donate-yellow.svg)](https://phaninder.com/paypal "Donate to this project using Paypal") -->
<!-- [![Bitcoin donate button](https://img.shields.io/badge/bitcoin-donate-yellow.svg)](https://phaninder.com/bitcoin "Donate once-off to this project using Bitcoin") -->
<!-- [![Wishlist browse button](https://img.shields.io/badge/wishlist-donate-yellow.svg)](https://phaninder.com/wishlist "Buy an item on our wishlist for us") -->

### Contributors

These amazing people have contributed code to this project:

*   [Oliver Brooks](https://github.com/oliverbrooks)

[Discover how you can contribute by heading on over to the `CONTRIBUTING.md` file.](https://github.com/pasupulaphani/simple-redis-store/blob/master/CONTRIBUTING.md)
