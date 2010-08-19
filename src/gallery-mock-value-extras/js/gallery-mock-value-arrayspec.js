var Assert = Y.Assert,
    isUndefined = Y.Lang.isUndefined,
    MockValue = Y.Mock.Value,
    objectEach = Y.Object.each,
    requirementHandlers = {};

requirementHandlers.length = function (length, value) {
    Assert.areSame(length, value.length, "array has wrong length");
};

requirementHandlers.minLength = function (length, value) {
    Assert.isTrue(length <= value.length, "array is too short");
};

requirementHandlers.maxLength = function (length, value) {
    Assert.isTrue(value.length <= length, "array is too long");
};

function meetsSpec(spec, value) {
    Assert.isArray(value);

    objectEach(spec, function (reqVal, reqName) {
            if (reqName in requirementHandlers) {
                requirementHandlers[reqName](reqVal, value);
            }
        });
}

MockValue.ArraySpec = function (spec) {
    spec = isUndefined(spec) ? {} : spec;
    Assert.isObject(spec);

    return MockValue(Y.bind(meetsSpec, null, spec));
};

