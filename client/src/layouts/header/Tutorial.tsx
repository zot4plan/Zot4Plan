import { useState } from 'react';
import TutorialCard from './TutorialCard';

function Tutorial () {
    const [showTutorial, setShowTutorial] = useState(false);

    function handleOnClick( e: { preventDefault: () => void; }) {
        e.preventDefault();
        setShowTutorial(!showTutorial)
    }

    return (
    <div className='flex-container'>
        <button 
            style={{color:'white', fontSize: '2rem'}} 
            onClick={handleOnClick}
            aria-label="open tutorial"
        >
            Tutorial
        </button>

        {showTutorial && <TutorialCard  closedTutorial={handleOnClick}/> }
    </div>
    )
}

export default Tutorial;