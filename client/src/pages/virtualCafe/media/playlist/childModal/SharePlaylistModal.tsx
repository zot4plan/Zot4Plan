import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { addPlaylist } from "../../../../../api/VirtualCafeController";
import Xmark from "../../../../../components/icon/Xmark";
import './Form.css';

const prefixes = [
    'https://www.youtube.com/playlist?list=',
    'https://www.youtube.com/watch?v=',
    'https://youtu.be/'
];

function SharePlaylistModal({handleClose}: ModalProps) {
    const [form, setForm] = useState({
        url: '', 
        name: '',
        shareBy: '',
        status: 'success', 
        message: ''
    });
    const dispatch = useDispatch();

    const handleChangeUrl = (event: ChangeEvent<HTMLInputElement>) => 
        setForm(prevState => ({...prevState, url: event.target.value.replace(/[<>,]/gi, '')}));
    
    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => 
        setForm(prevState => ({...prevState, name: event.target.value.replace(/[<>,]/gi, '')}));
    
    const handleChangeShareBy = (event: ChangeEvent<HTMLInputElement>) => 
        setForm(prevState => ({...prevState, shareBy: event.target.value.replace(/[<>,]/gi, '')}));
    
    const handleSubmit = () => {
        var id = '';
        var prefix = '';
        
        for(let i = 0; i < prefixes.length && !id; i++) {
            if(form.url.startsWith(prefixes[i])) {
                id = form.url.substring(prefixes[i].length).split('&')[0]; //remove query
                prefix = prefixes[i];
            }
        }

        if(id.length > 64 || !id) {
            setForm({url: '', name: '', shareBy: '', status: 'error', message: 'Invalid youtube link'});
        }
        else {
            dispatch(addPlaylist({playlist_id: id, name: form.name, prefix: prefix, shareBy: form.shareBy}));
            setForm({url: '', name: '', shareBy: '', status: 'success', message: ''});
        }
    }

    const handleDone = () => { 
        setForm({url: '', name: '', shareBy: '', status: 'idle', message: ''}) 
        handleClose();
    };

    return (
        <>  
            {form.status !== 'success'
            ? <form className='form' style={{width: '340px', height: '340px'}}
                onSubmit={handleSubmit}
            >
                <label>
                    <span> Playlist Name: </span>
                    <input type="text" maxLength={128} value={form.name} onChange={handleChangeName} placeholder="playlist" required/>
                </label>
                <label>
                    <span>Share Link (youtube):</span>
                    <input type="text" maxLength={256} value={form.url} onChange={handleChangeUrl} placeholder="https://www.youtube.com/" required/>
                </label>
                <label>
                    <span>Share By:</span>
                    <input type="text" maxLength={64} value={form.shareBy} onChange={handleChangeShareBy} placeholder="your nickname"/>
                </label>
                <div>
                    <button type='button' onClick={handleClose} className='virtual-cafe-modal-button' > Cancel </button>
                    <button type='submit' className='virtual-cafe-modal-button'> Share </button>
                </div>
                <button type='button' className='virtual-cafe-x-button' onClick={handleClose}> <Xmark/></button>
            </form>
            : <div className="success-message-wrapper">
                <div className="checkmark_wrapper"> 
                    <svg className="checkmark" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 52 52"> 
                        <circle className="checkmark__circle" cx="26" cy="26" r="25" fill="none"/> 
                        <path className="checkmark__check" fill="none" d="M14.1 27.2l7.1 7.2 16.7-16.8"/>
                    </svg>
                    <p>Thank you for sharing.</p>
                </div>
                <p> 
                    Now only you can see the playlist. <br/>
                    Your playlist will be public within 24 hours after we verify it.
                </p>
                <button onClick={handleDone} className='virtual-cafe-modal-button'> Continue </button>
                <button className='virtual-cafe-x-button' onClick={handleClose}> <Xmark/></button>
            </div>}
        </>
    )
}

export default SharePlaylistModal;