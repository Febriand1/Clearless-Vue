import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type {
    Thread,
    Comment,
    Reply,
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
            const [thread, threadComments] = await Promise.all([
                forumApi.getThread(id),
                forumApi.getThreadComments(id),
            ]);

            const commentsWithReplies = await Promise.all(
                threadComments.map(async (comment) => {
                    try {
                        const replies = await forumApi.getCommentReplies(
                            id,
                            comment.id
                        );
                        return {
                            ...comment,
                            replies,
                        };
                    } catch (error) {
                        console.error(
                            'Failed to fetch replies for comment',
                            comment.id,
                            error
                        );
                        return {
                            ...comment,
                            replies: [],
                        };
                    }
                })
            );

            currentThread.value = {
                ...thread,
                comments: commentsWithReplies,
            };
            comments.value = commentsWithReplies;
        } catch (error: any) {
            currentThread.value = null;
            comments.value = [];
            console.error('Failed to fetch thread data:', error);
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
    ): Promise<StoreActionResult<Reply>> => {
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

    const deleteThread = async (
        threadId: string
    ): Promise<StoreActionResult<void>> => {
        try {
            await forumApi.deleteThread(threadId);
            threads.value = threads.value.filter((t) => t.id !== threadId);

            if (currentThread.value?.id === threadId) {
                currentThread.value = null;
                comments.value = [];
            }

            return { success: true };
        } catch (error) {
            return handleApiError(error);
        }
    };

    const deleteComment = async (
        threadId: string,
        commentId: string
    ): Promise<StoreActionResult<void>> => {
        try {
            await forumApi.deleteComment(threadId, commentId);

            const updatedComments = comments.value.filter(
                (comment) => comment.id !== commentId
            );
            comments.value = updatedComments;

            if (currentThread.value?.id === threadId) {
                const updatedThread: Thread = {
                    ...currentThread.value,
                    comments: updatedComments,
                    commentCount: updatedComments.length,
                };
                currentThread.value = updatedThread;
            }

            const threadIndex = threads.value.findIndex(
                (thread) => thread.id === threadId
            );
            if (threadIndex !== -1) {
                const updatedThread = {
                    ...threads.value[threadIndex],
                    commentCount: Math.max(
                        0,
                        updatedComments.length
                    ),
                };
                threads.value = [
                    ...threads.value.slice(0, threadIndex),
                    updatedThread,
                    ...threads.value.slice(threadIndex + 1),
                ];
            }

            return { success: true };
        } catch (error) {
            return handleApiError(error);
        }
    };

    const deleteReply = async (
        threadId: string,
        commentId: string,
        replyId: string
    ): Promise<StoreActionResult<void>> => {
        try {
            await forumApi.deleteReply(threadId, commentId, replyId);

            const commentIndex = comments.value.findIndex(
                (comment) => comment.id === commentId
            );

            if (commentIndex !== -1) {
                const targetComment = comments.value[commentIndex];
                const updatedReplies = (targetComment.replies || []).filter(
                    (reply) => reply.id !== replyId
                );

                const updatedComment: Comment = {
                    ...targetComment,
                    replies: updatedReplies,
                };

                const updatedComments = [...comments.value];
                updatedComments[commentIndex] = updatedComment;
                comments.value = updatedComments;

                if (currentThread.value?.id === threadId) {
                    currentThread.value = {
                        ...currentThread.value,
                        comments: updatedComments,
                    };
                }
            }

            return { success: true };
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
        deleteThread,
        deleteComment,
        deleteReply,

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
