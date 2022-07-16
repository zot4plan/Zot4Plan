import {memo, useState, MouseEvent} from 'react';
import Logo from '../icon/Logo';
import DropDown from './DropDown'
import Tutorial from './Tutorial';
import './Header.css';
import DownArrow from '../icon/ArrowDown';
import Bars from '../icon/Bars';

const Header = () => {
  const [active, setActive] = useState(false);
  const handleOnClick = (event: MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      setActive(!active);
  };

  return (
    <nav id="nav-bar"> 
      <div id="brand">
        <Logo/>
      </div>
      
      <ul id="nav-list" className={active? "showMenu":""}>
        <li className='nav-item'>
          <a href="#footer">Team</a>
        </li>
        <li className='nav-item'>
          <a href="#footer">Contact</a>
        </li>
        <li className='nav-item'>
          <Tutorial/> 
        </li>
        <li className='nav-item nav-link'>
          <span style={{marginRight: '0.5rem'}}> Resources </span> <DownArrow />
          <DropDown/>
        </li>
      </ul>

      <button id="menu-toggle" onClick={handleOnClick}>
        <Bars/>
      </button>
    </nav>
  )
}

export default memo(Header);