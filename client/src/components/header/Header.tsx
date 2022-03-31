import Logo from '../icons/Logo';
import Github from '../icons/Github';
import Linkedin from '../icons/Linkedin';

import SelectMajor from './SelectMajor';

const Header = () => {
    return (
      <div className="grid header-template-cols pa bg-black">
        <Logo/>
        <SelectMajor/>
        <a target="_blank" href="https://www.linkedin.com/" rel="noreferrer"
        className="linkedin" aria-label="Linkedin"><Linkedin/></a>
        <a target="_blank" href="https://github.com/" rel="noreferrer" 
        className="github" aria-label="Github"><Github/></a>
      </div>
    )
  }

export default Header;