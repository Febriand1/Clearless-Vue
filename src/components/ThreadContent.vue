<template>
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
        <div class="flex items-start justify-between mb-4">
            <div class="flex-1">
                <h1 class="text-xl font-bold text-gray-900 mb-2">
                    {{ thread.title }}
                </h1>
                <div class="flex items-center text-sm text-gray-500 mb-3">
                    <div class="flex items-center">
                        <div
                            class="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-2"
                        >
                            <span class="text-indigo-600 font-medium text-sm">
                                {{
                                    thread.username?.charAt(0).toUpperCase() ||
                                    'U'
                                }}
                            </span>
                        </div>
                        <div>
                            <div class="font-medium text-gray-900">
                                {{ thread.username }}
                            </div>
                            <div class="text-xs text-gray-500">
                                {{ formatDate(thread.date || '') }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex items-center space-x-4">
                <button
                    v-if="isAuthenticated"
                    @click="handleLike"
                    class="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-200 hover:border-red-200 hover:bg-red-50 transition-colors duration-200"
                    :disabled="isLiking"
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
                    <span class="font-medium">{{ likeCount }}</span>
                </button>
                <div
                    v-else
                    class="flex items-center space-x-2 px-4 py-2 rounded-lg border border-gray-200 text-gray-400"
                >
                    <svg
                        class="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                            clip-rule="evenodd"
                        />
                    </svg>
                    <span class="font-medium">{{ thread.likeCount || 0 }}</span>
                </div>
            </div>
        </div>

        <div class="prose max-w-none">
            <div class="text-gray-700 whitespace-pre-wrap leading-relaxed">
                {{ thread.body }}
            </div>
        </div>

        <div class="mt-4 pt-4 border-t border-gray-100">
            <div
                class="flex items-center justify-between text-sm text-gray-500"
            >
                <div class="flex items-center space-x-4">
                    <div class="flex items-center space-x-1">
                        <svg
                            class="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                            />
                        </svg>
                        <span>{{ commentCount }} comments</span>
                    </div>
                    <div class="flex items-center space-x-1">
                        <svg
                            class="w-4 h-4"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path
                                fill-rule="evenodd"
                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                clip-rule="evenodd"
                            />
                        </svg>
                        <span>{{ likeCount }} likes</span>
                    </div>
                </div>
                <div class="text-xs text-gray-400">
                    Thread ID: {{ thread.id }}
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Thread } from '@/types';
import { formatDate } from '@/utils/dateUtils';

interface Props {
    thread: Thread;
    isAuthenticated: boolean;
    isLiked: boolean;
    likeCount: number;
    commentCount: number;
    isLiking?: boolean;
}

interface Emits {
    (e: 'like'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const likeButtonClass = computed(() => ({
    'text-red-500': props.isLiked,
    'text-gray-500 hover:text-red-500': !props.isLiked,
}));

const handleLike = (): void => emit('like');
</script>
