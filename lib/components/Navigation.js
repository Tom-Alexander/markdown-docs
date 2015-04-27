import React from 'react';
import mui from 'material-ui';
import {Link} from 'react-router';
import {clean} from './pathUtil.js';

var {Component} = React;
var {LeftNav, MenuItem} = mui;

class Navigation extends Component {

  /**
   * Initiates the fetch for the document content and
   * transitions the route to the next page.
   * @param e
   * @param key
   * @param payload
   */
  handleChange(e, key, payload) {
    this.props.flux
      .getActions('directories')
      .fetchDocument(clean(payload.route))
      .then(this.context.router.transitionTo(`/${payload.route}`));
  }

  /**
   * Returns a list of menu items for a particular
   * directory listing
   * @param pages
   * @returns {Array}
   */
  renderDocuments(documents) {
    return documents.map((page) => {
      return {route: page.destinationPath, text: page.title};
    });
  }

  /**
   * Returns a list of menu items for all the child
   * nodes for a particular root
   * @param categories
   * @returns {Array}
   */
  renderDirectories(directories) {
    return Object.keys(directories).reduce((acc, key) => {
      return acc.concat([{
        type: MenuItem.Types.NESTED,
        text: key,
        items: this.renderDocuments(directories[key].documents).concat(
          this.renderDirectories(directories[key].directories)
        )
      }])
    }, []);
  }

  /**
   * Returns a list menu items for the root node and all
   * the node child nodes of the directory
   * @param directory
   * @returns {Array}
   */
  renderRootNode(directory) {
    return this.renderDocuments(directory.documents)
      .concat(this.renderDirectories(directory.directories));
  }

  render() {
    return (
      <div className="Navigation__wrapper">
        <LeftNav
          onChange={this.handleChange.bind(this)}
          menuItems={this.renderRootNode(this.props.directory)}/>
      </div>
    );
  }

}

Navigation.contextTypes = {router: React.PropTypes.func};
export default Navigation;
