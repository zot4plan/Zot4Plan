import Xmark from "../../../../components/icon/Xmark";
import { playlists } from "../../data/data";
import MusicNote from "../../../../components/icon/MusicNote";
import styles from './PlaylistModal.module.css';
interface PlaylistModalProps {
    handleClose: () => void;
    setPlaylist: (playlist:any) => void;
}

function PlaylistModal({handleClose, setPlaylist}: PlaylistModalProps) {

    return (
        <div className={styles.modal}>
            <div className={styles.modal_header}>
                <h1> Playlists </h1>
                <button className={styles.x_icon} onClick={handleClose}>
                    <Xmark/>
                </button>
            </div>
            <div className={styles.modal_body}>
                <ul>
                    {playlists.map((category) => (
                        <li key={category.genre}> 
                            <h1>{category.genre}</h1>
                            <ul className={styles.playlist}>
                                {category.playlist.map((playlist)=> (
                                    <li 
                                        key={playlist.id} 
                                        className={styles.item} 
                                        onClick={()=> {
                                            setPlaylist(playlist)
                                            handleClose();
                                        }}
                                    >
                                        <div>
                                            <span className={styles.musicNote}><MusicNote/></span>{playlist.name}
                                        </div>
                                        
                                        <img src={"http://img.youtube.com/vi/" + playlist.id +"/default.jpg"} 
                                            title="YouTube Video"  
                                            alt="YouTube Video"/>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default PlaylistModal;