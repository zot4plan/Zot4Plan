import { useState, useEffect } from "react";

const useAudio = (url:string) => {
    const [audio] = useState(new Audio(url));
    const [playing, setPlaying] = useState(false);
  
    const toggle = () => setPlaying(!playing);
  
    useEffect(() => {
        if(playing) {
            audio.volume = 0.1;
            audio.currentTime = 0;
            audio.play();
        } 
        else {
            audio.pause();
        }
    },[playing, audio]);
  
    useEffect(() => {
        audio.addEventListener('ended', () => {
            setPlaying(false);
        });

        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, [audio]);
  
    return [playing, toggle] as const;
}

export default useAudio;