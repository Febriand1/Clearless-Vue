export interface LikeRequest {
    userId: string;
    likeableId: string;
    likeableType: 'thread' | 'comment' | 'reply'; 
}

export interface LikeResponse {
    isLiked: boolean;
    likeCount: number;
}
