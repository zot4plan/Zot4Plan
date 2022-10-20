import { playlists } from '../../../data/data';
import { ChangeEvent, useState } from "react";
import ArrowDown from '../../../../../components/icon/ArrowDown';
import Xmark from '../../../../../components/icon/Xmark';
import './Form.css';

function ReportPlaylistModal({handleClose}: ModalProps) {
    const [form, setForm] = useState({
        playlist: '', 
        reason: '',
        status: 'idle'
    });

    const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => 
        setForm(prevState => ({...prevState, playlist: event.target.value}));
    
    const handleChangeReason = (event: ChangeEvent<HTMLInputElement>) => 
        setForm(prevState => ({...prevState, reason: event.target.value}));

    return (
        <form className='form' style={{width: '340px', height: '265px'}}>
            <label>
                <span>Playlist:</span>
                <div className='selectWrapper'>
                    <select value={form.playlist} onChange={handleChangeSelect}>
                        <option key='dumbOption' value='' hidden disabled > Select an option </option>
                        {playlists.map((playlist) => 
                            <option key={playlist.playlist_id} value={playlist.playlist_id}>
                                {playlist.name}
                            </option>
                        )}
                    </select>
                    <div className='arrowDown'> <ArrowDown/> </div>
                </div>
            </label>
            <label>
                <span>Reason:</span>
                <input type="text" maxLength={256} value={form.reason} onChange={handleChangeReason} placeholder="Racism, discrimination, or insults"/>
            </label>
            <div>
                <button type='button' onClick={handleClose} className='virtual-cafe-modal-button' > Cancel </button>
                <button type='submit' className='virtual-cafe-modal-button'> Share </button>
            </div>
            <button type='button' className='virtual-cafe-x-button' onClick={handleClose}> <Xmark/></button>
        </form>
    )
}

export default ReportPlaylistModal;