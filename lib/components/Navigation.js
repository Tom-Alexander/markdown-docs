import React from 'react';
import Menu from './Menu';
import {Link} from 'react-router';
import {clean} from './pathUtil';
var {Component} = React;

class Navigation extends Component {

  /**
   * Initiates the fetch for the document content and
   * transitions the route to the next page.
   * @param payload
   */
  handleChange(payload) {
    this.props.flux
      .getActions('directories')
      .fetchDocument(clean(payload.route))
      .then(this.context.router.transitionTo(`/${payload.route}`));
  }

  /**
   * Recursively Traverses the root directory and generates
   * the tree structure required for the Menu component
   * to render
   * @param root
   * @returns {*[]}
   */
  getTree(root) {

    var documents = root.documents.map((document) => ({
      title: document.title,
      payload: {route: document.destinationPath},
      index: document.sourcePath.indexOf('index.md') > -1
    }));

    var directories = Object.keys(root.directories).map((key) => {
      let directory = root.directories[key];
      let index = directory.documents.filter((document) => document.sourcePath.indexOf('index.md') > -1)[0];
      let title = index ? index.title : key;
      let payload = index ? {route: index.destinationPath} : directory.destinationPath;
      return {
        title,
        payload,
        index: false,
        children: this.getTree(directory)
      };
    });

    return []
      .concat(documents)
      .concat(directories)
      .sort((a, b) => {
        if (a.index && b.index) return 0;
        else if (a.index) return -1;
        else if (b.index) return 1;
        else return a.title.localeCompare(b.title);
      });
  }

  render() {
    return (
      <div className="Navigation__wrapper">
        <Menu
          tree={this.getTree(this.props.directory)}
          onChange={this.handleChange.bind(this)}/>
      </div>
    );
  }

}

Navigation.contextTypes = {router: React.PropTypes.func};
export default Navigation;
