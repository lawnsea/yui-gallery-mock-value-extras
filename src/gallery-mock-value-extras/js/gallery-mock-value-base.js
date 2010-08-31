var Assert = Y.Assert;

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

