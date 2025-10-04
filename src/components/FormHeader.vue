<template>
    <div class="bg-gradient-to-r from-indigo-500 to-purple-500 p-6">
        <div :class="[align === 'text' ? 'text-center' : 'flex items-center']">
            <div
                class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                :class="[layout === 'center' ? 'mx-auto mb-2' : 'mr-4']"
            >
                <svg
                    class="w-5 h-5 text-white"
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
            <div>
                <h2 class="text-xl font-bold text-white">{{ title }}</h2>
                <p class="text-indigo-100 text-sm">{{ description }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    title: string;
    description: string;
    svgPath: string;
    layout?: 'center' | 'inline';
    align?: 'text' | 'flex';
}>();
</script>
