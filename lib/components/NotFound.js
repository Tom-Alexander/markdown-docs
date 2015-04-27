import React from 'react';
var {Component} = React;

class NotFound extends Component {

  render() {
    return (
      <div className="NotFound__wrapper" style={{
        marginLeft: 315,
        paddingRight: 115,
        paddingTop: 20
      }}>
        <div className="NotFound__content">
          <h3>This page cannot be displayed...</h3>
        </div>
      </div>
    );
  }

}

export default NotFound;
