<template>
    <Layout>
        <Hero
            title="Community Discussions"
            description="Discover, share, and engage with the latest conversations in our community"
            svgPath="M17 8h2a2 2 0 012 2v6a2 2 0 01-2 2h-2v4l-4-4H9a1.994 1.994 0 01-1.414-.586m0 0L11 14h4a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2v4l.586-.586z"
        />
        <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div
                v-if="forumStore.loading"
                class="bg-white rounded-2xl shadow-lg border border-gray-100 p-12"
            >
                <div class="text-center">
                    <div
                        class="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <div
                            class="animate-spin rounded-full h-8 w-8 border-2 border-white border-t-transparent"
                        ></div>
                    </div>
                    <h3 class="text-xl font-semibold text-gray-900 mb-2">
                        Loading Discussions
                    </h3>
                    <p class="text-gray-600">
                        Fetching the latest conversations for you...
                    </p>

                    <div class="mt-8 space-y-4">
                        <div
                            v-for="i in 3"
                            :key="i"
                            class="bg-gray-100 rounded-lg h-4 animate-pulse"
                        ></div>
                    </div>
                </div>
            </div>

            <div
                v-else-if="forumStore.threads.length > 0"
                class="bg-white rounded-2xl shadow-lg border border-gray-100"
            >
                <div class="p-6">
                    <div
                        class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                    >
                        <ThreadCard
                            v-for="thread in forumStore.threads"
                            :key="thread.id"
                            :thread="thread"
                            :is-authenticated="authStore.isAuthenticated"
                            :like-state="getThreadLikeState(thread.id)"
                            :is-liking="likingThreads.has(thread.id)"
                            @like="handleLikeThread"
                        />
                    </div>
                </div>
                <div
                    v-if="forumStore.totalItems > 6"
                    class="px-8 py-2 border-b border-gray-100"
                >
                    <Pagination
                        :current-page="forumStore.currentPage"
                        :total-pages="forumStore.totalPages"
                        :total-items="forumStore.totalItems"
                        :items-per-page="forumStore.pagination.limit"
                        @page-change="handlePageChange"
                    />
                </div>
            </div>

            <div
                v-else
                class="bg-white rounded-2xl shadow-lg border border-gray-100 p-12"
            >
                <EmptyState />
            </div>
        </div>
    </Layout>
</template>

<script setup lang="ts">
import { onMounted, onActivated, watch, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { useForumStore } from '@/stores/forum';
import { useLikeStore } from '@/stores/likeStore';
import type { LikeState } from '@/types';
import Layout from '@/views/Layout.vue';
import ThreadCard from '@/components/ThreadCard.vue';
import EmptyState from '@/components/EmptyState.vue';
import Pagination from '@/components/Pagination.vue';
import Hero from '@/components/Hero.vue';

const route = useRoute();
const authStore = useAuthStore();
const forumStore = useForumStore();
const likeStore = useLikeStore();

const likingThreads = ref<Set<string>>(new Set());

const getThreadLikeState = (threadId: string): LikeState => {
    return likeStore.getLikeState(threadId);
};

const syncThreadLikeStates = (): void => {
    forumStore.threads.forEach((thread) => {
        likeStore.syncLikeState(
            thread.id,
            thread.isLiked || false,
            thread.likeCount || 0
        );
    });
};

onMounted(async () => {
    await forumStore.fetchThreads(1, 6);
    syncThreadLikeStates();
});

onActivated(async () => {
    await forumStore.fetchThreads(1, 6);
    syncThreadLikeStates();
});

watch(
    () => route.path,
    async (newPath) => {
        if (newPath === '/') {
            await forumStore.fetchThreads(1, 6);
            syncThreadLikeStates();
        }
    }
);

watch(
    () => forumStore.threads,
    () => {
        syncThreadLikeStates();
    },
    { deep: true }
);

const handleLikeThread = async (threadId: string): Promise<void> => {
    if (!authStore.isAuthenticated || !authStore.user?.id) return;
    if (likingThreads.value.has(threadId)) return;

    likingThreads.value.add(threadId);

    try {
        const result = await likeStore.toggleLike(
            'THREAD',
            threadId,
            threadId,
            authStore.user.id
        );

        if (result.success && result.data) {
            forumStore.updateThreadLikeState(
                threadId,
                result.data.isLiked,
                result.data.likeCount
            );
        }
    } catch (error) {
        console.error('Failed to like thread:', error);
    } finally {
        likingThreads.value.delete(threadId);
    }
};

const handlePageChange = async (page: number): Promise<void> => {
    await forumStore.fetchThreads(page, 6);
    syncThreadLikeStates();

    window.scrollTo({ top: 0, behavior: 'smooth' });
};
</script>
