'use client'

import { Card } from "@heroui/react"
import { FileQuestion } from "lucide-react"

interface EmptyCardProps {
    message?: string
    className?: string
}

const EmptyCard = ({ message = "Ничего не найдено", className }: EmptyCardProps) => {
    return (
        <Card className={`w-full p-6 flex items-center justify-center gap-2 text-neutral-500 ${className}`}>
            <FileQuestion size={24} />
            <span className="text-lg">{message}</span>
        </Card>
    )
}

export default EmptyCard 