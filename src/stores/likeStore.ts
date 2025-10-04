import { defineStore } from 'pinia';
import { ref, nextTick } from 'vue';
import type { LikeRequest, LikeState, StoreActionResult } from '@/types';
import { forumApi } from '@/services/api';
import { handleApiError } from '@/utils/errorHandler';

export const useLikeStore = defineStore('like', () => {
    const likeStates = ref<Record<string, LikeState>>({});

    const getLikeState = (itemId: string): LikeState => {
        return likeStates.value[itemId] || { isLiked: false, likeCount: 0 };
    };

    const updateLikeState = (itemId: string, state: LikeState): void => {
        likeStates.value[itemId] = { ...state };
    };

    const toggleLike = async (
        type: 'THREAD' | 'COMMENT' | 'REPLY',
        threadId: string,
        itemId: string,
        userId: string,
        commentId?: string
    ): Promise<StoreActionResult<LikeState>> => {
        try {
            const request: LikeRequest = {
                userId,
                likeableId: itemId,
                likeableType: type.toLowerCase() as
                    | 'thread'
                    | 'comment'
                    | 'reply',
            };

            let result: any;

            switch (type) {
                case 'THREAD':
                    result = await forumApi.likeThread(threadId, request);
                    break;
                case 'COMMENT':
                    result = await forumApi.likeComment(
                        threadId,
                        itemId,
                        request
                    );
                    break;
                case 'REPLY':
                    if (!commentId) {
                        throw new Error(
                            'commentId is required for reply likes'
                        );
                    }
                    result = await forumApi.likeReply(
                        threadId,
                        commentId,
                        itemId,
                        request
                    );
                    break;
                default:
                    throw new Error(`Invalid like type: ${type}`);
            }

            const likeState: LikeState = {
                isLiked: result.isLiked,
                likeCount: result.likeCount,
            };

            updateLikeState(itemId, likeState);
            await nextTick();

            return {
                success: true,
                data: likeState,
            };
        } catch (error) {
            return handleApiError(error);
        }
    };

    const syncLikeState = (
        itemId: string,
        isLiked: boolean,
        likeCount: number
    ): void => {
        updateLikeState(itemId, { isLiked, likeCount });
    };

    const clearLikeStates = (): void => {
        likeStates.value = {};
    };

    return {
        likeStates,
        getLikeState,
        updateLikeState,
        toggleLike,
        syncLikeState,
        clearLikeStates,
    };
});
