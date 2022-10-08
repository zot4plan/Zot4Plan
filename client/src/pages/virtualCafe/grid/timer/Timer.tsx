import { useState, useEffect } from 'react';
import PauseIcon from '../../../../components/icon/PauseIcon';
import PlayIcon from '../../../../components/icon/PlayIcon';
import styles from './Timer.module.css';

interface TimerProps{
    studyTime: number;
    breakTime: number;
}

const Timer = ({ studyTime, breakTime }:TimerProps) => {
    const [myTimer, setMyTimer] = useState({
        isPause: true,
        isStudy: true,
        minutes: studyTime,
        seconds: 0,
    })
    const handlePause = () => setMyTimer(prevState => ({...prevState, isPause: !myTimer.isPause}));

    useEffect(() => {
        var timer = setInterval(() => {
            if(!myTimer.isPause) {
                if(myTimer.seconds === 0)
                {
                    if(myTimer.minutes === 0)
                    {
                        setMyTimer(prevState => ({
                            ...prevState, 
                            minutes: myTimer.isStudy ? breakTime - 1 : studyTime - 1,
                            seconds: 59,
                            isStudy: !myTimer.isStudy
                        }));
                    }
                    else {
                        setMyTimer(prevState => ({
                            ...prevState, 
                            minutes: myTimer.minutes - 1,
                            seconds: 59,
                        }));
                    }
                }
                else
                    setMyTimer(prevState => ({...prevState, seconds: myTimer.seconds - 1}));
            }
        }, 1000);
        return () => clearInterval(timer);
    });

    return (
        <div className={styles.container}>
            <div className={styles.timerContainer}>
                <h1> 
                    {myTimer.isStudy ? "Work Time:" : "Break Time:" } 
                </h1>
                <h1 className={styles.timer}>
                    {myTimer.minutes >= 10 ? myTimer.minutes : "0" + myTimer.minutes}:
                    {myTimer.seconds >= 10 ? myTimer.seconds : "0" + myTimer.seconds}
                </h1>
            </div>
            <button onClick={handlePause} className={styles.playIcon}>
                {myTimer.isPause ? <PlayIcon/> : <PauseIcon/>}
            </button>
        </div>
    )
}

export default Timer