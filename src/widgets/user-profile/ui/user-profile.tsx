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
import { PostTag, Post as PostType } from "@/entities/post/model/post"
import { usePostStore } from "@/entities/post/model/store"
import EmptyCard from "@/shared/ui/empty-card"
import StaticUserCard from "@/entities/user/ui/static-user-card"
import useUserApi from "@/entities/user/api/user"

const UserProfile = ({userId}: {userId: string}) => {
    const [view, setView] = useState<"grid" | "list">("list")
    const { ref, inView } = useInView()
    const { selectedTags } = usePostStore()

    const { data: user, error: userError } = useUserApi.useGetUser(userId)
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
    }, [inView, hasNextPage, fetchNextPage])

    if (error) return <ErrorCard message="Ошибка при загрузке постов" />
    if (userError) return <ErrorCard message="Ошибка при загрузке пользователя" />

    if (!user) return null
    
    return (
        <div className="flex flex-col gap-6 w-full">
            <Card className="w-full p-4 lg:p-6 text-black">
                {user?.id === userId ? <UserCard className="m-0"/> : <StaticUserCard user={user!} className="m-0"/>}
            </Card>

            <div className="flex justify-between items-center">
                <Tabs color="warning" variant="underlined">
                    <Tab key="posts" title="Публикации" />
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
                                title={post.title}
                                isFull
                                author={post.owner}
                                date={formatPostDate(post.createdAt)}
                                tags={post.postTags.map((tag: PostTag) => tag.tag)}
                                url={post.url}
                                image={post.postMedias[0]?.media.url}
                                text={post.description}
                                isLiked={post.likes.some((like) => like.userId === user?.id)}
                                likes={post.likesCount}
                                content={post.content}
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