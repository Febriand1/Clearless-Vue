export const formatDate = (dateString: string | undefined): string => {
    if (!dateString) return 'Unknown date';

    try {
        const date = new Date(dateString);

        if (isNaN(date.getTime())) {
            return 'Invalid date';
        }

        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    } catch (error) {
        console.error('Error formatting date:', error);
        return 'Invalid date';
    }
};

export const formatRelativeTime = (dateString: string | undefined): string => {
    if (!dateString) return 'Unknown time';

    try {
        const date = new Date(dateString);
        const now = new Date();
        const diffInSeconds = Math.floor(
            (now.getTime() - date.getTime()) / 1000
        );

        if (diffInSeconds < 60) {
            return 'Just now';
        }

        const diffInMinutes = Math.floor(diffInSeconds / 60);
        if (diffInMinutes < 60) {
            return `${diffInMinutes} minute${
                diffInMinutes === 1 ? '' : 's'
            } ago`;
        }

        const diffInHours = Math.floor(diffInMinutes / 60);
        if (diffInHours < 24) {
            return `${diffInHours} hour${diffInHours === 1 ? '' : 's'} ago`;
        }

        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays < 7) {
            return `${diffInDays} day${diffInDays === 1 ? '' : 's'} ago`;
        }

        return formatDate(dateString);
    } catch (error) {
        console.error('Error formatting relative time:', error);
        return 'Invalid date';
    }
};

export const isToday = (dateString: string | undefined): boolean => {
    if (!dateString) return false;

    try {
        const date = new Date(dateString);
        const today = new Date();

        return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
        );
    } catch (error) {
        return false;
    }
};

export const getDateRange = (startDate: string, endDate: string): string => {
    const start = formatDate(startDate);
    const end = formatDate(endDate);

    if (start === end) {
        return start;
    }

    return `${start} - ${end}`;
};
