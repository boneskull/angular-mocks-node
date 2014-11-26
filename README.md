# angular-mocks-node

AngularJS' [ngMock](https://docs.angularjs.org/api/ngMock) module provided as a CommonJS module.
 
Paired with [angular-node](https://www.npmjs.org/package/angular-node), you can use this module to take advantage of `ngMock` on the server side.  Run your tests headlessly!
 
## Rationale

The [angular-mocks](https://www.npmjs.org/package/angular-mocks) module provides a couple convenience functions (`module()`, `inject()`) which are not present if certain variables do not exist in the global context (`window`).

In NodeJS, there's very little in the global context, and there's no `window`.

This module sets the table for `ngMock`, and allows `module()` and `inject()` to be exposed on the `angular.mock` object.

## Example

```js

var ngMock = require('angular-mocks-node');

describe('my suite', function() {
  
  beforeEach(ngMock.module('myModule'));
  
  it('should do such-and-such', ngMock.inject(function(MyService) {
    // make assertions
  });
});
```

## Notes

The `angular.mock` object is both exported by the `angular-mocks-node` module, as well as exposed on the `angular` object:

```js
var angular = require('angular-node');
var ngMock = require('angular-mocks-node');
angular.mock === ngMock; // true
```

## Supported Test Frameworks

- [Mocha](http://mochajs.org)
- [Jasmine](http://jasmine.github.io)
- Anything else, really, but you won't get the convenience functions, because `ngMock` is written that way.

## Maintainer

[Christopher Hiller](http://boneskull.github.io)

## License

MIT
