<template>
    <div class="bg-gray-50 px-8 py-6 border-t border-gray-100">
        <div class="text-center">
            <p class="text-sm text-gray-600">
                {{ text1 }}
                <router-link
                    :to="to"
                    class="font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200"
                >
                    {{ text2 }}
                </router-link>
            </p>
        </div>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    to: string;
    text1: string;
    text2: string;
}>();
</script>
