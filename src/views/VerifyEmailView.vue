<template>
    <Layout :hero="hero">
        <div class="max-w-md mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div
                class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
            >
                <FormHeader
                    title="Verify Your Email"
                    description="Enter the code sent to your email"
                    svgPath="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                    layout="center"
                    align="text"
                />

                <div class="p-6">
                    <FormInput
                        :form="form"
                        :fields="fields"
                        :formState="formState"
                        submitText="Verify"
                        submittingText="Verifying..."
                        @submit="handleVerify"
                        @validate="validateForm"
                    />
                </div>
            </div>
        </div>
    </Layout>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores';
import type { FormState } from '@/types';
import { FormHeader, FormInput, Layout } from '@/components';

const hero = {
    title: 'Email Verification',
    description: 'Please check your email for the verification code.',
    svgPath:
        'M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207',
};

const router = useRouter();
const authStore = useAuthStore();

const form = reactive({
    code: '',
});

const formState = reactive<FormState>({
    isSubmitting: false,
    isValid: false,
    errors: {},
});

const fields = [
    {
        id: 'code',
        label: 'Verification Code',
        placeholder: 'Enter your code',
        type: 'text',
    },
];

const validateForm = (): boolean => {
    formState.errors = {};
    if (!form.code) {
        formState.errors.code = 'Verification code is required';
    }
    formState.isValid = Object.keys(formState.errors).length === 0;
    return formState.isValid;
};

const handleVerify = async () => {
    if (!validateForm()) return;

    formState.isSubmitting = true;
    formState.errors = {};

    try {
        const result = await authStore.verifyEmail(form.code);
        if (result.success) {
            router.push('/login');
        } else {
            formState.errors.general = result.error || 'Verification failed';
        }
    } catch (err) {
        formState.errors.general = 'An error occurred during verification';
    } finally {
        formState.isSubmitting = false;
    }
};
</script>
