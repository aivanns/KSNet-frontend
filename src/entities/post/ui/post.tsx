"use client"

import { Avatar, Card, CardHeader, CardBody, CardFooter, Button, Image } from "@heroui/react"
import { EllipsisVertical, Heart, MessageCircle } from "lucide-react"
import { PostComponentProps } from "../model/post"
import { usePost } from "../api/post"
import PostMetadata from "@/shared/ui/post-metadata"
import { useState } from "react"

const Post = ({
    text, 
    author, 
    date, 
    tags, 
    url, 
    image, 
    isFull = false,
    id,
    isLiked: initialIsLiked = false,
    likes: initialLikes = 0,
    likeId: initialLikeId
}: PostComponentProps) => {
    const [isLiked, setIsLiked] = useState(initialIsLiked)
    const [likes, setLikes] = useState(initialLikes)
    const [likeId, setLikeId] = useState(initialLikeId)
    
    const { mutate: likePost, isPending: isLiking } = usePost.useLikePost(id)
    const { mutate: dislikePost, isPending: isDisliking } = usePost.useDislikePost(likeId || "")

    const handleLike = () => {
        if (isLiking || isDisliking) return
        if (isLiked) {
            dislikePost()
            setIsLiked(false)
            setLikes(prev => prev - 1)
            setLikeId(undefined)
        } else {
            likePost()
            setIsLiked(true)
            setLikes(prev => prev + 1)
        }
    }

    return <Card className={`${isFull ? "w-full" : "w-full lg:w-2/3"} p-2`}>
        <CardHeader className="justify-between">
            <div className="flex items-center gap-2">
                <Avatar 
                    src={author?.userMedias[0].media.url || "https://icons.veryicon.com/png/o/miscellaneous/rookie-official-icon-gallery/225-default-avatar.png"} 
                    className="w-8 h-8 lg:w-10 lg:h-10"
                />
                <div className="flex flex-col items-start">
                    <p className="text-xs lg:text-sm font-medium text-black">{author?.firstName} {author?.lastName}</p>
                    <p className="text-xs lg:text-tiny font-medium text-gray-500">{date}</p>
                </div>
            </div>
            <Button variant="light" isIconOnly size="sm">
                <EllipsisVertical className="w-4 h-4 lg:w-5 lg:h-5" />
            </Button>
        </CardHeader>
        <CardBody className="flex flex-col gap-6">
            <p className="text-sm font-medium text-black">{text}</p>
            {image && (
                <div className="w-full relative">
                    <Image 
                        src={image} 
                        alt="post image" 
                        key={image} 
                        className="object-cover w-full h-full"
                    />
                </div>
            )}
        </CardBody>
        <CardFooter>
            <div className="flex flex-col justify-start items-start">
                <PostMetadata url={url} tags={tags} />
                <div className="flex gap-4 mt-4 px-2">
                    <div className="flex gap-1">
                        <Button 
                            variant="light" 
                            isIconOnly 
                            size="sm" 
                            onPress={handleLike}
                            isLoading={isLiking || isDisliking}
                        >
                            <Heart 
                                color={isLiked ? "red" : "black"} 
                                fill={isLiked ? "red" : "transparent"} 
                            />
                        </Button>
                        <p className="text-xl font-medium text-black flex items-center">
                            {likes}
                        </p>
                    </div>
                    <Button variant="light" isIconOnly size="sm">
                        <MessageCircle />
                    </Button>
                </div>
            </div>
        </CardFooter>
    </Card>
}

export default Post