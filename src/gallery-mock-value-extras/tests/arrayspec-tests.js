YUI.add("arrayspec-tests", function (Y) {
var tests = new Y.Test.Suite("Mock.Value.ArraySpec tests"),
    MockValue = Y.Mock.Value,
    Assert = Y.Assert,
    ArrayAssert = Y.ArrayAssert;

function makeTest(spec, value) {
    return function () {
        var mock = Y.Mock();

        Y.Mock.expect(mock, {
                method: "foo",
                args: [MockValue.ArraySpec(spec)]
            });

        mock.foo(value);

        Y.Mock.verify(mock);
    };
}

tests.add(new Y.Test.Case({
            name: "Mock.Value.ArraySpec...",

            _should: {
                fail: {
                    "...should not allow non-array values": true
                }
            },

            "...should return an instance of Mock.Value": function () {
                Assert.isTrue(
                    Y.Mock.Value.ArraySpec() instanceof Y.Mock.Value);
            },

            "...should not allow non-array values": makeTest({}, {}),

            "...should allow any array if no spec provided": makeTest({}, [])
        }));

tests.add(new Y.Test.Case({
            name: "Mock.Value.ArraySpec with a length requirement...",

            _should: {
                fail: {
                    "...should not allow arrays of incorrect length": true
                }
            },

            "...should allow arrays of correct length": makeTest({
                    length: 3
                },
                [1, 2, 3]),

            "...should not allow arrays of incorrect length": makeTest({
                    length: 3
                },
                [1, 2, 3, 4])
        }));

tests.add(new Y.Test.Case({
            name: "Mock.Value.ArraySpec with a minLength requirement...",

            _should: {
                fail: {
                    "...should not allow arrays of lesser length": true
                }
            },

            "...should allow arrays of equal length": makeTest({
                    minLength: 3
                },
                [1, 2, 3]),

            "...should allow arrays of greater length": makeTest({
                    minLength: 3
                },
                [1, 2, 3, 4, 5]),

            "...should not allow arrays of lesser length": makeTest({
                    minLength: 3
                },
                [1, 2])
        }));

tests.add(new Y.Test.Case({
            name: "Mock.Value.ArraySpec with a maxLength requirement...",

            _should: {
                fail: {
                    "...should not allow arrays of greater length": true
                }
            },

            "...should allow arrays of equal length": makeTest({
                    maxLength: 3
                },
                [1, 2, 3]),

            "...should not allow arrays of greater length": makeTest({
                    maxLength: 3
                },
                [1, 2, 3, 4, 5]),

            "...should allow arrays of lesser length": makeTest({
                    maxLength: 3
                },
                [1, 2])
        }));

Y.Test.Runner.add(tests);
}, "1", {
    requires: ["test", "gallery-mock-value-extras"]
});
