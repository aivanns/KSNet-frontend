'use client'

import { useSession } from "@/entities/session/model/session-context"
import { routes } from "@/shared/constants/routes"
import { Avatar, Link } from "@heroui/react"
import useUserApi from "../api/user"
import { useRef } from "react"
import { toast } from "sonner"

const UserCard = ({className}: {className?: string}) => {
    const { isAuthenticated, user } = useSession()
    const { mutate: uploadAvatar, isPending } = useUserApi.mutateAvatar()
    const fileInputRef = useRef<HTMLInputElement>(null)

    if (!isAuthenticated || !user) return null

    const profileUrl = `${routes.profile}/${user.username}`
    
    const handleAvatarClick = () => {
        fileInputRef.current?.click()
    }

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                toast.error('Файл слишком большой. Максимальный размер 5MB')
                return
            }
            uploadAvatar(file)
        }
    }
    
    return (
        <div className={`flex flex-col items-center justify-between mx-10 ${className}`}>
            <div className="relative group cursor-pointer" onClick={handleAvatarClick}>
                <Avatar 
                    src={user.userMedias[0]?.media.url || "https://icons.veryicon.com/png/o/miscellaneous/rookie-official-icon-gallery/225-default-avatar.png"} 
                    className="w-20 h-20 text-lg"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    {isPending ? 'Загрузка...' : 'Изменить фото'}
                </div>
                <input 
                    type="file" 
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                />
            </div>
            <p className="text-2xl font-bold">{user?.firstName} {user?.lastName}</p>
            <Link size="sm" href={profileUrl}>@{user?.username}</Link>
        </div>
    )
}

export default UserCard