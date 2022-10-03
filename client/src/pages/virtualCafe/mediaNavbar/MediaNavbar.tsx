import { useState} from 'react';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import Song from '../assets/audio/Intellect.mp3';
import Clock from './clock/Clock';
import BackgroundModal from './background/BackgroundModal';
import styles from './MediaNavbar.module.css';

interface MediaNavbarProps {
    setBackground: (background:any) => void;
}

const MediaNav = ({setBackground}: MediaNavbarProps) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (       
        <ul className={styles.media_nav}>
            <li> 
                <Clock/>
            </li>
            <li>  
                <audio controls loop>
                    <source src={Song} type='audio/mpeg'/>
                </audio>
            </li>
            <li>
                <button className='virtual-cafe-button' onClick={handleOpen}>
                    Background
                </button>
                <ModalUnstyled
                    aria-labelledby="list of backgrounds"
                    aria-describedby="select background"
                    open={open}
                    onClose={handleClose}
                >
                    <div className='modal-background'>
                        <BackgroundModal 
                            handleClose={handleClose}
                            setBackground={setBackground}
                        />
                    </div>
                </ModalUnstyled>
            </li>
        </ul>     
    )
}

export default MediaNav