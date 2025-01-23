"use client"

import { usePost } from "@/entities/post/api/post";
import Post from "@/entities/post/ui/post";
import { Spinner, Button, Modal, ModalContent } from "@heroui/react";
import { Post as PostType } from "@/entities/post/model/post";
import { formatPostDate } from "@/shared/lib/utils";
import { usePostStore } from "@/entities/post/model/store";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import ErrorCard from "@/shared/ui/error-card";
import EmptyCard from "@/shared/ui/empty-card";
import { useUserStore } from "@/entities/user/model/store";
import { Plus } from "lucide-react";
import CreatePostForm from "@/features/create-post/ui/create-post-form";

const Feed = () => {
    const { filters, sort, searchQuery, selectedTags } = usePostStore()
    const { ref, inView } = useInView()
    const { user } = useUserStore()
    const [isCreatePostOpen, setIsCreatePostOpen] = useState(false)
    
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
    if (!isLoading && (!data?.pages[0]?.data || data.pages[0].data.length === 0)) {
        return <EmptyCard message="Посты не найдены" />
    }

    return (
        <>
            <div className="fixed bottom-6 right-6 lg:static lg:mb-6 z-50">
                <Button 
                    variant="light"
                    className="bg-white shadow-md hover:bg-neutral-100 lg:w-auto rounded-xl"
                    onPress={() => setIsCreatePostOpen(true)}
                >
                    <Plus className="block lg:hidden" size={24} />
                    <span className="hidden lg:flex gap-2 items-center">
                        <Plus size={20} />
                        Создать пост
                    </span>
                </Button>
            </div>

            <Modal 
                isOpen={isCreatePostOpen} 
                onClose={() => setIsCreatePostOpen(false)}
                className="max-w-lg mx-4"
            >
                <ModalContent>
                    <CreatePostForm onClose={() => setIsCreatePostOpen(false)} />
                </ModalContent>
            </Modal>

            <div className="flex flex-col items-center justify-center gap-10">
                {data?.pages.map((page) =>
                    page.data.map((post: PostType) => (
                        <Post 
                            id={post.id}
                            key={post.id}
                            title={post.title}
                            author={post.owner} 
                            date={formatPostDate(post.createdAt)} 
                            tags={post.postTags.map((tag) => tag.tag)} 
                            url={post.url} 
                            image={post.postMedias[0]?.media.url} 
                            text={post.description} 
                            likes={post.likesCount}
                            isLiked={post.likes.some((like) => like.userId === user?.id)}
                            content={post.content}
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