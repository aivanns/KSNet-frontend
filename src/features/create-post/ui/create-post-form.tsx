'use client'

import { Card } from "@heroui/react"
import { usePost } from "@/entities/post/api/post"
import { toast } from "sonner"
import { z } from "zod"
import { FormField } from "@/shared/ui/dynamic-form"
import { DynamicFormFields } from "@/shared/ui/dynamic-form"
import { X } from "lucide-react"

const createPostSchema = z.object({
    title: z.string()
        .min(1, "Заголовок обязателен")
        .max(100, "Заголовок слишком длинный"),
    description: z.string()
        .min(1, "Описание обязательно")
        .max(500, "Описание слишком длинное"),
    url: z.string().url("Некорректная ссылка").optional().or(z.literal("")),
    content: z.string().max(2000, "Контент слишком длинный").optional()
})

type CreatePostFormData = z.infer<typeof createPostSchema>

interface CreatePostFormProps {
    onClose: () => void
}

const CreatePostForm = ({ onClose }: CreatePostFormProps) => {
    const { mutate: createPost, isPending } = usePost.useCreatePost()

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
        },
        {
            name: 'content',
            type: 'textarea',
            label: 'Контент'
        }
    ]

    const onSubmit = (data: CreatePostFormData) => {
        createPost({
            title: data.title,
            description: data.description,
            url: data.url || "",
            content: data.content || ""
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
            <DynamicFormFields
                fields={fields}
                schema={createPostSchema}
                onSubmit={onSubmit}
                className="flex flex-col gap-4"
                submitButton={{
                    text: "Создать пост",
                    isLoading: isPending
                }}
            />
        </Card>
    )
}

export default CreatePostForm 