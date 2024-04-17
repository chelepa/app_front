import axios from 'axios';

const api_authentication = axios.create({
    baseURL: process.env.REACT_APP_API
});

const api = axios.create({
    baseURL: process.env.REACT_APP_API,
    headers: {
        'Authorization': `Bearer ${localStorage.getItem('authToken')}`,
    },
});

export const authApi = () => ({
    signin: async (login: string, password: string) => {
        const response = await api_authentication.post('/v1/Authentication', { login, password });
        return response.data;
    },

    getAllPermission: async () => {
        const response = await api.get('/v1/permission')
            .then((res) => {
                return res.data;
            }).catch((error) => {
                return error;
            })
        return response;
    }
});