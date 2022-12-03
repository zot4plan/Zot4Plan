import { useSelector } from 'react-redux';
import { RootState } from '../../../../../store/store';
import MusicNotes from '../../../../../components/icon/MusicNotes';

function Background() {
    const {backgroundUrl, backgroundDescription} = useSelector((state:RootState) => ({
            backgroundUrl: state.virtualCafe.background.url,
            backgroundDescription: state.virtualCafe.background.description
        }));

    const playlistName = useSelector((state:RootState) => 
        state.virtualCafe.playlist 
        ? state.virtualCafe.playlist.name
        : ''
    );

    return (
        <>
        {backgroundUrl 
        &&  <>
                <img src={backgroundUrl} alt={backgroundDescription}/>
                <p> Click image to play/stop <MusicNotes/> <span> ({playlistName}) </span> </p>
            </> 
        }
        </>     
    );
}

export default Background;