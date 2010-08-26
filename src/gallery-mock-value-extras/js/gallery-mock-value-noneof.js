(function () {
var Assert = Y.Assert,
    isUndefined = Y.Lang.isUndefined,
    MockValue = Y.Mock.Value;

function meetsSpec(spec, value) {
    var oneOf = MockValue.OneOf.apply(null, spec),
        matched = false;

    try {
        oneOf.verify(value);
        matched = true;
    } catch (ex) {
        // intentionally empty
    }

    Assert.isFalse(matched, "value matched a forbidden value");
}

MockValue.NoneOf = function (spec) {
    spec = Y.Array(arguments);

    return MockValue(Y.bind(meetsSpec, null, spec));
};
}());

