(function () {
var Assert = Y.Assert,
    ObjectAssert = Y.ObjectAssert,
    isUndefined = Y.Lang.isUndefined,
    isFunction = Y.Lang.isFunction,
    isArray = Y.Lang.isArray,
    MockValue = Y.Mock.Value,
    each = Y.Object.each,
    some = Y.Object.some,
    objectSize = Y.Object.size,
    requirementHandlers;

requirementHandlers = {
    size: function (size, value) {
        Assert.areSame(size, objectSize(value), "object has wrong size");
    },

    minSize: function (size, value) {
        Assert.isTrue(size <= objectSize(value), "object is too small");
    },

    maxSize: function (size, value) {
        Assert.isTrue(objectSize(value) <= size, "object is too big");
    },

    contains: function (keys, value) {
        ObjectAssert.hasKeys(keys, value, "object missing required keys");
    },

    containsAny: function (keys, value) {
        var matched = false,
            i = 0;
        
        while (!matched && i < keys.length) {
            matched = keys[i] in value;
            i++;
        }

        Assert.isTrue(matched, "object contains no key satisfying requirement");
    },

    containsOneOf: function (keys, value) {
        var matchedOne = false,
            matchedMore = false,
            i = 0;
        
        while (!matchedMore && i < keys.length) {
            matchedMore = matchedOne && keys[i] in value;

            if (matchedOne === false) {
                matchedOne = keys[i] in value;
            }

            i++;
        }

        Assert.isTrue(matchedOne, "object contains no key satisfying requirement");
        Assert.isFalse(matchedMore, "object contains two keys satisfying requirement");
    },

    doesNotContain: function (keys, value) {
        var matched = false,
            i = 0;
        
        while (!matched && i < keys.length) {
            matched = keys[i] in value;
            i++;
        }

        Assert.isFalse(matched, "object contains forbidden keys");
    }
};

function meetsSpec(spec, value) {
    Assert.isFalse(isFunction(value));
    Assert.isFalse(isArray(value));
    Assert.isObject(value);

    each(spec, function (reqVal, reqName) {
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

