YUI.add("array-tests", function (Y) {
var tests = new Y.Test.Suite("Mock.Value.Array tests"),
    Assert = Y.Assert,
    ArrayAssert = Y.ArrayAssert;

tests.add(new Y.Test.Case({
            name: "Mock.Value.Array...",

            _should: {
                fail: {
                    "...should not allow non-array values": true
                }
            },

            "...should be an instance of Mock.Value": function () {
                Assert.isTrue(
                    Y.Mock.Value.Array instanceof Y.Mock.Value);
            },

            "...should allow array values": function () {
                var mock = Y.Mock();

                Y.Mock.expect(mock, {
                        method: "foo",
                        args: [Y.Mock.Value.Array]
                    });

                mock.foo([]);

                Y.Mock.verify(mock);
            },

            "...should not allow non-array values": function () {
                var mock = Y.Mock();

                Y.Mock.expect(mock, {
                        method: "foo",
                        args: [Y.Mock.Value.Array]
                    });

                mock.foo("bar");

                Y.Mock.verify(mock);
            }
        }));

Y.Test.Runner.add(tests);
}, "1", {
    requires: ["test", "gallery-mock-value-extras"]
});
