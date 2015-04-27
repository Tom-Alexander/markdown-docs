import React from 'react';
import {clean} from './pathUtil';
import NotFound from './NotFound';
import Document from './Document';
import Navigation from './Navigation';

var {Component} = React;

class AppRouteHandler extends Component {

  componentDidMount() {
    this.props.flux
      .getActions('directories')
      .fetchDocument(clean(this.context.router.getCurrentPathname()));
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
