<template>
    <div :class="containerClass">
        <div class="mb-2 flex items-center justify-between">
            <h3 class="text-sm font-semibold text-slate-900">{{ headingText }}</h3>
            <span v-if="isReply" class="text-[11px] text-slate-400">Replying publicly</span>
        </div>

        <form @submit.prevent="handleSubmit" class="space-y-3">
            <div>
                <label :for="textareaId" class="sr-only">{{ headingText }}</label>
                <textarea
                    :id="textareaId"
                    v-model="form.content"
                    rows="2"
                    required
                    class="w-full resize-none rounded-md border border-slate-200 bg-white px-3 py-1.5 text-sm text-slate-700 placeholder-slate-400 focus:border-indigo-400 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                    :placeholder="placeholderText"
                ></textarea>
            </div>

            <div class="flex items-center justify-end gap-2">
                <button
                    type="button"
                    @click="handleCancel"
                    class="inline-flex items-center gap-1 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-500 transition hover:border-slate-300 hover:text-slate-700"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    :disabled="isSubmitting || !form.content.trim()"
                    class="inline-flex items-center gap-2 rounded-full bg-indigo-600 px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                    <svg
                        v-if="isSubmitting"
                        class="h-4 w-4 animate-spin text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                    >
                        <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" />
                        <path
                            class="opacity-75"
                            fill="currentColor"
                            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        />
                    </svg>
                    <span>{{ isSubmitting ? 'Sending…' : submitText }}</span>
                </button>
            </div>
        </form>

        <div v-if="error" class="mt-3 rounded-md border border-red-200 bg-red-50 p-3 text-xs text-red-700">
            {{ error }}
        </div>
    </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue';
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

const isReply = computed(() => !!props.commentId);
const headingText = computed(() => (isReply.value ? 'Reply to comment' : 'Add a comment'));
const placeholderText = computed(() =>
    isReply.value ? 'Write a concise reply…' : 'Share your thoughts with the community…'
);
const submitText = computed(() => (isReply.value ? 'Post reply' : 'Post comment'));
const textareaId = computed(() => `comment-textarea-${props.commentId ?? 'root'}`);
const containerClass = computed(() =>
    isReply.value
        ? 'rounded-xl border border-slate-200 bg-slate-50 p-4 shadow-sm'
        : 'rounded-xl border border-slate-200 bg-white p-5 shadow-sm'
);

const handleSubmit = async () => {
    if (!authStore.isAuthenticated) {
        error.value = 'You must be logged in to post a comment';
        return;
    }

    if (!form.content.trim()) {
        error.value = 'Please write something before submitting';
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
