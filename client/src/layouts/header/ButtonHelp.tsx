import { useState } from 'react';

import QuestionMark from '../../components/icon/QuestionMark';
import TutorialSlider from './TutorialCard';

function ButtonHelp () {
    const [showTutorial, setShowTutorial] = useState(false);

    function handleOnClick( e: { preventDefault: () => void; }) {
        e.preventDefault();
        setShowTutorial(!showTutorial)
    }

    return (
    <div className='flex-container'>
        <button 
            className='btn-nav' 
            onClick={handleOnClick}
            aria-label="open tutorial"
        >
            <QuestionMark/>
        </button>

        {showTutorial && <TutorialSlider closedTutorial={handleOnClick}/> }
    </div>
    )
}

export default ButtonHelp;