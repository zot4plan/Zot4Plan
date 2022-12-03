import { FC, MouseEvent } from 'react'
import SnowFalls from '../snowfall/SnowFall';
import useAudio from "./hooks/useAudio";

interface IAudioProps {
    audioSrc: string;
    ButtonContent: FC<{isOpen:boolean}>;
    className?: string;
    controls?: boolean;
}

function Player({audioSrc, ButtonContent, className, controls = false}:IAudioProps) {
    const [playing, toggle] = useAudio(audioSrc);
    const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        toggle();
    }
    return (
        <button onClick={handleOnClick} className={className} style={{marginLeft:'2rem'}}>
            <ButtonContent isOpen={playing}/>
            {playing && 
            <>
                <SnowFalls key={1} size={100}/>
                <SnowFalls key={2} size={100}/>
                <SnowFalls key={3} size={50}/>
            </>}
        </button>
    )
}

export default Player;