YUI.add('gallery-mock-value-extras', function(Y) {

var Assert = Y.Assert,
    isUndefined = Y.Lang.isUndefined;

function isAsExpected(expected, actual) {
    if (expected instanceof Y.Mock.Value) {
        try {
            expected.verify(actual);
        } catch (e) {
            return false;
        }

        return true;
    } else {
        return expected === actual;
    }
}

Y.Mock.Value.Array = Y.Mock.Value(Y.Assert.isArray);

(function () {
var Assert = Y.Assert,
    ArrayAssert = Y.ArrayAssert,
    MockValue = Y.Mock.Value,
    objectEach = Y.Object.each,
    indexOf = Y.Array.indexOf,
    ELEMENT_INDEX_REGEX = /^\d+$/,
    requirementHandlers;

requirementHandlers = {
    length: function (length, value) {
        Assert.areSame(length, value.length, "array has wrong length");
    },

    minLength: function (length, value) {
        Assert.isTrue(length <= value.length, "array is too short");
    },

    maxLength: function (length, value) {
        Assert.isTrue(value.length <= length, "array is too long");
    },

    contains: function (elements, value) {
        var i = 0, j,
            matched;

        do {
            matched = false;
            j = 0;
            while (!matched && j < value.length) {
                matched = isAsExpected(elements[i], value[j]);
                j++;
            }

            i++;
        } while (matched && i < elements.length);
            
        Assert.isTrue(matched, value, "array missing required elements");
    },

    containsAny: function (elements, value) {
        var matched = false,
            i = 0,
            j;

        while (!matched && i < value.length) {
            j = 0; 
            while (!matched && j < elements.length) {
                matched = value[i] === elements[j];
                j++;
            }
            i++;
        }

        Assert.isTrue(matched, "array contains no elements satisfying requirement");
    },

    doesNotContain: function (elements, value) {
        ArrayAssert.doesNotContainItems(elements, value, "array contains forbidden elements");
    }
};

function meetsSpec(spec, value) {
    Assert.isArray(value);

    objectEach(spec, function (reqVal, reqName) {
            if (ELEMENT_INDEX_REGEX.test(reqName)) {
                // if the requirement name is an element index, compare the element at that index
                Assert.areSame(reqVal, value[parseInt(reqName, 10)]);
            } else if (reqName in requirementHandlers) {
                // if a handler exists for that requirement, use it to check value
                requirementHandlers[reqName](reqVal, value);
            }
        });
}

MockValue.ArraySpec = function (spec) {
    spec = isUndefined(spec) ? {} : spec;
    Assert.isObject(spec);

    // TODO: support a "handlers" key to allow additional handlers to be specified
    return MockValue(Y.bind(meetsSpec, null, spec));
};
}());

(function () {
var Assert = Y.Assert,
    ObjectAssert = Y.ObjectAssert,
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



}, '@VERSION@' ,{requires:['test', 'oop']});
