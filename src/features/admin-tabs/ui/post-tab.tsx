import ErrorCard from "@/shared/ui/error-card"
import { useAdminPostApi } from "../api/post-tab"
import { Skeleton } from "@heroui/react"
import { Post as PostType } from "@/entities/post/model/post"
import Post from "@/entities/post/ui/post"
import { formatPostDate } from "@/shared/lib/utils"
import { useSession } from "@/entities/session/model/session-context"
import { Button } from "@heroui/react"
import { Check, Trash2 } from "lucide-react"

const PostTab = () => {
    const { user } = useSession()
    
    const {data: response = { data: [], count: 0 }, error, isLoading} = useAdminPostApi.useGetUnverifiedPosts({
        filters: {isVerified: false}, 
        sort: {},
        pagination: {
            page: 1,
            count: 10
        }
    })

    const { mutate: verifyPost } = useAdminPostApi.useVerifyPost()
    const { mutate: deletePost } = useAdminPostApi.useDeletePost()

    if (error) return <ErrorCard message="Произошла ошибка"/>
    if (isLoading) return <Skeleton className="p-10 w-full h-full" />
    
    return (
        <div className="flex flex-col gap-6 p-6">
            {(response.data || []).map((post: PostType) => (
                <div key={post.id} className="relative bg-white rounded-xl shadow-sm border border-neutral-200">
                    {!post.isVerified && (
                        <div className="absolute top-4 right-4 z-10 bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-medium">
                            Не верифицирован
                        </div>
                    )}
                    <div className="p-6">
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
                            isLiked={post.likes.some((like) => like.userId === user?.id)}
                            content={post.content}
                        />
                        <div className="flex gap-2 mt-4 justify-end border-t pt-4">
                            <Button 
                                color="success" 
                                variant="flat"
                                onPress={() => verifyPost(post.id)}
                                startContent={<Check size={18} />}
                            >
                                Одобрить
                            </Button>
                            <Button 
                                color="danger" 
                                variant="flat"
                                onPress={() => deletePost(post.id)}
                                startContent={<Trash2 size={18} />}
                            >
                                Удалить
                            </Button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PostTab