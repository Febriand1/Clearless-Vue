import axios from 'axios';
import { API_CONFIG } from '@/constants';
import { useAuthStore } from '@/stores';

const api = axios.create({
    baseURL: API_CONFIG.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
    timeout: API_CONFIG.TIMEOUT,
});

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                const authStore = useAuthStore();
                const refreshed = await authStore.refreshAccessToken();

                if (refreshed) {
                    const token = localStorage.getItem('token');
                    if (token) {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        return api(originalRequest);
                    }
                }
            } catch (refreshError) {
                console.error('Token refresh failed:', refreshError);
                const authStore = useAuthStore();
                authStore.logout();
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        if (!error.response) {
            console.error('Network error:', error.message);
        }

        return Promise.reject(error);
    }
);

export default api;
