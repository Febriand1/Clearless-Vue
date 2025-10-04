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
