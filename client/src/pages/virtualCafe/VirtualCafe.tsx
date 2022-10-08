import Header from '../../components/header/Header';
import TimeContainer from './grid/timer/TimeContainer';
import Background from './grid/background/Background';
import Playlist from './grid/playlist/Playlist';
import Boba from "../../assets/snacks/boba.png"
import Cookie from "../../assets/snacks/cookie.png"
import Clock from './mediaNavbar/clock/Clock';
import BackgroundButton from './mediaNavbar/background/BackgroundButton';
import PlaylistButton from './mediaNavbar/playlist/PlaylistButton';
import './VirtualCafe.css';

function VirtualCafe() {
    return (
        <div className="virtual-cafe">
            <Header path="/virtual-cafe"/>
            <div className="virtual-grid-container">
                <TimeContainer/>
                <div className="snack-container">
                    <img className="snack" src={Boba} alt="Cup of Boba Milk Tea Icon"/>
                    <img className="snack" src={Cookie} alt="Cup of Coffee Icon"/>
                </div>
                <div className="video-container">
                    <Background/>
                    <Playlist/>
                </div>
            </div>   
            <ul className="media-nav">
                <li><Clock/></li>
                <li><BackgroundButton/></li>
                <li><PlaylistButton/></li>
            </ul> 
        </div>
    );
}

export default VirtualCafe;