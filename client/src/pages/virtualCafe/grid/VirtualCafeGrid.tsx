import Time from './timer/Time';
import Boba from "../assets/images/snacks/boba.png"
import Cookie from "../assets/images/snacks/cookie.png"
import styles from './VirtualCafeGrid.module.css';
import MusicNotes from '../../../components/icon/MusicNotes';

interface VirtualCafeGridProps {
    background: {
        id: number,
        path: string | null,
        description: string
    },
    playlist: string;
}

function VirtualCafeGrid({background, playlist}:VirtualCafeGridProps) {

    return (
        <div className={styles.grid_container}>
            <Time/>
            <div className={styles.snack_container}>
                <img className={styles.snack} src={Boba} alt="Cup of Boba Milk Tea Icon"/>
                <img className={styles.snack} src={Cookie} alt="Cup of Coffee Icon"/>
            </div>
            <div className={styles.videoContainer}>
                {background.path &&
                <>
                    <img  
                        src={background.path} 
                        alt={background.description}
                    />
                    <p className={styles.p}> Click image to play/stop <span> <MusicNotes/> </span> </p>
                </>}
                <iframe 
                    width="560" 
                    height="315"
                    style={{opacity: background.path? 0.0001 : 1}} 
                    src={playlist}
                    title="YouTube video player" 
                    frameBorder="0" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" 
                />
            </div>
        </div>   
    );
}

export default VirtualCafeGrid;