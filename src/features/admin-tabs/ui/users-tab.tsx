'use client'

import { Loader } from "lucide-react"
import ErrorCard from "@/shared/ui/error-card"
import { useAdminUserApi } from "../api/users-tab"
import AdminUserCard from "./user-card"
import { User } from "@/entities/user/model/user"

const UsersTab = () => {
    const { data, isLoading, error } = useAdminUserApi.useGetUsers({
        pagination: {
            page: 1,
            count: 10
        },
        filters: {},
        sort: {}
    })

    if (isLoading) return <Loader />
    if (error) return <ErrorCard message="Ошибка загрузки пользователей" />

    return (
        <div className="flex flex-col gap-4 p-6">
            {data?.data.map((user: User) => (
                <AdminUserCard key={user.id} user={user} />
            ))}
        </div>
    )
}

export default UsersTab