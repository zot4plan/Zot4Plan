import { Link } from 'react-router-dom';
import ArrowDown from '../../icon/ArrowDown';
import DropDown from './resource/DropDown'
import Tutorial from './tutorial/Tutorial';

interface HomeNavListProp {
    isActive: boolean;
}
function HomeNavList ({isActive}: HomeNavListProp) {
    return (
        <ul className={"nav-list " + (isActive? "nav-list-show ": "")}>
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
    )
}

export default HomeNavList;