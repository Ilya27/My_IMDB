import React, { Component } from 'react';
import Menu from './components/Menu'
import './style.scss'

  class Header extends Component {
  render() {
    return (
      <header className='header'> 
        <Menu/>
      </header>
    );
  }
}

export default Header;