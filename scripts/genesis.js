'use strict';

var prefix = process.argv[2] || process.exit(1),
  path = require('path'),
  fs = require('fs'),
  async = require('async'),
  exec = require('child_process').exec,
  npm = require(path.join(prefix, 'lib', 'node_modules', 'npm')),
  uver = require('uver'),
  format = require('util').format,
  cwd = process.cwd(),
  commands = npm.commands;

npm.load(function () {
  commands.info([
    'angular-mocks',
    'versions'
  ], function (versions) {
    async.each(versions, function (version, done) {
      // ignore pre-release versions
      if (version.indexOf('-')) {
        return done();
      }
      exec(format('git describe v%s', version), function (err) {
        if (err) {
          commands.install([
            'angular-mocks@' + version,
            '--save'
          ], function (err) {
            if (err) {
              return done(err);
            }
            uver({ver: version});
            async.series([
              exec.bind(null, format('git add %s', path.join(cwd, 'package.json'))),
              exec.bind(null, format('git commit -m "Release v%s"', version)),
              exec.bind(null, format('git tag -a v%s -m "Release v%s"', version, version))
            ], done);
          });
        } else {
          return done();
        }
      });
    }, function () {

    });
  });
});

