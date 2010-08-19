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
            name: "An ArraySpec with a length requirement...",

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
            name: "An ArraySpec with a minLength requirement...",

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
            name: "An ArraySpec with a maxLength requirement...",

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

tests.add(new Y.Test.Case({
            name: "An ArraySpec with a contains requirement...",

            _should: {
                fail: {
                    "...should not allow arrays that don't contain the required elements": true
                }
            },

            "...should not allow arrays that don't contain the required elements": makeTest({
                    contains: [1, 2, 3]
                },
                [1, 3]),

            "...should allow arrays that contain the required elements": makeTest({
                    contains: [1, 2, 3]
                },
                [1, 2, 3, 4])
        }));

tests.add(new Y.Test.Case({
            name: "An ArraySpec with a containsAny requirement...",

            _should: {
                fail: {
                    "...should not allow arrays that don't contain one of the required elements": true
                }
            },

            "...should not allow arrays that don't contain one of the required elements": makeTest({
                    containsAny: [1, 2, 3]
                },
                [4, 5, 6]),

            "...should allow arrays that contain one of the required elements": makeTest({
                    containsAny: [1, 2, 3]
                },
                [4, 5, 1, 6]),

            "...should allow arrays that contain more than one of the required elements": makeTest({
                    containsAny: [1, 2, 3]
                },
                [3, 5, 1, 6])
        }));

tests.add(new Y.Test.Case({
            name: "An ArraySpec with a doesNotContain requirement...",

            _should: {
                fail: {
                    "...should not allow arrays that contain any of the given elements": true
                }
            },

            "...should not allow arrays that contain any of the given elements": makeTest({
                    doesNotContain: [1, 2, 3]
                },
                [4, 5, 1, 6]),

            "...should allow arrays that contain none of the given elements": makeTest({
                    doesNotContain: [1, 2, 3]
                },
                [4, 5, 6])
        }));

Y.Test.Runner.add(tests);
}, "1", {
    requires: ["test", "gallery-mock-value-extras"]
});
