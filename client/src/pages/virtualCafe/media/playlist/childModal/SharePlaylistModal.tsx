import { ChangeEvent, useState } from "react";
import { useDispatch } from "react-redux";
import './Form.css';

function SharePlaylistModal({handleClose}: ModalProps) {
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
    
    const handleSubmit = () => {
        const prefix = [
            'https://www.youtube.com/playlist?list=',
            'https://www.youtube.com/watch?v=',
            'https://youtu.be/'
        ]

        var id = '';
        for(let i = 0; i < prefix.length && !id; i++) {
            if(form.url.startsWith(prefix[i])) {
                id = form.url.substring(prefix[i].length).split('&')[0]; //remove query
            }
        }

        if(id.length > 64 || !id) {
            setForm({url: '', name: '', shareBy: '', status: 'error', message: 'Invalid youtube link'});
        }
        else {
            setForm({url: '', name: '', shareBy: '', status: 'success', message: ''});
        }
    }

    const handleDone = () => { 
        setForm({url: '', name: '', shareBy: '', status: 'idle', message: ''}) 
        handleClose();
    };

    return (
        <>  {form.status !== 'success'
            ? <form className='form' style={{width: '340px', height: '290px'}}
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
                    <button onClick={handleClose} className='virtual-cafe-modal-button' > Cancel </button>
                    <button type='submit' className='virtual-cafe-modal-button'> Share </button>
                </div>
            </form>
            : <div>
                <p> 
                    Thank you for sharing. It's only available for you now. <br/>
                    It will be published within 24 hours after we verify your playlist.
                </p>
                <button onClick={handleDone} className='virtual-cafe-modal-button'> Done </button>
            </div>}
        </>
    )
}

export default SharePlaylistModal;