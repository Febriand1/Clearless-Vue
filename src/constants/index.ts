export const API_CONFIG = {
    TIMEOUT: 10000,
    BASE_URL: '/api',
} as const;

export const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    NOT_FOUND: 404,
    INTERNAL_SERVER_ERROR: 500,
} as const;

export const ERROR_MESSAGES = {
    NETWORK_ERROR: 'Network error occurred. Please check your connection.',
    UNAUTHORIZED: 'Authentication required to perform this action',
    NOT_FOUND: 'Resource not found',
    SERVER_ERROR: 'Server error occurred. Please try again later.',
    VALIDATION_ERROR: 'Please check your input and try again',
    UNKNOWN_ERROR: 'An unexpected error occurred',
} as const;

export const VALIDATION_RULES = {
    USERNAME: {
        MIN_LENGTH: 3,
        MAX_LENGTH: 50,
    },
    PASSWORD: {
        MIN_LENGTH: 6,
    },
    TITLE: {
        MIN_LENGTH: 1,
        MAX_LENGTH: 200,
    },
    CONTENT: {
        MIN_LENGTH: 1,
        MAX_LENGTH: 1000,
    },
} as const;
