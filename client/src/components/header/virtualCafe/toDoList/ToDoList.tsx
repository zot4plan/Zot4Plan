import { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import Task from "./Task";
import AddTaskForm from "./AddTaskForm";
import Xmark from '../../../icon/Xmark';
import styles from "./ToDoList.module.css";

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
        <div className={styles.modal}>
            <div className={styles.modal_header} style={{backgroundColor:"white"}}>
                <h1>To-Do List!</h1>
                <button onClick={handleClose} className={styles.x_icon}> 
                    <Xmark/>
                </button>
            </div>
            <AddTaskForm handleAddTask={handleAddTask}/>
            <div className={styles.modal_body}>
                <div className={styles.tasks}>
                    {tasks.length > 0 
                    ? (<ul>
                        {tasks.map((task:any) => (
                            <Task 
                                key={task.id} 
                                task={task} 
                                onDelete={handleDeleteTask}/>
                        ))} 
                    </ul>) 
                    : <p style={{textAlign: "center"}}>
                        No current task to display ... 
                        <span style={{fontSize: "19px"}}>&nbsp;z&nbsp;</span> 
                        <span style={{fontSize: "16px"}}>z&nbsp;</span>
                        <span style={{fontSize: "13px"}}>z</span> 
                        ...
                    </p>}
                </div>
            </div>
        </div>
  )
}

export default ToDoList;