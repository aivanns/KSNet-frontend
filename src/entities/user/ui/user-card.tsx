'use client'

import { useSession } from "@/entities/session/model/session-context"
import { routes } from "@/shared/constants/routes"
import { Avatar, Link } from "@heroui/react"

const UserCard = ({className}: {className?: string}) => {
    const { isAuthenticated, user } = useSession()
    if (!isAuthenticated || !user) return null

    const profileUrl = `${routes.profile}/${user.id}`
    
    return (
        <div className={`flex flex-col items-center justify-between mx-10 ${className}`}>
            <Avatar src="@default_avatar.png" className="w-20 h-20 text-lg"/>
            <p className="text-2xl font-bold">{user?.firstName} {user?.lastName}</p>
            <Link size="sm" href={profileUrl}>@{user?.id}</Link>
        </div>
    )
}

export default UserCard