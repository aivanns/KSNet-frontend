'use client'

import { Card } from "@heroui/react"
import { AlertCircle } from "lucide-react"

interface ErrorCardProps {
    message?: string
    className?: string
}

const ErrorCard = ({ message = "Что-то пошло не так", className }: ErrorCardProps) => {
    return (
        <Card className={`w-full p-6 flex items-center justify-center gap-2 text-danger ${className}`}>
            <AlertCircle size={24} />
            <span className="text-lg">{message}</span>
        </Card>
    )
}

export default ErrorCard
