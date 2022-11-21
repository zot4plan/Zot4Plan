import { useEffect, useState, useRef } from "react";
import { getPlaylists } from "../../../../../controllers/VirtualCafeController";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../../../../../components/icon/Spinner";
import Playlists from "./Playlists";
import { RootState } from "../../../../../store/store";

function VerifiedPlaylist({ handleClose }: ModalProps) {
    const status = useSelector((state: RootState) => state.virtualCafe.getPlaylistsStatus);
    const playlists = useSelector((state: RootState) => state.virtualCafe.allPlaylists);
    const [isLoading, setIsLoading] = useState(true);
    const counter = useRef(0);
    const dispatch = useDispatch();

    useEffect(() => {
        if(status === 'idle') 
            dispatch(getPlaylists());
    },[status, dispatch]);

    const imageLoaded = () => {
        counter.current += 1;
        if (playlists && counter.current >= playlists.length) 
            setIsLoading(false);
    }

    return (
        <>
            <div className='flex-container' style={{display: isLoading ? 'flex' : 'none', height: '400px'}}>
                <Spinner/>
            </div>
            <ul style={{display: isLoading ? 'none' : 'block'}}>
                {   playlists 
                    && <Playlists 
                        handleClose={handleClose} 
                        heading='All Playlists'
                        playlists={playlists} 
                        onImageLoad={imageLoaded}
                    />
                }
            </ul>
        </>
    )
}

export default VerifiedPlaylist;