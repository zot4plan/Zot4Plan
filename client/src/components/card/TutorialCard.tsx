import { useState } from 'react';
import LeftArrow from '../icon/LeftArrow';
import RightArrow from '../icon/RightArrow';
import XCircle from '../icon/XCircle';

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
    <div id='tutorial' className="absolute flex-container">
        <button className='arrow' onClick={handleLeftClick}>
            <LeftArrow/>
        </button>
        <div className="relative flex-container">
            <div 
                className='absolute btn-secondary' 
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