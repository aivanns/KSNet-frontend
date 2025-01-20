import { Avatar, Card, Link } from "@heroui/react";

const UserCard = ({name, username, className}: {name: string, username: string, className?: string}) => {
    return (
            <div className={`flex flex-col items-center justify-between mx-10 ${className}`}>
                <Avatar src="@default_avatar.png" className="w-20 h-20 text-lg"/>
                <p className="text-2xl font-bold">{name}</p>
                <Link size="sm" href={`/user/${username}`}>@{username}</Link>
            </div>
    )
}

export default UserCard;