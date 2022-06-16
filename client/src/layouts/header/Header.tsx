import {memo} from 'react';

import Logo from '../../components/icon/Logo';
import ButtonHelp from './ButtonHelp';
import ButtonUploadFile from './ButtonUploadFile';
import ButtonDownloadFile from './ButtonDownloadFile';

import './Header.css';

const Header = () => {
  return (
    <nav id="nav-bar">
      <div id="brand">
        <Logo/>
      </div>

      <ul id="nav-list">
        <li>
          <ButtonDownloadFile />
        </li>
        <li>
          <ButtonUploadFile />
        </li>
        <li>
          <ButtonHelp /> 
        </li>
      </ul>
    </nav>
  )
}

export default memo(Header);