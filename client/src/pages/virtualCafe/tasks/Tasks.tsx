import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import Task from "./Task";
import AddTask from "./AddTask";
import Xmark from '../../../components/icon/Xmark';
import "../background/Background.css";

interface TasksProps {
    toggleTodo: () => void;
}

const Tasks = ({ toggleTodo }: TasksProps) => {
    const [tasks, setTasks] = useState(JSON.parse(sessionStorage.getItem("tasks") || "[]"));

    const onAddTask = (task: any) => {
        let newTasks = [...tasks, {id: nanoid(), task: task}];
        sessionStorage.setItem("tasks", JSON.stringify(newTasks));
        setTasks(newTasks);
    }

    const onDeleteTask = (task_id: any) => {
        let newTasks = tasks.filter((task: any) => task.id !== task_id);
        sessionStorage.setItem("tasks", JSON.stringify(newTasks));
        setTasks(newTasks);
    }
 
return (
    <div className="popup">
        <div className="popup-inner">
            <div className="modal-top" style={{backgroundColor:"white"}}>
                <h2>To-Do List!</h2>
                <button onClick={toggleTodo}> 
                    <Xmark/>
                </button>
            </div>

            <AddTask onAddTask={onAddTask}/>

            <div className="popup-list-outer">
                <div className="popup-list">
                    {tasks.length > 0 
                    ? (<ul>
                            {tasks.map((task:any) => (
                                <Task 
                                    key={task.id} 
                                    task={task} 
                                    onDelete={onDeleteTask}/>
                            ))} 
                        </ul>) 
                    : <p>No current task to display ... Z z z...</p>}
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Tasks