import { FC, MouseEvent, useEffect, useState } from 'react'
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
    const [initPlay, setInitPlay] = useState(true);

    useEffect(() => {
        if(initPlay) {
            setTimeout(() => {
                setInitPlay(false);
            }, 12000)
        }
    },[initPlay])

    const handleOnClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        toggle();
    }
    return (
        <button onClick={handleOnClick} className={className} style={{marginLeft:'2rem'}}>
            <ButtonContent isOpen={playing}/>
            {playing && 
            <>
                <SnowFalls key={1} size={50}/>
                <SnowFalls key={2} size={75}/>
            </>}
            {initPlay &&
            <>
                <SnowFalls key={1} size={25}/>
                <SnowFalls key={2} size={50}/>
            </>
            }
        </button>
    )
}

export default Player;