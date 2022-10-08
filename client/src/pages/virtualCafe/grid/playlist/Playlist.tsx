import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

function Playlist() {
    const opacity = useSelector((state:RootState) => state.virtualCafe.background.url ? 0.0001 : 1);
    const playlist = useSelector((state:RootState) => state.virtualCafe.playlist.url);
    return (
        <iframe 
            width="560" 
            height="315"
            style={{opacity: opacity}} 
            src={playlist}
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope" 
        />       
    );
}

export default Playlist;