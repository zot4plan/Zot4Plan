import {memo, useState} from 'react';

import Github from '../icon/Github';
import Linkedin from '../icon/Linkedin';

import ReactTooltip from "react-tooltip";

const Footer = () => {
    const [showLinkedin, setShowLinkedin] = useState(false);
    const handleOnClick = ( e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setShowLinkedin(!showLinkedin);
    }
    
    return (
    <footer id="footer">

        <div className="relative">
            <button onClick={handleOnClick}
                id="linkedin" 
                data-tip data-for="linkedinTip"
            >
                <Linkedin/>
            </button>
            <ReactTooltip id="linkedinTip" place="bottom" effect="solid">
                Linkedin   
            </ReactTooltip>

            <div>
                <div>
                    <img></img>
                    <a target="_blank" 
                        href="https://www.linkedin.com/" 
                        rel="noreferrer"
                        className="flex justify-center item-center"
                        aria-label="Linkedin"
                    >
                        Loc Khong
                    </a>
                </div>

                <div>
                    <img></img>
                    <a target="_blank" 
                        href="https://www.linkedin.com/" 
                        rel="noreferrer"
                        className="flex justify-center item-center"
                        aria-label="Linkedin"
                    >
                        Tram La
                    </a>
                </div>
            </div>
        </div>

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
    </footer>
    )
}

export default memo(Footer);