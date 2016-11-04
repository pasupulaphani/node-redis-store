require("should");
var RedisStore = require("../lib/redis_store");

describe("redisStore", function () {

  var redisStore = new RedisStore("testStore");

  describe("set", function () {
    it("set", function (done) {

      redisStore.set("key", "value")
        .then(function (test) {
          test.should.be.ok();
          done();
        });
    });
  });

  describe("get", function () {

    var key = "chuck-norris";
    var value = "alias: superman";

    before(function (done) {
      redisStore.set(key, value)
        .then(function () {
          done();
        });
    });

    it("get", function (done) {

      redisStore.get(key)
        .then(function (v) {
          v.should.be.equal(value);
          done();
        });
    });
  });
});
