<template>
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
                {{ error }}
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    error: string;
}>();
</script>
