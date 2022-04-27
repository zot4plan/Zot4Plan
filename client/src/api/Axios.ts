import axios from "axios";

const instance = axios.create({
    baseURL: 'http://localhost:3000'
});

//instance.defaults.headers.common['Authorization'] = 'AUTHTOKEN';

export default instance;