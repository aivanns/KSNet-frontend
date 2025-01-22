"use client"

import { usePost } from "@/entities/post/api/post";
import Post from "@/entities/post/ui/post";
import { Spinner } from "@heroui/react";
import { Post as PostType} from "@/entities/post/model/post";
import { formatPostDate } from "@/shared/lib/utils";
import { usePostStore } from "@/entities/post/model/store";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import ErrorCard from "@/shared/ui/error-card";

const Feed = () => {
    const { filters, sort, searchQuery, selectedTags } = usePostStore()
    const { ref, inView } = useInView()
    
    const { data, error, isLoading, fetchNextPage, hasNextPage } = usePost.useGetInfinitePosts({
        pagination: {
            count: 10
        },
        filters: {
            ...filters,
            query: searchQuery,
            tags: selectedTags
        },
        sort
    })

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage])

    if (error) return <ErrorCard message="Ошибка при загрузке постов" />

    return (
        <>
            <div className="flex flex-col items-center justify-center gap-10">
                {data?.pages.map((page) =>
                    page.data.map((post: PostType) => (
                        <Post 
                            key={post.id}
                            author={post.ownerId} 
                            date={formatPostDate(post.createdAt)} 
                            tags={post.postTags.map((tag) => tag.tag)} 
                            url={post.url} 
                            image={post.postMedias[0]?.media.url} 
                            text={post.description} 
                        />
                    ))
                )}
                <div ref={ref} className="w-full flex justify-center py-4">
                    {isLoading && <Spinner size="lg" />}
                </div>
            </div>
        </>
    )   
}

export default Feed;