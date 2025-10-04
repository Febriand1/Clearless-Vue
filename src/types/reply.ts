export interface Reply {
    id: string;
    content: string;
    username: string;
    userFullname?: string;
    userAvatar?: string;
    date?: string;
    threadId?: string;
    commentId?: string;
    isLiked?: boolean;
    likeCount?: number;
}

export interface CreateReplyData {
    content: string;
    threadId: string;
    commentId: string;
    owner: string;
}
