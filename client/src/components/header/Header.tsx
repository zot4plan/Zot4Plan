import {memo, useState, MouseEvent} from 'react';
import { Link } from 'react-router-dom';
import Logo from '../icon/Logo';
import Bars from '../icon/Bars';
import HomeNavList from './home/HomeNavList';
import VirtualCafeNavList from './virtualCafe/VirtualCafeNavList';
import './Header.css';

interface HeaderProps {
    path: string;
}

function Header ({path}:HeaderProps) {
    const [active, setActive] = useState(false);

    const handleOnClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setActive(!active);
    };

    const resetActive = () => setActive(false);

    const style = path === '/virtual-cafe'
        ? { margin: '0.5rem 1rem', backgroundColor: '#B5838D', borderRadius: '2.4rem' }
        : { margin: '0rem', backgroundColor: 'var(--secondary-color)', borderRadius: '0rem' }

    return (
        <nav className="navbar" style={style}>        
            <Link to="/home" id="brand" onClick={resetActive}>
                <Logo heartColor={path === '/virtual-cafe'? '#FFFFFF' : 'var(--accent-color-2)'}/>
            </Link>
        
            <button id="menu-toggle" onClick={handleOnClick}>
                <Bars/>
            </button>
            {
                path !== '/virtual-cafe' 
                ? <HomeNavList isActive={active}/>
                : <VirtualCafeNavList isActive = {active}/>
            }
        </nav>
    )
}

export default memo(Header);