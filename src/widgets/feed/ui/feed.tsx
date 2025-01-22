"use client"

import { usePost } from "@/entities/post/api/post";
import Post from "@/entities/post/ui/post";
import { Input } from "@heroui/react";
import { Post as PostType } from "@/entities/post/model/post";
import { formatPostDate } from "@/shared/lib/utils";
const Feed = () => {
    const { data, error, isLoading } = usePost.useGetPosts({
        pagination: {
            page: 1,
            count: 10
        },
        filters: {},
        sort: {}
    })
    return (
        <>
            <div className="flex w-full justify-center items-center mb-5">
                <Input placeholder="Поиск" className="w-2/3" />
            </div>
            <div className="flex flex-col items-center justify-center gap-10">
            {(!isLoading || !error) && data?.data.map((post: PostType, index: number) => (
                <Post author={post.ownerId} date={formatPostDate(post.createdAt)} tags={post.postTags} url={post.url} image={post.url} text={post.description} key={index} />
            ))}
        </div>
        </>
    )   
}

export default Feed;