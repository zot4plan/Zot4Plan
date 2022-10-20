import Xmark from "../../../../components/icon/Xmark";
import ModalButton from "../../../../components/modal/ModalButton";
import SharePlaylistModal from "./childModal/SharePlaylistModal";
import ReportPlaylistModal from "./childModal/ReportPlaylistModal";
import UnverifiedPlaylist from "./playlists/UnverifiedPlaylists";
import VerifiedPlaylist from "./playlists/VerifiedPlaylists";
import styles from './PlaylistModal.module.css';

function PlaylistModal({ handleClose }: ModalProps) {
    return (
        <div className={styles.modal}>
            <div className={styles.modal_header}>
                <button className='virtual-cafe-x-button' onClick={handleClose}>
                    <Xmark/>
                </button>
            </div>
            <div className={styles.modal_body}> 
                <UnverifiedPlaylist handleClose={handleClose}/>         
                <VerifiedPlaylist handleClose={handleClose}/>
            </div>
            <div className={styles.modal_footer}>
                <ModalButton label="Share your playlist" className="virtual-cafe-modal-button" ModalContent={SharePlaylistModal}/>
                <ModalButton label="Report" className="virtual-cafe-modal-button" ModalContent={ReportPlaylistModal}/>
            </div>
        </div>
    )
}

export default PlaylistModal;