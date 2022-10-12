import { playlists } from '../../../data/data';
import { ChangeEvent, useState } from "react";
import ArrowDown from '../../../../../components/icon/ArrowDown';
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
        <form className='form' style={{width: '340px', height: '220px'}}>
            <label>
                <span>Playlist:</span>
                <div className='selectWrapper'>
                    <select value={form.playlist} onChange={handleChangeSelect}>
                        <option hidden disabled selected value=''> Select an option </option>
                        {playlists.map(category => 
                            <optgroup label={category.language}>
                                {category.playlist.map((playlist) => 
                                    <option value={playlist.playlist_id}>
                                        {playlist.name}
                                    </option>
                                )}
                            </optgroup>
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
                <button onClick={handleClose} className='virtual-cafe-modal-button' > Cancel </button>
                <button type='submit' className='virtual-cafe-modal-button'> Share </button>
            </div>
        </form>
    )
}

export default ReportPlaylistModal;