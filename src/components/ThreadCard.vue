<template>
    <div
        class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 h-full flex flex-col overflow-hidden"
    >
        <div class="flex-1">
            <div class="mb-3">
                <span
                    class="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700"
                >
                    <svg
                        class="w-3 h-3 mr-1"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                    >
                        <path
                            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                    Discussion
                </span>
            </div>

            <h3
                class="text-lg font-bold text-gray-900 mb-3 line-clamp-2 leading-tight"
            >
                <router-link
                    :to="`/thread/${thread.id}`"
                    class="hover:text-indigo-600 transition-colors duration-200"
                >
                    {{ thread.title }}
                </router-link>
            </h3>

            <p
                v-if="thread.body"
                class="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed"
            >
                {{ thread.body }}
            </p>

            <div class="flex items-center text-sm text-gray-500 mb-4">
                <div class="flex items-center">
                    <div
                        class="w-8 h-8 rounded-full overflow-hidden mr-3 ring-2 ring-indigo-100"
                    >
                        <img
                            v-if="thread.userAvatar"
                            :src="thread.userAvatar"
                            :alt="thread.userFullname || thread.username"
                            class="w-full h-full object-cover"
                            @error="handleAvatarError"
                        />
                        <div
                            v-else
                            class="w-full h-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center"
                        >
                            <span class="text-white font-semibold text-xs">
                                {{
                                    thread.username?.charAt(0).toUpperCase() ||
                                    'U'
                                }}
                            </span>
                        </div>
                    </div>
                    <div>
                        <div class="font-semibold text-gray-900">
                            {{ thread.userFullname || thread.username }}
                        </div>
                        <div
                            v-if="thread.date"
                            class="text-xs text-gray-500 flex items-center"
                        >
                            <svg
                                class="w-3 h-3 mr-1"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path
                                    fill-rule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            {{ formatDate(thread.date) }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-auto">
            <div
                class="flex items-center justify-between pt-4 border-t border-gray-100"
            >
                <div class="flex items-center space-x-6 text-sm">
                    <button
                        v-if="isAuthenticated"
                        @click="handleLike"
                        class="flex items-center space-x-2 transition-all duration-200 hover:scale-105 group"
                        :disabled="isLiking"
                    >
                        <div
                            class="flex items-center space-x-1 px-3 py-1 rounded-full transition-colors duration-200"
                            :class="
                                likeState.isLiked
                                    ? 'bg-red-50 text-red-600'
                                    : 'bg-gray-50 text-gray-600 hover:bg-red-50 hover:text-red-600'
                            "
                        >
                            <svg
                                class="w-4 h-4 transition-transform duration-200 group-hover:scale-110"
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
                            <span class="font-medium text-xs">{{
                                likeState.likeCount
                            }}</span>
                        </div>
                    </button>
                    <div
                        v-else
                        class="flex items-center space-x-1 px-3 py-1 rounded-full bg-gray-50 text-gray-400"
                    >
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
                        <span class="font-medium text-xs">{{
                            thread.likeCount || 0
                        }}</span>
                    </div>
                    <router-link
                        :to="`/thread/${thread.id}`"
                        class="flex items-center space-x-1 px-3 py-1 rounded-full bg-blue-50 text-blue-600 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 hover:scale-105 group"
                    >
                        <svg
                            class="w-4 h-4 transition-transform duration-200 group-hover:scale-110"
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
                        <span class="font-medium text-xs">{{
                            thread.commentCount || 0
                        }}</span>
                    </router-link>
                </div>
                <router-link
                    :to="`/thread/${thread.id}`"
                    class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-lg text-white text-sm font-medium transition-all duration-200 shadow-md hover:shadow-lg transform hover:scale-105"
                >
                    <span>Join Discussion</span>
                    <svg
                        class="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                    </svg>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Thread, LikeState } from '@/types';
import { formatDate } from '@/utils/dateUtils';

interface Props {
    thread: Thread;
    isAuthenticated: boolean;
    likeState: LikeState;
    isLiking?: boolean;
}

interface Emits {
    (e: 'like', threadId: string): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const likeButtonClass = computed(() => ({
    'text-red-500': props.likeState.isLiked,
    'text-gray-500 hover:text-red-200': !props.likeState.isLiked,
}));

const handleLike = (): void => emit('like', props.thread.id);
const handleAvatarError = (event: Event): void => {
    (event.target as HTMLImageElement).style.display = 'none';
};
</script>
