import Header from '../../components/header/Header';
import TimeContainer from './grid/timer/TimeContainer';
import Background from './grid/background/Background';
import PlaylistIframe from './grid/playlist/PlaylistIframe';
import Boba from "../../assets/snacks/boba.png"
import Cookie from "../../assets/snacks/cookie.png"
import Clock from './media/clock/Clock';
import ModalButton from '../../components/modal/ModalButton';
import BackgroundModal from './media/background/BackgroundModal';
import PlaylistModal from './media/playlist/PlaylistModal';
import VirtualCafeNavList from './navlist/VirtualCafeNavList';
import './VirtualCafe.css';

function VirtualCafe() {
    return (
        <div className="virtual-cafe">
            <Header path='/virtual-cafe' heartColor='#FFF' NavList={VirtualCafeNavList}/>
            <div className="virtual-grid-container">
                <TimeContainer/>
                <div className="snack-container">
                    <img className="snack" src={Boba} alt="Cup of Boba Milk Tea Icon"/>
                    <img className="snack" src={Cookie} alt="Cup of Coffee Icon"/>
                </div>
                <div className="video-container">
                    <Background/>
                    <PlaylistIframe/>
                </div>
            </div>   
            <ul className="media-nav">
                <li><Clock/></li>
                <li><ModalButton label="Background" className='virtual-cafe-button' ModalContent={BackgroundModal}/></li>
                <li><ModalButton label="Playlist" className='virtual-cafe-button' ModalContent={PlaylistModal}/></li>
            </ul> 
        </div>
    );
}

export default VirtualCafe;