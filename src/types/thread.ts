import type { Comment } from '@/types';

export interface Thread {
    id: string;
    title: string;
    body?: string;
    username?: string;
    userFullname?: string;
    userAvatar?: string;
    date?: string;
    isLiked?: boolean;
    likeCount?: number;
    commentCount?: number;
    comments?: Comment[];
}

export interface CreateThreadData {
    title: string;
    body: string;
    owner: string;
}

export interface ThreadsResponse {
    status: string;
    data: {
        threads: Thread[];
        meta: {
            page: number;
            limit: number;
            total: number;
        };
    };
}