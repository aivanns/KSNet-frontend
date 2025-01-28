"use client"

import { Avatar, Card, CardHeader, CardBody, CardFooter, Button, Image, Spinner, Modal, ModalContent, Popover, PopoverTrigger, PopoverContent } from "@heroui/react"
import { EllipsisVertical, Heart, FileText, X, Trash2 } from "lucide-react"
import { PostComponentProps } from "../model/post"
import { usePost } from "../api/post"
import PostMetadata from "@/shared/ui/post-metadata"
import { useState, useEffect } from "react"
import MDEditor from "@uiw/react-md-editor"
import { toast } from "sonner"
import { useSession } from "@/entities/session/model/session-context"

const Post = ({
    text,
    title,
    author, 
    date, 
    tags, 
    url,
    image, 
    isFull = false,
    id,
    isVerified = true,
    isLiked: initialIsLiked,
    likes: initialLikes = 0,
    content
}: PostComponentProps) => {
    const [isLiked, setIsLiked] = useState<boolean | undefined>(initialIsLiked)
    const [likes, setLikes] = useState(initialLikes)
    const [isLoading, setIsLoading] = useState(initialIsLiked === undefined)
    const [isContentOpen, setIsContentOpen] = useState(false)
    const { user } = useSession()
    
    const { mutate: likePost, isPending: isLiking } = usePost.useLikePost(id)
    const { mutate: dislikePost, isPending: isDisliking } = usePost.useDislikePost(id)
    const { mutate: deletePost } = usePost.useDeletePost(id)

    useEffect(() => {
        if (initialIsLiked !== undefined && isLoading) {
            setIsLoading(false)
        }
    }, [initialIsLiked, isLoading])

    const handleLike = () => {
        if (isLiking || isDisliking || isLiked === undefined) return
        if (isLiked) {
            dislikePost()
            setIsLiked(false)
            setLikes(prev => prev - 1)
        } else {
            likePost()
            setIsLiked(true)
            setLikes(prev => prev + 1)
        }
    }

    const handleDelete = () => {
        deletePost(undefined, {
            onSuccess: () => {
                toast.success("Пост успешно удален")
            },
            onError: () => {
                toast.error("Ошибка при удалении поста")
            }
        })
    }

    if (isLoading) {
        return (
            <Card className={`${isFull ? "w-full" : "w-full lg:w-2/3"} p-2 min-h-[200px] flex items-center justify-center`}>
                <Spinner size="lg" />
            </Card>
        )
    }

    const isOwner = user?.id === author?.id

    return (
        <>
            <Card className={`${isFull ? "w-full" : "w-full lg:w-2/3"} p-2`}>
                <CardHeader className="justify-between">
                    <div className="flex items-center gap-2">
                        <Avatar 
                            src={author?.userMedias[0]?.media.url || "https://www.ks54.ru/wp-content/uploads/2020/02/ks54-300x300.png"} 
                            className="w-8 h-8 lg:w-10 lg:h-10 bg-neutral-200"
                        />
                        <div className="flex flex-col items-start">
                            <p className="text-xs lg:text-sm font-medium text-black">{author?.firstName} {author?.lastName}</p>
                            <p className="text-xs lg:text-tiny font-medium text-gray-500">{date}</p>
                        </div>
                    </div>
                    {isOwner && (
                        <Popover placement="bottom-end">
                            <PopoverTrigger>
                                <Button variant="light" isIconOnly size="sm">
                                    <EllipsisVertical className="w-4 h-4 lg:w-5 lg:h-5" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent>
                                <Button 
                                    color="danger" 
                                    variant="light" 
                                    onPress={handleDelete}
                                    className="w-full"
                                    startContent={<Trash2 size={16} />}
                                >
                                    Удалить
                                </Button>
                            </PopoverContent>
                        </Popover>
                    )}
                </CardHeader>
                <CardBody className="flex flex-col gap-6">
                    <p className="text-xl font-medium text-black">{title}</p>
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
                    <div className="flex flex-col justify-start items-start w-full">
                        <PostMetadata url={url} tags={tags} />
                        <div className="flex justify-between items-center w-full mt-4 px-2">
                            <div className="flex gap-4">
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
                            </div>
                            {content && (
                                <Button 
                                    variant="light" 
                                    size="sm"
                                    onPress={() => setIsContentOpen(true)}
                                    className="flex items-center gap-2"
                                >
                                    <FileText size={16} />
                                    <span className="hidden lg:inline">Читать</span>
                                </Button>
                            )}
                        </div>
                    </div>
                </CardFooter>
            </Card>

            <Modal 
                isOpen={isContentOpen} 
                onClose={() => setIsContentOpen(false)}
                className="max-w-4xl mx-4"
            >
                <ModalContent>
                    <Card className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <div>
                                <p className="text-lg font-medium text-neutral-900">Контент поста</p>
                            </div>
                            <button 
                                onClick={() => setIsContentOpen(false)}
                                className="p-1 hover:bg-neutral-100 rounded-lg transition-colors"
                            >
                                <X size={20} className="text-neutral-500" />
                            </button>
                        </div>
                        <div className="prose max-w-none dark:prose-invert">
                            <MDEditor.Markdown source={content} style={{borderRadius: '10px', padding: '15px'}} />
                        </div>
                    </Card>
                </ModalContent>
            </Modal>
        </>
    )
}

export default Post