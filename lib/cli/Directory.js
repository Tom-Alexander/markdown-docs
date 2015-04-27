import path from 'path';
import fs from 'fs-extra';
import Promise from 'bluebird';
Promise.promisifyAll(fs);
var {readdirAsync, statAsync} = fs;

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
  traverse(root, visitFile, visitDirectory) {
    return Directory
      .documents(root)
      .each(visitFile.bind(this))
      .then(() => {
        return Directory.directories(root).each((directory) => {
          visitDirectory.apply(this, [directory]);
          return Directory.traverse(
            directory.location,
            visitFile,
            visitDirectory);
        });
    });
  },

  /**
   * Returns a promise that is resolved when we have a
   * list of the directories in the sub-tree
   * @param node
   * @return Promise
   */
  directories(node) {
    return readdirAsync(node)
      .map((file) => {
        let location = path.join(node, file);
        return statAsync(location)
          .then((stat) => ({stat, node, file, location}));
      })
      .filter((item) => item.stat.isDirectory());
  },

  /**
   * Returns a promise that is resolved when we have a
   * list of the markdown documents in the sub-tree
   * @param node
   * @return Promise
   */
  documents(node) {
    return readdirAsync(node)
      .map((file) => {
        let location = path.join(node, file);
        return statAsync(location)
          .then((stat) => ({stat, node, file, location}));
      })
      .filter((item) => item.stat.isFile());
  }

};

export default Directory;
