import React, {memo, useState} from 'react';
import { Link } from 'react-router-dom';
import Logo from '../icon/Logo';
import DropDown from './DropDown'
import Tutorial from './Tutorial';
import './Header.css';

const Header = () => {
  
  const [click, setClick] = useState(false);
  const [dropdown, setDropDown] = useState(false);
  
  const closeMobileMenu = () => setClick(false);
  
  const onMouseEnter = () => {
    setDropDown(!dropdown)
  }

  const onMouseLeave = () => {
    setDropDown(false);
  }

  return (
    <nav id="nav-bar"> 
      <div id="brand">
        <Logo/>
      </div>
      
      <ul id="nav-list">
        <li className='nav-item'>
          <a href="#footer">Team</a>
        </li>
        <li className='nav-item'>
          <a href="#footer">Contact</a>
        </li>
        <li className='nav-item'>
          <Tutorial/> 
        </li>
        <li className='nav-item'
          onMouseEnter={onMouseEnter} 
          onMouseLeave={onMouseLeave}
        >
          <Link to='/resources' className='nav-links' onClick={closeMobileMenu}>
            Resources <i className='fas fa-caret-down' />
          </Link>
          {dropdown && <DropDown/>}
        </li>
      </ul>
    </nav>
  )
}

export default memo(Header);