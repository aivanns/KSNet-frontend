import { useSession } from "@/entities/session/model/use-session";
import { routes } from "@/shared/constants/routes";
import { Avatar, Link } from "@heroui/react";

const UserCard = ({className}: {className?: string}) => {
    const { isAuthenticated, user } = useSession()
    if (!isAuthenticated) return null
    return (
            <div className={`flex flex-col items-center justify-between mx-10 ${className}`}>
                <Avatar src="@default_avatar.png" className="w-20 h-20 text-lg"/>
                <p className="text-2xl font-bold">{user?.firstName} {user?.lastName}</p>
                <Link size="sm" href={`/${routes.profile}/${user?.id}`}>@{user?.id}</Link>
            </div>
    )
}

export default UserCard;