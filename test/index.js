require("should");
var objectAssign = require("object-assign");
var RedisStore = require("../lib/redis_store");

describe("redisStore", function () {

  var redisOptions = objectAssign({
    host: process.env.REDIS_HOST || "127.0.0.1"
  });
  var store = new RedisStore("testStore", redisOptions);

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

    var key = "chuck-norris";
    var value = "alias: superman";

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
