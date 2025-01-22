'use client'

import { useSession } from "@/entities/session/model/session-context"
import { routes } from "@/shared/constants/routes"
import { Avatar, Link } from "@heroui/react"

const UserCard = ({className}: {className?: string}) => {
    const { isAuthenticated, user } = useSession()
    if (!isAuthenticated || !user) return null

    const profileUrl = `${routes.profile}/${user.username}`
    
    return (
        <div className={`flex flex-col items-center justify-between mx-10 ${className}`}>
            <Avatar src="https://icons.veryicon.com/png/o/miscellaneous/rookie-official-icon-gallery/225-default-avatar.png" className="w-20 h-20 text-lg"/>
            <p className="text-2xl font-bold">{user?.firstName} {user?.lastName}</p>
            <Link size="sm" href={profileUrl}>@{user?.username}</Link>
        </div>
    )
}

export default UserCard