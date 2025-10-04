import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type {
    Thread,
    Comment,
    CreateThreadData,
    CreateCommentData,
    CreateReplyData,
    StoreActionResult,
    PaginationMeta,
} from '@/types';
import { forumApi } from '@/services/api';
import { handleApiError } from '@/utils/errorHandler';

export const useForumStore = defineStore('forum', () => {
    const threads = ref<Thread[]>([]);
    const currentThread = ref<Thread | null>(null);
    const comments = ref<Comment[]>([]);
    const loading = ref(false);
    const pagination = ref<PaginationMeta>({
        page: 1,
        limit: 6,
        total: 0,
    });

    const fetchThreads = async (
        page: number = 1,
        limit: number = 6
    ): Promise<void> => {
        loading.value = true;
        try {
            const result = await forumApi.getThreads(page, limit);
            threads.value = result.threads;
            pagination.value = result.meta;
        } catch (error) {
            threads.value = [];
            pagination.value = { page: 1, limit: 6, total: 0 };
            console.error('Failed to fetch threads:', error);
        } finally {
            loading.value = false;
        }
    };

    const fetchThread = async (id: string): Promise<void> => {
        loading.value = true;
        try {
            currentThread.value = await forumApi.getThread(id);
            comments.value = currentThread.value.comments || [];
        } catch (error: any) {
            currentThread.value = null;
            comments.value = [];
        } finally {
            loading.value = false;
        }
    };

    const createThread = async (
        data: CreateThreadData
    ): Promise<StoreActionResult<Thread>> => {
        try {
            const newThread = await forumApi.createThread(data);
            threads.value.unshift(newThread);
            return { success: true, data: newThread };
        } catch (error) {
            return handleApiError(error);
        }
    };

    const createComment = async (
        data: CreateCommentData
    ): Promise<StoreActionResult<Comment>> => {
        try {
            const newComment = await forumApi.createComment(data);
            comments.value.push(newComment);
            return { success: true, data: newComment };
        } catch (error) {
            return handleApiError(error);
        }
    };

    const updateThreadLikeState = (
        threadId: string,
        isLiked: boolean,
        likeCount: number
    ): void => {
        if (currentThread.value && currentThread.value.id === threadId) {
            currentThread.value = {
                ...currentThread.value,
                isLiked,
                likeCount,
            };
        }

        const threadIndex = threads.value.findIndex((t) => t.id === threadId);
        if (threadIndex !== -1) {
            threads.value[threadIndex] = {
                ...threads.value[threadIndex],
                isLiked,
                likeCount,
            };
        }
    };

    const updateCommentLikeState = (
        commentId: string,
        isLiked: boolean,
        likeCount: number
    ): void => {
        const commentIndex = comments.value.findIndex(
            (c) => c.id === commentId
        );
        if (commentIndex !== -1) {
            comments.value[commentIndex] = {
                ...comments.value[commentIndex],
                isLiked,
                likeCount,
            };
        }
    };

    const updateReplyLikeState = (
        commentId: string,
        replyId: string,
        isLiked: boolean,
        likeCount: number
    ): void => {
        const parentCommentIndex = comments.value.findIndex(
            (c) => c.id === commentId
        );
        if (
            parentCommentIndex !== -1 &&
            comments.value[parentCommentIndex].replies
        ) {
            const parentComment = { ...comments.value[parentCommentIndex] };
            const updatedReplies = [...parentComment.replies!];
            const replyIndex = updatedReplies.findIndex(
                (r) => r.id === replyId
            );

            if (replyIndex !== -1) {
                updatedReplies[replyIndex] = {
                    ...updatedReplies[replyIndex],
                    isLiked,
                    likeCount,
                };
                parentComment.replies = updatedReplies;
                comments.value[parentCommentIndex] = parentComment;
            }
        }
    };

    const createReply = async (
        data: CreateReplyData
    ): Promise<StoreActionResult<Comment>> => {
        try {
            const newReply = await forumApi.createReply(data);

            const parentComment = comments.value.find(
                (c) => c.id === data.commentId
            );
            if (parentComment) {
                if (!parentComment.replies) {
                    parentComment.replies = [];
                }
                parentComment.replies.push(newReply);
            }

            return { success: true, data: newReply };
        } catch (error) {
            return handleApiError(error);
        }
    };

    const syncLikeData = (
        threadId: string,
        isLiked: boolean,
        likeCount: number
    ): void => {
        updateThreadLikeState(threadId, isLiked, likeCount);
    };

    const totalPages = computed(() =>
        Math.ceil(pagination.value.total / pagination.value.limit)
    );
    const hasNextPage = computed(
        () => pagination.value.page < totalPages.value
    );
    const hasPrevPage = computed(() => pagination.value.page > 1);
    const currentPage = computed(() => pagination.value.page);
    const totalItems = computed(() => pagination.value.total);

    return {
        // State
        threads,
        currentThread,
        comments,
        loading,
        pagination,

        fetchThreads,
        fetchThread,
        createThread,
        createComment,
        createReply,

        updateThreadLikeState,
        updateCommentLikeState,
        updateReplyLikeState,
        syncLikeData,

        totalPages,
        hasNextPage,
        hasPrevPage,
        currentPage,
        totalItems,
    };
});
