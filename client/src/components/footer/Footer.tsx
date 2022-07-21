import {memo} from 'react';
import Author from './Author';
import Gmail from '../icon/Gmail';
import Github from '../icon/Github';
import Tools from '../icon/Tools';
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
            name: "Tram La",
            linkedin: "https://www.linkedin.com/in/tram-la-680417200",
            github: "https://github.com/tramla123",
            email: "latb@uci.edu"
        },
        {
            name: "Warren Leu",
            linkedin: "https://www.linkedin.com/",
            github: "https://github.com/",
            email: "@uci.edu"
        }
    ]
    
    return (
    <footer id="footer">
        <div id="zot-tree">
            <img src={ZotWalk} style={{width: '6.4rem', height:'6.4rem'}} alt="A walking aneater"/>
            <img src={Tree} style={{width: '12.8rem', height:'12.8rem'}} alt="A black tree"/>
        </div>

        <div>
            <h1 className='header'>
                About Us
            </h1>

            <div id="about-us-content">
                <p>  
                    Zot4Plan is a UCI schedule planner that helps Anteaters visualize their undergraduate journey. As a team, we aimed to  make the task of organizing your schedule as simple as possible. 
                </p>
                <p>
                    Disclaimer: All of the information we obtained are from the UCI catalogue. Please make sure to check your schedule with an academic counselor. Thank you - Zot! Zot! Zot! 
                </p>
                <p>
                    {"(Last Updated On: July 20th, 2022)"}
                </p>
            </div>
        </div>

        <div id="author">    
            <h1 className='header' style={{marginBottom: '1.3rem'}}>
                Authors
            </h1>
           
            <ul className='list-container'>    
                {authors.map((author) => <Author key={author.name} author={author} />)}
            </ul>
           
        </div>

        <div id="contact-us">    
            <h1 className='header'>
                Contact Us
            </h1>

            <ul className='list-container'>
                <li className="item">
                    <a target="_blank" 
                        href="https://github.com/zot4plan/Zot4Plan#readme" 
                        rel="noreferrer"  
                        aria-label="Github"
                        data-tip data-for="githubTip"
                    >
                        <Github/>
                    </a>    

                    <span> GitHub</span>                  
                </li>

                <li className="item">
                    <a target="_blank" 
                        href= {"mailto: "}
                        rel="noreferrer"
                        aria-label="Gmail"
                    >
                        <Gmail/>
                    </a>   

                    <span> zot4plan@gmail.com</span>              
                </li>

                <li className="item">
                    <p className='name'> Give Feedback or Report a Bug </p>

                    <a target="_blank"
                        href="https://forms.gle/vak9jPNBMMYsRHAX9"
                        rel="noreferrer" 
                        aria-label="Give Feedback or Report a Bug"
                    > 
                        <Tools/>
                    </a>
                </li>
            </ul>           
        </div>

        <div id='copyright'>
            <p> &copy; Copyright 2022: zot4plan.com </p>
        </div>
    </footer>
    )
}

export default memo(Footer);