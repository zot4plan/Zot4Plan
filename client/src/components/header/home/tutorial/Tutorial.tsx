import { useState } from 'react';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import TutorialCarousel from './TutorialModal';
import './Tutorial.css';

function Tutorial () {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
    <>
        <button 
            className='flex-container'
            style={{color:'white', fontSize: '2rem'}} 
            onClick={handleOpen}
            aria-label="open tutorial"
        >
            Tutorial
        </button>
        <ModalUnstyled
            aria-describedby="unstyled-modal-description"
            open={open}
            onClose={handleClose}
        >
            <div className="modal-background flex-container">
                <TutorialCarousel  handleClick={handleClose}/>
            </div>
        </ModalUnstyled>
    </>
    )
}

export default Tutorial;