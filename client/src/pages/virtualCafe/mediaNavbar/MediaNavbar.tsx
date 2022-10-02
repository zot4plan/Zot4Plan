import Song from '../assets/audio/Intellect.mp3';
import Clock from './Clock'

interface MediaNavbarProps {
    openSelect: () => void;
}
const MediaNav = ({ openSelect } : MediaNavbarProps) => {
    return (       
        <ul className='nav-container media-nav'>
            <li className='nav-item' > 
                <Clock/>
            </li>
            <li className='nav-item' >  
                <audio controls loop>
                    <source src={Song} type='audio/mpeg'/>
                </audio>
            </li>
            <li className='nav-item'>
                <button className="button" onClick={openSelect}>
                    Background
                </button>
            </li>
        </ul>     
    )
}

export default MediaNav