import {memo} from 'react';
import ReactTooltip from "react-tooltip";

import Github from '../../components/icon/Github';
import Logo from '../../components/icon/Logo';
import Author from '../../components/author/Author';

import Zot from '../../assets/images/Zot.png';
import PictureOfLoc from '../../assets/images/loc.jpg';
import PictureOfTram from '../../assets/images/tram.jpg';
import Tree from '../../assets/images/tree.png';
import ZotWalk from '../../assets/images/zot-walk.png';

const Footer = () => {
    const authors = [
        {
            name: "Loc Duc Minh Khong",
            profile: PictureOfLoc,
            linkedin: "https://www.linkedin.com/in/lockhong",
            github: "https://github.com/ldkhong",
            facebook: "https://www.facebook.com/loc.khong.512" 
        },
        {
            name: "Tram Bao La",
            profile: PictureOfTram,
            linkedin: "https://www.linkedin.com/in/tram-la-680417200",
            github: "https://github.com/tramla123",
            facebook: "https://www.facebook.com" 
        }
    ]
    
    return (
    <footer id="footer" className="relative">
        <div>
            <div id='footer-logo-container' className='flex-container'>
                <img id="logo-image" src={Zot} alt='Anteater Logo brand'/>
                <Logo/>
            </div>
            
            <p id="about-p"> 
            Welcome to Zot4Plan! Zot4Plan is a planner that helps Anteaters visualize their undergraduate journey. As a team, we aimed to make the task of organizing your schedule as simple as possible. Besides the planner tool, we also incorporated the major requirements tab to make the task of keeping progress much more efficient. Note that all of the information we obtained are from the UCI website. Please make sure to check your schedule with your academic counselor. Thank you - Zot! Zot! Zot!
            </p>
        </div>

        <div>
            <div id="footer-header-container" className='flex-container'>
                <h1>Authors</h1>
            </div>

            <ul id='author-list-containter'>    
                {authors.map((author) => <Author author={author} />)}
            </ul>
        </div>

        <div id='copyright'>
            <a target="_blank" 
                href="https://github.com/zot4plan" 
                rel="noreferrer"  
                aria-label="Github"
                data-tip data-for="githubTip"
            >
                <Github/>
            </a>

            <ReactTooltip id="githubTip" place="bottom" effect="solid">
                View source code here!!!
            </ReactTooltip>

            <p> &copy; Copyright 2022: zot4plan.com </p>
        </div>

        <div style={{position:"absolute", top: '-128px', right:'12%'}}>
            <img src={ZotWalk} style={{width: '64px', height:'64px'}}/>
            <img src={Tree} style={{width: '128px', height:'128px'}}/>
        </div>
    </footer>
    )
}

export default memo(Footer);