import { VALIDATION_RULES } from '@/constants';

export interface ValidationResult {
    isValid: boolean;
    errors: Record<string, string>;
}

export const validateUsername = (username: string): string | null => {
    if (!username || username.trim().length === 0) {
        return 'Username is required';
    }

    if (username.length < VALIDATION_RULES.USERNAME.MIN_LENGTH) {
        return `Username must be at least ${VALIDATION_RULES.USERNAME.MIN_LENGTH} characters`;
    }

    if (username.length > VALIDATION_RULES.USERNAME.MAX_LENGTH) {
        return `Username must be no more than ${VALIDATION_RULES.USERNAME.MAX_LENGTH} characters`;
    }

    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
        return 'Username can only contain letters, numbers, and underscores';
    }

    return null;
};

export const validatePassword = (password: string): string | null => {
    if (!password || password.length === 0) {
        return 'Password is required';
    }

    if (password.length < VALIDATION_RULES.PASSWORD.MIN_LENGTH) {
        return `Password must be at least ${VALIDATION_RULES.PASSWORD.MIN_LENGTH} characters`;
    }

    return null;
};

export const validateConfirmPassword = (
    password: string,
    confirmPassword: string
): string | null => {
    if (!confirmPassword || confirmPassword.length === 0) {
        return 'Confirm password is required';
    }

    if (password !== confirmPassword) {
        return 'Passwords do not match';
    }

    return null;
};

export const validateEmail = (email: string): string | null => {
    if (!email || email.trim().length === 0) {
        return 'Email is required';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return 'Please enter a valid email address';
    }

    if (email.length > 254) {
        return 'Email address is too long';
    }

    return null;
};

export const validateThreadTitle = (title: string): string | null => {
    if (!title || title.trim().length === 0) {
        return 'Thread title is required';
    }

    if (title.length < VALIDATION_RULES.TITLE.MIN_LENGTH) {
        return `Title must be at least ${VALIDATION_RULES.TITLE.MIN_LENGTH} character`;
    }

    if (title.length > VALIDATION_RULES.TITLE.MAX_LENGTH) {
        return `Title must be no more than ${VALIDATION_RULES.TITLE.MAX_LENGTH} characters`;
    }

    return null;
};

export const validateThreadContent = (content: string): string | null => {
    if (!content || content.trim().length === 0) {
        return 'Thread content is required';
    }

    if (content.length < VALIDATION_RULES.CONTENT.MIN_LENGTH) {
        return `Content must be at least ${VALIDATION_RULES.CONTENT.MIN_LENGTH} character`;
    }

    if (content.length > VALIDATION_RULES.CONTENT.MAX_LENGTH) {
        return `Content must be no more than ${VALIDATION_RULES.CONTENT.MAX_LENGTH} characters`;
    }

    return null;
};

export const validateCommentContent = (content: string): string | null => {
    if (!content || content.trim().length === 0) {
        return 'Comment content is required';
    }

    if (content.length < VALIDATION_RULES.CONTENT.MIN_LENGTH) {
        return `Comment must be at least ${VALIDATION_RULES.CONTENT.MIN_LENGTH} character`;
    }

    if (content.length > VALIDATION_RULES.CONTENT.MAX_LENGTH) {
        return `Comment must be no more than ${VALIDATION_RULES.CONTENT.MAX_LENGTH} characters`;
    }

    return null;
};

export const validateLoginCredentials = (credentials: {
    username: string;
    password: string;
}): ValidationResult => {
    const errors: Record<string, string> = {};

    const usernameError = validateUsername(credentials.username);
    if (usernameError) errors.username = usernameError;

    const passwordError = validatePassword(credentials.password);
    if (passwordError) errors.password = passwordError;

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

export const validateRegisterCredentials = (credentials: {
    username: string;
    fullname: string;
    email: string;
    password: string;
    confirmPassword: string;
}): ValidationResult => {
    const errors: Record<string, string> = {};

    const usernameError = validateUsername(credentials.username);
    if (usernameError) errors.username = usernameError;

    if (!credentials.fullname || credentials.fullname.trim().length === 0) {
        errors.fullname = 'Full name is required';
    }

    const emailError = validateEmail(credentials.email);
    if (emailError) errors.email = emailError;

    const passwordError = validatePassword(credentials.password);
    if (passwordError) errors.password = passwordError;

    const confirmPasswordError = validateConfirmPassword(
        credentials.password,
        credentials.confirmPassword
    );
    if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

export const validateCreateThreadData = (data: {
    title: string;
    body: string;
}): ValidationResult => {
    const errors: Record<string, string> = {};

    const titleError = validateThreadTitle(data.title);
    if (titleError) errors.title = titleError;

    const contentError = validateThreadContent(data.body);
    if (contentError) errors.body = contentError;

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};

export const validateThreadId = (id: string): string | null => {
    if (!id || typeof id !== 'string') {
        return 'Thread ID is required';
    }

    const trimmedId = id.trim();
    if (trimmedId.length === 0) {
        return 'Thread ID cannot be empty';
    }

    if (trimmedId === 'undefined' || trimmedId === 'null') {
        return 'Invalid thread ID format';
    }

    if (trimmedId.length < 3) {
        return 'Thread ID is too short';
    }

    return null;
};

export const validateProfileUpdateData = (
    data: {
        fullname?: string;
        email?: string;
        avatar?: string;
    },
    hasFileUpload: boolean = false
): ValidationResult => {
    const errors: Record<string, string> = {};

    if (data.fullname !== undefined) {
        const trimmedFullname = data.fullname?.trim();
        if (!trimmedFullname || trimmedFullname.length === 0) {
            errors.fullname = 'Full name cannot be empty';
        } else if (trimmedFullname.length < 2) {
            errors.fullname = 'Full name must be at least 2 characters';
        } else if (trimmedFullname.length > 100) {
            errors.fullname = 'Full name must be no more than 100 characters';
        }
    }

    if (data.email !== undefined) {
        const emailError = validateEmail(data.email);
        if (emailError) errors.email = emailError;
    }

    if (
        data.avatar !== undefined &&
        data.avatar.trim().length > 0 &&
        !hasFileUpload
    ) {
        try {
            new URL(data.avatar);
        } catch {
            errors.avatar = 'Please enter a valid URL for the avatar';
        }

        if (data.avatar.length > 500) {
            errors.avatar = 'Avatar URL is too long';
        }
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors,
    };
};
