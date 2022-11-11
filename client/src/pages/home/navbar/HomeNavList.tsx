import { Link } from 'react-router-dom';
import ArrowDown from '../../../components/icon/ArrowDown';
import ModalButton from '../../../components/modal/ModalButton';
import DropDown from './resource/DropDown'
import TutorialModal from './tutorial/TutorialModal';

function HomeNavList ({isActive}: NavListProps) {
    return (
        <ul className={"nav-list " + (isActive? "nav-list-show ": "")}>
            <li className='nav-item'>
                <Link to="/virtual-cafe">Virtual Cafe </Link>
            </li>

            <li className='nav-item'>
                <a href="#footer">Team</a>
            </li>

            <li className='nav-item'>
                <ModalButton label="Tutorial" className="flex-container" ModalContent={TutorialModal}/> 
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