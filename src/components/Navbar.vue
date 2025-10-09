<template>
    <nav class="bg-white sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="flex justify-between h-16">
                <div class="flex items-center">
                    <router-link to="/" @click="closeDropdown">
                        <h1 class="text-xl font-bold text-indigo-600">
                            Clearless
                        </h1>
                    </router-link>
                </div>
                <div class="flex items-center space-x-4">
                    <div
                        v-if="authStore.isAuthenticated"
                        class="flex items-center space-x-4"
                    >
                        <router-link
                            to="/thread/create"
                            class="inline-flex items-center px-3 py-2 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200 transition-colors duration-200"
                        >
                            <svg
                                class="w-4 h-4 mr-1"
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
                            Create
                        </router-link>

                        <div class="relative" ref="dropdownRef">
                            <button
                                @click="toggleDropdown"
                                class="flex items-center space-x-2 text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <div
                                    class="w-8 h-8 rounded-full overflow-hidden"
                                >
                                    <img
                                        v-if="authStore.user?.avatar"
                                        :src="authStore.user.avatar"
                                        :alt="
                                            authStore.user.fullname ||
                                            authStore.user.username
                                        "
                                        class="w-full h-full object-cover"
                                        @error="handleAvatarError"
                                    />
                                    <div
                                        v-else
                                        class="w-full h-full bg-indigo-600 flex items-center justify-center"
                                    >
                                        <span
                                            class="text-white font-medium text-sm"
                                        >
                                            {{
                                                authStore.user?.username
                                                    ?.charAt(0)
                                                    .toUpperCase() || 'U'
                                            }}
                                        </span>
                                    </div>
                                </div>
                                <span
                                    class="text-sm font-medium text-gray-700 hidden sm:block"
                                >
                                    {{ authStore.user?.username }}
                                </span>
                                <svg
                                    class="w-4 h-4 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>
                            </button>

                            <div
                                v-if="isDropdownOpen"
                                class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-200"
                            >
                                <div class="px-4 py-2 border-b border-gray-100">
                                    <p
                                        class="text-sm font-medium text-gray-900"
                                    >
                                        {{
                                            authStore.user?.fullname ||
                                            authStore.user?.username
                                        }}
                                    </p>
                                    <p
                                        class="text-xs text-gray-500"
                                        v-if="authStore.user?.email"
                                    >
                                        {{ authStore.user.email }}
                                    </p>
                                </div>
                                <router-link
                                    to="/thread/create"
                                    class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    @click="closeDropdown"
                                >
                                    <svg
                                        class="w-4 h-4 mr-3"
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
                                    Create Thread
                                </router-link>
                                <router-link
                                    to="/profile"
                                    class="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    @click="closeDropdown"
                                >
                                    <svg
                                        class="w-4 h-4 mr-3"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                    Profile
                                </router-link>
                                <button
                                    @click="handleLogout"
                                    class="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    <svg
                                        class="w-4 h-4 mr-3"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                                        />
                                    </svg>
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                    <div v-else class="flex items-center space-x-2">
                        <router-link
                            to="/login"
                            class="text-sm font-medium text-gray-700 hover:text-gray-900"
                        >
                            Login
                        </router-link>
                        <router-link
                            to="/register"
                            class="bg-gray-100 text-gray-900 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-200"
                        >
                            Register
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores';

const router = useRouter();
const authStore = useAuthStore();

const isDropdownOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const toggleDropdown = (): void => {
    isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = (): void => {
    isDropdownOpen.value = false;
};

const handleLogout = async (): Promise<void> => {
    await authStore.logout();
    router.push('/login');
    closeDropdown();
};

const handleAvatarError = (event: Event): void => {
    const img = event.target as HTMLImageElement;
    img.style.display = 'none';
};

const handleClickOutside = (event: Event): void => {
    if (
        dropdownRef.value &&
        !dropdownRef.value.contains(event.target as Node)
    ) {
        closeDropdown();
    }
};

onMounted(() => document.addEventListener('click', handleClickOutside));
onUnmounted(() => document.removeEventListener('click', handleClickOutside));
</script>
