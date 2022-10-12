import { createAsyncThunk } from "@reduxjs/toolkit";
import Axios from './Axios';

export const getAllPlaylists = createAsyncThunk("features/getAllPlaylists", async () => {
    Axios
    .get('/api/getAllPlaylists')
    .then(response => {
        return {
            course: response.data as CourseType,
        };
    })
});

export const addPlaylist = createAsyncThunk("features/addPlaylists", async () => {
    Axios
    .post('/api/addPlaylist')
    .then(response => {
        return {
            course: response.data as CourseType,
        };
    })
});

export const addReport = async () => {
    Axios
    .post('/api/addReport')
    .then(response => {
        return {
            course: response.data as CourseType,
        };
    })
    .catch(error => {
        return {
            message: error
        }
    })
}
