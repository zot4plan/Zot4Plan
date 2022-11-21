import { useSelector } from "react-redux";
import { RootState } from "../../../../../store/store";
import Playlists from "./Playlists";

function UnverifiedPlaylist({ handleClose }: ModalProps) {
    const playlists = useSelector((state: RootState) => state.virtualCafe.sharePlaylists);

    return (
        <ul>
            <Playlists handleClose={handleClose} heading='Recently Added' playlists={playlists}/>
        </ul>
    )
}

export default UnverifiedPlaylist;