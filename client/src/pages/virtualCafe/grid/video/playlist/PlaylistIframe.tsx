import { useEffect, useRef, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { updateView } from '../../../../../controllers/VirtualCafeController';
import { RootState, store } from '../../../../../store/store';

function PlaylistIframe() {
    const iframeRef = useRef<null | HTMLIFrameElement>(null);
    const opacity = useSelector((state:RootState) => state.virtualCafe.background.url ? 0.0001 : 1);
    const playlist = useSelector((state:RootState) => state.virtualCafe.playlist.embed_url);

    const iframeCallbackRef = useCallback(
        (node: null | HTMLIFrameElement): void => { iframeRef.current = node; },
        [],
    );

    const handleOnClick = () => {
        // cannot get playlist_id directly
        const playlist_id = store.getState().virtualCafe.playlist.playlist_id;
        const views = sessionStorage.getItem('views');
        var list = views ? JSON.parse(views) : [];

        if(!list.includes(playlist_id)) {
            list.push(playlist_id);
            sessionStorage.setItem('views', JSON.stringify(list));
            updateView(playlist_id);
        }
    }

    useEffect(() => {
        const onBlur = () => {
            if (document.activeElement 
                && document.activeElement.nodeName.toLowerCase() === 'iframe' 
                && iframeRef.current 
                && iframeRef.current === document.activeElement) 
            {
                handleOnClick(); // infer a click event
            }
        };

        window.addEventListener('blur', onBlur);

        return () => {
            window.removeEventListener('blur', onBlur);
        };
    }, []);


    return (
        <iframe 
            ref={iframeCallbackRef}
            width="560" 
            height="315"
            style={{opacity: opacity}} 
            src={playlist}
            title="YouTube video player" 
            frameBorder="0" 
            allow="accelerometer; autoplay; encrypted-media; gyroscope" 
        />    
    );
}

export default PlaylistIframe;