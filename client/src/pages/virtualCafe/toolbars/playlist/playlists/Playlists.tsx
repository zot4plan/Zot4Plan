import { useDispatch } from "react-redux";
import { changePlaylist } from "../../../../../store/slices/VirtualCafeSlice";
import { updateView } from "../../../../../api/VirtualCafeController";
import MusicNote from "../../../../../components/icon/MusicNote";
import './Playlists.css';

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
                        updateView(playlist.playlist_id);
                        handleClose();
                    }}
                >
                    <div>
                        <span className='music-note'><MusicNote/></span> 
                        <p> {playlist.name} </p>
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