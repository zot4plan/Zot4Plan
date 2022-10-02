import { useState, ChangeEvent, FormEvent } from "react"

interface AddTaskProps {
    onAddTask: (task:string) => void;
}

const AddTask = ({onAddTask}: AddTaskProps) => {
    const [task, setTask] = useState('');
    const onChange = (event: ChangeEvent<HTMLInputElement>) => {
        setTask(event.target.value);
    }

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        // Preventing the page from reloading
        event.preventDefault();

        onAddTask(task);
        setTask('');
    }

  return (
    <div>
        <form onSubmit={onSubmit}>
            <fieldset style={{borderRadius:"20px"}}>
                <legend>
                    Add Task
                </legend>
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

export default AddTask