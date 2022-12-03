import SnowmanXmasHat from '../../../assets/theme/christmas/snowman-xmas-hat.png';
import MerryChristmasAudio from '../../../assets/theme/christmas/audio/we-wish-you-a-merry-christmas.mp3';
import Player from './audio/Player';
import GiftBox from './giftbox/GiftBox';
import './Christmas.css';

function Christmas() {
    return (
        <>
            <img className="snowmanXmasHat" src={SnowmanXmasHat} alt="Snowman xmas hat" />
            <Player 
                audioSrc={MerryChristmasAudio} 
                ButtonContent={GiftBox}
            />
        </>
    )
}

export default Christmas;