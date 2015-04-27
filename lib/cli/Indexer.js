import fs from 'fs';
import path from 'path';
import marked from 'marked';
import Promise from 'bluebird';
import Directory from './Directory';

Promise.promisifyAll(fs);
var {readFileAsync} = fs;

class Indexer {

  constructor(sourceRoot = '', destinationRoot = 'source') {
    this._data = {documents: [], directories: {}};
    this._sourceRoot = sourceRoot;
    this._destinationRoot = destinationRoot;
  }

  /**
   * Returns a promise which is resolved
   * when the index has been constructed from
   * the directory tree passed in ar instantiation
   * @returns Promise
   */
  run() {
    return Directory.traverse(
      this._sourceRoot,
      this._visitDocument.bind(this),
      () => {}
    ).then(() => {
        let key = Object.keys(this._data.directories)[0];
        let root = this._data.directories[key];
        return {
          documents: root ? root.documents : [],
          directories: root ? root.directories : {}
        };
      });
  }

  _visitDocument(document) {
    let extension = path.extname(document.location);
    if (extension === '.md') {
      readFileAsync(document.location, 'utf8')
        .then((content) => {
          let tokens = marked.lexer(content);
          return this._getHeadingToken(tokens, document.file);
        }).then((title) => {
          this._addDocumentFromPath({
            fileName: document.file,
            path: document.location,
            title: title
          });
        });
    }
  }

  _getHeadingToken(tokens, fileName) {
    return tokens.reduce((acc, token) => {
      let isHeading = token.type === 'heading' && token.depth === 1;
      return isHeading ? token.text : acc;
    }, fileName);
  }

  _addDocumentFromPath(document) {

    var sourcePath = '';
    var destinationPath = this._destinationRoot;

    document.path.split('/').reduce((node, segment, index) => {

      sourcePath = path.join(sourcePath, segment);

      if (index !== 0) {
        destinationPath = path.join(destinationPath, segment);
      }

      let isDocument = segment === document.fileName;
      let doesExist = !!node.directories[segment];

      let file = {sourcePath, destinationPath, title: document.title};
      let child = {sourcePath, destinationPath, documents: [], directories: {}};

      if (isDocument) node.documents.push(file);
      else if (!doesExist) node.directories[segment] = child;

      return node.directories[segment];
    }, this._data);

  }

}

export default Indexer;
