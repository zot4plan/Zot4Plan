import {memo} from 'react';

import Logo from '../../components/icon/Logo';
import SelectMajor from '../../components/input/SelectMajor';
import HelpButton from '../../components/button/HelpButton';
import UploadFileButton from '../../components/button/UploadFileButton';
import DownloadFileButton from '../../components/button/DownloadFileButton';

import './NavBar.css';

const Header = () => {
  return (
    <nav id="nav-bar">
      <div id="brand">
        <Logo/>
      </div>

      <div id="select-major">
        <SelectMajor/>
      </div>

      <div id="download">
        <DownloadFileButton/>
      </div>

      <div id="upload">
        <UploadFileButton/>
      </div>

      <div id='help'>
        <HelpButton/>
      </div>
    </nav>
  )
}

export default memo(Header);