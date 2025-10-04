<template>
    <Layout :hero="hero">
        <div class="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div v-if="currentThread" class="mb-6">
                <div
                    class="bg-white rounded-xl shadow-sm border border-gray-200 p-4"
                >
                    <div
                        class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3"
                    >
                        <router-link
                            to="/"
                            class="inline-flex items-center px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm font-medium text-gray-700 transition-colors duration-200"
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
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                            Back to Threads
                        </router-link>

                        <div
                            v-if="isAuthenticated"
                            class="flex flex-wrap gap-2 sm:gap-3"
                        >
                            <button
                                class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-lg text-sm font-medium text-white transition-all duration-200 shadow-md hover:shadow-lg"
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
                                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                                    />
                                </svg>
                                Bookmark
                            </button>
                            <router-link
                                to="/create-thread"
                                class="inline-flex items-center px-4 py-2 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 rounded-lg text-sm font-medium text-white transition-all duration-200 shadow-md hover:shadow-lg"
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
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                                New Thread
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>

            <div
                v-if="isLoading"
                class="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8"
            >
                <div class="lg:col-span-3 space-y-4 lg:space-y-6">
                    <div
                        class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                    >
                        <div
                            class="bg-gradient-to-r from-gray-300 via-gray-400 to-gray-300 p-4 lg:p-6 animate-pulse"
                        >
                            <div
                                class="flex flex-col lg:flex-row lg:items-start justify-between gap-4"
                            >
                                <div class="flex-1">
                                    <div
                                        class="h-8 bg-white/20 rounded mb-3"
                                    ></div>
                                    <div class="flex items-center space-x-2">
                                        <div
                                            class="w-10 h-10 bg-white/20 rounded-full"
                                        ></div>
                                        <div>
                                            <div
                                                class="h-4 w-24 bg-white/20 rounded mb-1"
                                            ></div>
                                            <div
                                                class="h-3 w-16 bg-white/20 rounded"
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    class="w-20 h-10 bg-white/20 rounded-xl"
                                ></div>
                            </div>
                        </div>
                        <div class="p-4 lg:p-6 animate-pulse">
                            <div class="space-y-3">
                                <div
                                    class="h-4 bg-gray-200 rounded w-full"
                                ></div>
                                <div
                                    class="h-4 bg-gray-200 rounded w-5/6"
                                ></div>
                                <div
                                    class="h-4 bg-gray-200 rounded w-4/6"
                                ></div>
                                <div
                                    class="h-4 bg-gray-200 rounded w-3/6"
                                ></div>
                            </div>
                        </div>
                    </div>

                    <div
                        class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse"
                    >
                        <div class="flex items-center space-x-3 mb-4">
                            <div
                                class="w-10 h-10 bg-gray-200 rounded-full"
                            ></div>
                            <div>
                                <div
                                    class="h-4 w-32 bg-gray-200 rounded mb-1"
                                ></div>
                                <div class="h-3 w-24 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                        <div class="h-24 bg-gray-200 rounded-lg"></div>
                    </div>
                </div>

                <div class="space-y-6">
                    <div
                        class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 animate-pulse"
                    >
                        <div class="h-6 bg-gray-200 rounded mb-4"></div>
                        <div class="space-y-3">
                            <div class="flex justify-between">
                                <div class="h-4 w-16 bg-gray-200 rounded"></div>
                                <div class="h-4 w-20 bg-gray-200 rounded"></div>
                            </div>
                            <div class="flex justify-between">
                                <div class="h-4 w-12 bg-gray-200 rounded"></div>
                                <div class="h-4 w-16 bg-gray-200 rounded"></div>
                            </div>
                            <div class="flex justify-between">
                                <div class="h-4 w-14 bg-gray-200 rounded"></div>
                                <div class="h-4 w-8 bg-gray-200 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div
                v-else-if="currentThread"
                class="grid grid-cols-1 lg:grid-cols-4 gap-4 lg:gap-8"
            >
                <div class="lg:col-span-3 space-y-4 lg:space-y-6">
                    <div
                        class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transform transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                    >
                        <div
                            class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4 lg:p-6 text-white"
                        >
                            <div
                                class="flex flex-col lg:flex-row lg:items-start justify-between gap-4"
                            >
                                <div class="flex-1">
                                    <h1
                                        class="text-2xl font-bold mb-3 leading-tight"
                                    >
                                        {{ currentThread.title }}
                                    </h1>
                                    <div
                                        class="flex items-center space-x-4 text-indigo-100"
                                    >
                                        <div
                                            class="flex items-center space-x-2"
                                        >
                                            <div
                                                class="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm"
                                            >
                                                <span
                                                    class="text-white font-semibold text-sm"
                                                >
                                                    {{
                                                        currentThread.username
                                                            ?.charAt(0)
                                                            .toUpperCase() ||
                                                        'U'
                                                    }}
                                                </span>
                                            </div>
                                            <div>
                                                <div
                                                    class="font-medium text-white"
                                                >
                                                    {{
                                                        currentThread?.username
                                                    }}
                                                </div>
                                                <div
                                                    class="text-xs text-indigo-200"
                                                >
                                                    {{
                                                        formatDate(
                                                            currentThread?.date ||
                                                                ''
                                                        )
                                                    }}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="flex items-center space-x-3">
                                    <button
                                        v-if="isAuthenticated"
                                        @click="handleLikeThread"
                                        class="flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl backdrop-blur-sm transition-all duration-200"
                                    >
                                        <svg
                                            class="w-5 h-5"
                                            :class="
                                                isLikedState
                                                    ? 'text-red-300'
                                                    : 'text-white'
                                            "
                                            fill="currentColor"
                                            viewBox="0 0 20 20"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                        <span class="font-medium text-white">{{
                                            likeCountState
                                        }}</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div class="p-6">
                            <div
                                class="prose max-w-none text-gray-700 leading-relaxed"
                            >
                                <div
                                    class="whitespace-pre-wrap text-lg leading-relaxed"
                                >
                                    {{ currentThread?.body }}
                                </div>
                            </div>

                            <div
                                v-if="isAuthenticated && !showCommentForm"
                                class="mt-6 pt-4 border-t border-gray-100"
                            >
                                <button
                                    @click="toggleCommentForm"
                                    class="flex items-center space-x-2 text-gray-600 hover:text-indigo-600 transition-colors duration-200 group"
                                >
                                    <svg
                                        class="w-5 h-5 group-hover:scale-110 transition-transform duration-200"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                        />
                                    </svg>
                                    <span class="text-sm font-medium"
                                        >Add a comment</span
                                    >
                                </button>
                            </div>

                            <div class="mt-6 pt-6 border-t border-gray-100">
                                <div class="flex items-center justify-between">
                                    <div
                                        class="flex items-center space-x-6 text-sm text-gray-500"
                                    >
                                        <button
                                            v-if="isAuthenticated"
                                            @click="toggleCommentForm"
                                            class="flex items-center space-x-2 hover:text-indigo-600 transition-colors duration-200 group"
                                        >
                                            <div
                                                class="w-8 h-8 bg-blue-100 group-hover:bg-indigo-100 rounded-full flex items-center justify-center transition-colors duration-200"
                                            >
                                                <svg
                                                    class="w-4 h-4 text-blue-600 group-hover:text-indigo-600 transition-colors duration-200"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                                    />
                                                </svg>
                                            </div>
                                            <span
                                                class="font-medium group-hover:text-indigo-600 transition-colors duration-200"
                                                >{{
                                                    comments.length
                                                }}
                                                comments</span
                                            >
                                        </button>
                                        <div
                                            v-else
                                            class="flex items-center space-x-2"
                                        >
                                            <div
                                                class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center"
                                            >
                                                <svg
                                                    class="w-4 h-4 text-blue-600"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        stroke-width="2"
                                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                                    />
                                                </svg>
                                            </div>
                                            <span class="font-medium"
                                                >{{
                                                    comments.length
                                                }}
                                                comments</span
                                            >
                                        </div>
                                        <div
                                            class="flex items-center space-x-2"
                                        >
                                            <div
                                                class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center"
                                            >
                                                <svg
                                                    class="w-4 h-4 text-red-600"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                >
                                                    <path
                                                        fill-rule="evenodd"
                                                        d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
                                                        clip-rule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                            <span class="font-medium"
                                                >{{
                                                    likeCountState
                                                }}
                                                likes</span
                                            >
                                        </div>
                                    </div>
                                    <div
                                        class="text-xs text-gray-400 bg-gray-50 px-3 py-1 rounded-full"
                                    >
                                        ID: {{ currentThread?.id }}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div
                        v-if="isAuthenticated && showCommentForm"
                        class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 transform transition-all duration-300 hover:shadow-xl"
                    >
                        <div class="flex items-center justify-between mb-4">
                            <div class="flex items-center space-x-3">
                                <div
                                    class="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center"
                                >
                                    <span
                                        class="text-white font-semibold text-sm"
                                    >
                                        {{
                                            authStore.user?.username
                                                ?.charAt(0)
                                                .toUpperCase() || 'U'
                                        }}
                                    </span>
                                </div>
                                <div>
                                    <h3 class="font-semibold text-gray-900">
                                        Share your thoughts
                                    </h3>
                                    <p class="text-sm text-gray-500">
                                        Join the discussion
                                    </p>
                                </div>
                            </div>
                            <button
                                @click="toggleCommentForm"
                                class="text-gray-400 hover:text-gray-600 transition-colors duration-200"
                            >
                                <svg
                                    class="w-6 h-6"
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
                            </button>
                        </div>
                        <CommentForm
                            :thread-id="threadId"
                            @comment-created="handleCommentCreated"
                            @cancel="showCommentForm = false"
                        />
                    </div>

                    <div
                        v-if="!isAuthenticated"
                        class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8"
                    >
                        <div class="text-center">
                            <div
                                class="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4"
                            >
                                <svg
                                    class="w-8 h-8 text-white"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                    />
                                </svg>
                            </div>
                            <h3 class="text-xl font-bold text-gray-900 mb-2">
                                Join the Discussion
                            </h3>
                            <p class="text-gray-600 mb-6">
                                Please log in to add your comment and engage
                                with the community
                            </p>
                            <router-link
                                to="/login"
                                class="inline-flex items-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 hover:from-indigo-600 hover:to-purple-600 rounded-xl text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg"
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
                                        d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                    />
                                </svg>
                                Login to Comment
                            </router-link>
                        </div>
                    </div>

                    <div
                        class="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden transform transition-all duration-300 hover:shadow-xl"
                    >
                        <div
                            class="bg-gradient-to-r from-blue-500 to-indigo-500 p-4"
                        >
                            <h2
                                class="text-xl font-bold text-white flex items-center"
                            >
                                <svg
                                    class="w-6 h-6 mr-2"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                        stroke-width="2"
                                        d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                                    />
                                </svg>
                                Discussion ({{ comments.length }})
                            </h2>
                        </div>
                        <div class="p-6">
                            <CommentsSection
                                :thread-id="threadId"
                                :comments="comments"
                                :comment-count="comments.length"
                                :is-authenticated="isAuthenticated"
                                :loading="forumStore.loading"
                                @comment-created="handleCommentCreated"
                                @load-more="handleLoadMore"
                            />
                        </div>
                    </div>
                </div>

                <div class="space-y-6">
                    <div
                        class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-6"
                    >
                        <h3
                            class="font-bold text-gray-900 mb-4 flex items-center"
                        >
                            <svg
                                class="w-5 h-5 mr-2 text-indigo-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            Thread Info
                        </h3>
                        <div class="space-y-3">
                            <div
                                class="flex items-center justify-between py-2 border-b border-gray-100"
                            >
                                <span class="text-sm text-gray-600"
                                    >Created</span
                                >
                                <span
                                    class="text-sm font-medium text-gray-900"
                                    >{{
                                        formatDate(
                                            forumStore.currentThread?.date || ''
                                        )
                                    }}</span
                                >
                            </div>
                            <div
                                class="flex items-center justify-between py-2 border-b border-gray-100"
                            >
                                <span class="text-sm text-gray-600"
                                    >Author</span
                                >
                                <span
                                    class="text-sm font-medium text-gray-900"
                                    >{{
                                        forumStore.currentThread?.username
                                    }}</span
                                >
                            </div>
                            <div
                                class="flex items-center justify-between py-2 border-b border-gray-100"
                            >
                                <span class="text-sm text-gray-600"
                                    >Replies</span
                                >
                                <span
                                    class="text-sm font-medium text-indigo-600"
                                    >{{ comments.length }}</span
                                >
                            </div>
                            <div class="flex items-center justify-between py-2">
                                <span class="text-sm text-gray-600">Likes</span>
                                <span
                                    class="text-sm font-medium text-red-600"
                                    >{{ likeCountState }}</span
                                >
                            </div>
                        </div>
                    </div>

                    <div
                        class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
                    >
                        <h3
                            class="font-bold text-gray-900 mb-4 flex items-center"
                        >
                            <svg
                                class="w-5 h-5 mr-2 text-purple-500"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    stroke-width="2"
                                    d="M13 10V3L4 14h7v7l9-11h-7z"
                                />
                            </svg>
                            Quick Actions
                        </h3>
                        <div class="space-y-3">
                            <button
                                class="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg"
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
                                        d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                                    />
                                </svg>
                                Share Thread
                            </button>
                            <button
                                class="w-full flex items-center justify-center px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 rounded-xl text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg"
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
                                        d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                                    />
                                </svg>
                                Report Thread
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-else class="flex items-center justify-center py-16">
                <div
                    class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 max-w-md w-full text-center"
                >
                    <div
                        class="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center mx-auto mb-6"
                    >
                        <svg
                            class="w-10 h-10 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                        </svg>
                    </div>
                    <h3 class="text-xl font-bold text-gray-900 mb-2">
                        Thread Not Found
                    </h3>
                    <p class="text-gray-600 mb-6">
                        The thread you're looking for doesn't exist, you need to
                        be logged in to view it, or there was a server error.
                    </p>
                    <div class="flex flex-col sm:flex-row gap-3 justify-center">
                        <router-link
                            to="/"
                            class="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-indigo-500 to-blue-500 hover:from-indigo-600 hover:to-blue-600 rounded-xl text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg"
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
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                />
                            </svg>
                            Back to Threads
                        </router-link>
                        <button
                            @click="retryLoadThread"
                            class="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 rounded-xl text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg"
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
                                    d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                                />
                            </svg>
                            Try Again
                        </button>
                        <router-link
                            v-if="!isAuthenticated"
                            to="/login"
                            class="inline-flex items-center justify-center px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 rounded-xl text-white font-medium transition-all duration-200 shadow-md hover:shadow-lg"
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
                                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                                />
                            </svg>
                            Login to View
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </Layout>
</template>

<script setup lang="ts">
import { onMounted, watch, ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useAuthStore, useForumStore, useLikeStore } from '@/stores';
import { CommentForm, CommentsSection, Layout } from '@/components';
import { formatDate } from '@/utils/dateUtils';

const hero = {
    title: 'Discussion Thread',
    description: 'Join the conversation and share your thoughts',
    svgPath:
        'M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z',
};

const route = useRoute();
const router = useRouter();
const authStore = useAuthStore();
const forumStore = useForumStore();

const threadId = route.params.id as string;

const isValidThreadId = (id: string): boolean =>
    !!id && id.trim().length > 0 && id !== 'undefined' && id !== 'null';

const isLikedState = ref(false);
const likeCountState = ref(0);

const currentThread = computed(() => forumStore.currentThread);
const comments = computed(() => forumStore.comments);
const isLoading = computed(() => forumStore.loading);
const isAuthenticated = computed(() => authStore.isAuthenticated);

const showCommentForm = ref(false);

const syncLikeState = () => {
    if (forumStore.currentThread) {
        isLikedState.value = currentThread.value?.isLiked || false;
        likeCountState.value = currentThread.value?.likeCount || 0;
    }
};

onMounted(async () => {
    if (!isValidThreadId(threadId)) {
        console.error('Invalid thread ID:', threadId);
        router.push('/');
        return;
    }

    if (!authStore.isAuthenticated) {
        router.push('/login');
        return;
    }

    try {
        await forumStore.fetchThread(threadId);
        syncLikeState();
    } catch (error: any) {
        console.error('Error in onMounted:', error);
        if (error.message === 'Authentication required to view this thread') {
            router.push('/login');
        } else if (
            error.message === 'Server error occurred. Please try again later.'
        ) {
            console.log('Server error, showing error message');
        } else if (error.response?.status === 404) {
            router.push('/');
        }
    }
});

watch(
    () => route.params.id,
    async (newId) => {
        const newThreadId = newId as string;

        if (!isValidThreadId(newThreadId)) {
            console.error('Invalid thread ID in route change:', newThreadId);
            router.push('/');
            return;
        }

        if (!authStore.isAuthenticated) {
            router.push('/login');
            return;
        }

        try {
            await forumStore.fetchThread(newThreadId);
            syncLikeState();
        } catch (error: any) {
            console.error('Error in watch:', error);
            if (
                error.message === 'Authentication required to view this thread'
            ) {
                router.push('/login');
            } else if (
                error.message ===
                'Server error occurred. Please try again later.'
            ) {
                console.log('Server error, showing error message');
            } else if (error.response?.status === 404) {
                router.push('/');
            }
        }
    }
);

watch(
    () => forumStore.currentThread,
    () => {
        syncLikeState();
    },
    { deep: true }
);

const retryLoadThread = async () => {
    if (threadId) {
        try {
            await forumStore.fetchThread(threadId);
        } catch (error: any) {
            console.error('Error retrying thread load:', error);
        }
    }
};

const handleCommentCreated = () => {
    if (threadId) forumStore.fetchThread(threadId);

    showCommentForm.value = false;
};

const toggleCommentForm = () => {
    showCommentForm.value = !showCommentForm.value;
};

const handleLoadMore = () => {
    console.log('Load more comments functionality');
};

const handleLikeThread = async () => {
    if (!authStore.isAuthenticated || !threadId) return;

    isLikedState.value = !isLikedState.value;
    likeCountState.value += isLikedState.value ? 1 : -1;

    try {
        const likeStore = useLikeStore();
        const result = await likeStore.toggleLike(
            'THREAD',
            threadId,
            threadId,
            authStore.user?.id || ''
        );

        if (result.success && result.data) {
            isLikedState.value = result.data.isLiked;
            likeCountState.value = result.data.likeCount;

            forumStore.syncLikeData(
                threadId,
                result.data.isLiked,
                result.data.likeCount
            );
        } else {
            isLikedState.value = !isLikedState.value;
            likeCountState.value += isLikedState.value ? 1 : -1;
        }
    } catch (error) {
        isLikedState.value = !isLikedState.value;
        likeCountState.value += isLikedState.value ? 1 : -1;
    }
};
</script>
