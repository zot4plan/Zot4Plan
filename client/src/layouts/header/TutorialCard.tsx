import { useState } from 'react';
import LeftArrow from '../../components/icon/ArrowLeft';
import RightArrow from '../../components/icon/ArrowRight';
import XCircle from '../../components/icon/XCircle';

import './TutorialCard.css';

interface TutorialSliderType{
    closedTutorial: ( e: { preventDefault: () => void; }) => void ;
}

function TutorialCard ({ closedTutorial }: TutorialSliderType) {
    const images = [require('../../assets/images/HowTo1.jpg'), require('../../assets/images/HowTo2.jpg')];
    const [index, setIndex] = useState(1);

    function handleLeftClick( e: { preventDefault: () => void; }) {
        e.preventDefault();
        if(index === 1)
            setIndex(images.length);
        else 
            setIndex(index - 1);
    }
    
    function handleRightClick( e: { preventDefault: () => void; }) {
        e.preventDefault();
        if(index === images.length)
            setIndex(1);
        else 
            setIndex(index + 1);
    }
      
    return (
    <div id='tutorial' className="flex-container">
        <button className='arrow' onClick={handleLeftClick}>
            <LeftArrow/>
        </button>

        <div className="flex-container" style={{position: 'relative'}}>
            <div 
                style={{position: 'absolute'}}
                className= 'btn-outlined' 
                id='close-tutorial-btn' 
                onClick={closedTutorial}
            >
                <XCircle/>
            </div>
            
            <img
                className='tutorial-img'
                src={images[index - 1]} 
                loading='lazy' 
                alt='Website Tutorial Page 1'
            />
        </div>

        <button className='arrow' onClick={handleRightClick}>
            <RightArrow/>
        </button>
    </div>
    )
}

export default TutorialCard