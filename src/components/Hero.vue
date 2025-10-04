<template>
    <Navbar />
    <div class="bg-white border-b border-gray-200 shadow-sm">
        <div class="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
            <div class="text-center">
                <div
                    class="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-2"
                >
                    <svg
                        class="w-6 h-6 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            :d="svgPath"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                        />
                    </svg>
                </div>
                <h1 class="text-2xl font-bold text-gray-900 mb-1">
                    {{ title }}
                </h1>
                <p class="text-sm text-gray-600">
                    {{ description }}
                </p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import Navbar from './Navbar.vue';

defineProps<{
    title: string;
    description: string;
    svgPath: string;
}>();
</script>
