import { routes } from "@/shared/constants/routes"
import { Home, Search, Bell, User } from "lucide-react"

export const links = [
    {
        href: routes.home,
        label: "Главная",
        icon: Home,
        onlyAuthorized: false
    },
    {
        href: routes.search,
        label: "Поиск",
        icon: Search,
        onlyAuthorized: false
    },
    {
        href: routes.notifications,
        label: "Уведомления",
        icon: Bell,
        onlyAuthorized: true
    },
    {
        href: routes.profile,
        label: "Профиль",
        icon: User,
        onlyAuthorized: true
    }
]