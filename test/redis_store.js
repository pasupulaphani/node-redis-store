const should = require("should");
const Bluebird = require("bluebird");
const RedisStore = require("../lib/redis_store");

describe("redisStore", function () {

  const redisOptions = Object.assign({
    host: process.env.REDIS_HOST || "127.0.0.1"
  });
  const store = new RedisStore("testStore", redisOptions);

  describe("get", function () {
    it("should retrieve an existing key", function (done) {

      const key = "chuck-norris";
      const value = "superman";

      store.set(key, value)
        .then(function (test) {
          test.should.be.ok();
        });

      store.get(key)
        .then(function (v) {
          v.should.be.equal(value);
          done();
        });
    });

    it("should return null if key doesn't exist", function (done) {

      store.get("unknownKey")
        .then(function (v) {
          should(v).be.null;
          done();
        });
    });
  });

  describe("set", function () {
    it("should store a value", function (done) {

      const key = "key";
      const value = "neverExpire";

      store.set(key, value)
        .then(function (test) {
          test.should.be.ok();
        });

      store.get(key)
        .then(function (v) {
          v.should.be.equal(value);
          done();
        });
    });
  });

  describe("setex", function () {
    it("should store with an expiry", function (done) {

      const key = "shortLivedKey";
      const value = "expireIn10ms";
      const ttlInSeconds = 1;

      store.setex(key, value, ttlInSeconds)
        .then(function (test) {
          test.should.be.ok();
        });

      store.get(key)
        .then(function (v) {
          v.should.be.equal(value);
        });

      Bluebird.delay(ttlInSeconds * 1000)
        .done(() => {
          return store.get(key)
            .then(function (v) {
              should(v).be.null;
              done();
            });
        });
    });
  });

  describe("del", function () {
    it("should delete an existing key", function (done) {

      const key = "key";
      const value = "neverExpire";

      store.set(key, value)
        .then(function (test) {
          test.should.be.ok();
        });

      store.del(key)
        .then(function (v) {
          v.should.be.ok();
        });

      store.get(key)
        .then(function (v) {
          should(v).be.null;
          done();
        });
    });

    it("should return null deleting non-existing key", function (done) {
      store.del("unknownKey")
        .then(function (v) {
          should(v).be.null;
          done();
        });
    });
  });
});
