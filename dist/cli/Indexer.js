'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

var _Directory = require('./Directory');

var _Directory2 = _interopRequireDefault(_Directory);

_bluebird2['default'].promisifyAll(_fs2['default']);
var readFileAsync = _fs2['default'].readFileAsync;

var Indexer = (function () {
  function Indexer() {
    var sourceRoot = arguments[0] === undefined ? '' : arguments[0];
    var destinationRoot = arguments[1] === undefined ? 'source' : arguments[1];

    _classCallCheck(this, Indexer);

    this._data = { documents: [], directories: {} };
    this._sourceRoot = sourceRoot;
    this._destinationRoot = destinationRoot;
  }

  _createClass(Indexer, [{
    key: 'run',

    /**
     * Returns a promise which is resolved
     * when the index has been constructed from
     * the directory tree passed in ar instantiation
     * @returns Promise
     */
    value: function run() {
      var _this = this;

      return _Directory2['default'].traverse(this._sourceRoot, this._visitDocument.bind(this), function () {}).then(function () {
        var key = Object.keys(_this._data.directories)[0];
        var root = _this._data.directories[key];
        return {
          documents: root ? root.documents : [],
          directories: root ? root.directories : {}
        };
      });
    }
  }, {
    key: '_visitDocument',
    value: function _visitDocument(document) {
      var _this2 = this;

      var extension = _path2['default'].extname(document.location);
      if (extension === '.md') {
        readFileAsync(document.location, 'utf8').then(function (content) {
          var tokens = _marked2['default'].lexer(content);
          return _this2._getHeadingToken(tokens, document.file);
        }).then(function (title) {
          _this2._addDocumentFromPath({
            fileName: document.file,
            path: document.location.replace(/(\\)/g, '/'),
            title: title
          });
        });
      }
    }
  }, {
    key: '_getHeadingToken',
    value: function _getHeadingToken(tokens, fileName) {
      return tokens.reduce(function (acc, token) {
        var isHeading = token.type === 'heading' && token.depth === 1;
        return isHeading ? token.text : acc;
      }, fileName);
    }
  }, {
    key: '_addDocumentFromPath',
    value: function _addDocumentFromPath(document) {
      var sourcePath = '';
      var destinationPath = this._destinationRoot;

      document.path.split('/').reduce(function (node, segment, index) {

        sourcePath = _path2['default'].join(sourcePath, segment);

        if (index !== 0) {
          destinationPath = _path2['default'].join(destinationPath, segment);
        }

        var isDocument = segment === document.fileName;
        var doesExist = !!node.directories[segment];

        var file = { sourcePath: sourcePath, destinationPath: destinationPath, title: document.title };
        var child = { sourcePath: sourcePath, destinationPath: destinationPath, documents: [], directories: {} };

        if (isDocument) node.documents.push(file);else if (!doesExist) node.directories[segment] = child;

        return node.directories[segment];
      }, this._data);
    }
  }]);

  return Indexer;
})();

exports['default'] = Indexer;
module.exports = exports['default'];