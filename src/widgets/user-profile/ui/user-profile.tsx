'use client'

import UserCard from "@/entities/user/ui/user-card"
import { Button, Card, Tabs, Tab, Spinner } from "@heroui/react"
import { Grid, List } from "lucide-react"
import { useEffect, useState } from "react"
import Post from "@/entities/post/ui/post"
import { usePost } from "@/entities/post/api/post"
import { formatPostDate } from "@/shared/lib/utils"
import { useInView } from "react-intersection-observer"
import ErrorCard from "@/shared/ui/error-card"
import { useSession } from "@/entities/session/model/session-context"
import { PostTag, Post as PostType } from "@/entities/post/model/post"
import { usePostStore } from "@/entities/post/model/store"
import EmptyCard from "@/shared/ui/empty-card"

const UserProfile = () => {
    const [view, setView] = useState<"grid" | "list">("list")
    const { ref, inView } = useInView()
    const { user } = useSession()
    const { selectedTags } = usePostStore()

    const { data, error, isLoading, fetchNextPage, hasNextPage } = usePost.useGetInfinitePosts({
        pagination: {
            page: 1,
            count: 10
        },
        filters: {
            ownerId: user?.id,
            tags: selectedTags
        },
        sort: {}
    })

    useEffect(() => {
        if (inView && hasNextPage) {
            fetchNextPage()
        }
    }, [inView, hasNextPage])

    if (error) return <ErrorCard message="Ошибка при загрузке постов" />
    
    return (
        <div className="flex flex-col gap-6 w-full">
            <Card className="w-full p-4 lg:p-6 text-black">
                <UserCard className="m-0"/>
                <div className="flex justify-between items-center gap-2 lg:gap-8 mt-6 lg:mt-8 mx-4 lg:mx-10 border-t pt-4 lg:pt-6">
                    <div className="flex flex-col items-center">
                        <span className="text-lg lg:text-2xl font-bold">128</span>
                        <span className="text-xs lg:text-sm text-neutral-600">публикаций</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-lg lg:text-2xl font-bold">1,240</span>
                        <span className="text-xs lg:text-sm text-neutral-600">подписчиков</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-lg lg:text-2xl font-bold">425</span>
                        <span className="text-xs lg:text-sm text-neutral-600">подписок</span>
                    </div>
                </div>
            </Card>

            <div className="flex justify-between items-center">
                <Tabs color="primary" variant="underlined">
                    <Tab key="posts" title="Публикации" />
                    <Tab key="saved" title="Сохраненные" />
                </Tabs>
                <div className="hidden lg:flex gap-2">
                    <Button 
                        isIconOnly 
                        variant={view === "grid" ? "solid" : "light"}
                        onPress={() => setView("grid")}
                    >
                        <Grid size={20} />
                    </Button>
                    <Button 
                        isIconOnly 
                        variant={view === "list" ? "solid" : "light"}
                        onPress={() => setView("list")}
                    >
                        <List size={20} />
                    </Button>
                </div>
            </div>

            {!isLoading && (!data?.pages[0]?.data || data.pages[0].data.length === 0) ? (
                <EmptyCard message="У пользователя нет публикаций" />
            ) : (
                <div className={view === "grid" ? "hidden lg:grid lg:grid-cols-3 lg:gap-4" : "flex flex-col gap-6"}>
                    {data?.pages.map((page) =>
                        page.data.map((post: PostType) => (
                            <Post 
                                key={post.id}
                                id={post.id}
                                isFull={view === "list"}
                                author={post.owner}
                                date={formatPostDate(post.createdAt)}
                                tags={post.postTags.map((tag: PostTag) => tag.tag)}
                                url={post.url}
                                image={post.postMedias[0]?.media.url}
                                text={post.description}
                                isLiked={post.likes.some((like) => like.userId === user?.id)}
                                likes={post.likesCount}
                            />
                        ))
                    )}
                    <div ref={ref} className="w-full flex justify-center py-4">
                        {isLoading && <Spinner size="lg" />}
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserProfile