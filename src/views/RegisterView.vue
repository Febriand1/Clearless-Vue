<template>
    <Layout>
        <Hero
            title="Join Our Community"
            description="Create your account to start discussing"
            svgPath="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
        />

        <div class="max-w-md mx-auto py-6 px-4 sm:px-6 lg:px-8">
            <div
                class="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
            >
                <FormHeader
                    title="Create Account"
                    description="Join the conversation"
                    svgPath="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                    layout="center"
                    align="text"
                />

                <div class="p-6">
                    <FormInput
                        :form="form"
                        :fields="fields"
                        :formState="formState"
                        submitText="Create Account"
                        submittingText="Creating account..."
                        @submit="handleRegister"
                        @validate="validateForm"
                    />
                </div>

                <Footer
                    to="/login"
                    text1="Already have an account?"
                    text2="Sign in here"
                />
            </div>
        </div>
    </Layout>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import type { RegisterCredentials, FormState } from '@/types';
import { validateRegisterCredentials } from '@/utils/validation';
import Layout from '@/views/Layout.vue';
import FormHeader from '@/components/FormHeader.vue';
import Footer from '@/components/Footer.vue';
import FormInput from '@/components/FormInput.vue';
import Hero from '@/components/Hero.vue';

const router = useRouter();
const authStore = useAuthStore();

const form = reactive<RegisterCredentials>({
    username: '',
    fullname: '',
    email: '',
    password: '',
    confirmPassword: '',
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
        id: 'fullname',
        label: 'Full Name',
        placeholder: 'Enter your full name',
        type: 'text',
    },
    {
        id: 'email',
        label: 'Email',
        placeholder: 'Enter your email',
        type: 'email',
    },
    {
        id: 'password',
        label: 'Password',
        placeholder: 'Enter your password',
        type: 'password',
    },
    {
        id: 'confirmPassword',
        label: 'Confirm Password',
        placeholder: 'Confirm your password',
        type: 'password',
    },
];

const validateForm = (): boolean => {
    const validation = validateRegisterCredentials(form);
    formState.errors = validation.errors;
    formState.isValid = validation.isValid;
    return validation.isValid;
};

const handleRegister = async () => {
    if (!validateForm()) return;

    formState.isSubmitting = true;
    formState.errors = {};

    try {
        const { confirmPassword, ...registerData } = form;
        const result = await authStore.register({
            ...registerData,
            confirmPassword,
        });
        if (result.success) {
            router.push('/login');
        } else {
            formState.errors.general = result.error || 'Registration failed';
        }
    } catch (err) {
        formState.errors.general = 'An error occurred during registration';
    } finally {
        formState.isSubmitting = false;
    }
};
</script>
