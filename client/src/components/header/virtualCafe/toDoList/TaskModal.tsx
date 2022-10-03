import { useState, ChangeEvent, FormEvent } from "react"

interface TaskModalProps {
    handleAddTask: (task:string) => void;
}

const TaskModal = ({handleAddTask}: TaskModalProps) => {
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
            <fieldset style={{borderRadius:"20px"}}>
                <legend> Add Task </legend>
                <input 
                    type="text" 
                    required value={task}
                    onChange={onChange}
                    className="add-task-box"
                    placeholder="Enter your task..."
                />
                <input type="submit" value="Add"/>
            </fieldset>
        </form>
    </div>
  )
}

export default TaskModal;