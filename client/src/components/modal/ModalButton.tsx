import { FC, useState } from 'react';
import ModalUnstyled from '@mui/base/ModalUnstyled';

interface ModalButtonProps {
    label: string;
    className?: string;
    ModalContent: FC<ModalProps>;
}

const ModalButton = ({label, className, ModalContent}: ModalButtonProps) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (       
        <>
            <button className={className} onClick={handleOpen}>
                {label}
            </button>
            <ModalUnstyled
                aria-labelledby={label}
                aria-describedby={label}
                open={open}
                onClose={handleClose}
            >
                <div className='modal-background flex-container'>
                    <ModalContent handleClose={handleClose}/>
                </div>
            </ModalUnstyled>
        </>
    )
}

export default ModalButton;