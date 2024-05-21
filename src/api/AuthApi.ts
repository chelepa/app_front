import axios from 'axios';
import { PermissionRequest } from '../types/PermissionRequest';
import { GroupPermissionRequest } from '../types/Group';

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

    getAllPermission: async (page: number, size: number, permission: string, description: string) => {
        const response = await api.get('/v1/permission', {
            params: {
                page: page,
                size: size,
                permission: permission,
                description: description
            }
        })
            .then((res) => {
                return res.data;
            }).catch((error) => {
                return error;
            })
        return response;
    },

    createPermission: async (request: PermissionRequest) => {
        return await api.post('/v1/permission', request);
    },

    deletePermission: async (id: string) => {
        return await api.delete(`/v1/permission/${id}`);
    },

    getPermission: async (id: string) => {
        return await api.get(`/v1/permission/${id}`);
    },

    updatePermission: async (id: string, request: PermissionRequest) => {
        return await api.put(`/v1/permission/${id}`, request);
    }, 

    getAllGroupPermission: async (page: number, size: number, name: string, description: string) => {
        return await api.get('/v1/group', {params: { page: page, size: size, name: name, description: description}})
    },

    getGroupPermissionbyId: async (id: number) => {
        return await api.get(`/v1/group/${id}`);
    },

    updateGroupPermissionbyId: async (id: number, request: GroupPermissionRequest) => {
        return await api.put(`/v1/group/${id}`, request);
    }, 

    deleteGroupPermissionbyId: async (id: number) => {
        return await api.delete(`/v1/group/${id}`);
    },

    createGroupPermission: async (request: GroupPermissionRequest) => {
        return await api.post('/v1/group', request);
    },
});