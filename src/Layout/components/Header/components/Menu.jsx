import React, { Component } from 'react';
import Logo from './Logo';
import { Link } from "react-router-dom";
  
  class Menu extends Component {
    createMenu(name,...params){
      return(
          <li className='menu_link'>
            <Link to={`/${name.toLowerCase()}/${params[0].toLowerCase()}`}>{name}</Link>
              <ul className={`menu_submenu ${name.toLowerCase()}`}>
                {params.map(item=>(
                  <li><Link to={`/${name.toLowerCase()}/${item.toLowerCase()}`}>{item}</Link></li>
                ))}
            </ul>
          </li>
      )
    }
    render() {
      return (
      <nav>
          <ul className="menu">
            <li className="logo"><Logo/></li>
            {this.createMenu("Movie","Popular","Upcoming")}
            {this.createMenu("Show","Popular","On TV")}
            {this.createMenu("Person","Popular")}
          </ul>
        </nav>
      );
    }
  }
  
  export default Menu;
  