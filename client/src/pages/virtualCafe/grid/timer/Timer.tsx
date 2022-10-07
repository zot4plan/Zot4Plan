import { useState, useEffect } from 'react';
import PauseIcon from '../../../../components/icon/PauseIcon';
import PlayIcon from '../../../../components/icon/PlayIcon';
import styles from './Timer.module.css';

interface TimerProps{
    studyTime: number;
    breakTime: number;
}

const Timer = ({ studyTime, breakTime }:TimerProps) => {
    const [isPause, setIsPause] = useState(false);
    const [isStudy, setIsStudy] = useState(true);
    const [minutes, setMinutes] = useState(studyTime);
    const [seconds, setSeconds] = useState(0);
    const handlePause = () => setIsPause(!isPause);

    useEffect(() => {
        var timer = setInterval(() => {
            if(!isPause) {
                setSeconds(seconds - 1)
                if(seconds === 0)
                {
                    if(minutes === 0)
                    {
                        if(studyTime)
                            setMinutes(breakTime - 1);
                        else 
                            setMinutes(studyTime - 1);
                        setSeconds(59);
                        setIsStudy(!isStudy);
                    }
                    else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                }
            }
        }, 1000);
        return () => clearInterval(timer);
    });

    return (
        <div className={styles.container}>
            <div className={styles.timerContainer}>
                <h1> 
                    {studyTime ? "Work Time:" : "Break Time:" } 
                </h1>
                <h1 className={styles.timer}>
                    {minutes >= 10 ? minutes : "0" + minutes}:
                    {seconds >= 10 ? seconds : "0" + seconds}
                </h1>
            </div>
            <button onClick={handlePause} className={styles.stopIcon}>
                {isPause? <PlayIcon/> : <PauseIcon/>}
            </button>
        </div>
    )
}

export default Timer