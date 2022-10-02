import { useState, useEffect } from 'react';
import './Timer.css';

interface TimerProps{
    studyTime: number;
    breakTime: number;
}

const Timer = ({ studyTime, breakTime }:TimerProps) => {
    const [isStudy, setIsStudy] = useState(true);
    const [minutes, setMinutes] = useState(studyTime);
    const [seconds, setSeconds] = useState(0);
    
    useEffect(() => {
        var timer = setInterval(() => {
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
        }, 1000);

        return () => clearInterval(timer);
    });

    return (
        <div className="timer-container">
            <h1 style={{paddingTop: '0.4rem'}}> 
                {studyTime ? "Work Time:" : "Break Time:" } 
            </h1>
            <h1 className="timer">
                {minutes >= 10 ? minutes : "0" + minutes}:
                {seconds >= 10 ? seconds : "0" + seconds}
            </h1>
        </div>
    )
}

export default Timer