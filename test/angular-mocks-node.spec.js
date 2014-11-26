'use strict';

var chai = require('chai'),
  expect = chai.expect,
  path = require('path'),
  angular = require('angular-node'),
  ngMock = require(path.join('..', 'index')),
  version = require(path.join('..', 'package.json')).version;

describe('core', function () {

  it('should expose angular.mock', function () {
    expect(ngMock).to.be.an('object');
  });

  it('should match AngularJS version', function () {
    expect(angular.version.full).to.equal(version);
  });

});

describe('convenience functions', function () {

  angular.module('foo', [])
    .value('bar', 'baz');

  describe('mock.module', function () {
    it('should exist', function () {
      expect(function () {
        ngMock.module('foo');
        ngMock.inject();
      }).not.to.throw();
    });
  });

  describe('mock.inject', function () {
    beforeEach(ngMock.module('foo'));
    it('should inject', ngMock.inject(function (bar) {
      expect(bar).to.equal('baz');
    }));
  });
});
