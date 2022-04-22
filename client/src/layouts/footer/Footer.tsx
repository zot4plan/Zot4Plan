import {memo} from 'react';

import Github from '../../components/icon/Github';
import Linkedin from '../../components/icon/Linkedin';
import Facebook from '../../components/icon/Facebook';

import ReactTooltip from "react-tooltip";

import Logo from '../../components/icon/Logo';
import Zot from '../../assets/images/Zot.png';
import LocProfilePicture from '../../assets/images/loc.jpg';
import TramProfilePicture from '../../assets/images/tram.jpg';

const Footer = () => {
    return (
    <footer id="footer">
        <div>
            <div id='footer-logo-container'>
                <img id="logo-image" src={Zot}/>
                <Logo/>
            </div>
            
            <p id="about-p"> 
                Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in massa egestas mollis varius;
                dignissim elementum. Mollis tincidunt mattis hendrerit dolor eros enim, nisi ligula ornare.
                Hendrerit parturient habitant pharetra rutrum gravida porttitor eros feugiat. Mollis elit
                sodales taciti duis praesent id. Consequat urna vitae morbi nunc congue.
            </p>
        </div>

        <div>
            
            <div className="footer-header-container">
                <h1>Authors</h1>
            </div>

            <ul id='author-list-containter'>    
                <li className='flex flex-column'>
                    <div className='flex'>
                        <img className="author-image"
                            src={LocProfilePicture}/>

                        <a target="_blank" 
                            href="https://www.linkedin.com/" 
                            rel="noreferrer"
                            className="author-name"
                            aria-label="Linkedin"
                        >
                            Loc Duc Minh Khong
                        </a>
                    </div>

                    <ul className="contact-list">
                        <li className="contact-item">
                            <a>
                                <Facebook/>
                            </a>
                        </li>

                        <li className="contact-item">
                            <a>
                                <Linkedin/>
                            </a>
                        </li>

                        <li className="contact-item">
                            <a>
                                <Github/>
                            </a>
                        </li>
                    </ul>
                </li>

                <li className='flex flex-column'>
                    <div className='flex'>
                        <img className="author-image"
                            src={TramProfilePicture}/>
                        <a target="_blank" 
                            href="https://www.linkedin.com/" 
                            rel="noreferrer"
                            className="author-name"
                            aria-label="Linkedin"
                        >
                            Tram Bao La
                        </a>
                    </div>

                    <ul className="contact-list">
                        <li className="contact-item">
                            <a>
                                <Facebook/>
                            </a>
                        </li>

                        <li className="contact-item">
                            <a>
                                <Linkedin/>
                            </a>
                        </li>
                        
                        <li className="contact-item">
                            <a>
                                <Github/>
                            </a>
                        </li>
                    </ul>
                </li>
            </ul>
        </div>

        <div id='copyright'>
            <a target="_blank" 
                href="https://github.com/" 
                rel="noreferrer"  
                aria-label="Github"
                data-tip data-for="githubTip"
            >
                <Github/>
            </a>
            <ReactTooltip id="githubTip" place="bottom" effect="solid">
                Github  
            </ReactTooltip>
            <p> &copy; Copyright 2022: zot4plan.com </p>
        </div>

    </footer>
    )
}

export default memo(Footer);