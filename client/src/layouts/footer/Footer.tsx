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
                <img id="logo-image" src={Zot} alt='Anteater Logo brand'/>
                <Logo/>
            </div>
            
            <p id="about-p"> 
            Welcome to Zot4Plan! Zot4Plan is a planner that helps Anteaters visualize their undergraduate journey. As a team, we aimed to make the task of organizing your schedule as simple as possible. Besides the planner tool, we also incorporated the major requirements tab to make the task of keeping progress much more efficient. Note that all of the information we obtained are from the UCI website. Please make sure to check your schedule with your academic counselor. Thank you.
            </p>
        </div>

        <div>
            <div className="footer-header-container">
                <h1>Authors</h1>
            </div>

            <ul id='author-list-containter'>    
                <li>
                    <div className='flex'>
                        <img className="author-image"
                            src={LocProfilePicture}
                            alt={'Loc Khong\'s profile picture'}
                        />

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
                            <a target="_blank" 
                                href="https://www.facebook.com/" 
                                rel="noreferrer"
                                aria-label="FaceBook"
                            >
                                <Facebook/>
                            </a>
                        </li>

                        <li className="contact-item">
                            <a target="_blank" 
                                href="https://www.linkedin.com/" 
                                rel="noreferrer"
                                aria-label="Linkedin"
                            >
                                <Linkedin/>
                            </a>
                        </li>

                        <li className="contact-item">
                            <a target="_blank" 
                                href="https://www.Github.com/" 
                                rel="noreferrer"
                                aria-label="Github"
                            >
                                <Github/>
                            </a>
                        </li>
                    </ul>
                </li>

                <li>
                    <div className='flex'>
                        <img className="author-image"
                            src={TramProfilePicture}
                            alt={'Tram La\'s profile picture'}
                        />
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
                            <a target="_blank" 
                                href="https://www.facebook.com/" 
                                rel="noreferrer"
                                aria-label="FaceBook"
                            >
                                <Facebook/>
                            </a>
                        </li>

                        <li className="contact-item">
                            <a target="_blank" 
                                href="https://www.linkedin.com/" 
                                rel="noreferrer"
                                aria-label="Linkedin"
                            >
                                <Linkedin/>
                            </a>
                        </li>
                        
                        <li className="contact-item">
                            <a target="_blank" 
                                href="https://www.Github.com/" 
                                rel="noreferrer"
                                aria-label="Github"
                            >
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