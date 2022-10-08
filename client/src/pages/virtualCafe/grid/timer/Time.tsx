import { useState } from 'react';
import Timer from './Timer';
import styles from './Time.module.css';

function Time() {
    const [time, setTime] = useState({study: 45, break: 15});
    const [isStart, setIsStart] = useState(false);
    const handleStart = () => setIsStart(true);
    const handleSetTime = (studyTime: number, breakTime: number) => setTime({study: studyTime, break: breakTime});
    
    
    return (
        <div className={styles.time}>
            {!isStart
            ? <>
                <button onClick={handleStart} className={styles.timer_btn}>Start Timer</button>
                <button className={styles.timer_btn}>Set Timer</button>
            </>
            : <Timer studyTime={time.study} breakTime={time.break}/>}

        </div>
    );
}

export default Time;