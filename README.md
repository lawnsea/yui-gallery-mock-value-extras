YUI Mock Value Extras
=====================
This module provides support for creating Y.Mock.Values that describe the required form of Objects or Arrays.

ArraySpec
---------
ArraySpecs allow you to specify the form of Array arguments.

For example, to require that the first argument to `myMock.foo` is an array of length at least 3:
    Y.Mock.expect(myMock, {
            method: "foo",
            args: [Y.Mock.Value.ArraySpec({ minLength: 3 })]
        });

Status
------
This module is currently in a pre-alpha state.  I expect to finish it in the next couple weeks.

License
-------
This project is released under the [YUI BSD License](http://developer.yahoo.com/yui/license.html)
