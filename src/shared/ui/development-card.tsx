'use client'

import { Card } from "@heroui/react"
import { Construction } from "lucide-react"

interface DevelopmentCardProps {
    message?: string
    className?: string
}

const DevelopmentCard = ({ message = "Этот раздел находится в разработке", className }: DevelopmentCardProps) => {
    return (
        <Card className={`h-[calc(100vh-2.5rem)] sticky top-5 ${className}`}>
            <div className="h-full flex flex-col items-center justify-center gap-6 p-8">
                <div className="relative">
                    <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center">
                        <Construction className="w-10 h-10 text-amber-500" />
                    </div>
                </div>
                <p className="text-lg text-neutral-600 text-center max-w-[280px]">
                    {message}
                </p>
            </div>
        </Card>
    )
}

export default DevelopmentCard 