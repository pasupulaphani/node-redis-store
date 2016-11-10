const should = require("should");
const Bluebird = require("bluebird");
const RedisStore = require("../lib/redis_store");

describe("redisStore", function () {

  const redisOptions = Object.assign({
    host: process.env.REDIS_HOST || "127.0.0.1"
  });
  const store = new RedisStore("testStore", redisOptions);

  describe("get", function () {

    const key = "chuck-norris";
    const value = "superman";

    before(function (done) {
      store.set(key, value)
        .then(function () {
          done();
        });
    });

    it("get", function (done) {

      store.get(key)
        .then(function (v) {
          v.should.be.equal(value);
          done();
        });
    });
  });

  describe("set", function () {
    it("set", function (done) {

      store.set("key", "value")
        .then(function (test) {
          test.should.be.ok();
          done();
        });
    });
  });

  describe("setex", function () {
    it("setex", function (done) {

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
});
