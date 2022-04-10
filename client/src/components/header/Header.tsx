import Logo from '../icons/Logo';
import Github from '../icons/Github';
import Linkedin from '../icons/Linkedin';
import QuestionMark from '../icons/QuestionMark';
import SelectMajor from './SelectMajor';
import { useState } from 'react';
import TutorialSlider from '../tutorial/TutorialSlider';

const Header = () => {

  const [isShown, setisShown] = useState(false);
  function handleOnClick( e: { preventDefault: () => void; }) {
    e.preventDefault();
    setisShown(!isShown)
  }

    return (
      <>
      <div className="grid header-template-cols pa bg-black">
        <Logo/>
        <SelectMajor/>
        <button id='question-btn' onClick={handleOnClick}><QuestionMark/></button>
        <a target="_blank" href="https://www.linkedin.com/" rel="noreferrer"
        className="linkedin" aria-label="Linkedin"><Linkedin/></a>
        <a target="_blank" href="https://github.com/" rel="noreferrer" 
        className="github" aria-label="Github"><Github/></a>
      </div>
      {isShown && <TutorialSlider closedTutorial={handleOnClick}/> }
      </>
    )
  }


export default Header;