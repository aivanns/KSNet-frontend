'use client'

import { usePost } from "@/entities/post/api/post"
import { Post as PostType } from "@/entities/post/model/post"
import { formatPostDate } from "@/shared/lib/utils"
import ErrorCard from "@/shared/ui/error-card"
import PageLayout from "@/shared/ui/page-layout"
import FilteredSearch from "@/widgets/filtered-search/filtered-search"
import Sidebar from "@/widgets/sidebar/ui/sidebar"
import { Card, Spinner } from "@heroui/react"
import { motion } from "framer-motion"
import Post from "@/entities/post/ui/post"
import { useSession } from "@/entities/session/model/session-context"
import { Trophy, Medal, Crown } from "lucide-react"

const TopPage = () => {
    const { user } = useSession()
    const { data, error, isLoading } = usePost.useGetInfinitePosts({
        pagination: { count: 10 },
        filters: { isTop: true },
        sort: { createdAt: 'desc' }
    })

    if (error) return <ErrorCard message="Ошибка при загрузке постов" />

    const getPlaceEmoji = (index: number) => {
        switch(index) {
            case 0: return { icon: Crown, color: "text-amber-500", label: "🏆 1 место" }
            case 1: return { icon: Medal, color: "text-slate-400", label: "🥈 2 место" }
            case 2: return { icon: Medal, color: "text-amber-700", label: "🥉 3 место" }
            default: return { icon: Trophy, color: "text-purple-500", label: `${index + 1} место` }
        }
    }

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    }

    const item = {
        hidden: { y: 20, opacity: 0 },
        show: { y: 0, opacity: 1 }
    }

    return (
        <PageLayout
            leftSection={<Sidebar />}
            mainSection={
                <div className="w-full max-w-4xl mx-auto">
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-neutral-900 mb-2">
                            ✨ Топ публикаций ✨
                        </h1>
                        <p className="text-neutral-600">
                            Лучшие посты нашего сообщества
                        </p>
                    </div>

                    {isLoading ? (
                        <div className="flex justify-center py-20">
                            <Spinner size="lg" />
                        </div>
                    ) : (
                        <motion.div
                            variants={container}
                            initial="hidden"
                            animate="show"
                            className="space-y-6"
                        >
                            {data?.pages[0]?.data.map((post: PostType, index: number) => {
                                const place = getPlaceEmoji(index)
                                const Icon = place.icon
                                
                                return (
                                    <motion.div key={post.id} variants={item}>
                                        <Card className="relative overflow-hidden">
                                            <div className="absolute top-4 right-4 z-10">
                                                <div className={`flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-lg ${place.color}`}>
                                                    <Icon size={20} />
                                                    <span className="font-medium">{place.label}</span>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <Post
                                                    id={post.id}
                                                    title={post.title}
                                                    author={post.owner}
                                                    date={formatPostDate(post.createdAt)}
                                                    tags={post.postTags.map(tag => tag.tag)}
                                                    url={post.url}
                                                    image={post.postMedias[0]?.media.url}
                                                    text={post.description}
                                                    likes={post.likesCount}
                                                    isLiked={post.likes.some(like => like.userId === user?.id)}
                                                    content={post.content}
                                                />
                                            </div>
                                        </Card>
                                    </motion.div>
                                )
                            })}
                        </motion.div>
                    )}
                </div>
            }
            rightSection={<FilteredSearch />}
        />
    )
}

export default TopPage