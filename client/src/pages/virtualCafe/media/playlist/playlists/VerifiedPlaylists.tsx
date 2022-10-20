import { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { changePlaylist } from "../../../../../store/slices/VirtualCafeSlice";
import { getAllPlaylists } from "../../../../../api/VirtualCafeController";
import MusicNote from "../../../../../components/icon/MusicNote";
import Spinner from "../../../../../components/icon/Spinner";
import './Playlists.css';

interface PlaylistsStateProps {
    isLoading: Boolean;
    list: PlaylistType[] | null;
}

function VerifiedPlaylist({ handleClose }: ModalProps) {
    const [playlists, setPlaylists] = useState<PlaylistsStateProps>({isLoading: true, list: null});
    const counter = useRef(0);

    useEffect(() => {
        const fetchAllPlaylists = async () => {
            getAllPlaylists()
            .then(res => {
                const playlistsData = res.data.map((playlist:PlaylistType) => playlist);
                setPlaylists({isLoading: true, list: playlistsData});
            }) 
            .catch(err => {
                console.log(err);
            });
        };

        if(playlists.list === null) 
            fetchAllPlaylists();  

    },[playlists]);

    const imageLoaded = () => {
        counter.current += 1;
        if (playlists.list && counter.current >= playlists.list.length) {
            setPlaylists(prevState => ({...prevState, isLoading: false}));
        }
    }

    const dispatch = useDispatch();

    return (
        <>
        <div className='flex-container' style={{display: playlists.isLoading ? 'flex' : 'none', height: '400px'}}>
            <Spinner/>
        </div>
        <ul style={{display: playlists.isLoading ? 'none' : 'block'}}>
            {playlists.list && <h1 className='playlist-heading'> Playlists </h1>}
            {playlists.list && playlists.list.map((playlist) => (
                <li key={playlist.playlist_id} 
                    className='playlist-item' 
                    onClick={()=> {
                        dispatch(changePlaylist(playlist));
                        handleClose();
                    }}
                >
                    <div>
                        <MusicNote className="music-note"/>
                        <p>
                            {playlist.name}
                        </p>
                    </div>
                    <img 
                        src={"http://img.youtube.com/vi/" + playlist.thumbnail + "/default.jpg"} 
                        title="YouTube Video"  
                        alt="YouTube Video"
                        onLoad={imageLoaded}
                    />
                </li>
            ))}
        </ul>
        </>
    )
}

export default VerifiedPlaylist;