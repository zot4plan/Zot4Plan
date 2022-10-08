import { useState} from 'react';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import BackgroundModal from './BackgroundModal';

interface BackgroundButtonProps {
    setBackground: (background:any) => void;
}

const BackgroundButton = ({setBackground}: BackgroundButtonProps) => {
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
                    <BackgroundModal 
                        handleClose={handleClose}
                        setBackground={setBackground}
                    />
                </div>
            </ModalUnstyled>
        </>
    )
}

export default BackgroundButton;