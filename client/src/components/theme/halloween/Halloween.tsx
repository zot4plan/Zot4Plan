import { useState } from 'react';
import FlyingBats from './spooky/FlyingBats';
import Ghost from './spooky/Ghost';
import TombStones from './spooky/TombStones';
import './Halloween.css';

function Halloween() {
    const [isPlayAnimation, setIsPlayAnimation] = useState(true);
    const handlePlayAnimation = () => setIsPlayAnimation(true);
    const handleStopAnimation = () => setIsPlayAnimation(false);
    
    return (
    <>
        <div className='ghost-container' onClick={handlePlayAnimation}>
            <Ghost className='ghost'/>
        </div>
        <TombStones className='tombstones'/>
        {
            isPlayAnimation && <FlyingBats setAnimationEnd={handleStopAnimation}/>
        }
    </>
    )
}

export default Halloween;