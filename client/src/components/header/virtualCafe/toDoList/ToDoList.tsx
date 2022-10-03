import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import Task from "./Task";
import TaskModal from "./TaskModal";
import Xmark from '../../../icon/Xmark';
//import "../grid/background/Background.css";

interface ToDoListProps {
    handleClose: () => void;
}

function ToDoList({ handleClose }: ToDoListProps) {
    const [tasks, setTasks] = useState(JSON.parse(sessionStorage.getItem("tasks") || "[]"));

    const handleAddTask = (task: any) => {
        const newTasks = [...tasks, {id: nanoid(), task: task}];
        sessionStorage.setItem("tasks", JSON.stringify(newTasks));
        setTasks(newTasks);
    }

    const handleDeleteTask = (task_id: any) => {
        const newTasks = tasks.filter((task: any) => task.id !== task_id);
        sessionStorage.setItem("tasks", JSON.stringify(newTasks));
        setTasks(newTasks);
    }
 
return (
    <div className="popup">
        <div className="popup-inner">
            <div className="modal-top" style={{backgroundColor:"white"}}>
                <h2>To-Do List!</h2>
                <button onClick={handleClose}> 
                    <Xmark/>
                </button>
            </div>
            <TaskModal handleAddTask={handleAddTask}/>
            <div className="popup-list-outer">
                <div className="popup-list">
                    {tasks.length > 0 
                    ? (<ul>
                            {tasks.map((task:any) => (
                                <Task 
                                    key={task.id} 
                                    task={task} 
                                    onDelete={handleDeleteTask}/>
                            ))} 
                        </ul>) 
                    : <p>No current task to display ... Z z z...</p>}
                </div>
            </div>
        </div>
    </div>
  )
}

export default ToDoList;