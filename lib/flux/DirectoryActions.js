import {Actions} from 'flummox';
import marked from 'marked';
import {highlightAuto} from 'highlight.js';

marked.setOptions({
  highlight: (code) => highlightAuto(code).value
});

class DirectoryActions extends Actions {

  /**
   * Fetches the directory structure and meta
   * data and applies the filter.
   * @param searchTerm
   * @returns {Promise}
   */
  fetchDirectory(searchTerm = '') {
    return new Promise((resolve) => {
      resolve(window.gon.directory, searchTerm);
    });
  }

  /**
   * Fetches the markdown from the md file and
   * and returns a promise with the rendered HTML.
   * @param route
   * @returns {Promise}
   */
  fetchDocument(route) {
    return window.fetch(route, {credentials: 'include'})
      .then((response) => {
        return new Promise((resolve, reject) => {
          if (response.ok) resolve(response.text());
          else reject(new Error('NotFoundError'));
        });
      })
      .then((body) => {
        return marked(body);
      });
  }

}


export default DirectoryActions;
