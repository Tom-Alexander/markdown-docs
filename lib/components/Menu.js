import React from 'react/addons';
var {Component} = React;


class Menu extends Component {

  constructor() {
    super();
    this.state = {open: false};
  }

  _className() {
    var className = 'Menu';
    className += this.props.nested ? '__NestedGroup' : '__RootGroup';
    return className;
  }

  render() {

    var {onChange, tree} = this.props;

    return (
      <ul className={this._className()}>
      {tree.map((item, index) => {
        let onChangeProxy = onChange.bind(this, item.payload);
        let hasChildren = item.children && item.children.length;
        return (
          <li key={`mk-${index}`} className="MenuItem">
            <a onClick={onChangeProxy} className={item.index ? "MenuItem__Link index" : "MenuItem__Link"}>
              {item.title}
              {hasChildren ? <span className="MenuItem__Arrow--right"/> : null}
            </a>
            {hasChildren ? <Menu tree={item.children} nested={true} onChange={onChange}/> : null}
          </li>
        );
      })}
      </ul>
    );
  }

}

export default Menu;
