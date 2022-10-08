import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import MusicNotes from '../../../../components/icon/MusicNotes';

function Background() {
    const {backgroundUrl, backgroundDescription} = 
        useSelector((state:RootState) => ({
            backgroundUrl: state.virtualCafe.background.url,
            backgroundDescription: state.virtualCafe.background.description
        }));

    return (
        <>
            {backgroundUrl 
            &&  <>
                    <img  
                        src={backgroundUrl} 
                        alt={backgroundDescription}
                    />
                    <p> Click image to play/stop <span> <MusicNotes/> </span> </p>
                </> 
            }
        </>     
    );
}

export default Background;