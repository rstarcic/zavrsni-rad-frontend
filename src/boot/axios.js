import { boot } from 'quasar/wrappers';
import axios from 'axios';

const api = axios.create({
    baseURL: process.env.APP_SERVER_URL,
    withCredentials: true
});
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        } else {
            console.warn('No token found, sending request without Authorization header.');
        }
        return config;
    },
    (error) => {
        console.error('Error in request setup:', error);
        return Promise.reject(error);
    }
);

export default boot(({ app }) => {
    app.provide('$api', api);
    app.config.globalProperties.$api = api;
});
