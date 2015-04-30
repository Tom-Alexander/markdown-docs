import path from 'path';
import fs from 'fs-extra';
import Promise from 'bluebird';
import Indexer from './Indexer';
import Handlebars from 'Handlebars';

var templatePath = path.join(__dirname, '../../lib/cli/template.hbs')
Promise.promisifyAll(fs);

var commands = {

  /**
   * Builds the static site and writes it
   * to the source directory
   * @param args
   * @returns Promise
   */
  build(...args) {
    return this._render(...args)
      .then(this._write.bind(this, ...args));
  },

  _unknown: function () {
    return new Promise((resolve) => {
      console.log('Unknown command!');
      resolve();
    });
  },

  _render(source) {
    var indexer = new Indexer(source);
    return indexer.run().then((data) => {
      return fs.readFileAsync(templatePath, 'utf8')
        .then((template) => {
          let variables = {gon: JSON.stringify({directory: data})};
          return Handlebars.compile(template)(variables);
        });
    });
  },

  _write(source, destination, html) {
    return fs.ensureDirAsync(destination)
      .then(fs.copyAsync(source, path.join(destination, 'source')))
      .then(fs.writeFileAsync(path.join(destination, 'index.html'), html))
      .then(fs.copyAsync(path.join(__dirname, '../../dist/client'), destination))
  },

  _watch(source, cb) {
    return new Promise((resolve) => {
      chokidar.watch(source, {}).on('all', cb);
      resolve();
    });
  }

};

export default commands;
