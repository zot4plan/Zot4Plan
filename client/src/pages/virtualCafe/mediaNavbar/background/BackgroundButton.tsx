import { useState} from 'react';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import BackgroundModal from './BackgroundModal';

const BackgroundButton = () => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (       
        <>
            <button className='virtual-cafe-button' onClick={handleOpen}>
                Background
            </button>
            <ModalUnstyled
                aria-labelledby="list of backgrounds"
                aria-describedby="select background"
                open={open}
                onClose={handleClose}
            >
                <div className='modal-background flex-container'>
                    <BackgroundModal handleClose={handleClose}/>
                </div>
            </ModalUnstyled>
        </>
    )
}

export default BackgroundButton;