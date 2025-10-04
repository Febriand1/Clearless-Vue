<template>
    <Layout :hero="hero">
        <div class="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div
                class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
            >
                <FormHeader
                    title="Create Thread"
                    description="Start a new conversation"
                    svgPath="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    layout="inline"
                    align="flex"
                />

                <div class="p-8">
                    <form @submit.prevent="handleSubmit" class="space-y-6">
                        <div>
                            <label
                                for="title"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Thread Title
                            </label>
                            <input
                                id="title"
                                v-model="form.title"
                                @blur="validateForm"
                                type="text"
                                required
                                :class="[
                                    'mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500',
                                    formState.errors.title
                                        ? 'border-red-300'
                                        : 'border-gray-300',
                                ]"
                                placeholder="Enter thread title"
                            />
                            <p
                                v-if="formState.errors.title"
                                class="mt-1 text-sm text-red-600"
                            >
                                {{ formState.errors.title }}
                            </p>
                        </div>

                        <div>
                            <label
                                for="body"
                                class="block text-sm font-medium text-gray-700"
                            >
                                Thread Content
                            </label>
                            <textarea
                                id="body"
                                v-model="form.body"
                                @blur="validateForm"
                                rows="8"
                                required
                                :class="[
                                    'mt-1 block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500',
                                    formState.errors.body
                                        ? 'border-red-300'
                                        : 'border-gray-300',
                                ]"
                                placeholder="Write your thread content here..."
                            ></textarea>
                            <p
                                v-if="formState.errors.body"
                                class="mt-1 text-sm text-red-600"
                            >
                                {{ formState.errors.body }}
                            </p>
                        </div>

                        <div class="flex items-center justify-between">
                            <router-link
                                to="/"
                                class="inline-flex items-center px-6 py-3 border border-gray-300 rounded-xl shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-all duration-200 hover:scale-105"
                            >
                                <svg
                                    class="w-4 h-4 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                                Cancel
                            </router-link>
                            <button
                                type="submit"
                                :disabled="
                                    formState.isSubmitting || !formState.isValid
                                "
                                class="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                            >
                                <svg
                                    v-if="formState.isSubmitting"
                                    class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                                <svg
                                    v-else
                                    class="w-4 h-4 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                                {{
                                    formState.isSubmitting
                                        ? 'Creating...'
                                        : 'Create Thread'
                                }}
                            </button>
                        </div>
                    </form>
                </div>

                <div
                    v-if="formState.errors.general"
                    class="border-t border-gray-100 p-6 bg-red-50"
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
                                Error creating thread
                            </h3>
                            <div class="mt-2 text-sm text-red-700">
                                {{ formState.errors.general }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script setup lang="ts">
import { reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useForumStore, useAuthStore } from '@/stores';
import type { CreateThreadData, FormState } from '@/types';
import { FormHeader, Layout } from '@/components';
import { validateCreateThreadData } from '@/utils/validation';

const hero = {
    title: 'Create New Discussion',
    description:
        'Share your thoughts and start meaningful conversations with the community',
    svgPath:
        'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
};

const router = useRouter();
const forumStore = useForumStore();
const authStore = useAuthStore();

const owner = computed(() => authStore.user?.username ?? '');

const form = reactive<CreateThreadData>({
    title: '',
    body: '',
    owner: owner.value,
});

const formState = reactive<FormState>({
    isSubmitting: false,
    isValid: false,
    errors: {},
});

const resetForm = (): void => {
    form.title = '';
    form.body = '';
    form.owner = owner.value;
    formState.errors = {};
    formState.isValid = false;
};

const validateForm = (): boolean => {
    const validation = validateCreateThreadData({
        title: form.title,
        body: form.body,
    });
    formState.errors = validation.errors;
    formState.isValid = validation.isValid;
    return validation.isValid;
};

const handleSubmit = async (): Promise<void> => {
    form.owner = owner.value;

    if (!validateForm()) return;

    formState.isSubmitting = true;
    formState.errors = {};

    try {
        const result = await forumStore.createThread(form);

        if (result.success) {
            resetForm();
            router.push('/');
        } else {
            formState.errors.general =
                result.error || 'Failed to create thread';
        }
    } catch (err: any) {
        formState.errors.general =
            err?.message || 'An unexpected error occurred';
    } finally {
        formState.isSubmitting = false;
    }
};
</script>
