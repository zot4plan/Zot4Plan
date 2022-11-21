import { Link } from 'react-router-dom';
import ToDoList from './toDoList/ToDoList';
import ModalButton from '../../../components/modal/ModalButton';
import './VirtualCafeNavList.css';

function VirtualCafeNavList ({isActive}: NavListProps) {
    return (
        <ul className={'nav-list ' + (isActive ? " nav-list-show" : "")}>
            <li className='nav-item'>  
                <Link to="/home">Home</Link>
            </li>
            <li className='nav-item'>  
                <ModalButton Label="To-Do List" ModalContent={ToDoList}/>
            </li>
        </ul>
    )
}

export default VirtualCafeNavList;