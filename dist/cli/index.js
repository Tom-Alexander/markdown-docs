#!/usr/bin/env node
'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _commands = require('./commands');

var _commands2 = _interopRequireDefault(_commands);

var run = function run() {
  var args = _minimist2['default'](process.argv.slice(2));
  var command = args._[0];
  var destination = args.destination || './_site';
  var source = args.source || './docs';
  if (!_commands2['default'][command]) _commands2['default']._unknown();else _commands2['default'][command](source, destination)['catch'](function (error) {
    throw new Error(error);
  });
};

run();
exports['default'] = _commands2['default'].build;
module.exports = exports['default'];