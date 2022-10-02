import { useState } from 'react';
import Xmark from '../../../components/icon/Xmark';

interface TaskProps {
    task: any;
    onDelete: (id: string) => void;
}
const Task = ({ task, onDelete }: TaskProps) => {
    const [complete, setComplete] = useState(false);
    const handleOnChange = () => {
        setComplete(!complete);
    }

    return (
        <li className="task-item">
            <input 
                style={{"gridArea": "1 / 1 / 2 / 2"}} 
                type='checkbox' 
                checked={complete}
                onChange={handleOnChange}
            />
            <p style={{"gridArea": "1 / 2 / 2 / 3"}}> 
                {task.task}
            </p>
            <div 
                style={{"gridArea": "1 / 3 / 2 / 4"}}
                onClick={() => onDelete(task.id)}
            >
                <Xmark/>
            </div>
        </li>
  )
}

export default Task