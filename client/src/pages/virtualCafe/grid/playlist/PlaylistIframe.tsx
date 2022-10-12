import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

function PlaylistIframe() {
    const opacity = useSelector((state:RootState) => state.virtualCafe.background.url ? 0.0001 : 1);
    const playlist = useSelector((state:RootState) => state.virtualCafe.playlist.embed_url);
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

export default PlaylistIframe;