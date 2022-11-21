import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from './Axios';

export const getPlaylists = createAsyncThunk("features/getPlaylists", 
    async () => {
        const response = await Axios.get('/api/getAllPlaylists');
        return response.data;
    }
);

export const addPlaylist = createAsyncThunk("features/addPlaylists", 
    async (request: AddPlaylistPayload, { rejectWithValue }) => {
        try {
            const response = await Axios.post('/api/addPlaylist', {
                id: request.playlist.playlist_id, 
                name: request.playlist.name, 
                prefix: request.playlist.prefix, 
                sharedBy: request.playlist.sharedBy
            });
            request.setStatus({url: '', name: '', sharedBy: '', status: 'succeeded', message: ''});
            return response.data;
        }
        catch (err) {
            request.setStatus(prevState => ({...prevState, status: 'failed', 
                message: 'Has already existed or something is wrong'}));
            return rejectWithValue(err);
        }
    }
);

export const addReport = async (playlistId: string, reason: string) => (
    Axios.post('/api/addReport', {playlistId: playlistId, reason: reason})
    .then(() => {
        return 'succeeded';
    })
    .catch(() => {
        return 'failed';
    })
)

export const updateView = async (playlistId: string) => 
    Axios.put('/api/updateView/' + playlistId).catch(err => console.log(err));

export const updateLike = async (playlistId: string) => 
    Axios.put('/api/updateLike', {playlistId: playlistId}).catch(err => console.log(err));

export const updateVirtualCafeVisit = createAsyncThunk("features/updateVirtualCafeVisit", 
    async () =>  { 
        var response = await Axios.put('/api/updateVirtualCafeVisit');
        return response.data;
    }
);