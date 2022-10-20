import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from './Axios';

export const getAllPlaylists = async () => await Axios.get('/api/getAllPlaylists');

export const updateView = async () => 
    Axios.post('/api/updateView').catch(err => console.log(err));

export const addPlaylist = createAsyncThunk(
    "features/addPlaylists", 
    async (playlist: AddPlaylistPayload) => {
        const response = await Axios.post('/api/addPlaylist', {
            id: playlist.playlist_id, 
            name: playlist.name, 
            prefix: playlist.prefix, 
            shareBy: playlist.shareBy
        });
        return {
            playlist: response.data
        }
    }
);

export const addReport = async (id: string, name:string, url: string, shareBy = '') => (
    Axios
    .post('/api/addReport', {id: id, name: name, url: url, shareBy: shareBy})
    .then((response) => {
        return response;
    })
    .catch(error => {
        return error;
    })
)

export const updateVirtualCafeVisit = createAsyncThunk(
    "features/updateVirtualCafeVisit", 
    async () =>  await Axios.put('/api/updateVirtualCafeVisit')
);