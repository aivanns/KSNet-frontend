'use client'

import { Card, Button, Modal, ModalContent } from "@heroui/react"
import { usePost } from "@/entities/post/api/post"
import { toast } from "sonner"
import { z } from "zod"
import { FormField } from "@/shared/ui/dynamic-form"
import { DynamicFormFields } from "@/shared/ui/dynamic-form"
import { X, FileEdit } from "lucide-react"
import MarkdownEditor from "@/shared/ui/markdown-editor"
import { useState } from "react"
import MDEditor from "@uiw/react-md-editor"

const createPostSchema = z.object({
    title: z.string()
        .min(1, "Заголовок обязателен")
        .max(100, "Заголовок слишком длинный"),
    description: z.string()
        .min(1, "Описание обязательно")
        .max(500, "Описание слишком длинное"),
    url: z.string().url("Некорректная ссылка").optional().or(z.literal("")),
    content: z.string().max(10000, "Контент слишком длинный").optional()
})

type CreatePostFormData = z.infer<typeof createPostSchema>

interface CreatePostFormProps {
    onClose: () => void
}

const CreatePostForm = ({ onClose }: CreatePostFormProps) => {
    const { mutate: createPost, isPending } = usePost.useCreatePost()
    const [content, setContent] = useState("")
    const [isEditorOpen, setIsEditorOpen] = useState(false)

    const fields: FormField[] = [
        {
            name: 'title',
            type: 'text',
            label: 'Заголовок',
            required: true
        },
        {
            name: 'description',
            type: 'textarea',
            label: 'Описание',
            required: true
        },
        {
            name: 'url',
            type: 'text',
            label: 'Ссылка'
        }
    ]

    const onSubmit = (data: Omit<CreatePostFormData, 'content'>) => {
        createPost({
            ...data,
            content,
            url: data.url || ""
        }, {
            onSuccess: () => {
                toast.success("Пост успешно создан")
                onClose()
            },
            onError: () => {
                toast.error("Ошибка при создании поста")
            }
        })
    }

    return (
        <Card className="p-6">
            <div className="flex justify-between items-center mb-4">
                <p className="text-lg font-medium text-neutral-900">Создание поста</p>
                <button 
                    onClick={onClose}
                    className="p-1 hover:bg-neutral-100 rounded-lg transition-colors"
                >
                    <X size={20} className="text-neutral-500" />
                </button>
            </div>
            <div className="flex flex-col gap-4">
                <DynamicFormFields
                    fields={fields}
                    schema={createPostSchema.omit({ content: true })}
                    onSubmit={onSubmit}
                    className="flex flex-col gap-4"
                    submitButton={{
                        text: "Создать пост",
                        isLoading: isPending
                    }}
                />
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between items-center">
                        <span className="text-sm font-medium text-neutral-700">Контент</span>
                        <Button
                            variant="light"
                            size="sm"
                            onPress={() => setIsEditorOpen(true)}
                            className="flex items-center gap-2"
                        >
                            <FileEdit size={16} />
                            {content ? "Редактировать" : "Добавить контент"}
                        </Button>
                    </div>
                    {content && (
                        <div className="p-3 bg-neutral-50 rounded-lg">
                            <MDEditor.Markdown source={content} style={{ backgroundColor: 'transparent', color: 'black' }} />
                        </div>
                    )}
                </div>
            </div>

            <Modal 
                isOpen={isEditorOpen} 
                onClose={() => setIsEditorOpen(false)}
                className="max-w-4xl mx-4"
            >
                <ModalContent>
                    <Card className="p-6">
                        <div className="flex justify-between items-center mb-4">
                            <p className="text-lg font-medium text-neutral-900">Редактор контента</p>
                            <button 
                                onClick={() => setIsEditorOpen(false)}
                                className="p-1 hover:bg-neutral-100 rounded-lg transition-colors"
                            >
                                <X size={20} className="text-neutral-500" />
                            </button>
                        </div>
                        <MarkdownEditor
                            value={content}
                            onChange={setContent}
                        />
                        <div className="flex justify-end mt-4">
                            <Button
                                color="primary"
                                onPress={() => setIsEditorOpen(false)}
                            >
                                Готово
                            </Button>
                        </div>
                    </Card>
                </ModalContent>
            </Modal>
        </Card>
    )
}

export default CreatePostForm 