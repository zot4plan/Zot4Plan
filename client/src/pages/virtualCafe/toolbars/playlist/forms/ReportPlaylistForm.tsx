import { ChangeEvent, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addReport, getPlaylists } from "../../../../../api/VirtualCafeController";
import Xmark from '../../../../../components/icon/Xmark';
import Message from "../../../../../components/message/Message";
import ModalResponse from '../../../../../components/modal/ModalResponse';
import { RootState } from "../../../../../store/store";
import './Form.css';

function ReportPlaylistForm({handleClose}: ModalProps) {
    const status = useSelector((state: RootState) => state.virtualCafe.getPlaylistsStatus);
    const playlists = useSelector((state: RootState) => state.virtualCafe.allPlaylists);
    const [form, setForm] = useState({playlistId: '', reason: '', status: 'idle', message: ''});
    const dispatch = useDispatch();

    useEffect(() => {
        if(status === 'idle') 
            dispatch(getPlaylists());
    },[status, dispatch]);

    const handleChangeSelect = (event: ChangeEvent<HTMLSelectElement>) => 
        setForm(prevState => ({...prevState, playlistId: event.target.value}));
    
    const handleChangeReason = (event: ChangeEvent<HTMLInputElement>) => 
        setForm(prevState => ({...prevState, reason: event.target.value}));

    const handleSubmit = async (event: ChangeEvent<HTMLFormElement>) => {
        event.preventDefault();
        
        if(form.playlistId && form.reason && form.reason.length > 256) {
            setForm(prevState => ({...prevState, status: 'failed', message: 'Invalid Input'}));
        }
        else {
            const response = await addReport(form.playlistId, form.reason);
            setForm({
                playlistId: '',
                reason: '', 
                status: response, 
                message: response === 'failed' ? 'Something is wrong' : ''
            });
        }
    }

    return (
        <>
            {form.status !== 'succeeded'
                ? <form className='form' style={{width: '340px', height: '265px'}} onSubmit={handleSubmit}>
                    <label>
                        <span>Playlist:</span>
                        <div className='selectWrapper'>
                            <select value={form.playlistId} onChange={handleChangeSelect}>
                                <option key='dumbOption' value='' > Select an option </option>
                                {playlists.map((playlist) => 
                                    <option key={playlist.playlist_id} value={playlist.playlist_id}>
                                        {playlist.name}
                                    </option>
                                )}
                            </select>
                        </div>
                    </label>
                    <label>
                        <span>Reason:</span>
                        <input type="text" maxLength={256} value={form.reason} onChange={handleChangeReason} placeholder="Racism, discrimination, or insults"/>
                    </label>
                    <div>{form.status === 'failed' && <Message status={form.status} content={form.message}/>}</div>
                    <div className='form-button-wrapper'>
                        <button type='button' onClick={handleClose} className='virtual-cafe-modal-button' > Cancel </button>
                        <button type='submit' className='virtual-cafe-modal-button'> Report </button>
                    </div>
                    <button type='button' className='virtual-cafe-x-button' onClick={handleClose}> <Xmark/></button>
                </form>
                : <ModalResponse 
                    heading='Thank You' 
                    body='We have received your report. We will review it shortly!' 
                    buttonText='Done' 
                    handleClose={handleClose}/>}
        </>
    )
}

export default ReportPlaylistForm;