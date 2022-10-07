import { useState } from 'react';
import Timer from './timer/Timer';
import Boba from "../assets/images/snacks/boba.png"
import Cookie from "../assets/images/snacks/cookie.png"
import styles from './VirtualCafeGrid.module.css';

interface VirtualCafeGridProps {
    background: {
        id: number,
        path: string,
        description: string
    }
    time: {
        study: number,
        break: number
    }
}

function VirtualCafeGrid({background, time}:VirtualCafeGridProps) {
    const [isStart, setIsStart] = useState(false);
    const handleStart = () => setIsStart(true);
    
    return (
        <div className={styles.grid_container}>
            <div className={styles.time}>
                {!isStart
                ? <>
                    <button onClick={handleStart} className={styles.timer_btn}>Start Timer</button>
                    <button className={styles.timer_btn}>Set Timer</button>
                </>
                : <Timer studyTime={time.study} breakTime={time.break}/>}
            </div>
            <div className={styles.snack_container}>
                <img className={styles.snack_icon} src={Boba} alt="Cup of Boba Milk Tea Icon"/>
                <img className={styles.snack_icon} src={Cookie} alt="Cup of Coffee Icon"/>
            </div>
            <div className={styles.background_images}>
                <img  
                    src={background.path} 
                    alt={background.description}
                />
            </div>
        </div>   
    );
}

export default VirtualCafeGrid;