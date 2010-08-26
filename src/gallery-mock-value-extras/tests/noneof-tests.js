YUI.add("noneof-tests", function (Y) {
var tests = new Y.Test.Suite("Mock.Value.NoneOf tests"),
    MockValue = Y.Mock.Value,
    Assert = Y.Assert,
    ArrayAssert = Y.ArrayAssert;

tests.add(new Y.Test.Case({
            name: "Mock.Value.NoneOf...",

            _should: {
                fail: {
                    "...should not allow a value that matches exactly": true,
                    "...should not allow a value that matches a MockValue": true
                }
            },

            "...should provide a verify method": function () {
                Assert.isFunction(MockValue.NoneOf().verify);
            },

            "...should not allow a value that matches exactly": function () {
                var mock = Y.Mock();

                Y.Mock.expect(mock, {
                        method: "foo",
                        args: [MockValue.NoneOf("fiz", "biz", "bar")]
                    });

                mock.foo("bar");

                Y.Mock.verify(mock);
            },

            "...should not allow a value that matches a MockValue": function () {
                var mock = Y.Mock();

                Y.Mock.expect(mock, {
                        method: "foo",
                        args: [MockValue.NoneOf("fiz", MockValue.String, "biz")]
                    });

                mock.foo("bar");

                Y.Mock.verify(mock);
            },

            "...should allow a value that doesn't match": function () {
                var mock = Y.Mock();

                Y.Mock.expect(mock, {
                        method: "foo",
                        args: [MockValue.NoneOf(MockValue.Boolean, "frob", "nard")]
                    });

                mock.foo("bar");

                Y.Mock.verify(mock);
            }
        }));

Y.Test.Runner.add(tests);
}, "1", {
    requires: ["test", "gallery-mock-value-extras"]
});
