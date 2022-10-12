import { useDispatch } from "react-redux";
import { playlists } from "../../data/data";
import { changePlaylist } from "../../../../store/slices/VirtualCafeSlice";
import Xmark from "../../../../components/icon/Xmark";
import MusicNote from "../../../../components/icon/MusicNote";
import ModalButton from "../../../../components/modal/ModalButton";
import SharePlaylistModal from "./childModal/SharePlaylistModal";
import ReportPlaylistModal from "./childModal/ReportPlaylistModal";
import styles from './PlaylistModal.module.css';

function PlaylistModal({ handleClose }: ModalProps) {
    const dispatch = useDispatch();
    return (
        <div className={styles.modal}>
            <div className={styles.modal_header}>
                <h1> Playlists </h1>
                <button className='virtual-cafe-x-button' onClick={handleClose}>
                    <Xmark/>
                </button>
            </div>
            <div className={styles.modal_body}>
                <ul>
                    {playlists.map((category) => (
                        <li key={category.language}> 
                            <h1>{category.language}</h1>
                            <ul className={styles.playlist}>
                                {category.playlist.map((playlist) => (
                                    <li 
                                        key={playlist.playlist_id} 
                                        className={styles.item} 
                                        onClick={()=> {
                                            dispatch(changePlaylist(playlist));
                                            handleClose();
                                        }}
                                    >
                                        <div>
                                            <span className={styles.musicNote}><MusicNote/></span>{playlist.name}
                                        </div>
                                        <img src={"http://img.youtube.com/vi/" + playlist.playlist_id + "/default.jpg"} 
                                            title="YouTube Video"  
                                            alt="YouTube Video"/>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
            <div className={styles.modal_footer}>
                <ModalButton label="Share your playlist" className="virtual-cafe-modal-button" ModalContent={SharePlaylistModal}/>
                <ModalButton label="Report" className="virtual-cafe-modal-button" ModalContent={ReportPlaylistModal}/>
            </div>
        </div>
    )
}

export default PlaylistModal;