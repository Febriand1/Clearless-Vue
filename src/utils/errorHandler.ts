import { HTTP_STATUS, ERROR_MESSAGES } from '@/constants';
import type { ApiResult } from '@/types';

const getErrorMessage = (error: any): string => {
    if (error?.response?.data?.message) return error.response.data.message;

    if (error?.message) return error.message;

    if (!error?.response && error?.code === 'NETWORK_ERROR')
        return ERROR_MESSAGES.NETWORK_ERROR;

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

const createApiResult = <T = any>(
    success: boolean,
    data?: T,
    error?: string
): ApiResult<T> => ({
    success,
    data,
    error,
});

export const handleApiError = <T = any>(error: any): ApiResult<T> => {
    const errorMessage = getErrorMessage(error);
    return createApiResult<T>(false, undefined as T, errorMessage);
};
