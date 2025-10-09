import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type {
    User,
    LoginCredentials,
    RegisterCredentials,
    UpdateProfileData,
    StoreActionResult,
} from '@/types';
import { authApi } from '@/services/api';
import { handleApiError } from '@/utils/errorHandler';

export const useAuthStore = defineStore('auth', () => {
    const user = ref<User | null>(null);
    const token = ref<string | null>(localStorage.getItem('token'));
    const refreshToken = ref<string | null>(
        localStorage.getItem('refreshToken')
    );

    const isAuthenticated = computed(() => !!token.value && !!user.value);

    const login = async (
        credentials: LoginCredentials
    ): Promise<StoreActionResult> => {
        try {
            const response = await authApi.login(credentials);
            token.value = response.data.accessToken;
            refreshToken.value = response.data.refreshToken;

            localStorage.setItem('token', response.data.accessToken);
            localStorage.setItem('refreshToken', response.data.refreshToken);

            const userResponse = await authApi.me();
            user.value = userResponse.data.user;

            return { success: true };
        } catch (error) {
            return handleApiError(error);
        }
    };

    const register = async (
        credentials: RegisterCredentials
    ): Promise<StoreActionResult> => {
        try {
            await authApi.register(credentials);
            return { success: true };
        } catch (error) {
            return handleApiError(error);
        }
    };

    const verifyEmail = async (code: string): Promise<StoreActionResult> => {
        try {
            await authApi.verifyEmail(code);
            return { success: true };
        } catch (error) {
            return handleApiError(error);
        }
    };

    const logout = async (): Promise<void> => {
        try {
            if (refreshToken.value) {
                await authApi.logout(refreshToken.value);
            }
        } catch (error) {
            console.error('Failed to revoke authentication on server:', error);
        } finally {
            user.value = null;
            token.value = null;
            refreshToken.value = null;
            localStorage.removeItem('token');
            localStorage.removeItem('refreshToken');
        }
    };

    const updateProfile = async (
        data: UpdateProfileData
    ): Promise<StoreActionResult<User>> => {
        try {
            const response = await authApi.updateProfile(data);
            user.value = response.data.user;
            return { success: true, data: response.data.user };
        } catch (error) {
            return handleApiError(error);
        }
    };

    const updateProfileWithFile = async (
        formData: FormData
    ): Promise<StoreActionResult<User>> => {
        try {
            const response = await authApi.updateProfileWithFile(formData);
            user.value = response.data.user;
            return { success: true, data: response.data.user };
        } catch (error) {
            return handleApiError(error);
        }
    };

    const refreshAccessToken = async (): Promise<boolean> => {
        if (!refreshToken.value) {
            return false;
        }

        try {
            const response = await authApi.refreshToken(refreshToken.value);
            token.value = response.data.accessToken;
            localStorage.setItem('token', response.data.accessToken);
            return true;
        } catch (error) {
            await logout();
            return false;
        }
    };

    const checkAuth = async (): Promise<void> => {
        if (token.value) {
            try {
                const response = await authApi.me();
                user.value = response.data.user;
            } catch (error) {
                const refreshed = await refreshAccessToken();
                if (refreshed) {
                    try {
                        const response = await authApi.me();
                        user.value = response.data.user;
                    } catch (refreshError) {
                        await logout();
                    }
                }
            }
        }
    };

    const deleteAvatar = async (): Promise<StoreActionResult<User>> => {
        try {
            const response = await authApi.deleteAvatar();
            user.value = response.data.user;
            return { success: true, data: response.data.user };
        } catch (error: any) {
            return handleApiError(error);
        }
    };

    return {
        user,
        token,
        refreshToken,
        isAuthenticated,
        login,
        register,
        updateProfile,
        updateProfileWithFile,
        deleteAvatar,
        logout,
        checkAuth,
        refreshAccessToken,
        verifyEmail,
    };
});
