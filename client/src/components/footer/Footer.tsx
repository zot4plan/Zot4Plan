import { memo } from 'react';
import Author from './Author';
// import Lights from '../theme/christmas/Lights';
import Contact from './Contact';
import './Footer.css';
import Decoration from './Decoration';
// import MerryChristmas from '../theme/christmas/MerryChristmas';

const authors = [
    {
        name: "Loc Khong",
        role: "Author",
        linkedin: "https://www.linkedin.com/in/lockhong",
        github: "https://github.com/ldkhong",
        email: "ldkhong@uci.edu",
    },
    {
        name: "Tram La",
        role: "Author",
        linkedin: "https://www.linkedin.com/in/tram-la-680417200",
        github: "https://github.com/tramla123",
        email: "latb@uci.edu",
    },
    {
        name: "Uyen Dinh",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/uyen-dinh-74b97418a",
        github: "https://github.com/UyenDinh171",
        email: "uyentd@uci.edu",
    },
    {
        name: "Vianey Mursio",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/vianey-flores-mursio/",
        instagram: "https://www.instagram.com/vianeymursio/",
        email: "vianeyf@uci.edu",
    },
    {
        name: "Warren Leu",
        role: "Member",
        linkedin: "https://www.linkedin.com/in/warrenleu/",
        github: "https://github.com/SadNoodle2765/",
        instagram: "https://www.instagram.com/sadnoodle2765/"
    }
];

const Footer = () => {
    return (
        <footer id="footer" className='home-footer'>
            <Decoration/>
            {/* <Lights/>
            <MerryChristmas className='merry-christmas'/> */}
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
                        (Last Updated On: Jan 9th, 2023)
                    </p>
                </div>
            </div>

            <div id="contact-us">    
                <h1 className='header' style={{ marginLeft: '0.5rem' }}>
                    Contact Us
                </h1>
                <Contact/>
            </div>

            <div id="author">    
                <h1 className='header' style={{marginBottom: '1.3rem'}}>
                    Contributors
                </h1>
            
                <ul className='list-container list-author'>    
                    {authors.map((author) => <Author key={author.name} author={author} />)}
                </ul>
            </div>

            <div id='copyright'>
                <p> &copy; Copyright 2022: zot4plan.com </p>
            </div>
        </footer>
    )
}

export default memo(Footer);