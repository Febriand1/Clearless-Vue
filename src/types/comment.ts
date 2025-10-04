import type { Reply } from '@/types';

export interface Comment {
    id: string;
    content: string;
    username: string;
    userFullname?: string;
    userAvatar?: string;
    date?: string;
    threadId?: string;
    likeCount?: number;
    isLiked?: boolean;
    replies?: Reply[];
}

export interface CreateCommentData {
    content: string;
    threadId: string;
    owner: string;
}
