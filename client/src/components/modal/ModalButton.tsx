import { FC, useState } from 'react';
import ModalUnstyled from '@mui/base/ModalUnstyled';

interface ModalButtonProps {
    Label: string | FC<IconProps>;
    className?: string;
    ModalContent: FC<ModalProps>;
}

const ModalButton = ({Label, className, ModalContent}: ModalButtonProps) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (       
        <>
            <button className={className} onClick={handleOpen}>
               {typeof(Label) === 'string' ? Label : <Label/>}
            </button>
            <ModalUnstyled
                aria-labelledby={typeof(Label) === 'string' ? Label : 'modal'}
                aria-describedby={typeof(Label) === 'string' ? Label : 'modal'}
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