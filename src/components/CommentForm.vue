<template>
    <div class="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Add a Comment</h3>

        <form @submit.prevent="handleSubmit" class="space-y-4">
            <div>
                <label
                    for="content"
                    class="block text-sm font-medium text-gray-700 mb-2"
                >
                    Your Comment
                </label>
                <textarea
                    id="content"
                    v-model="form.content"
                    rows="4"
                    required
                    class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Write your comment here..."
                ></textarea>
            </div>

            <div class="flex justify-end space-x-3">
                <button
                    type="button"
                    @click="handleCancel"
                    class="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    :disabled="isSubmitting"
                    class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <svg
                        v-if="isSubmitting"
                        class="animate-spin -ml-1 mr-2 h-4 w-4 text-white inline"
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
                    {{ isSubmitting ? 'Posting...' : 'Post Comment' }}
                </button>
            </div>
        </form>

        <div
            v-if="error"
            class="mt-4 p-4 bg-red-50 border border-red-200 rounded-md"
        >
            <div class="flex">
                <div class="flex-shrink-0">
                    <svg
                        class="h-5 w-5 text-red-400"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clip-rule="evenodd"
                        />
                    </svg>
                </div>
                <div class="ml-3">
                    <h3 class="text-sm font-medium text-red-800">
                        Error posting comment
                    </h3>
                    <div class="mt-2 text-sm text-red-700">
                        {{ error }}
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useForumStore, useAuthStore } from '@/stores';
import type { CreateCommentData } from '@/types';

interface Props {
    threadId: string;
    commentId?: string;
}

interface Emits {
    (e: 'comment-created'): void;
    (e: 'reply-created', data: { content: string; owner: string }): void;
    (e: 'cancel'): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const forumStore = useForumStore();
const authStore = useAuthStore();

const form = reactive<CreateCommentData>({
    content: '',
    threadId: props.threadId,
    owner: authStore.user?.username || '',
});

const isSubmitting = ref(false);
const error = ref('');

const handleSubmit = async () => {
    if (!authStore.isAuthenticated) {
        error.value = 'You must be logged in to post a comment';
        return;
    }

    isSubmitting.value = true;
    error.value = '';

    try {
        if (props.commentId) {
            emit('reply-created', {
                content: form.content,
                owner: authStore.user?.username || '',
            });
            form.content = '';
        } else {
            const result = await forumStore.createComment(form);

            if (result.success) {
                form.content = '';
                emit('comment-created');
            } else {
                error.value = result.error || 'Failed to post comment';
            }
        }
    } catch (err: any) {
        error.value = err.message || 'An unexpected error occurred';
    } finally {
        isSubmitting.value = false;
    }
};

const handleCancel = () => {
    form.content = '';
    error.value = '';
    emit('cancel');
};
</script>
