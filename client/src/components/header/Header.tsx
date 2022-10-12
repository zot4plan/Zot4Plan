import {memo, FC, useState, MouseEvent} from 'react';
import { Link } from 'react-router-dom';
import Logo from '../icon/Logo';
import Bars from '../icon/Bars';
import './Header.css';

interface HeaderProps {
    path: string;
    className?: string;
    heartColor: string;
    NavList: FC<NavListProps>;
}

function Header ({path, className = '', heartColor, NavList}: HeaderProps) {
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
                <Logo heartColor={heartColor}/>
            </Link>
        
            <button id="menu-toggle" onClick={handleOnClick}>
                <Bars/>
            </button>
            <NavList isActive={active}/>
        </nav>
    )
}

export default memo(Header);