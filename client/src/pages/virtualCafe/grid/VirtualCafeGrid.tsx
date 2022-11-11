import TimeContainer from './timer/TimeContainer';
import Background from './background/Background';
import PlaylistIframe from './playlist/PlaylistIframe';
import Boba from "../../../assets/snacks/boba.png"
import Cookie from "../../../assets/snacks/cookie.png"
import './VirtualCafeGrid.css';

function VirtualCafeGrid() {
    return (
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
    );
}

export default VirtualCafeGrid;