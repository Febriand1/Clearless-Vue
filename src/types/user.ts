
export interface User {
    id: string;
    username: string;
    fullname: string;
    email: string;
    avatar?: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    token: string | null;
}

export interface LoginCredentials {
    username: string;
    password: string;
}

export interface RegisterCredentials {
    username: string;
    fullname: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface UpdateProfileData {
    fullname?: string;
    email?: string;
    avatar?: string;
}

export interface AuthResponse {
    status: string;
    data: {
        accessToken: string;
        refreshToken: string;
    };
}

export interface RefreshTokenResponse {
    status: string;
    data: {
        accessToken: string;
    };
}

export interface RefreshTokenRequest {
    refreshToken: string;
}

export interface UserResponse {
    status: string;
    data: {
        user: User;
    };
}
