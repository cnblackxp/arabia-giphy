import React from 'react';
import logo from '../../assets/logo.png';
import menuIcon from '../../assets/menu-icon.png';

export class Navbar extends React.Component {
  // constructor(props) {
  //   super(props);
  // }
  render() {
    return (
      <nav className="navbar">
        <img className="logo" src={logo} alt="logo" />
        <a className="sidebar-btn" onClick={() => this.props.onMenuClick()}>
          <img src={menuIcon} alt="menu button"/>
        </a>
      </nav>
    );
  }
}