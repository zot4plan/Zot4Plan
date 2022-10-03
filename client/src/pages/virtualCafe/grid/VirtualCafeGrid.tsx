import { useState } from 'react';
import Timer from './timer/Timer';
import Boba from "../assets/images/boba.png"
import Cookie from "../assets/images/cookie.png"
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
    const handleSetIsStart = () => {
        setIsStart(!isStart);
    }

    return (
        <div className={styles.grid_container}>
            <div className='flex-container'>
                {!isStart
                ? <button 
                    onClick={handleSetIsStart} 
                    className={styles.start_btn}
                > 
                    Start Timer
                </button>
                : <Timer studyTime={time.study} breakTime={time.break} />}
            </div>
            <div className={styles.snack_container}>
                <img className={styles.snack_icon} src={Boba} alt="Cup of Boba Milk Tea Icon"/>
                <img className={styles.snack_icon} src={Cookie} alt="Cup of Coffee Icon"/>
            </div>
            <img 
                className={styles.background_images} 
                src={background.path} 
                alt={background.description}
            />
        </div>   
    );
}

export default VirtualCafeGrid;