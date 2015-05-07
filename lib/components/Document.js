import React from 'react';
var {Component} = React;

class Document extends Component {

  render() {
    return (
      <div className="Document__wrapper">
        <div className="Document__content markdown-body">
          <div dangerouslySetInnerHTML={{__html: this.props.document.content}}/>
        </div>
      </div>
    );
  }

}

export default Document;
