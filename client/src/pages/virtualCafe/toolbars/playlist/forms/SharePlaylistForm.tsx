import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import { addPlaylist } from "../../../../../api/VirtualCafeController";
import Xmark from "../../../../../components/icon/Xmark";
import Message from "../../../../../components/message/Message";
import ModalResponse from "../../../../../components/modal/ModalResponse";
import './Form.css';

const prefixes = [
    'https://www.youtube.com/playlist?list=',
    'https://www.youtube.com/watch?v=',
    'https://youtu.be/'
];

function SharePlaylistForm({handleClose}: ModalProps) {
    const [form, setForm] = useState({
        url: '', 
        name: '',
        shareBy: '',
        status: 'idle', 
        message: ''
    });
    const dispatch = useDispatch();

    const handleChangeUrl = (event: ChangeEvent<HTMLInputElement>) => 
        setForm(prevState => ({...prevState, url: event.target.value.replace(/[<>,]/gi, '')}));
    
    const handleChangeName = (event: ChangeEvent<HTMLInputElement>) => 
        setForm(prevState => ({...prevState, name: event.target.value.replace(/[<>,]/gi, '')}));
    
    const handleChangeShareBy = (event: ChangeEvent<HTMLInputElement>) => 
        setForm(prevState => ({...prevState, shareBy: event.target.value.replace(/[<>,]/gi, '')}));
    
    const handleSubmit = (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        var id = '';
        var prefix = '';
        
        for(let i = 0; i < prefixes.length && !id; i++) {
            if(form.url.startsWith(prefixes[i])) {
                id = form.url.substring(prefixes[i].length).split('&')[0]; //remove query
                prefix = prefixes[i];
            }
        }

        if(id.length > 64 || !id) {
            setForm(prevState => ({...prevState, status: 'error', message: 'Invalid youtube link'}));
        }
        else {
            dispatch(addPlaylist({
                playlist: {
                    playlist_id: id, 
                    name: form.name, 
                    prefix: prefix, 
                    shareBy: form.shareBy
                },
                setStatus: setForm
            }));
        }
    }

    return (
        <>  
            {form.status !== 'succeeded'
            ? <form className='form' style={{width: '340px', height: '340px'}} onSubmit={handleSubmit}>
                <label>
                    <span> Playlist Name: </span>
                    <input type="text" maxLength={128} minLength={2} value={form.name} onChange={handleChangeName} placeholder="playlist" required/>
                </label>
                <label>
                    <span>Share Link (youtube):</span>
                    <input type="url" maxLength={256} value={form.url} onChange={handleChangeUrl} placeholder="https://www.youtube.com/" required/>
                </label>
                <label>
                    <span>Share By:</span>
                    <input type="text" maxLength={64} minLength={1} value={form.shareBy} onChange={handleChangeShareBy} placeholder="your nickname"/>
                </label>
                <div>{form.status === 'failed' && <Message status={form.status} content={form.message}/>}</div>
                <div className='form-button-wrapper'>
                    <button type='button' onClick={handleClose} className='virtual-cafe-modal-button'> Cancel </button>
                    <button type='submit' className='virtual-cafe-modal-button'> Share </button>
                </div>
                <button type='button' className='virtual-cafe-x-button' onClick={handleClose}> <Xmark/></button>
            </form>
            : <ModalResponse 
                heading="Thank you for sharing."
                body={<>Now only you can see the playlist. <br/>
                    Your playlist will be public within 24 hours after we verify it.</>} 
                buttonText="continue" 
                handleClose={handleClose}/>}
        </>
    )
}

export default SharePlaylistForm;