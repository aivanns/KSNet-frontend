import { Post, PostFilters, PostSort, PostQueryPayload } from "@/entities/post/model/post";

export interface AdminPost extends Post {}

export interface AdminPostFilters extends PostFilters {
    isVerified?: string
}

export interface AdminPostSort extends PostSort {}

export interface AdminPostQueryPayload extends PostQueryPayload {}