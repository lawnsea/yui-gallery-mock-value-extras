YUI.add("oneof-tests", function (Y) {
var tests = new Y.Test.Suite("Mock.Value.OneOf tests"),
    MockValue = Y.Mock.Value,
    Assert = Y.Assert,
    ArrayAssert = Y.ArrayAssert;

tests.add(new Y.Test.Case({
            name: "Mock.Value.OneOf...",

            _should: {
                fail: {
                    "...should not allow a value that doesn't match": true
                }
            },

            "...should provide a verify method": function () {
                Assert.isFunction(MockValue.OneOf().verify);
            },

            "...should allow a value that matches exactly": function () {
                var mock = Y.Mock();

                Y.Mock.expect(mock, {
                        method: "foo",
                        args: [MockValue.OneOf("fiz", "biz", "bar")]
                    });

                mock.foo("bar");

                Y.Mock.verify(mock);
            },

            "...should allow a value that matches a MockValue": function () {
                var mock = Y.Mock();

                Y.Mock.expect(mock, {
                        method: "foo",
                        args: [MockValue.OneOf("fiz", MockValue.String, "biz")]
                    });

                mock.foo("bar");

                Y.Mock.verify(mock);
            },

            "...should allow a value that matches once": function () {
                var mock = Y.Mock();

                Y.Mock.expect(mock, {
                        method: "foo",
                        args: [MockValue.OneOf(MockValue.Boolean, MockValue.String)]
                    });

                mock.foo("bar");

                Y.Mock.verify(mock);
            },

            "...should allow a value that matches more than once": function () {
                var mock = Y.Mock();

                Y.Mock.expect(mock, {
                        method: "foo",
                        args: [MockValue.OneOf(MockValue.String, "foo", "bar")]
                    });

                mock.foo("bar");

                Y.Mock.verify(mock);
            },

            "...should not allow a value that doesn't match": function () {
                var mock = Y.Mock();

                Y.Mock.expect(mock, {
                        method: "foo",
                        args: [MockValue.OneOf(MockValue.Boolean, "frob", "nard")]
                    });

                mock.foo("bar");

                Y.Mock.verify(mock);
            }
        }));

Y.Test.Runner.add(tests);
}, "1", {
    requires: ["test", "gallery-mock-value-extras"]
});
