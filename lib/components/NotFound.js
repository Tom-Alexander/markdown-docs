import React from 'react';
var {Component} = React;

class NotFound extends Component {

  render() {
    return (
      <div className="NotFound__wrapper">
        <div className="NotFound__content">
          <h3>This page cannot be displayed...</h3>
        </div>
      </div>
    );
  }

}

export default NotFound;
