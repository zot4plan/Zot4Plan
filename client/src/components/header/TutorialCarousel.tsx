import { useState, MouseEvent } from 'react';
import LeftArrow from '../icon/ArrowLeft';
import RightArrow from '../icon/ArrowRight';
import XCircle from '../icon/XCircle';
import './TutorialCarousel.css';

interface TutorialCarouselProps{
    handleClick: (e: MouseEvent<HTMLButtonElement>) => void ;
}

function TutorialCarousel ({ handleClick }: TutorialCarouselProps) {
    const images = [require('../../assets/images/HowTo1.jpg'), require('../../assets/images/HowTo2.jpg')];
    const [index, setIndex] = useState(1);

    function handleLeftClick( e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const idx = index === 1? images.length : index - 1;
        setIndex(idx);
    }
    
    function handleRightClick( e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        const idx = index === images.length? 1 : index + 1;
        setIndex(idx);
    }
      
    return (
    <div id='tutorial' className="flex-container">
        <button className='arrow' onClick={handleLeftClick}>
            <LeftArrow/>
        </button>

        <div className="flex-container" style={{position: 'relative'}}>
            <button 
                style={{position: 'absolute'}}
                className= 'btn-outlined' 
                id='close-tutorial-btn' 
                onClick={handleClick}
            >
                <XCircle/>
            </button>
            
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

export default TutorialCarousel