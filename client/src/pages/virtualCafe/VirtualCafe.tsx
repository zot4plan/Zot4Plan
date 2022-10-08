import { useState } from 'react';
import Header from '../../components/header/Header';
import MediaNavbar from './mediaNavbar/MediaNavbar';
import VirtualCafeGrid from './grid/VirtualCafeGrid';
import { backgrounds } from './data/data';
import { playlists } from './data/data';
import './VirtualCafe.css';

interface BackgroundProps {
    id: number;
    description: string; 
    path: string;
}

interface PlayListProps {
    id: string;
    name: string;
    url: string;
}

function VirtualCafe() {
    const [background, setBackground] = useState(backgrounds[3]);
    const [playlist, setPlaylist] = useState(playlists[0].playlist[0]);

    const changeBackground = (item: BackgroundProps) => setBackground(item);
    const changePlaylist = (item: PlayListProps) => setPlaylist(item);

    return (
        <div className="virtual-cafe">
            <Header path="/virtual-cafe"/>
            <VirtualCafeGrid background={background} playlist={playlist.url}/>
            <MediaNavbar setBackground={changeBackground} setPlaylist={changePlaylist}/>
        </div>
    );
}

export default VirtualCafe;