import { useDispatch } from "react-redux";
import { changePlaylist } from "../../../../../store/slices/VirtualCafeSlice";
import MusicNote from "../../../../../components/icon/MusicNote";
import './Playlists.css';
import View from "../../../../../components/icon/View";

interface PlaylistsProps {
    handleClose: () => void;
    onImageLoad?: () => void;
    heading: string;
    playlists: PlaylistType[];
}

function Playlists({ handleClose, onImageLoad, heading, playlists}: PlaylistsProps) {
    const dispatch = useDispatch();
    return (
        <>
            {playlists.length > 0 && <h1 className='playlist-heading'>{heading}</h1>}
            {playlists.map((playlist) => (
                <li key={playlist.playlist_id} 
                    className='playlist-item' 
                    onClick={()=> {
                        dispatch(changePlaylist(playlist));
                        handleClose();
                    }}
                >
                    <div className='playlist-description'>
                        <div><MusicNote fontSize="2rem"/></div> 
                        <div> 
                            <p style={{fontSize:'1.6rem'}}> {playlist.name} </p>
                            <p style={{fontSize:'1.4rem', color:'var(--vc-spec-text-second)'}}>Shared by: {playlist.shared_by}</p>
                            <p style={{fontSize:'1.4rem', color:'var(--vc-spec-text-second)'}}> {playlist.view} <span style={{marginLeft: '0.3rem'}}><View fontSize='1.6rem'/></span> </p> 
                        </div>
                    </div>
                    <img src={"http://img.youtube.com/vi/" + playlist.thumbnail + "/default.jpg"} 
                        title="YouTube Video"  
                        alt="YouTube Video"
                        onLoad={onImageLoad}/>
                </li>
            ))}
        </>
    )
}

export default Playlists;