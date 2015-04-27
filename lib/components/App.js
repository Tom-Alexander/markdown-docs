import React from 'react';
import {RouteHandler} from 'react-router';
import FluxComponent from 'flummox/component';
import DocumentViewerFlux from '../flux/DocumentViewerFlux';

var {Component} = React;

class App extends Component {

  render() {
    return (
      <div className="App__wrapper">
        <FluxComponent
          flux={DocumentViewerFlux}
          connectToStores={['directories']}>
          <RouteHandler/>
        </FluxComponent>
      </div>
    );
  }

}

export default App;
