import React, { Component } from 'react';
import './style.scss'
import Logo from '../Header/components/Logo';
import { Link } from "react-router-dom";

  class Footer extends Component {
  render() {
    return (
      <footer className='footer'>
      <div className='logo'>
        <Logo/>
      </div>
      <div className='contacts'>
        <ul>
          <li>
            <h3>Contacts</h3>
          </li>
          <li>
            <ul>
              <li>
              <Link>
                <p>Contact_1</p>
              </Link>
              </li>
              <li>
              <Link>
                <p>Contact_2</p>
              </Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
      </footer>
    );
  }
}

export default Footer;