import { useAdminPostApi } from '@/features/admin-tabs/api/post-tab'
import { toast } from 'sonner'
import { Card, Select, SelectItem } from '@heroui/react'
import { Trophy } from 'lucide-react'
import Post from '@/entities/post/ui/post'
import { Post as PostType } from '@/entities/post/model/post'
import { formatPostDate } from '@/shared/lib/utils'
import ErrorCard from '@/shared/ui/error-card'
import { Skeleton } from '@heroui/react'
import { usePost } from '@/entities/post/api/post'

const TopTab = () => {
    const { data: posts, isLoading, error } = usePost.useGetInfinitePosts({
        pagination: {
            count: 10
        },
        filters: {},
        sort: { createdAt: 'desc' }
    })

    const { mutate: addToTop } = useAdminPostApi.useAddPostToTop()

    const handleAddToTop = (postId: string, place: number) => {
        addToTop({ id: postId, place }, {
            onSuccess: () => {
                toast.success("Пост успешно добавлен в топ")
            },
            onError: () => {
                toast.error("Ошибка при добавлении поста в топ")
            }
        })
    }

    if (error) return <ErrorCard message="Ошибка при загрузке постов" />
    if (isLoading) return <Skeleton className="p-10 w-full h-full" />

    return (
        <div className="flex flex-col gap-6 p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5].map((place: number) => (
                    <Card key={place} className="p-4 border-2 border-dashed border-neutral-200">
                        <div className="flex items-center justify-between mb-4 text-neutral-900 gap-4">
                            <div className="flex items-center gap-4">
                                <Trophy className="w-5 h-5 text-amber-500" />
                                <span className="font-medium text-lg">Место #{place}</span>
                            </div>
                            <Select
                                placeholder="Выберите пост"
                                className="max-w-[200px]"
                                onChange={(event) => handleAddToTop(event.target.value, place)}
                            >
                                {posts?.pages[0]?.data.map((post: PostType) => (
                                    <SelectItem key={post.id} value={post.id}>
                                        {post.title}
                                    </SelectItem>
                                ))}
                            </Select>
                        </div>
                        {posts?.pages[0]?.data.map((post: PostType) => (
                            <Post
                                key={post.id}
                                id={post.id}
                                title={post.title}
                                author={post.owner}
                                date={formatPostDate(post.createdAt)}
                                tags={post.postTags.map((tag) => tag.tag)}
                                url={post.url}
                                image={post.postMedias[0]?.media.url}
                                text={post.description}
                                likes={post.likesCount}
                                content={post.content}
                            />
                        ))}
                    </Card>
                ))}
            </div>
        </div>
    )
}

export default TopTab