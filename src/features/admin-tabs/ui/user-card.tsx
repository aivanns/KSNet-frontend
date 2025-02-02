'use client'

import { Avatar, Card, Chip } from "@heroui/react"
import { User } from "@/entities/user/model/user"
import { Mail, Calendar, MapPin } from "lucide-react"
import { formatDate } from "@/shared/lib/utils"

interface AdminUserCardProps {
    user: User
}

const AdminUserCard = ({ user }: AdminUserCardProps) => {
    return (
        <Card className="w-full p-6 text-neutral-900">
            <div className="flex items-center gap-6">
                <Avatar 
                    src={user.userMedias[0]?.media.url || "https://www.ks54.ru/wp-content/uploads/2020/02/ks54-300x300.png"} 
                    className="w-16 h-16 text-xl bg-neutral-200"
                />
                <div className="flex flex-col gap-1 flex-grow">
                    <div className="flex items-center gap-3">
                        <p className="text-xl font-medium">{user.firstName} {user.lastName}</p>
                        <p className="text-sm text-neutral-500">@{user.username}</p>
                        <Chip 
                            size="sm" 
                            color={user.role.name === "Администратор" ? "warning" : "default"}
                            className="ml-auto"
                        >
                            {user.role.name}
                        </Chip>
                    </div>
                    <div className="flex items-center gap-6 text-sm text-neutral-600">
                        <div className="flex items-center gap-1">
                            <Mail size={14} />
                            <span>{user.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Calendar size={14} />
                            <span>Регистрация: {formatDate(user.createdAt)}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <MapPin size={14} />
                            <span>{user.group?.name || "Без группы"}</span>
                        </div>
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default AdminUserCard 