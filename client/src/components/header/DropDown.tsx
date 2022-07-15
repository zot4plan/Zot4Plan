import React, { useState } from 'react';
import './Header.css';

function DropDown() {
    
    const MenuItems = [
        {
            "name": "UCI Course Catalogue",
            "href": 'https://catalogue.uci.edu/allcourses/',
            'cName': 'dropdown-link'
        },
        {
            "name": "UCI Majors Catalogue",
            "href": "https://catalogue.uci.edu/undergraduatedegrees/",
            'cName': 'dropdown-link'
        },
        {
            "name": "UCI Academic Advising",
            "href": "https://ps.uci.edu/stuaff/ac.html",
            'cName': 'dropdown-link'
        }
    ];

    const [click, setClick] = useState(false);
    const handleClick = () => setClick(!click);

    return (
        <div>
         <ul onClick={handleClick} className={click ? 'dropdown-menu clicked' : 'dropdown-menu'}>
            {MenuItems.map((item, index) => {
                return (
                    <ul key={index}> 
                     <li className={item.cName} onClick={ () => setClick(false) }>
                        <a target="_blank" 
                            href={item.href}
                            rel="noreferrer"
                            aria-label="Linkedin"
                            style={{color:'white'}}
                        >
                            {item.name}
                        </a>
                        </li>
                    </ul>
                    );
                })}
            </ul>
        </div>
    );
}

export default DropDown;