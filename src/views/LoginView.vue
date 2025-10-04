<template>
    <Layout :hero="hero">
        <div class="max-w-md mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div
                class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
            >
                <FormHeader
                    title="Sign In"
                    description="Access your account"
                    svgPath="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    layout="center"
                    align="text"
                />

                <div class="p-8">
                    <FormInput
                        :form="form"
                        :fields="fields"
                        :formState="formState"
                        submitText="Sign in"
                        submittingText="Signing in..."
                        @submit="handleLogin"
                        @validate="validateForm"
                    />
                </div>

                <Footer
                    to="/register"
                    text1="Don't have an account?"
                    text2="Create one here"
                />
            </div>
        </div>
    </Layout>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores';
import type { LoginCredentials, FormState } from '@/types';
import { validateLoginCredentials } from '@/utils/validation';
import { FormHeader, Footer, FormInput, Layout } from '@/components';

const hero = {
    title: 'Welcome Back',
    description: 'Sign in to your account to continue the conversation',
    svgPath:
        'M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1',
};

const router = useRouter();
const authStore = useAuthStore();

const form = reactive<LoginCredentials>({
    username: '',
    password: '',
});

const formState = reactive<FormState>({
    isSubmitting: false,
    isValid: false,
    errors: {},
});

const fields = [
    {
        id: 'username',
        label: 'Username',
        placeholder: 'Enter your username',
        type: 'text',
    },
    {
        id: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        type: 'password',
    },
];

const validateForm = (): boolean => {
    const validation = validateLoginCredentials(form);
    formState.errors = validation.errors;
    formState.isValid = validation.isValid;
    return validation.isValid;
};

const handleLogin = async () => {
    if (!validateForm()) return;

    formState.isSubmitting = true;
    formState.errors = {};

    try {
        const result = await authStore.login(form);
        if (result.success) {
            router.push('/');
        } else {
            formState.errors.general = result.error || 'Login failed';
        }
    } catch (err) {
        formState.errors.general = 'An error occurred during login';
    } finally {
        formState.isSubmitting = false;
    }
};
</script>
