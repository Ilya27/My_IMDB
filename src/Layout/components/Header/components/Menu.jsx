import React, { Component } from 'react';
import Logo from './Logo';
import { Link } from "react-router-dom";
  
  class Menu extends Component {
    createMenu(name,...params){
      let index=0;
      return(
          <li  className='menu_link'>
            <Link to={`/${name.toLowerCase()}/${params[0].toLowerCase()}/&page=1`}>{name}</Link>
              <ul className={`menu_submenu ${name.toLowerCase()}`}>
                {params.map(item=>(
                  <li key={index++}><Link  to={`/${name.toLowerCase()}/${item.toLowerCase()}/&page=1`}>{item}</Link></li>
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
  