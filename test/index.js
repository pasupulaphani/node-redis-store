var should = require("should");

describe("dummy", function() {
  it("verifies array contents", function() {
    var array = [1, 2, 3, 4];
    should(array).containEql(1);
  });
});
