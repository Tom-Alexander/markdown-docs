import React from 'react';
import {clean} from './pathUtil';
import NotFound from './NotFound';
import Document from './Document';
import Navigation from './Navigation';
import DocumentViewerFlux from '../flux/DocumentViewerFlux';

var {Component} = React;

class AppRouteHandler extends Component {

  static willTransitionTo(transition) {
    return DocumentViewerFlux
      .getActions('directories')
      .fetchDocument(clean(transition.path));
  }

  render() {
    return (
      <div className="AppRouteHandler__wrapper">
          {this.props.error ? <NotFound {...this.props}/> : <Document {...this.props}/>}
        <Navigation {...this.props}/>
      </div>
    );
  }

}

AppRouteHandler.contextTypes = {router: React.PropTypes.func};
export default AppRouteHandler;
