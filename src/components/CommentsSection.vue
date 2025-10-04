<template>
    <div>
        <div v-if="loading" class="text-center py-8">
            <div class="inline-flex items-center">
                <svg
                    class="animate-spin -ml-1 mr-3 h-5 w-5 text-indigo-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        class="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        stroke-width="4"
                    ></circle>
                    <path
                        class="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
                <span class="text-gray-600">Loading comments...</span>
            </div>
        </div>

        <div
            v-else-if="commentCount === 0"
            class="text-center py-8 text-gray-500"
        >
            <svg
                class="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
            </svg>
            <h3 class="mt-2 text-sm font-medium text-gray-900">
                No comments yet
            </h3>
            <p class="mt-1 text-sm text-gray-500">
                Be the first to share your thoughts!
            </p>
        </div>

        <div v-else class="space-y-4">
            <CommentItem
                v-for="comment in comments"
                :key="comment.id"
                :comment="comment"
                :thread-id="threadId"
            />
        </div>

        <div v-if="commentCount > comments.length" class="mt-6 text-center">
            <button
                @click="handleLoadMore"
                class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
                Load More Comments
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { Comment } from '@/types';
import { CommentItem } from '@/components';

interface Props {
    threadId: string;
    comments: Comment[];
    commentCount: number;
    isAuthenticated: boolean;
    loading: boolean;
}

interface Emits {
    (e: 'comment-created'): void;
    (e: 'load-more'): void;
}

defineProps<Props>();
const emit = defineEmits<Emits>();

const handleLoadMore = (): void => {
    emit('load-more');
};
</script>
