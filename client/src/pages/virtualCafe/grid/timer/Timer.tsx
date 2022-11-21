import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PauseIcon from '../../../../components/icon/PauseIcon';
import PlayIcon from '../../../../components/icon/PlayIcon';
import Refresh from '../../../../components/icon/Refresh';
import SettingIcon from '../../../../components/icon/SettingIcon';
import ModalButton from '../../../../components/modal/ModalButton';
import { RootState } from '../../../../store/store';
import TimeForm from './form/TimeForm';
import './Timer.css';

const initialState = (workTime: number, isWork=true) => {
    return {
        isPause: true,
        isWork: isWork,
        minutes: workTime,
        seconds: 0,
    }
};

const Timer = () => {
    const time = useSelector((state: RootState) => state.virtualCafe.time);
    const [myTimer, setMyTimer] = useState(initialState(time.workTime));

    const handlePause = () => setMyTimer(prevState => ({...prevState, isPause: !myTimer.isPause}));

    const handleReset = () => setMyTimer(initialState(myTimer.isWork ? time.workTime : time.breakTime, myTimer.isWork));

    useEffect(()=> {
        setMyTimer(initialState(time.workTime));
    },[time])

    useEffect(() => {
        var timer = setInterval(() => {
            if(!myTimer.isPause) {
                if(myTimer.seconds === 0)
                {
                    if(myTimer.minutes === 0)
                    {
                        setMyTimer(prevState => ({
                            ...prevState, 
                            minutes: myTimer.isWork ? time.breakTime - 1 : time.workTime - 1,
                            seconds: 59,
                            isWork: !myTimer.isWork
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
        <div className='timer-wrapper flex-container'>
            <div className='clock-container flex-container'>
                <p> { myTimer.isWork ? "Work Time:" : "Break Time:" } </p>
                <p className='timer'>
                    { myTimer.minutes >= 10 ? myTimer.minutes : "0" + myTimer.minutes }
                    :{ myTimer.seconds >= 10 ? myTimer.seconds : "0" + myTimer.seconds }
                </p>
            </div>
            <div className='timer-toolbar-container'>
                <ModalButton Label={SettingIcon} className='timer-icon' ModalContent={TimeForm}/>
                <button onClick={handlePause} className='timer-icon'>{myTimer.isPause ? <PlayIcon/> : <PauseIcon/>}</button>
                <button className='timer-icon' onClick={handleReset}> <Refresh/> </button>
            </div>
        </div>
    )
}

export default Timer;