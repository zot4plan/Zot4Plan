import {memo} from 'react';

import Logo from '../../components/icon/Logo';
import SelectMajor from '../../components/input/SelectMajor';
import HelpButton from '../../components/button/HelpButton';
import UploadFileButton from '../../components/button/UploadFileButton';
import DownloadFileButton from '../../components/button/DownloadFileButton';

const Header = () => {
  return (
    <nav id="nav-bar">
      <Logo/>
      <SelectMajor/>
      <DownloadFileButton/>
      <UploadFileButton/>
      <HelpButton/>
    </nav>
  )
}

export default memo(Header);