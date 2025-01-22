"use client"

import { Avatar, Card, CardHeader, CardBody, CardFooter, Button, Image, Snippet } from "@heroui/react"
import { EllipsisVertical, Heart, MessageCircle } from "lucide-react"
import { PostComponentProps } from "../model/post"
import { useState } from "react"
import PostMetadata from "@/shared/ui/post-metadata"

const Post = ({text, author, date, tags, url, image, isFull = false}: PostComponentProps) => {
    const [isLiked, setIsLiked] = useState(false)
    const [likes, setLikes] = useState(0)

    const handleLike = () => {
        setIsLiked(!isLiked)
        setLikes(isLiked ? likes - 1 : likes + 1)
    }

  return <Card className={`${isFull ? "w-full" : "w-2/3"} p-2`}>
    <CardHeader className="justify-between">
        <div className="flex items-center gap-2">
            <Avatar src={'@default_avatar.png'} />
            <div className="flex flex-col items-start">
                <p className="text-sm font-medium text-black">{author}</p>
                <p className="text-tiny font-medium text-gray-500">{date}</p>
            </div>
        </div>
            <Button variant="light" isIconOnly size="sm">
                <EllipsisVertical />
            </Button>
    </CardHeader>
    <CardBody className="flex flex-col gap-6">
        <p className="text-sm font-medium text-black">{text}</p>
        {image && (
            <div className="aspect-[4/3] w-full relative">
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
                    <Button variant="light" isIconOnly size="sm" onPress={handleLike}>
                        <Heart color={isLiked ? "red" : "black"} fill={isLiked ? "red" : "transparent"} />
                    </Button>
                <p className="text-xl font-medium text-black flex items-center">{likes}</p>
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