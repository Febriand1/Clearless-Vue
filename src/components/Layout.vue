<template>
    <div
        class="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-50"
    >
        <Hero
            :title="hero.title"
            :description="hero.description"
            :svgPath="hero.svgPath"
        />
        <slot />
    </div>
</template>
<script setup lang="ts">
import { Hero } from '@/components';

defineProps<{
    hero: {
        title: string;
        description: string;
        svgPath: string;
    };
}>();
</script>
