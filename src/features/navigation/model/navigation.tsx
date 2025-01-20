import { routes } from "@/shared/constants/routes"
import { Home, Search, Bell, User } from "lucide-react"

export const links = [
    {
        href: routes.home,
        label: "Главная",
        icon: Home
    },
    {
        href: routes.search,
        label: "Поиск",
        icon: Search
    },
    {
        href: routes.notifications,
        label: "Уведомления",
        icon: Bell
    },
    {
        href: routes.profile,
        label: "Профиль",
        icon: User
    }
]