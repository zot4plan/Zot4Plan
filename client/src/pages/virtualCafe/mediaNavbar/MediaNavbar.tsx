import Clock from './clock/Clock';
import styles from './MediaNavbar.module.css';
import BackgroundButton from './background/BackgroundButton';
import PlaylistButton from './playlist/PlaylistButton';

interface MediaNavbarProps {
    setBackground: (background:any) => void;
    setPlaylist: (playlist:any) => void;
}

const MediaNav = ({setBackground, setPlaylist}: MediaNavbarProps) => {

    return (       
        <ul className={styles.media_nav}>
            <li><Clock/></li>
            <li><BackgroundButton setBackground={setBackground}/></li>
            <li><PlaylistButton setPlaylist={setPlaylist}/></li>
        </ul>     
    )
}

export default MediaNav