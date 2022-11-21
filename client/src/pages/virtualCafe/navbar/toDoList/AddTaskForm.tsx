import { useState, ChangeEvent, FormEvent } from "react"
import styles from './AddTaskForm.module.css'
interface AddTaskFormProps {
    handleAddTask: (task:string) => void;
}

const AddTaskForm = ({handleAddTask}: AddTaskFormProps) => {
    const [task, setTask] = useState('');

    const onChange = (event: ChangeEvent<HTMLInputElement>) => setTask(event.target.value);
    
    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Preventing the page from reloading
        handleAddTask(task);
        setTask('');
    }

  return (
    <div>
        <form onSubmit={onSubmit}>
            <fieldset style={{textAlign:"center", borderRadius:"20px"}}>
                <legend> Add Task </legend>
                <input 
                    type="text" 
                    required value={task}
                    onChange={onChange}
                    className={styles.add_task_box}
                    placeholder="Enter your task..."
                />
                <input type="submit" value="Add"/>
            </fieldset>
        </form>
    </div>
  )
}

export default AddTaskForm;