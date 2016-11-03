require("should");
var RedisStore = require("../lib/redis_store");

describe("redisStore", function () {

  var redisStore = new RedisStore("testStore");

  it("set", function (done) {

    redisStore.set("key", "value")
      .then(function (test) {
        test.should.be.ok();
        done();
      });
  });
});
