import { useState} from 'react';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import PlaylistModal from './PlaylistModal';

interface PlaylistButtonProps {
    setPlaylist: (Playlist:any) => void;
}

const PlaylistButton = ({setPlaylist}: PlaylistButtonProps) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (       
        <>
            <button className='virtual-cafe-button' onClick={handleOpen}>
                Playlist
            </button>
            <ModalUnstyled
                aria-labelledby="Playlists"
                aria-describedby="select a Playlist"
                open={open}
                onClose={handleClose}
            >
                <div className='modal-background flex-container'>
                    <PlaylistModal 
                        handleClose={handleClose}
                        setPlaylist={setPlaylist}
                    />
                </div>
            </ModalUnstyled>
        </>
    )
}

export default PlaylistButton;