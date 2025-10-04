<template>
    <div class="bg-white border border-gray-200 rounded-lg p-4">
        <div class="flex items-start justify-between mb-3">
            <div class="flex items-center space-x-3">
                <div class="flex-shrink-0">
                    <div class="h-8 w-8 rounded-full overflow-hidden">
                        <img
                            v-if="comment.userAvatar"
                            :src="comment.userAvatar"
                            :alt="comment.userFullname || comment.username"
                            class="w-full h-full object-cover"
                            @error="handleAvatarError"
                        />
                        <div
                            v-else
                            class="w-full h-full bg-indigo-100 flex items-center justify-center"
                        >
                            <span class="text-sm font-medium text-indigo-600">
                                {{
                                    comment.username?.charAt(0).toUpperCase() ||
                                    '?'
                                }}
                            </span>
                        </div>
                    </div>
                </div>
                <div>
                    <p class="text-sm font-medium text-gray-900">
                        {{ comment.userFullname || comment.username }}
                    </p>
                    <p class="text-xs text-gray-500">
                        {{ formatDate(comment.date || '') }}
                    </p>
                </div>
            </div>

            <button
                v-if="authStore.isAuthenticated"
                @click="handleLike"
                :disabled="isLiking"
                class="flex items-center space-x-1 text-sm transition-colors duration-200 disabled:opacity-50"
            >
                <svg
                    class="w-5 h-5"
                    :class="likeButtonClass"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path
                        fill-rule="evenodd"
                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                        clip-rule="evenodd"
                    />
                </svg>
                <span>{{ likeCountState }}</span>
            </button>
        </div>

        <div class="ml-11">
            <p class="text-gray-800 whitespace-pre-wrap">
                {{ comment.content }}
            </p>
        </div>

        <div class="ml-11 mt-3 flex items-center space-x-4">
            <button
                v-if="authStore.isAuthenticated"
                @click="toggleReplyForm"
                class="text-sm text-indigo-600 hover:text-indigo-800"
            >
                {{ showReplyForm ? 'Cancel Reply' : 'Reply' }}
            </button>
        </div>

        <div v-if="showReplyForm" class="ml-11 mt-4">
            <CommentForm
                :thread-id="threadId"
                :comment-id="comment.id"
                @reply-created="handleReplyCreated"
                @cancel="showReplyForm = false"
            />
        </div>

        <div
            v-if="comment.replies && comment.replies.length > 0"
            class="ml-11 mt-4 space-y-4"
        >
            <div class="border-l-2 border-gray-200 pl-4 space-y-4">
                <div
                    v-for="reply in comment.replies"
                    :key="reply.id"
                    class="bg-gray-50 border border-gray-200 rounded-lg p-4"
                >
                    <div class="flex items-start justify-between mb-3">
                        <div class="flex items-center space-x-3">
                            <div class="flex-shrink-0">
                                <div
                                    class="h-6 w-6 rounded-full overflow-hidden"
                                >
                                    <img
                                        v-if="reply.userAvatar"
                                        :src="reply.userAvatar"
                                        :alt="
                                            reply.userFullname || reply.username
                                        "
                                        class="w-full h-full object-cover"
                                        @error="handleAvatarError"
                                    />
                                    <div
                                        v-else
                                        class="w-full h-full bg-green-100 flex items-center justify-center"
                                    >
                                        <span
                                            class="text-xs font-medium text-green-600"
                                        >
                                            {{
                                                reply.username
                                                    ?.charAt(0)
                                                    .toUpperCase() || '?'
                                            }}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <p class="text-xs font-medium text-gray-900">
                                    {{ reply.userFullname || reply.username }}
                                </p>
                                <p class="text-xs text-gray-500">
                                    {{ formatDate(reply.date || '') }}
                                </p>
                            </div>
                        </div>

                        <button
                            v-if="authStore.isAuthenticated"
                            @click="handleLikeReply(reply.id)"
                            :disabled="isLiking"
                            class="flex items-center space-x-1 text-xs transition-colors duration-200 disabled:opacity-50"
                        >
                            <svg
                                class="w-5 h-5"
                                :class="getReplyLikeButtonClass(reply.id)"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <span>{{
                                getReplyLikeState(reply.id).likeCount
                            }}</span>
                        </button>
                    </div>

                    <div class="ml-9">
                        <p class="text-sm text-gray-800 whitespace-pre-wrap">
                            {{ reply.content }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, watch } from 'vue';
import { useForumStore } from '@/stores/forum';
import { useAuthStore } from '@/stores/auth';
import { useLikeStore } from '@/stores/likeStore';
import CommentForm from './CommentForm.vue';
import type { Comment } from '@/types';

interface Props {
    comment: Comment;
    threadId: string;
}

const props = defineProps<Props>();
const forumStore = useForumStore();
const authStore = useAuthStore();
const likeStore = useLikeStore();

const showReplyForm = ref(false);
const isLiking = ref(false);

const isLikedState = ref(false);
const likeCountState = ref(0);

const replyLikeStates = ref<
    Record<string, { isLiked: boolean; likeCount: number }>
>({});

const likeButtonClass = computed(() => ({
    'text-red-500': isLikedState.value,
    'text-gray-500 hover:text-red-200': !isLikedState.value,
}));

const getReplyLikeState = (replyId: string) =>
    replyLikeStates.value[replyId] || { isLiked: false, likeCount: 0 };

const getReplyLikeButtonClass = (replyId: string) => ({
    'text-red-500': getReplyLikeState(replyId).isLiked,
    'text-gray-500 hover:text-red-200': !getReplyLikeState(replyId).isLiked,
});

const syncLikeState = () => {
    const storeComment = forumStore.comments.find(
        (c) => c.id === props.comment.id
    );

    const commentLikeState = likeStore.getLikeState(props.comment.id);
    isLikedState.value =
        storeComment?.isLiked ??
        commentLikeState.isLiked ??
        props.comment.isLiked ??
        false;
    likeCountState.value =
        storeComment?.likeCount ??
        commentLikeState.likeCount ??
        props.comment.likeCount ??
        0;

    const repliesToSync = storeComment?.replies ?? props.comment.replies ?? [];
    repliesToSync.forEach((reply) => {
        const replyLikeState = likeStore.getLikeState(reply.id);
        replyLikeStates.value[reply.id] = {
            isLiked: reply.isLiked ?? replyLikeState.isLiked ?? false,
            likeCount: reply.likeCount ?? replyLikeState.likeCount ?? 0,
        };
    });
};

syncLikeState();

watch(
    () => forumStore.comments,
    () => {
        syncLikeState();
    },
    { deep: true }
);

watch(
    () => [
        likeStore.getLikeState(props.comment.id),
        props.comment.replies?.map((r) => likeStore.getLikeState(r.id)),
    ],
    () => {
        syncLikeState();
    },
    { deep: true }
);

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) {
        return 'Just now';
    } else if (diffInSeconds < 3600) {
        const minutes = Math.floor(diffInSeconds / 60);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diffInSeconds < 86400) {
        const hours = Math.floor(diffInSeconds / 3600);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else {
        return date.toLocaleDateString();
    }
};

const handleLike = async () => {
    if (!authStore.isAuthenticated || !authStore.user?.id) return;
    if (isLiking.value) return;

    isLiking.value = true;

    try {
        const result = await likeStore.toggleLike(
            'COMMENT',
            props.threadId,
            props.comment.id,
            authStore.user.id
        );

        if (result.success && result.data) {
            isLikedState.value = result.data.isLiked;
            likeCountState.value = result.data.likeCount;

            forumStore.updateCommentLikeState(
                props.comment.id,
                result.data.isLiked,
                result.data.likeCount
            );
        } else {
            console.error('Like comment failed:', result.error);
        }
    } catch (error) {
        console.error('Failed to like comment:', error);
    } finally {
        isLiking.value = false;
    }
};

const handleLikeReply = async (replyId: string) => {
    if (!authStore.isAuthenticated || !authStore.user?.id) return;
    if (isLiking.value) return;

    isLiking.value = true;

    try {
        const result = await likeStore.toggleLike(
            'REPLY',
            props.threadId,
            replyId,
            authStore.user.id,
            props.comment.id
        );

        if (result.success && result.data) {
            replyLikeStates.value[replyId] = {
                isLiked: result.data.isLiked,
                likeCount: result.data.likeCount,
            };

            forumStore.updateReplyLikeState(
                props.comment.id,
                replyId,
                result.data.isLiked,
                result.data.likeCount
            );
        } else {
            console.error('Like reply failed:', result.error);
        }
    } catch (error) {
        console.error('Failed to like reply:', error);
    } finally {
        isLiking.value = false;
    }
};

const toggleReplyForm = () => (showReplyForm.value = !showReplyForm.value);

const handleReplyCreated = async (replyData: any) => {
    try {
        const result = await forumStore.createReply({
            content: replyData.content,
            threadId: props.threadId,
            commentId: props.comment.id,
            owner: replyData.owner,
        });

        if (result.success) {
            showReplyForm.value = false;
        } else {
            console.error('Failed to create reply:', result.error);
        }
    } catch (error) {
        console.error('Error creating reply:', error);
    }
};

const handleAvatarError = (event: Event): void => {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
};
</script>
