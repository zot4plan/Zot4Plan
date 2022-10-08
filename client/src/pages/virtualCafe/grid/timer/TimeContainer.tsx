// import { useState } from 'react';
import Timer from './Timer';
import styles from './TimeContainer.module.css';
import SettingIcon from '../../../../components/icon/SettingIcon';

function TimeContainer() {
    // const [times, setTimes] = useState({studyTime: 45, breakTime: 15});
    // const handleChangeTimes = (studyTime: number, breakTime: number) => setTimes({studyTime: studyTime, breakTime: breakTime})  
    
    return (
        <div className={styles.time}>
            <Timer studyTime={45} breakTime={15}/>
            <button className={styles.setting}>
                <SettingIcon/>
            </button>
        </div>
    );
}

export default TimeContainer;