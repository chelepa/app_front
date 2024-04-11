import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API
});

export const authApi = () => ({
    signin: async (login: string, password: string) => {
        const response = await api.post('/v1/Authentication', { login, password });
        return response.data;
    }
});