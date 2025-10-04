/**
 * Centralized error handling utilities
 */

import { HTTP_STATUS, ERROR_MESSAGES } from '@/constants';
import type { ApiResult } from '@/types';

/**
 * Extracts error message from various error formats
 */
export const getErrorMessage = (error: any): string => {
    // Handle axios error response
    if (error?.response?.data?.message) {
        return error.response.data.message;
    }

    // Handle custom error response
    if (error?.message) {
        return error.message;
    }

    // Handle network errors
    if (!error?.response && error?.code === 'NETWORK_ERROR') {
        return ERROR_MESSAGES.NETWORK_ERROR;
    }

    // Handle HTTP status codes
    if (error?.response?.status) {
        switch (error.response.status) {
            case HTTP_STATUS.UNAUTHORIZED:
                return ERROR_MESSAGES.UNAUTHORIZED;
            case HTTP_STATUS.NOT_FOUND:
                return ERROR_MESSAGES.NOT_FOUND;
            case HTTP_STATUS.INTERNAL_SERVER_ERROR:
                return ERROR_MESSAGES.SERVER_ERROR;
            case HTTP_STATUS.BAD_REQUEST:
                return (
                    error?.response?.data?.message ||
                    ERROR_MESSAGES.VALIDATION_ERROR
                );
            default:
                return ERROR_MESSAGES.UNKNOWN_ERROR;
        }
    }

    return ERROR_MESSAGES.UNKNOWN_ERROR;
};

/**
 * Creates a standardized API result
 */
export const createApiResult = <T = any>(
    success: boolean,
    data?: T,
    error?: string
): ApiResult<T> => ({
    success,
    data,
    error,
});

/**
 * Handles API errors and returns standardized result
 */
export const handleApiError = <T = any>(error: any): ApiResult<T> => {
    const errorMessage = getErrorMessage(error);
    return createApiResult<T>(false, undefined as T, errorMessage);
};

/**
 * Wraps async operations with error handling
 */
export const withErrorHandling = async <T>(
    operation: () => Promise<T>
): Promise<ApiResult<T>> => {
    try {
        const data = await operation();
        return createApiResult(true, data);
    } catch (error) {
        return handleApiError(error);
    }
};

/**
 * Checks if error is a network error
 */
export const isNetworkError = (error: any): boolean => {
    return (
        !error?.response &&
        (error?.code === 'NETWORK_ERROR' ||
            error?.message?.includes('Network Error'))
    );
};

/**
 * Checks if error is an authentication error
 */
export const isAuthError = (error: any): boolean => {
    return error?.response?.status === HTTP_STATUS.UNAUTHORIZED;
};

/**
 * Checks if error is a validation error
 */
export const isValidationError = (error: any): boolean => {
    return error?.response?.status === HTTP_STATUS.BAD_REQUEST;
};
