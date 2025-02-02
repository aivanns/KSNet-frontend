import { useAdminPostApi } from '@/features/admin-tabs/api/post-tab'
import { toast } from 'sonner'
import { Card, Select, SelectItem } from '@heroui/react'
import { Trophy, X } from 'lucide-react'
import Post from '@/entities/post/ui/post'
import { Post as PostType } from '@/entities/post/model/post'
import { formatPostDate } from '@/shared/lib/utils'
import ErrorCard from '@/shared/ui/error-card'
import { Skeleton } from '@heroui/react'
import { usePost } from '@/entities/post/api/post'
import { useState, useEffect } from 'react'
import { Button } from '@heroui/react'
import { useSession } from '@/entities/session/model/session-context'

interface TopPost {
    post: PostType | null
    place: number
}

const TopTab = () => {
    const { user } = useSession()
    const [topPosts, setTopPosts] = useState<TopPost[]>([
        { post: null, place: 1 },
        { post: null, place: 2 },
        { post: null, place: 3 },
        { post: null, place: 4 },
        { post: null, place: 5 }
    ])

    const { data: posts, isLoading, error } = usePost.useGetInfinitePosts({
        pagination: { count: 10 },
        filters: { isTop: false },
        sort: { createdAt: 'desc' }
    })

    const { data: topPostsData } = usePost.useGetInfinitePosts({
        pagination: { count: 5 },
        filters: { isTop: true },
        sort: { createdAt: 'desc' }
    })

    useEffect(() => {
        if (topPostsData?.pages[0]?.data) {
            const updatedTopPosts = [...topPosts]
            topPostsData.pages[0].data.forEach((post: PostType) => {
                if (post.tops) {
                    const index = updatedTopPosts.findIndex(item => item.place === post.tops![0].place)
                    if (index !== -1) {
                        updatedTopPosts[index].post = post
                    }
                }
            })
            setTopPosts(updatedTopPosts)
        }
    }, [topPostsData])

    const { mutate: addToTop } = useAdminPostApi.useAddPostToTop()
    const { mutate: removeFromTop } = useAdminPostApi.useRemovePostFromTop()

    const handleAddToTop = (postId: string, place: number) => {
        const selectedPost = posts?.pages[0]?.data.find((post: PostType) => post.id === postId)
        if (!selectedPost) return

        addToTop({ id: postId, place }, {
            onSuccess: () => {
                setTopPosts(prev => prev.map(item => 
                    item.place === place ? { ...item, post: selectedPost } : item
                ))
                toast.success("Пост успешно добавлен в топ")
            },
            onError: () => {
                toast.error("Ошибка при добавлении поста в топ")
            }
        })
    }

    const handleRemoveFromTop = (place: number) => {
        const post = topPosts.find(p => p.place === place)?.post
        if (!post) return

        removeFromTop(post.id, {
            onSuccess: () => {
                setTopPosts(prev => prev.map(item => 
                    item.place === place ? { ...item, post: null } : item
                ))
                toast.success("Пост успешно удален из топа")
            },
            onError: () => {
                toast.error("Ошибка при удалении поста из топа")
            }
        })
    }

    if (error) return <ErrorCard message="Ошибка при загрузке постов" />
    if (isLoading) return <Skeleton className="p-10 w-full h-full" />

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="flex flex-col gap-4">
                {topPosts.map(({ place, post }) => (
                    <Card key={place} className="p-4 border-2 border-dashed border-neutral-200">
                        <div className="flex items-center justify-between mb-4 text-neutral-900 gap-4">
                            <div className='flex flex-col lg:flex-row items-center gap-4'>
                            <div className="flex items-center gap-4">
                                <Trophy className="w-5 h-5 text-amber-500" />
                                <span className="font-medium text-lg">Место #{place}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Select
                                    placeholder="Выберите пост"
                                    className="min-w-[200px]"
                                    onChange={(event) => handleAddToTop(event.target.value, place)}
                                    selectedKeys={post ? [post.id] : []}
                                    aria-label="Выбор поста для топа"
                                >
                                    {posts?.pages[0]?.data.map((post: PostType) => (
                                        <SelectItem key={post.id} value={post.id}>
                                            {post.title}
                                        </SelectItem>
                                    ))}
                                </Select>
                                {post && (
                                    <Button
                                        isIconOnly
                                        color="danger"
                                        variant="light"
                                        onPress={() => handleRemoveFromTop(place)}
                                        aria-label="Удалить пост из топа"
                                    >
                                        <X size={18} />
                                    </Button>
                                )}
                            </div>
                        </div>
                        </div>
                        {post && (
                            <Post
                                id={post.id}
                                title={post.title}
                                author={post.owner}
                                date={formatPostDate(post.createdAt)}
                                tags={post.postTags.map((tag) => tag.tag)}
                                url={post.url}
                                image={post.postMedias[0]?.media.url}
                                text={post.description}
                                likes={post.likesCount}
                                isLiked={post.likes.some(like => like.userId === user?.id)}
                                content={post.content}
                            />
                        )}
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default TopTab