import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import apiConfig from './apiConfig';

class ApiService {
    private axiosInstance = axios.create({
        baseURL: apiConfig.baseURL,
        timeout: 30000,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    constructor() {
        this.axiosInstance.interceptors.request.use(
            (config) => {
                const token = localStorage.getItem('authToken');
                if (token) {
                    config.headers['Authorization'] = `Bearer ${token}`;
                }

                return config;
            },
            (error) => {
                return Promise.reject(error);
            },
        );

        this.axiosInstance.interceptors.response.use(
            (response) => response,
            (error) => {
                if (error.response) {
                    if (error.response.status === 401) {
                        console.error('Unauthorized access. Please login again.');
                    }

                    if (error.response.status === 403) {
                        console.error('You do not have permission to access this resource.');
                    }

                    if (error.response.status >= 500) {
                        console.error('Server error. Please try again later.');
                    }
                } else if (error.request) {
                    console.error('Network error. Please check your connection.');
                }

                return Promise.reject(error);
            },
        );
    }

    public async get<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.axiosInstance.get(url, config);
        return response.data;
    }

    public async post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.axiosInstance.post(url, data, config);
        return response.data;
    }

    public async postFormData<T = any>(url: string, formData: FormData, config?: AxiosRequestConfig): Promise<T> {
        const formConfig: AxiosRequestConfig = {
            ...config,
            headers: {
                ...config?.headers,
                'Content-Type': 'multipart/form-data',
            },
        };

        const response: AxiosResponse<T> = await this.axiosInstance.post(url, formData, formConfig);
        return response.data;
    }

    public async put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.axiosInstance.put(url, data, config);
        return response.data;
    }

    public async patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.axiosInstance.patch(url, data, config);
        return response.data;
    }

    public async delete<T = any>(url: string, config?: AxiosRequestConfig): Promise<T> {
        const response: AxiosResponse<T> = await this.axiosInstance.delete(url, config);
        return response.data;
    }
}

const apiService = new ApiService();
export default apiService;
