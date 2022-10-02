import { Link } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
    toggleTimerSetting: () => void;
    toggleToDo: () => void;
}

function Header ({ toggleTimerSetting, toggleToDo }: HeaderProps) {
    return (
        <ul className='nav-container'>
            <li className='nav-item'>  
                <Link to="/home" className='header-items'>
                    Home
                </Link>
            </li>
            <li className='nav-item'>  
                <p className='header-items' onClick={toggleTimerSetting}> Timer </p>
            </li>
            <li className='nav-item'>  
                <p className='header-items' onClick={toggleToDo}> To-Do List </p>
            </li>
        </ul>
    )
}

export default Header