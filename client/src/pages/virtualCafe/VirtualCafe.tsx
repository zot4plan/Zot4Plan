import { useState } from 'react';
import Header from '../../components/header/Header';
import MediaNavbar from './mediaNavbar/MediaNavbar';
import VirtualCafeGrid from './grid/VirtualCafeGrid';
import { backgrounds } from './data/data';
import './VirtualCafe.css';

interface BackgroundProps {
    id: number;
    description: string; 
    path: string;
}

function VirtualCafe() {
    const [time, setTime] = useState({study: 45, break: 15});
    const [background, setBackground] = useState(backgrounds[2]);

    const changeBackground = (item: BackgroundProps) => {
        setBackground(item);
    }

    // const changeSetTime = (studyTime: number, breakTime: number) => {
    //     setTime({study: studyTime, break: breakTime});
    // }

    return (
        <div className="virtual-cafe">
            <Header 
                path="/virtual-cafe"
            />
            
            <VirtualCafeGrid 
                background={background}
                time={time}
            />

            <MediaNavbar setBackground={changeBackground}/>
        </div>
    );
}

export default VirtualCafe;