import {memo} from 'react';
import ReactTooltip from "react-tooltip";

import Github from '../../components/icon/Github';
import Logo from '../../components/icon/Logo';
import Author from '../../components/author/Author';

import Zot from '../../assets/images/Zot.png';
import Tree from '../../assets/images/tree.png';
import ZotWalk from '../../assets/images/zot-walk.png';

import './Footer.css';

const Footer = () => {
    const authors = [
        {
            name: "Loc Duc Minh Khong",
            linkedin: "https://www.linkedin.com/in/lockhong",
            github: "https://github.com/ldkhong",
            email: "ldkhong@uci.edu"
        },
        {
            name: "Tram Bao La",
            linkedin: "https://www.linkedin.com/in/tram-la-680417200",
            github: "https://github.com/tramla123",
            email: "latb@uci.edu"
        }
    ]
    
    return (
    <footer id="footer">
        <div id="zot-tree">
            <img src={ZotWalk} style={{width: '6.4rem', height:'6.4rem'}} alt="A walking aneater"/>
            <img src={Tree} style={{width: '12.8rem', height:'12.8rem'}} alt="A black tree"/>
        </div>

        <div>
            <div id='logo-container' className='flex-container'>
                <img id="logo-image" 
                    src={Zot} 
                    alt='Anteater Logo brand'
                />
                <Logo/>
            </div>
            
            <p style={{textAlign: 'justify', lineHeight: '1.4'}}> 
                Welcome to Zot4Plan! Zot4Plan is a schedule planner that helps Anteaters visualize their undergraduate journey. As a team, we aimed to make the task of organizing your schedule as simple as possible. Besides the schedule planning tool, we also incorporated the major requirements tab to make the task of keeping progress much more efficient. Note that all of the information we obtained are from the UCI website. Please make sure to check your schedule with your academic counselor. Thank you - Zot! Zot! Zot! </p>
        </div>

        <div>    
            <h1 style={{margin:'2rem 0rem', 
                        height:'6.4rem', 
                        fontSize:'3.6rem', 
                        fontWeight:'500'}}
                className='flex-container'
            >
                Authors
            </h1>
           
            <ul id='author-list-container'>    
                {authors.map((author) => <Author key={author.name} author={author} />)}
            </ul>

            <a target="_blank"
                href="https://forms.gle/vak9jPNBMMYsRHAX9"
                rel="noreferrer" 
                style={{color:"white", fontSize:"1.6rem"}}
                className='flex-container'
            > 
                Give Feedback or Report a Bug <span role="img" aria-label="bug" style={{marginLeft:"0.3rem"}}>🐛</span>
            </a>
           
        </div>

        <div id='copyright'>
            <a target="_blank" 
                href="https://github.com/zot4plan/Zot4Plan#readme" 
                rel="noreferrer"  
                aria-label="Github"
                data-tip data-for="githubTip"
            >
                <Github/>
            </a>

            <ReactTooltip id="githubTip" place="top" effect="solid">
                View source code!
            </ReactTooltip>

            <p> &copy; Copyright 2022: zot4plan.com </p>
        </div>
    </footer>
    )
}

export default memo(Footer);