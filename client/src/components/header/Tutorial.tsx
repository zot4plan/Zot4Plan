import { useState, MouseEvent } from 'react';
import TutorialCarousel from './TutorialCarousel';

function Tutorial () {
    const [showTutorial, setShowTutorial] = useState(false);

    const handleClick = ( e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        setShowTutorial(!showTutorial)
    }

    return (
    <>
        <button 
            className='flex-container'
            style={{color:'white', fontSize: '2rem'}} 
            onClick={handleClick}
            aria-label="open tutorial"
        >
            Tutorial
        </button>

        {showTutorial && <TutorialCarousel  handleClick={handleClick}/> }
    </>
    )
}

export default Tutorial;