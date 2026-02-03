import axios, { type AxiosRequestConfig, type AxiosResponse } from 'axios';

const api = axios.create({
    baseURL: 'https://jsonplaceholder.typicode.com', // Dummy API source
    headers: {
        'Content-Type': 'application/json',
    },
});

export const get = async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.get<T>(url, config);
};

export const post = async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.post<T>(url, data, config);
};

export const put = async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.put<T>(url, data, config);
};

export const patch = async <T>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.patch<T>(url, data, config);
};

export const remove = async <T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T>> => {
    return api.delete<T>(url, config);
};

interface VideoGenerationPayload {
    theme: string | null;
    image: string | null;
    clientId: string | null;
}

export const generateVideo = async (data: VideoGenerationPayload) => {
    // Dummy API call to simulate video generation
    // Using jsonplaceholder posts endpoint to simulate a successful POST request
    return post('/posts', data);
};

export default api;
