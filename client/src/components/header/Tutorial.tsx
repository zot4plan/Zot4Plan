import { useState } from 'react';
import TutorialCard from './TutorialCard';

function Tutorial () {
    const [showTutorial, setShowTutorial] = useState(false);

    function handleOnClick( e: { preventDefault: () => void; }) {
        e.preventDefault();
        setShowTutorial(!showTutorial)
    }

    return (
    <>
        <button 
            className='flex-container'
            style={{color:'white', fontSize: '2rem'}} 
            onClick={handleOnClick}
            aria-label="open tutorial"
        >
            Tutorial
        </button>

        {showTutorial && <TutorialCard  closedTutorial={handleOnClick}/> }
    </>
    )
}

export default Tutorial;