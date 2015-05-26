'use strict';

var _interopRequireDefault = function (obj) { return obj && obj.__esModule ? obj : { 'default': obj }; };

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _fs = require('fs-extra');

var _fs2 = _interopRequireDefault(_fs);

var _Promise = require('bluebird');

var _Promise2 = _interopRequireDefault(_Promise);

_Promise2['default'].promisifyAll(_fs2['default']);
var readdirAsync = _fs2['default'].readdirAsync;
var statAsync = _fs2['default'].statAsync;

/**
 * Asynchronous directory traversal using bluebird
 * @type {{traverse: Function, directories: Function, documents: Function}}
 */
var Directory = {

  /**
   * Returns a promise that is resolved when we have
   * traversed every node in the tree
   * @param root
   * @param visitFile
   * @param visitDirectory
   * @return Promise
   */
  traverse: function traverse(root, visitFile, visitDirectory) {
    var _this = this;

    return Directory.documents(root).each(visitFile.bind(this)).then(function () {
      return Directory.directories(root).each(function (directory) {
        visitDirectory.apply(_this, [directory]);
        return Directory.traverse(directory.location, visitFile, visitDirectory);
      });
    });
  },

  /**
   * Returns a promise that is resolved when we have a
   * list of the directories in the sub-tree
   * @param node
   * @return Promise
   */
  directories: function directories(node) {
    return readdirAsync(node).map(function (file) {
      var location = _path2['default'].join(node, file);
      return statAsync(location).then(function (stat) {
        return { stat: stat, node: node, file: file, location: location };
      });
    }).filter(function (item) {
      return item.stat.isDirectory();
    });
  },

  /**
   * Returns a promise that is resolved when we have a
   * list of the markdown documents in the sub-tree
   * @param node
   * @return Promise
   */
  documents: function documents(node) {
    return readdirAsync(node).map(function (file) {
      var location = _path2['default'].join(node, file);
      return statAsync(location).then(function (stat) {
        return { stat: stat, node: node, file: file, location: location };
      });
    }).filter(function (item) {
      return item.stat.isFile();
    });
  }

};

exports['default'] = Directory;
module.exports = exports['default'];