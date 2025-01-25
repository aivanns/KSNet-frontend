'use client'

import { routes } from "@/shared/constants/routes"
import { Home, Search, Bell, User, Settings } from "lucide-react"

export const links = [
    {
        href: routes.home,
        label: "Главная",
        icon: Home,
        onlyAuthorized: false
    },
    {
        href: routes.profile,
        label: "Профиль",
        icon: User,
        onlyAuthorized: true
    },
    {
        href: routes.admin,
        label: "Панель администратора",
        icon: Settings,
        onlyAuthorized: true
    }
]