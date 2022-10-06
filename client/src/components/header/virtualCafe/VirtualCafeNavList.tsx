import { useState} from 'react';
import { Link } from 'react-router-dom';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import styles from './VirtualCafeNavList.module.css';
import ToDoList from './toDoList/ToDoList';

interface HeaderProps {
    isActive: boolean;
}

function VirtualCafeNavList ({isActive}: HeaderProps) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    
    return (
        <ul className={'nav-list ' + (isActive? " nav-list-show": "")}>
            <li className={styles.item}>  
                <Link to="/home">
                    Home
                </Link>
            </li>
            <li className={styles.item}>  
                <button onClick={handleOpen}> 
                    To-Do List 
                </button>
                <ModalUnstyled
                    aria-labelledby="list of to-dos"
                    aria-describedby="add/edit to-dos"
                    open={open}
                    onClose={handleClose}
                >
                    <div className='modal-background flex-container'>
                        <ToDoList handleClose={handleClose}/>
                    </div>
                </ModalUnstyled>
            </li>
        </ul>
    )
}

export default VirtualCafeNavList;