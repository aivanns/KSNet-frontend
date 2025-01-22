"use client"

import { usePost } from "@/entities/post/api/post";
import Post from "@/entities/post/ui/post";
import { Input, Spinner } from "@heroui/react";
import { Post as PostType} from "@/entities/post/model/post";
import { formatPostDate } from "@/shared/lib/utils";
import { usePostStore } from "@/entities/post/model/store";

const Feed = () => {
    const { filters, sort, searchQuery, selectedTags } = usePostStore()
    
    const { data, error, isLoading } = usePost.useGetPosts({
        pagination: {
            page: 1,
            count: 10
        },
        filters: {
            ...filters,
            query: searchQuery,
            tags: selectedTags
        },
        sort
    })

    if (isLoading) return <div className="flex justify-center items-center h-full">
        <Spinner size="lg" />
    </div>
    if (error) return <div>Ошибка при загрузке постов</div>

    return (
        <>
            <div className="flex w-full justify-center items-center mb-5">
                <Input placeholder="Поиск" className="w-2/3" />
            </div>
            <div className="flex flex-col items-center justify-center gap-10">
                {data?.data.map((post: PostType) => (
                    <Post author={post.ownerId} date={formatPostDate(post.createdAt)} tags={post.postTags.map((tag) => tag.tag)} url={post.url} image={post.postMedias[0].media.url} text={post.description} key={post.id} />
                ))}
            </div>
        </>
    )   
}

export default Feed;