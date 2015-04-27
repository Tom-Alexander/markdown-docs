import React from 'react';
var {Component} = React;

class Document extends Component {

  render() {
    return (
      <div className="Document__wrapper" style={{
        marginLeft: 315,
        paddingRight: 115,
        paddingTop: 20
      }}>
        <div className="Document__content">
          <div dangerouslySetInnerHTML={{__html: this.props.document.content}}/>
        </div>
      </div>
    );
  }

}

export default Document;
