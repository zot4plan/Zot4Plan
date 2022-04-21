import {memo} from 'react';

import Logo from '../icons/Logo';
import Github from '../icons/Github';
import Linkedin from '../icons/Linkedin';

import SelectMajor from './SelectMajor';
import HelpButton from './HelpButton';
import UploadFileButton from './UploadFileButton';
import DownloadFileButton from './DownloadFileButton';

import ReactTooltip from "react-tooltip";

const Header = () => {
  return (
    <header id="header">
      <Logo/>
      <SelectMajor/>
      <HelpButton/>
      <DownloadFileButton/>
      <UploadFileButton/>

      <a target="_blank" 
        href="https://www.linkedin.com/" 
        rel="noreferrer"
        id="linkedin" 
        className="flex justify-center item-center"
        aria-label="Linkedin"
        data-tip data-for="linkedinTip"
      >
        <Linkedin/>
      </a>
      <ReactTooltip id="linkedinTip" place="bottom" effect="solid">
        Linkedin   
      </ReactTooltip>

      <a target="_blank" 
        href="https://github.com/" 
        rel="noreferrer" 
        id="github"
        className="btn-outlined-header flex justify-center item-center" 
        aria-label="Github"
        data-tip data-for="githubTip"
      >
        <Github/>
      </a>

      <ReactTooltip id="githubTip" place="bottom" effect="solid">
        Github  
      </ReactTooltip>
    </header>
  )
}

export default memo(Header);