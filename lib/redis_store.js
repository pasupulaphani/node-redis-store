const RedisPool = require("simple-redis-pool");
const pick = require("lodash.pick");

const debug = require("debug")("simpleRedisStore");

/**
 * @constructor
 * @param    {object}   options - Accepts properties ["name", "redisOptions", "poolOptions", "logger"]
 * @param    {string}   options.name - Name your pool
 * @param    {object}   options.redisOptions - opts from [node_redis#options-object-properties]{@link https://github.com/NodeRedis/node_redis#options-object-properties}
 * @param    {object}   options.poolOptions - opts from [node-pool#createpool]{@link https://github.com/coopernurse/node-pool#createpool}
 * @param    {object}   options.logger - Inject your custom logger
 */
const RedisStore = module.exports = function (options) {

  options = pick(options, ["name", "redisOptions", "poolOptions", "logger"]);

  this.name = options.name || `redisStore-${Math.random().toString(36).substr(2, 10)}`;
  this.redisOptions = options.redisOptions;
  this.poolOptions = options.poolOptions;
  this.logger = require("./logger")(options.logger);

  this.pool = null;
  try {
    this.pool = new RedisPool({
      name: this.name,
      redisOptions: this.redisOptions,
      poolOptions: this.poolOptions,
      logger: this.logger
    });

    // // since pool factory events are not triggered due to retry issue; a workaround
    // this.testConnection()
    //   .then((res) => {
    //     console.log("#########################", res)
    //     debug("Redis store created.", this.pool.status())
    //   });
// this.pool.acquire()
  } catch (e) {
    debug("Failed to create", e);
    this.pool = null;
    throw e;
  }
};

RedisStore.prototype.testConnection = function () {

  debug("PING to test connection");

  return this.ping()
    .then(resp => {
      if (resp !== "PONG") {
        debug("expected PONG but got", resp);
        const err = new Error("UNKNOWN_PING_RESPONSE");
        err.message = "expected PONG but got : " + resp;
        throw err;
      }
    })
    .catch(e => {
      debug("Failed to PING", e);
      this.logger.error("Test connection failed", e);
      throw e;
    });
};

/**
 * Returns factory.name for this pool
 *
 * @returns {string} Name of the pool
 */
RedisStore.prototype.getName = function () {
  return this.pool.getName();
};

/**
 * Returns this.redisOptions for this pool
 *
 * @returns {object} redis options given
 */
RedisStore.prototype.getRedisOptions = function () {
  return this.pool.getRedisOptions();
};

/**
 * Returns this.poolOptions for this pool
 *
 * @returns {object} pool options given
 */
RedisStore.prototype.getPoolOptions = function () {
  return this.pool.getPoolOptions();
};

/**
 * Send redis instructions
 *
 * @param {string} commandName - Name of the command
 * @param {array}  commandArgs - Args sent to the command
 * @returns {promise} Promise resolve with the result or Error
 */
RedisStore.prototype.sendCommand = function () {
  return this.pool.sendCommand.apply(this, arguments);
};

RedisStore.prototype.ping = function () {
  return this.sendCommand("ping");
};

RedisStore.prototype.get = function (key) {
  return this.sendCommand("get", key);
};

RedisStore.prototype.set = function (key, value, ttlInSeconds) {

  if (ttlInSeconds) {
    return this.sendCommand("setex", [key, ttlInSeconds, value]);
  } else {
    return this.sendCommand("set", [key, value]);
  }
};

RedisStore.prototype.del = function (keys) {
  return this.sendCommand("del", keys);
};

RedisStore.prototype.expire = function (key, ttlInSeconds) {
  return this.sendCommand("expire", [key, ttlInSeconds]);
};

RedisStore.prototype.ttlInSeconds = function (key) {
  return this.sendCommand("ttl", key);
};

RedisStore.prototype.keys = function (pattern) {
  if (!pattern || pattern === "") {
    pattern = "*";
  }

  return this.sendCommand("keys", pattern);
};

RedisStore.prototype.deleteAll = function (pattern) {
  if (!pattern || pattern === "") {
    pattern = "*";
  }
  debug("clearing redis keys: ", pattern);

  return this.keys(pattern)
    .then(keys => {

      if (keys.length > 0) {
        debug("deleting keys ", keys);
        return this.del(keys);
      } else {
        debug("no keys exists with pattern: ", pattern);
        return Promise.resolve(true);
      }
    });
};

RedisStore.prototype.status = function () {
  return this.pool.status();
};
