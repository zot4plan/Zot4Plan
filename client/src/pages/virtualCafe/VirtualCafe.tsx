import { useState } from 'react';
import Header from '../../components/header/virtualCafe/Header';
import MediaNavbar from './mediaNavbar/MediaNavbar';
import SelectBackground from './background/SelectBackground';
import Background from './background/Background';
import Snacks from './snacks/Snacks';
import Tasks from './tasks/Tasks';
import TimeSettingModal from './timer/TimeSettingModal';
import Timer from './timer/Timer';
import { backgrounds } from './data/backgrounds';
import './VirtualCafe.css';

interface BackgroundProps {
    id: number;
    description: string; 
    path: string;
}

function VirtualCafe() {
    const [showSelectBackGround, setSelectBackGround] = useState (false)
    const [isOpenTimeSetting, setIsOpenTimeSetting] = useState(false);
    const [isOpenTodo, setIsOpenTodo] = useState(false);
    const [startTimer, setStartTimer] = useState(false);
    const [time, setTime] = useState({study: 45, break: 15});
    const [background, setBackground] = useState(backgrounds[2]);

    const changeBackground = (item: BackgroundProps) => {
        setBackground(item);
    }

    const toggleSelectBackground = () => {
        setSelectBackGround(!showSelectBackGround)
    }

    const toggleIsOpenTimeSetting = () => {
        setIsOpenTimeSetting(!isOpenTimeSetting);
    }

    const changeSetTime = (studyTime: number, breakTime: number) => {
        setTime({study: studyTime, break: breakTime});
    }

    const toggleIsOpenTodo = () => {
        setIsOpenTodo(!isOpenTodo);
    }

    return (
        <div className="virtual-cafe">
            <Header 
                toggleTimerSetting={toggleIsOpenTimeSetting}
                toggleToDo={toggleIsOpenTodo}
            />
        
            {showSelectBackGround 
            && <SelectBackground 
                    closeSelect={toggleSelectBackground} 
                    setBackground={changeBackground}
                />}
            
            {isOpenTimeSetting 
            && <TimeSettingModal
                    toggleTimeSetting={toggleIsOpenTimeSetting}
                    setTime={changeSetTime}
                />}
            
            {isOpenTodo && <Tasks toggleTodo={toggleIsOpenTodo}/>}
        
            <div className="grid-container">
                {!startTimer 
                ? <button 
                    onClick={() => setStartTimer(!startTimer)} 
                    className="time-container timer"
                    style={{
                        fontSize:'2rem', 
                        padding:'1rem', 
                        marginTop:'3rem'
                    }}
                > 
                    Start Timer 
                </button>
                : <Timer studyTime={time.study} breakTime={time.break} />}
                
                <Snacks/>
                <Background background={background}/>
            </div>
            <MediaNavbar openSelect={toggleSelectBackground}/>
        </div>
    );
}

export default VirtualCafe;