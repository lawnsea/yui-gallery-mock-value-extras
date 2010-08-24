YUI.add("objectspec-tests", function (Y) {
var tests = new Y.Test.Suite("Mock.Value.ObjectSpec tests"),
    MockValue = Y.Mock.Value,
    Assert = Y.Assert,
    ObjectAssert = Y.ObjectAssert,
    ArrayAssert = Y.ArrayAssert;

function makeTest(spec, value) {
    return function () {
        var mock = Y.Mock();

        Y.Mock.expect(mock, {
                method: "foo",
                args: [MockValue.ObjectSpec(spec)]
            });

        mock.foo(value);

        Y.Mock.verify(mock);
    };
}

tests.add(new Y.Test.Case({
            name: "Mock.Value.ObjectSpec...",

            _should: {
                fail: {
                    "...should not allow non-object values": true,
                    "...should not allow function values": true,
                    "...should not allow array values": true
                }
            },

            "...should return an instance of Mock.Value": function () {
                Assert.isTrue(
                    Y.Mock.Value.ObjectSpec() instanceof Y.Mock.Value);
            },

            "...should not allow non-object values": makeTest({}, "foo"),
            
            "...should not allow function values": makeTest({}, function () {}),

            "...should not allow array values": makeTest({}, []),

            "...should allow any object if no spec provided": makeTest({}, {})
        }));

tests.add(new Y.Test.Case({
            name: "An ObjectSpec with a size requirement...",

            _should: {
                fail: {
                    "...should not allow objects of incorrect size": true
                }
            },

            "...should allow objects of correct size": makeTest({
                    size: 3
                },
                { foo: "bar", frob: "nard", fiz: "biz" }),

            "...should not allow objects of incorrect size": makeTest({
                    size: 3
                },
                { foo: "bar", frob: "nard", fiz: "biz", moo: "cow" })
        }));

tests.add(new Y.Test.Case({
            name: "An ObjectSpec with a minSize requirement...",

            _should: {
                fail: {
                    "...should not allow objects of lesser size": true
                }
            },

            "...should allow objects of equal size": makeTest({
                    minSize: 3
                },
                { foo: "bar", frob: "nard", fiz: "biz" }),

            "...should allow objects of greater size": makeTest({
                    minSize: 3
                },
                { foo: "bar", frob: "nard", fiz: "biz", moo: "cow" }),

            "...should not allow objects of lesser size": makeTest({
                    minSize: 3
                },
                { foo: "bar", frob: "nard" })
        }));

tests.add(new Y.Test.Case({
            name: "An ObjectSpec with a maxSize requirement...",

            _should: {
                fail: {
                    "...should not allow objects of greater size": true
                }
            },

            "...should allow objects of equal size": makeTest({
                    maxSize: 3
                },
                { foo: "bar", frob: "nard", fiz: "biz" }),

            "...should not allow objects of greater size": makeTest({
                    maxSize: 3
                },
                { foo: "bar", frob: "nard", fiz: "biz", moo: "cow" }),

            "...should allow objects of lesser size": makeTest({
                    maxSize: 3
                },
                { foo: "bar", frob: "nard" })
        }));

tests.add(new Y.Test.Case({
            name: "An ObjectSpec with a simple contains requirement...",

            _should: {
                fail: {
                    "...should not allow objects that don't contain the required keys": true
                }
            },

            "...should not allow objects that don't contain the required keys": makeTest({
                    contains: ["foo", "fiz", "frob"]
                },
                { foo: "bar", frob: "nard" }),

            "...should allow objects that contain the required keys": makeTest({
                    contains: ["foo", "fiz", "frob"]
                },
                { foo: "bar", frob: "nard", fiz: "biz", moo: "cow" })
        }));

tests.add(new Y.Test.Case({
            name: "An ObjectSpec with a simple containsAny requirement...",

            _should: {
                fail: {
                    "...should not allow objects that don't contain one of the required keys": true
                }
            },

            "...should not allow objects that don't contain one of the required keys": makeTest({
                    containsAny: ["foo", "fiz", "frob"]
                },
                { boo: "bar", brob: "nard", biz: "biz", moo: "cow" }),

            "...should allow objects that contain one of the required keys": makeTest({
                    containsAny: ["foo", "fiz", "frob"]
                },
                { boo: "bar", frob: "nard", biz: "biz", moo: "cow" }),

            "...should allow objects that contain more than one of the required keys": makeTest({
                    containsAny: ["foo", "fiz", "frob"]
                },
                { boo: "bar", frob: "nard", fiz: "biz", moo: "cow" })
        }));

tests.add(new Y.Test.Case({
            name: "An ObjectSpec with a simple doesNotContain requirement...",

            _should: {
                fail: {
                    "...should not allow objects that contain any of the given keys": true
                }
            },

            "...should not allow objects that contain any of the given keys": makeTest({
                    doesNotContain: ["foo", "fiz", "frob"]
                },
                { boo: "bar", frob: "nard", biz: "biz", moo: "cow" }),

            "...should allow objects that contain none of the given keys": makeTest({
                    doesNotContain: ["foo", "fiz", "frob"]
                },
                { boo: "bar", brob: "nard", biz: "biz", moo: "cow" })
        }));

Y.Test.Runner.add(tests);
}, "1", {
    requires: ["test", "gallery-mock-value-extras"]
});
