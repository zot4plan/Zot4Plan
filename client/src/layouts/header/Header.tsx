import {memo} from 'react';
import Logo from '../../components/icon/Logo';
import Tutorial from './Tutorial';
import './Header.css';

const Header = () => {
  return (
    <nav id="nav-bar">
      <div id="brand">
        <Logo/>
      </div>

      <ul id="nav-list">
        <li>
          <a href="#footer">Team</a>
        </li>
        <li>
          <a href="#footer">Contact</a>
        </li>
        <li>
          <Tutorial/> 
        </li>
        <li>
          Resources
        </li>
      </ul>
    </nav>
  )
}

export default memo(Header);