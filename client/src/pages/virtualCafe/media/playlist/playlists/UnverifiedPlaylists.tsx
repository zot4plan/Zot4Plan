import { useDispatch, useSelector } from "react-redux";
import { changePlaylist } from "../../../../../store/slices/VirtualCafeSlice";
import MusicNote from "../../../../../components/icon/MusicNote";
import { RootState } from "../../../../../store/store";

function UnverifiedPlaylist({ handleClose }: ModalProps) {
    const dispatch = useDispatch();
    const playlists = useSelector((state: RootState) => state.virtualCafe.sharePlaylists);


    return (
        <ul>
            {playlists.length > 0 && <h1>Your Recently Added Playlists</h1>}
            {playlists.map((playlist) => (
                <li 
                    key={playlist.playlist_id} 
                    className='item' 
                    onClick={()=> {
                        dispatch(changePlaylist(playlist));
                        handleClose();
                    }}
                >
                    <div>
                        <span className='music-note'><MusicNote/></span> 
                        <p>
                            {playlist.name} <br/>
                            <span>unverified</span>
                        </p>
                    </div>
                    <img src={"http://img.youtube.com/vi/" + playlist.thumbnail + "/default.jpg"} 
                        title="YouTube Video"  
                        alt="YouTube Video"/>
                </li>
            ))}
        </ul>
    )
}

export default UnverifiedPlaylist;