import {memo, FC, useState, MouseEvent, CSSProperties} from 'react';
import { Link } from 'react-router-dom';
import Logo from '../icon/Logo';
import Bars from '../icon/Bars';
import './Header.css';

interface HeaderProps {
    navbarStyle: CSSProperties;
    heartColor: string;
    NavList: FC<NavListProps>;
    theme?: any;
}

function Header ({navbarStyle, heartColor, NavList}: HeaderProps) {
    const [active, setActive] = useState(false);
    const handleOnClick = (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        setActive(!active);
    };
    const resetActive = () => setActive(false);

    return (
        <nav className="navbar" style={navbarStyle}>        
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