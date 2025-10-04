export interface ApiResponse<T = any> {
    status: string;
    data: T;
}

export interface ErrorResponse {
    status: string;
    message: string;
    errors?: Record<string, string[]>;
}

export interface PaginationParams {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
}

export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    pagination: {
        page: number;
        limit: number;
        total: number;
        totalPages: number;
    };
}

export interface ApiPaginatedResponse<T> {
    status: string;
    data: {
        [key: string]: T[] | PaginationMeta;
        meta: PaginationMeta;
    };
}

export interface FormState {
    isSubmitting: boolean;
    isValid: boolean;
    errors: Record<string, string>;
}

export interface LoadingState {
    isLoading: boolean;
    error: string | null;
}

export interface LikeState {
    isLiked: boolean;
    likeCount: number;
}

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>;
export type RequiredFields<T, K extends keyof T> = T & Required<Pick<T, K>>;
export type NonNullable<T> = T extends null | undefined ? never : T;

export type EventHandler<T = Event> = (event: T) => void;
export type AsyncEventHandler<T = Event> = (event: T) => Promise<void>;

export interface ApiResult<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}

export interface StoreActionResult<T = any> {
    success: boolean;
    data?: T;
    error?: string;
}
