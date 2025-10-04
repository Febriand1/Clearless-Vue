export interface PaginationMeta {
    page: number;
    limit: number;
    total: number;
}

export interface FormState {
    isSubmitting: boolean;
    isValid: boolean;
    errors: Record<string, string>;
}

export interface LikeState {
    isLiked: boolean;
    likeCount: number;
}

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
