import axios from 'axios';

const api = axios.create({
    baseURL: process.env.REACT_APP_API
});

export const useApi = () => ({
    validateToken: async (token: string) => {
        return {
            user: { id: 3, name: 'José', email: 'jose@gmail.com' }
        };
        const response = await api.post('/validate', { token });
        return response.data;
    },
    signin: async (login: string, password: string) => {
        const response = await api.post('/v1/Authentication', { login, password });
        return response.data;
    },
    logout: async () => {
        return { status: true };
        const response = await api.post('/logout');
        return response.data;
    }
});