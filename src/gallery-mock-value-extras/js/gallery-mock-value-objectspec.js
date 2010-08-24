(function () {
var Assert = Y.Assert,
    ObjectAssert = Y.ObjectAssert,
    isUndefined = Y.Lang.isUndefined,
    MockValue = Y.Mock.Value,
    objectEach = Y.Object.each,
    requirementHandlers;

requirementHandlers = {
};

function meetsSpec(spec, value) {
    Assert.isObject(value);

    objectEach(spec, function (reqVal, reqName) {
            if (reqName in requirementHandlers) {
                // if a handler exists for that requirement, use it to check value
                requirementHandlers[reqName](reqVal, value);
            }
        });
}

MockValue.ObjectSpec = function (spec) {
    spec = isUndefined(spec) ? {} : spec;
    Assert.isObject(spec);

    // TODO: support a "handlers" key to allow additional handlers to be specified
    return MockValue(Y.bind(meetsSpec, null, spec));
};
}());

