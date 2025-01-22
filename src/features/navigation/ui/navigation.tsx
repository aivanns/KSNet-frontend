'use client'

import { Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { links } from "../model/navigation"
import { Button } from "@heroui/react"
import { useSession } from "@/entities/session/model/use-session"
import { LoginButton } from "@/shared/ui/login-button"
import { LogoutButton } from "@/shared/ui/logout-button"

const Navigation = () => {
    const pathname = usePathname()
    const { isAuthenticated, user } = useSession()

    const isLinkActive = (href: string) => {
        if (href === '/') {
            return pathname === '/'
        }
        return pathname.startsWith(href)
    }

    return (
        <div className="flex flex-col h-full w-full mt-4">
            <nav className="flex flex-col">
                {links.map((link) => {
                    if (link.onlyAuthorized && !isAuthenticated) return null
                    if (link.href === '/profile') {link.href = `/profile/${user?.username}`}

                    const Icon = link.icon
                    const isActive = isLinkActive(link.href)
    
                    return (
                        <Link 
                            key={link.href}
                            href={link.href}
                            className={`flex items-center gap-4 p-4 mx-5 my-2 rounded-lg transition-colors hover:bg-neutral-100 ${
                                isActive ? "bg-neutral-100" : ""
                            }`}
                        >
                            <Icon size={20} />
                            <span className="text-md">{link.label}</span>
                        </Link>
                    )
                })}
            </nav>
            <div className="flex justify-between items-center mt-auto mb-5">
                {isAuthenticated ? (
                    <>
                        <Button color="default" isIconOnly className="w-auto mx-5">
                            <Settings size={20} />
                        </Button>
                        <LogoutButton className="w-auto mx-5" />
                    </>
                ) : (<>
                    <div></div>
                    <LoginButton className="w-auto mx-5" />
                </>)}
            </div>
        </div>
    )
}

export default Navigation
