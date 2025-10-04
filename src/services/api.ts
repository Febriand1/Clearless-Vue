import api from '@/utils/axiosConfig';
import type {
    Thread,
    Comment,
    LoginCredentials,
    RegisterCredentials,
    UpdateProfileData,
    CreateThreadData,
    CreateCommentData,
    CreateReplyData,
    AuthResponse,
    RefreshTokenResponse,
    UserResponse,
    Reply,
    LikeRequest,
    LikeResponse,
    ThreadsResponse,
    PaginationMeta,
} from '@/types';

export const authApi = {
    async login(credentials: LoginCredentials): Promise<AuthResponse> {
        const response = await api.post('/authentications', credentials);
        return response.data;
    },

    async register(credentials: RegisterCredentials): Promise<AuthResponse> {
        const response = await api.post('/users', credentials);
        return response.data;
    },

    async me(): Promise<UserResponse> {
        const response = await api.get('/users/me');
        return response.data;
    },

    async updateProfile(data: UpdateProfileData): Promise<UserResponse> {
        const response = await api.patch('/users/me', data);
        return response.data;
    },

    async updateProfileWithFile(formData: FormData): Promise<UserResponse> {
        const response = await api.patch('/users/me', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    async refreshToken(refreshToken: string): Promise<RefreshTokenResponse> {
        const response = await api.put('/authentications', { refreshToken });
        return response.data;
    },

    async deleteAvatar(): Promise<UserResponse> {
        const response = await api.delete('/users/me/avatar');
        return response.data;
    },
};

export const forumApi = {
    async getThreads(
        page: number = 1,
        limit: number = 9
    ): Promise<{ threads: Thread[]; meta: PaginationMeta }> {
        const response = await api.get<ThreadsResponse>(
            `/threads?page=${page}&limit=${limit}`
        );
        const responseData = response.data.data;
        const threadData = responseData.threads || [];

        const threads: Thread[] = threadData.map(
            (t: any): Thread => ({
                id: t.id,
                title: t.title,
                body: t.body,
                username: t.username,
                date: t.date,
                likeCount: t.likeCount ?? 0,
                commentCount: t.commentCount ?? 0,
                isLiked: t.isLiked ?? false,
            })
        );

        return {
            threads,
            meta: responseData.meta,
        };
    },

    async getThread(id: string): Promise<Thread> {
        const response = await api.get(`/threads/${id}`);
        const threadData = response.data.data.thread;

        return {
            id: threadData.id,
            title: threadData.title,
            body: threadData.body,
            username: threadData.username,
            date: threadData.date,
            likeCount: threadData.likeCount || 0,
            isLiked: threadData.isLiked || false,
            comments: threadData.comments || [],
        };
    },

    async createThread(data: CreateThreadData): Promise<Thread> {
        const response = await api.post('/threads', data);
        const threadData = response.data.data.addedThread;

        return {
            id: threadData.id,
            title: threadData.title,
            username: data.owner,
        };
    },

    async createComment(data: CreateCommentData): Promise<Comment> {
        const response = await api.post(`/threads/${data.threadId}/comments`, {
            content: data.content,
            owner: data.owner,
        });

        const commentData = response.data.data.addedComment;

        return {
            id: commentData.id,
            content: commentData.content,
            username: commentData.owner || 'Unknown',
        };
    },

    async likeThread(
        threadId: string,
        request: LikeRequest
    ): Promise<LikeResponse> {
        const response = await api.put(`/threads/${threadId}/likes`, request);
        return response.data.data;
    },

    async likeComment(
        threadId: string,
        commentId: string,
        request: LikeRequest
    ): Promise<LikeResponse> {
        const response = await api.put(
            `/threads/${threadId}/comments/${commentId}/likes`,
            request
        );
        return response.data.data;
    },

    async likeReply(
        threadId: string,
        commentId: string,
        replyId: string,
        request: LikeRequest
    ): Promise<LikeResponse> {
        const response = await api.put(
            `/threads/${threadId}/comments/${commentId}/replies/${replyId}/likes`,
            request
        );
        return response.data.data;
    },

    async createReply(data: CreateReplyData): Promise<Reply> {
        const response = await api.post(
            `/threads/${data.threadId}/comments/${data.commentId}/replies`,
            {
                content: data.content,
                owner: data.owner,
            }
        );

        const replyData = response.data.data.addedReply;

        return {
            id: replyData.id,
            content: replyData.content,
            username: replyData.owner || 'Unknown',
        };
    },
};
