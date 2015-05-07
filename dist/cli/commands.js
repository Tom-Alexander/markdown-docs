'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _Indexer = require('./Indexer');

var _Indexer2 = _interopRequireDefault(_Indexer);

var _handlebars = require('handlebars');

var _handlebars2 = _interopRequireDefault(_handlebars);

var templatePath = _path2['default'].join(__dirname, '../../lib/cli/template.hbs');
_bluebird2['default'].promisifyAll(_fsExtra2['default']);

var commands = {

  /**
   * Builds the static site and writes it
   * to the source directory
   * @param args
   * @returns Promise
   */
  build: function build() {
    var _write;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return this._render.apply(this, args).then((_write = this._write).bind.apply(_write, [this].concat(args)));
  },

  _unknown: function _unknown() {
    return new _bluebird2['default'](function (resolve) {
      console.log('Unknown command!');
      resolve();
    });
  },

  _render: function _render(source) {
    var indexer = new _Indexer2['default'](source);
    return indexer.run().then(function (data) {
      return _fsExtra2['default'].readFileAsync(templatePath, 'utf8').then(function (template) {
        var variables = { gon: JSON.stringify({ directory: data }) };
        return _handlebars2['default'].compile(template)(variables);
      });
    });
  },

  _write: function _write(source, destination, html) {
    return _fsExtra2['default'].ensureDirAsync(destination).then(_fsExtra2['default'].copyAsync(source, _path2['default'].join(destination, 'source'))).then(_fsExtra2['default'].writeFileAsync(_path2['default'].join(destination, 'index.html'), html)).then(_fsExtra2['default'].copyAsync(_path2['default'].join(__dirname, '../../dist/client'), destination));
  },

  _watch: function _watch(source, cb) {
    return new _bluebird2['default'](function (resolve) {
      chokidar.watch(source, {}).on('all', cb);
      resolve();
    });
  }

};

exports['default'] = commands;
module.exports = exports['default'];