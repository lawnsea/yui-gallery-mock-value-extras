(function () {
var Assert = Y.Assert,
    isUndefined = Y.Lang.isUndefined,
    MockValue = Y.Mock.Value;

function meetsSpec(spec, value) {
    var i = 0,
        matched = false,
        candidate;

    while (!matched && i < spec.length) {
        candidate = spec[i];

        if (candidate instanceof MockValue) {
            try {
                candidate.verify(value);
                matched = true;
            } catch (ex) {
                // intentionally empty
            }
        } else {
            matched = candidate === value;
        }

        i++;
    }

    Assert.isTrue(matched, "value did not match any allowed values");
}

MockValue.OneOf = function (spec) {
    spec = Y.Array(arguments);

    return MockValue(Y.bind(meetsSpec, null, spec));
};
}());

