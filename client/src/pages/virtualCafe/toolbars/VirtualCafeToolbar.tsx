import Clock from './clock/Clock';
import ModalButton from '../../../components/modal/ModalButton';
import BackgroundModal from './background/BackgroundModal';
import PlaylistModal from './playlist/PlaylistModal';
import './VirtualCafeToolbar.css';

function VirtualCafeToolbar() {
    return (
        <ul className="virtual-cafe-toolbar">
            <li><Clock/></li>
            <li><ModalButton Label="Background" className='virtual-cafe-button' ModalContent={BackgroundModal}/></li>
            <li><ModalButton Label="Playlist" className='virtual-cafe-button' ModalContent={PlaylistModal}/></li>
        </ul> 
    );
}

export default VirtualCafeToolbar;