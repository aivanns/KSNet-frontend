import { Post, PostFilters, PostSort, PostQueryPayload } from "@/entities/post/model/post";

export type AdminPost = Post;

export interface AdminPostFilters extends PostFilters {
    isVerified?: boolean;
}

export type AdminPostSort = PostSort;

export type AdminPostQueryPayload = PostQueryPayload;