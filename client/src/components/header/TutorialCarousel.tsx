import { useState, MouseEvent } from 'react';
import LeftArrow from '../icon/ArrowLeft';
import RightArrow from '../icon/ArrowRight';
import XCircle from '../icon/XCircle';
import './TutorialCarousel.css';

interface TutorialCarouselProps{
    handleClick: (e: MouseEvent<HTMLButtonElement>) => void ;
}

function TutorialCarousel ({ handleClick }: TutorialCarouselProps) {
    const gif1 = require('../../assets/gifs/pickmajor.GIF');
    const gif2 = require('../../assets/gifs/schedule.GIF');
    const gif3 = require('../../assets/gifs/moreinfo.GIF');
    const gif4 = require('../../assets/gifs/tutorial.GIF');
    const images = [gif1, gif2, gif3, gif4];
    const titles = ['Pick a Major', 'Add Classes', 'More Information', 'Drag and Drop Around']
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
        <div>
            <h1
                className='gif-title'
            >{titles[index-1]}</h1>

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
                    className={'tutorial-img'}
                    src={images[index - 1]} 
                    loading='lazy' 
                    alt='Website Tutorial Page 1'
                />
            </div>
        </div>

        <button className='arrow' onClick={handleRightClick}>
            <RightArrow/>
        </button>
    </div>
    )
}

export default TutorialCarousel