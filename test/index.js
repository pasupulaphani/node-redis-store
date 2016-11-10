require("should");
const RedisStore = require("../lib/redis_store");

describe("redisStore", function () {

  const redisOptions = Object.assign({
    host: process.env.REDIS_HOST || "127.0.0.1"
  });
  const store = new RedisStore("testStore", redisOptions);

  describe("set", function () {
    it("set", function (done) {

      store.set("key", "value")
        .then(function (test) {
          test.should.be.ok();
          done();
        });
    });
  });

  describe("get", function () {

    const key = "chuck-norris";
    const value = "alias: superman";

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
});
