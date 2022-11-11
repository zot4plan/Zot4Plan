import { Link } from 'react-router-dom';
import styles from './VirtualCafeNavList.module.css';
import ToDoList from './toDoList/ToDoList';
import ModalButton from '../../../components/modal/ModalButton';

function VirtualCafeNavList ({isActive}: NavListProps) {
    return (
        <ul className={'nav-list ' + (isActive ? " nav-list-show" : "")}>
            <li className={styles.item}>  
                <Link to="/home">Home</Link>
            </li>
            <li className={styles.item}>  
                <ModalButton label="To-Do List" ModalContent={ToDoList}/>
            </li>
        </ul>
    )
}

export default VirtualCafeNavList;