import {memo, useState, MouseEvent} from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../icon/Logo';
import ArrowDown from '../../icon/ArrowDown';
import Bars from '../../icon/Bars';
import DropDown from './DropDown'
import Tutorial from './Tutorial';
import './Header.css';

function Header () {
    const [active, setActive] = useState(false);
    const handleOnClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setActive(!active);
    };

    return (
        <nav id="nav-bar">        
            <Link to="/home" id="brand">
                <Logo/>
            </Link>
        
            <button id="menu-toggle" onClick={handleOnClick}>
                <Bars/>
            </button>
        
            <ul className={"nav-list " + (active? "nav-list-show ": "")}>
                <li className='nav-item'>
                    <Link to="/virtual-cafe">Virtual Cafe </Link>
                </li>

                <li className='nav-item'>
                    <a href="#footer">Team</a>
                </li>

                <li className='nav-item'>
                    <Tutorial/> 
                </li>

                <li className='nav-item'>
                    Themes 
                </li>

                <li className='nav-item nav-link'>
                    <span style={{marginRight: '0.5rem'}}> Resources </span>
                    <ArrowDown/>
                    <DropDown/>
                </li>
            </ul>
        </nav>
    )
}

export default memo(Header);