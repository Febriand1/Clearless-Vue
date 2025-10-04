<template>
    <Layout>
        <Hero
            title="Profile Settings"
            description="Manage your account information and preferences"
            svgPath="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
        />
        <div class="max-w-2xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div
                class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
            >
                <FormHeader
                    title="Edit Profile"
                    description="Update your information"
                    svgPath="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                    layout="inline"
                    align="flex"
                />

                <div class="p-6">
                    <form
                        class="space-y-6"
                        @submit.prevent="handleUpdateProfile"
                    >
                        <div class="space-y-4">
                            <div>
                                <label
                                    for="fullname"
                                    class="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Full Name
                                </label>
                                <input
                                    id="fullname"
                                    v-model.trim="form.fullname"
                                    @blur="validateForm"
                                    @input="validateForm"
                                    name="fullname"
                                    type="text"
                                    autocomplete="name"
                                    required
                                    :class="[
                                        'w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
                                        formState.errors.fullname
                                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                            : 'border-gray-300',
                                    ]"
                                    placeholder="Enter your full name"
                                />
                                <p
                                    v-if="formState.errors.fullname"
                                    class="mt-1 text-sm text-red-600"
                                >
                                    {{ formState.errors.fullname }}
                                </p>
                            </div>

                            <div>
                                <label
                                    for="email"
                                    class="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    v-model.trim="form.email"
                                    @blur="validateForm"
                                    @input="validateForm"
                                    name="email"
                                    type="email"
                                    autocomplete="email"
                                    :class="[
                                        'w-full px-3 py-2 border rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm',
                                        formState.errors.email
                                            ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                                            : 'border-gray-300',
                                    ]"
                                    placeholder="Enter your email address"
                                />
                                <p
                                    v-if="formState.errors.email"
                                    class="mt-1 text-sm text-red-600"
                                >
                                    {{ formState.errors.email }}
                                </p>
                            </div>

                            <div>
                                <label
                                    class="block text-sm font-medium text-gray-700 mb-2"
                                >
                                    Profile Picture
                                </label>

                                <div class="flex items-center space-x-6 mb-4">
                                    <div
                                        class="w-20 h-20 rounded-full overflow-hidden ring-4 ring-indigo-100"
                                    >
                                        <img
                                            v-if="
                                                avatarPreview ||
                                                (authStore.user?.avatar &&
                                                    form.avatar !== '')
                                            "
                                            :src="
                                                avatarPreview ||
                                                authStore.user?.avatar
                                            "
                                            :alt="
                                                form.fullname ||
                                                authStore.user?.username
                                            "
                                            class="w-full h-full object-cover"
                                            @error="handleAvatarPreviewError"
                                        />
                                        <div
                                            v-else
                                            class="w-full h-full bg-gradient-to-r from-indigo-500 to-purple-500 flex items-center justify-center"
                                        >
                                            <span
                                                class="text-white font-bold text-lg"
                                            >
                                                {{
                                                    (
                                                        form.fullname ||
                                                        authStore.user
                                                            ?.username ||
                                                        'U'
                                                    )
                                                        .charAt(0)
                                                        .toUpperCase()
                                                }}
                                            </span>
                                        </div>
                                    </div>
                                    <div>
                                        <input
                                            ref="fileInput"
                                            type="file"
                                            accept="image/*"
                                            @change="handleFileUpload"
                                            class="hidden"
                                        />
                                        <button
                                            type="button"
                                            @click="
                                                (
                                                    $refs.fileInput as HTMLInputElement
                                                )?.click()
                                            "
                                            class="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors duration-200"
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
                                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
                                                />
                                            </svg>
                                            Upload Photo
                                        </button>
                                        <button
                                            v-if="
                                                avatarPreview ||
                                                authStore.user?.avatar
                                            "
                                            type="button"
                                            @click="removeAvatar"
                                            :disabled="isRemovingAvatar"
                                            class="ml-3 inline-flex items-center px-4 py-2 border border-red-300 rounded-lg shadow-sm text-sm font-medium text-red-700 bg-white hover:bg-red-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                                        >
                                            <svg
                                                v-if="!isRemovingAvatar"
                                                class="w-4 h-4 mr-2"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                                />
                                            </svg>
                                            <svg
                                                v-else
                                                class="w-4 h-4 mr-2 animate-spin"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                                />
                                            </svg>
                                            {{
                                                isRemovingAvatar
                                                    ? 'Removing...'
                                                    : 'Remove'
                                            }}
                                        </button>
                                    </div>
                                </div>

                                <p class="text-xs text-gray-500">
                                    JPG, PNG or GIF. Max file size 2MB.
                                </p>

                                <p
                                    v-if="formState.errors.avatar"
                                    class="mt-1 text-sm text-red-600"
                                >
                                    {{ formState.errors.avatar }}
                                </p>
                            </div>
                        </div>

                        <div
                            v-if="formState.errors.general"
                            class="bg-red-50 border border-red-200 rounded-md p-4"
                        >
                            <div class="flex">
                                <svg
                                    class="h-5 w-5 text-red-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                    />
                                </svg>
                                <div class="ml-3">
                                    <p class="text-sm text-red-800">
                                        {{ formState.errors.general }}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div
                            v-if="showSuccessMessage"
                            class="bg-green-50 border border-green-200 rounded-md p-4"
                        >
                            <div class="flex">
                                <svg
                                    class="h-5 w-5 text-green-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <div class="ml-3">
                                    <p class="text-sm text-green-800">
                                        Profile updated successfully!
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div class="flex justify-between">
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
                                    formState.isSubmitting || !hasChanges
                                "
                                class="inline-flex items-center px-6 py-3 border border-transparent rounded-xl shadow-lg text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
                            >
                                <svg
                                    v-if="formState.isSubmitting"
                                    class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 714 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
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
                                        d="M5 13l4 4L19 7"
                                    />
                                </svg>
                                <span v-if="formState.isSubmitting"
                                    >Updating...</span
                                >
                                <span v-else>Update Profile</span>
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script setup lang="ts">
import { reactive, computed, onMounted, ref } from 'vue';
import { useAuthStore } from '@/stores/auth';
import type { UpdateProfileData, FormState } from '@/types';
import { validateProfileUpdateData } from '@/utils/validation';
import Hero from '@/components/Hero.vue';
import FormHeader from '@/components/FormHeader.vue';
import Layout from '@/views/Layout.vue';

const authStore = useAuthStore();
const showSuccessMessage = ref(false);
const avatarPreview = ref<string>('');
const selectedFile = ref<File | null>(null);
const isRemovingAvatar = ref(false);

const form = reactive<UpdateProfileData>({
    fullname: '',
    email: '',
    avatar: '',
});

const formState = reactive<FormState>({
    isSubmitting: false,
    isValid: false,
    errors: {},
});

const originalData = reactive<UpdateProfileData>({
    fullname: '',
    email: '',
    avatar: '',
});

const hasChanges = computed(() => {
    return (
        form.fullname !== originalData.fullname ||
        form.email !== originalData.email ||
        form.avatar !== originalData.avatar ||
        selectedFile.value !== null ||
        avatarPreview.value !== ''
    );
});

const validateForm = (): boolean => {
    const validation = validateProfileUpdateData(form, !!selectedFile.value);
    formState.errors = validation.errors;
    formState.isValid = validation.isValid;
    return validation.isValid;
};

const handleAvatarPreviewError = (event: Event): void => {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
};

const handleFileUpload = (event: Event): void => {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (!file) return;

    if (!file.type.startsWith('image/')) {
        formState.errors.avatar = 'Please select a valid image file';
        return;
    }

    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
        formState.errors.avatar = 'File size must be less than 2MB';
        return;
    }

    formState.errors.avatar = '';

    selectedFile.value = file;

    const reader = new FileReader();
    reader.onload = (e) => {
        avatarPreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);

    validateForm();
};

const removeAvatar = async (): Promise<void> => {
    if (isRemovingAvatar.value) return;

    isRemovingAvatar.value = true;
    formState.errors.general = '';

    try {
        const result = await authStore.deleteAvatar();

        if (result.success) {
            selectedFile.value = null;
            avatarPreview.value = '';
            form.avatar = '';

            const fileInput = document.querySelector(
                'input[type="file"]'
            ) as HTMLInputElement;
            if (fileInput) {
                fileInput.value = '';
            }

            originalData.avatar = '';

            showSuccessMessage.value = true;
            setTimeout(() => {
                showSuccessMessage.value = false;
            }, 3000);

            validateForm();
        } else {
            formState.errors.general =
                result.error || 'Failed to delete avatar';
        }
    } catch (error) {
        console.error('Remove avatar error:', error);
        formState.errors.general = 'An error occurred while removing avatar';
    } finally {
        isRemovingAvatar.value = false;
    }
};

const handleUpdateProfile = async (): Promise<void> => {
    if (!validateForm()) return;
    if (!hasChanges.value) return;

    formState.isSubmitting = true;
    formState.errors = {};
    showSuccessMessage.value = false;

    try {
        const updateData: UpdateProfileData = {};

        if (form.fullname !== originalData.fullname) {
            const trimmedFullname = form.fullname?.trim();
            if (trimmedFullname && trimmedFullname.length > 0) {
                updateData.fullname = trimmedFullname;
            }
        }

        if (form.email !== originalData.email) {
            const trimmedEmail = form.email?.trim();
            if (trimmedEmail && trimmedEmail.length > 0) {
                updateData.email = trimmedEmail;
            }
        }

        if (selectedFile.value) {
            const formData = new FormData();

            if (form.fullname !== originalData.fullname) {
                const trimmedFullname = form.fullname?.trim();
                if (trimmedFullname && trimmedFullname.length > 0) {
                    formData.append('fullname', trimmedFullname);
                }
            }

            if (form.email !== originalData.email) {
                const trimmedEmail = form.email?.trim();
                if (trimmedEmail && trimmedEmail.length > 0) {
                    formData.append('email', trimmedEmail);
                }
            }
            formData.append('avatar', selectedFile.value);

            const result = await authStore.updateProfileWithFile(formData);

            if (result.success) {
                originalData.fullname = form.fullname;
                originalData.email = form.email;
                originalData.avatar = result.data?.avatar || '';
                form.avatar = result.data?.avatar || '';
                selectedFile.value = null;
                avatarPreview.value = '';
                showSuccessMessage.value = true;
                setTimeout(() => {
                    showSuccessMessage.value = false;
                }, 3000);
            } else {
                formState.errors.general =
                    result.error || 'Failed to update profile';
            }
        } else {
            if (form.avatar !== originalData.avatar) {
                const trimmedAvatar = form.avatar?.trim();
                if (trimmedAvatar && trimmedAvatar.length > 0) {
                    updateData.avatar = trimmedAvatar;
                } else if (
                    originalData.avatar &&
                    originalData.avatar.length > 0
                ) {
                    updateData.avatar = '';
                }
            }

            if (Object.keys(updateData).length === 0) {
                formState.errors.general = 'No valid changes to update';
                return;
            }

            const result = await authStore.updateProfile(updateData);
            if (result.success) {
                originalData.fullname = form.fullname;
                originalData.email = form.email;
                originalData.avatar = result.data?.avatar || form.avatar;
                form.avatar = result.data?.avatar || form.avatar;
                showSuccessMessage.value = true;
                setTimeout(() => {
                    showSuccessMessage.value = false;
                }, 3000);
            } else {
                formState.errors.general =
                    result.error || 'Failed to update profile';
            }
        }
    } catch (err) {
        formState.errors.general = 'An error occurred while updating profile';
    } finally {
        formState.isSubmitting = false;
    }
};

onMounted(() => {
    if (authStore.user) {
        form.fullname = authStore.user.fullname || '';
        form.email = authStore.user.email || '';
        form.avatar = authStore.user.avatar || '';
        originalData.fullname = form.fullname;
        originalData.email = form.email;
        originalData.avatar = form.avatar;
    }
});
</script>
