var Bluebird = require("bluebird");
var RedisPool = require("./redis_pool");
var bind = require("./util/bind");
var logger = require("./logger");

var debug = require("debug")("simpleRedisStore");

function RedisStore (name, redisOptions, poolOptions) {

  var pool = new RedisPool(name, redisOptions, poolOptions);
  logger.info("Redis store created.", pool.status());

  function acquire () {
    return new Bluebird(function (resolve, reject) {
      pool.acquire(function (err, conn) {
        if (err) {
          pool.release(conn);
          return reject(err);
        }

        if (redisOptions.db) {
          conn.select(redisOptions.db);
        }

        resolve(conn);
      });
    });
  }

  function release (conn) {
    return pool.release(conn);
  }

  this.getName = bind(pool.getName, pool);
  this.getDB = bind(pool.getDB, pool);
  this.status = bind(pool.status, pool);

  this.get = function (key) {

    return acquire()
      .then(function (conn) {
        return conn.getAsync(key)
          .then(function (result) {
            release(conn);
            return result;
          });
      });
  };

  this.set = function (key, value) {

    return acquire()
      .then(function (conn) {
        return conn.setAsync(key, value)
          .then(function (result) {
            release(conn);
            return result;
          });
      });
  };

  this.setex = function (key, value, ttl) {

    return acquire()
      .then(function (conn) {
        return conn.setexAsync(key, ttl, value)
          .then(function (result) {
            release(conn);
            return result;
          });
      });
  };

  this.del = function (key) {

    return acquire()
      .then(function (conn) {
        return conn.delAsync(key)
          .then(function (result) {
            release(conn);
            return result;
          });
      });
  };

  this.ttl = function (key) {

    return acquire()
      .then(function (conn) {
        return conn.ttlAsync(key)
          .then(function (result) {
            release(conn);
            return result;
          });
      });
  };

  this.keys = function (pattern) {
    if (!pattern || pattern === "") {
      pattern = "*";
    }

    return acquire()
      .then(function (conn) {
        return conn.keysAsync(pattern)
          .then(function (result) {
            release(conn);
            return result;
          });
      });
  };


  this.deleteAll = function (pattern) {
    if (!pattern || pattern === "") {
      pattern = "*";
    }
    logger.info("clearing redis keys: ", pattern);

    return acquire()
      .then(function (conn) {
        return conn.keysAsync(pattern)
          .then(function (keys) {
            if (keys.length > 0) {
              debug("deleting keys ", keys);
              return conn.delAsync(keys)
                .then(function (result) {
                  release(conn);
                  return result;
                });
            }
          });
      });
  };
}

module.exports = RedisStore;
