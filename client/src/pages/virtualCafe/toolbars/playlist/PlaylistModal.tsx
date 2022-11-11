import Xmark from "../../../../components/icon/Xmark";
import ModalButton from "../../../../components/modal/ModalButton";
import SharePlaylistForm from "./forms/SharePlaylistForm";
import ReportPlaylistForm from "./forms/ReportPlaylistForm";
import UnverifiedPlaylist from "./playlists/UnverifiedPlaylists";
import VerifiedPlaylist from "./playlists/VerifiedPlaylists";

function PlaylistModal({ handleClose }: ModalProps) {
    return (
        <div className='virtual-cafe-modal'>
            <div className='virtual-cafe-modal-header'>
                <button className='virtual-cafe-x-button' onClick={handleClose}>
                    <Xmark/>
                </button>
            </div>
            <div className='virtual-cafe-modal-body'> 
                <UnverifiedPlaylist handleClose={handleClose}/>         
                <VerifiedPlaylist handleClose={handleClose}/>
            </div>
            <div className='virtual-cafe-modal-footer'>
                <ModalButton label="Share your playlist" className="virtual-cafe-modal-button" ModalContent={SharePlaylistForm}/>
                <ModalButton label="Report" className="virtual-cafe-modal-button" ModalContent={ReportPlaylistForm}/>
            </div>
        </div>
    )
}

export default PlaylistModal;