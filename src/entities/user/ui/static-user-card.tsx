'use client'

import { routes } from "@/shared/constants/routes"
import { Avatar, Link } from "@heroui/react"
import { User } from "../model/user"

const StaticUserCard = ({
    user,
    className
}: {
    user: User
    className?: string
}) => {
    const profileUrl = `${routes.profile}/${user.username}`
    
    return (
        <div className={`flex flex-col items-center justify-between mx-10 ${className}`}>
            <Avatar 
                src={user.userMedias[0]?.media.url || "https://www.ks54.ru/wp-content/uploads/2020/02/ks54-300x300.png"} 
                className="w-20 h-20 text-lg bg-neutral-200"
            />
            <p className="text-2xl font-bold">{user.firstName} {user.lastName}</p>
            <Link size="sm" className="text-safetyOrange" href={profileUrl}>@{user.username}</Link>
        </div>
    )
}

export default StaticUserCard 