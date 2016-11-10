const RedisPool = require("./redis_pool");
const bind = require("./util/bind");
const logger = require("./logger");

const debug = require("debug")("simpleRedisStore");

function RedisStore (name, redisOptions, poolOptions) {

  const pool = new RedisPool(name, redisOptions, poolOptions);
  logger.info("Redis store created.", pool.status());

  this.getName = bind(pool.getName, pool);
  this.getDB = bind(pool.getDB, pool);
  this.status = bind(pool.status, pool);

  this.get = (key) => {

    return pool.acquire()
      .then((conn) => {
        return conn.getAsync(key)
          .then((result) => {
            pool.release(conn);
            return result;
          });
      });
  };

  this.set = (key, value) => {

    return pool.acquire()
      .then((conn) => {
        return conn.setAsync(key, value)
          .then((result) => {
            pool.release(conn);
            return result;
          });
      });
  };

  this.setex = (key, value, ttlInSeconds) => {

    return pool.acquire()
      .then((conn) => {
        return conn.setexAsync(key, ttlInSeconds, value)
          .then((result) => {
            pool.release(conn);
            return result;
          });
      });
  };

  this.del = (key) => {

    return pool.acquire()
      .then((conn) => {
        return conn.delAsync(key)
          .then((result) => {
            pool.release(conn);
            return result;
          });
      });
  };

  this.ttlInSeconds = (key) => {

    return pool.acquire()
      .then((conn) => {
        return conn.ttlInSecondsAsync(key)
          .then((result) => {
            pool.release(conn);
            return result;
          });
      });
  };

  this.keys = (pattern) => {
    if (!pattern || pattern === "") {
      pattern = "*";
    }

    return pool.acquire()
      .then((conn) => {
        return conn.keysAsync(pattern)
          .then((result) => {
            pool.release(conn);
            return result;
          });
      });
  };


  this.deleteAll = (pattern) => {
    if (!pattern || pattern === "") {
      pattern = "*";
    }
    logger.info("clearing redis keys: ", pattern);

    return pool.acquire()
      .then((conn) => {
        return conn.keysAsync(pattern)
          .then((keys) => {
            if (keys.length > 0) {
              debug("deleting keys ", keys);
              return conn.delAsync(keys)
                .then((result) => {
                  pool.release(conn);
                  return result;
                });
            }
          });
      });
  };
}

module.exports = RedisStore;
