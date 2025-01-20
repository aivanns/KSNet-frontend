import { LogOut, Settings } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { links } from "../model/navigation"
import { Button } from "@heroui/react"

const Navigation = () => {
    const pathname = usePathname()

    return (
        <div className="flex flex-col h-full w-full mt-10">
            <nav className="flex flex-col">
                {links.map((link) => {
                    const Icon = link.icon
                    const isActive = pathname === link.href
                    
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
                <Button color="default" isIconOnly className="w-auto mx-5">
                    <Settings size={20} />
                </Button>
                <Button color="danger" isIconOnly className="w-auto mx-5">
                    <LogOut size={20} />
                </Button>
            </div>
        </div>
    )
}

export default Navigation
