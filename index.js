'use strict';

var fs = require('fs'),
  angular = require('angular-node'),
  document = require('jsdom').jsdom('<html><head></head><body></body></html>'),
  window = document.parentWindow,
  src = fs.readFileSync(require.resolve('angular-mocks'), 'utf8');

/**
 * If you are using Mocha or Jasmine, we want to enable the shortcuts
 * provided by ngMock, such as `inject` and `module`.
 * We cannot place `module` on the global scope of course, but both of these
 * will still be available in the `angular.mock` object.
 * @param {Window} window JSDom Window object
 */
var requireTestFramework = function requireTestFramework(window) {
  var name,
    lib;

  try {
    lib = require('mocha');
    name = 'mocha';
  } catch (ignored) {
    try {
      lib = require('jasmine');
      name = 'jasmine';
    }
    catch (ignored) {
      return; // non-Mocha/Jasmine framework
    }
  }

  // if we have a framework, we must expose it on the window object
  // for ngMock in order for the shortcuts to be provided.
  window[name] = lib;

  // in addition, we want to expose beforeEach/afterEach or
  // setup/teardown.
  if (typeof beforeEach !== 'undefined') {
    window.beforeEach = beforeEach;
    window.afterEach = afterEach;
  } else if (typeof setup !== 'undefined') {
    window.setup = setup;
    window.teardown = teardown;
  }
};

if (!angular.mock) {
  requireTestFramework(window);

  window.angular = angular;

  // I don't know of a better way to do this.
  (new Function('window', src))(window);
}

module.exports = angular.mock;
