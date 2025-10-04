<template>
    <div
        v-if="totalPages > 1 && totalItems > 6"
        class="flex items-center justify-center"
    >
        <div
            class="flex items-center space-x-1 bg-gray-100 rounded-full px-4 py-2 shadow-sm"
        >
            <button
                @click="goToPage(currentPage - 1)"
                :disabled="!hasPrevPage"
                class="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
                <svg
                    class="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M15 19l-7-7 7-7"
                    />
                </svg>
            </button>

            <div class="flex items-center space-x-1">
                <button
                    v-if="currentPage > 3"
                    @click="goToPage(1)"
                    class="flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-200 transition-all duration-200"
                >
                    1
                </button>
                <span v-if="currentPage > 4" class="text-gray-400 px-1"
                    >...</span
                >
                <button
                    v-for="page in visiblePages"
                    :key="page"
                    @click="goToPage(page)"
                    :class="[
                        'flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium transition-all duration-200',
                        page === currentPage
                            ? 'bg-indigo-500 text-white'
                            : 'text-gray-600 hover:bg-gray-200',
                    ]"
                >
                    {{ page }}
                </button>
                <span
                    v-if="currentPage < totalPages - 3"
                    class="text-gray-400 px-1"
                    >...</span
                >
                <button
                    v-if="currentPage < totalPages - 2"
                    @click="goToPage(totalPages)"
                    class="flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium text-gray-600 hover:bg-gray-200 transition-all duration-200"
                >
                    {{ totalPages }}
                </button>
            </div>
            <button
                @click="goToPage(currentPage + 1)"
                :disabled="!hasNextPage"
                class="flex items-center justify-center w-8 h-8 rounded-full hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
            >
                <svg
                    class="w-4 h-4 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M9 5l7 7-7 7"
                    />
                </svg>
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Props {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
}

interface Emits {
    (e: 'page-change', page: number): void;
}

const props = defineProps<Props>();
const emit = defineEmits<Emits>();

const hasPrevPage = computed(() => props.currentPage > 1);
const hasNextPage = computed(() => props.currentPage < props.totalPages);

const visiblePages = computed(() => {
    const pages = [];
    const current = props.currentPage;
    const total = props.totalPages;

    const start = Math.max(1, current - 2);
    const end = Math.min(total, current + 2);

    for (let i = start; i <= end; i++) pages.push(i);
    return pages;
});

const goToPage = (page: number): void => {
    if (page >= 1 && page <= props.totalPages && page !== props.currentPage) {
        emit('page-change', page);
    }
};
</script>
