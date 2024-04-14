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
                // console.log(res.data)
                return res.data;
            }).catch((error) => {
                // console.error(error)
                return null;
            })
        return response;
    }
});