YUI.add("arraytemplate-tests", function (Y) {
var tests = new Y.Test.Suite("Mock.Value.ArrayTemplate tests"),
    Assert = Y.Assert,
    ArrayAssert = Y.ArrayAssert;

tests.add(new Y.Test.Case({
            name: "Mock.Value.ArrayTemplate...",

            "...should be an instance of Mock.Value": function () {
                Assert.isTrue(
                    Y.Mock.Value.ArrayTemplate instanceof Y.Mock.Value);
            }
        }));

Y.Test.Runner.add(tests);
}, "1", {
    requires: ["test", "gallery-mock-value-extras"]
});
