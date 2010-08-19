YUI.add("array-tests", function (Y) {
var tests = new Y.Test.Suite("Mock.Value.Array tests"),
    MockValue = Y.Mock.Value,
    Assert = Y.Assert,
    ArrayAssert = Y.ArrayAssert;

tests.add(new Y.Test.Case({
            name: "Mock.Value.Array...",

            _should: {
                fail: {
                    "...should not allow non-array values": true
                }
            },

            "...should provide a verify method": function () {
                Assert.isFunction(MockValue.Array.verify);
            },

            "...should allow array values": function () {
                var mock = Y.Mock();

                Y.Mock.expect(mock, {
                        method: "foo",
                        args: [MockValue.Array]
                    });

                mock.foo([]);

                Y.Mock.verify(mock);
            },

            "...should not allow non-array values": function () {
                var mock = Y.Mock();

                Y.Mock.expect(mock, {
                        method: "foo",
                        args: [MockValue.Array]
                    });

                mock.foo("bar");

                Y.Mock.verify(mock);
            }
        }));

Y.Test.Runner.add(tests);
}, "1", {
    requires: ["test", "gallery-mock-value-extras"]
});
