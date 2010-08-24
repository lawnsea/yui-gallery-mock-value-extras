(function () {
var Assert = Y.Assert,
    ArrayAssert = Y.ArrayAssert,
    isUndefined = Y.Lang.isUndefined,
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
        ArrayAssert.containsItems(elements, value, "array missing required elements");
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

