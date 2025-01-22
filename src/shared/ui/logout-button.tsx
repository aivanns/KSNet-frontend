'use client'

import { useSession } from "@/entities/session/model/use-session"
import { Button } from "@heroui/react"
import { LogOut } from "lucide-react"

interface LogoutButtonProps {
  wide?: boolean
  className?: string
}

export const LogoutButton = ({ wide = false, className }: LogoutButtonProps) => {
  const { logout } = useSession()

  if (wide) {
    return (
      <Button
        color="danger"
        onPress={logout}
        className={className}
      >
        <LogOut className="w-4 h-4 mr-2" />
        Выйти
      </Button>
    )
  }

  return (
    <Button
      color="danger"
      isIconOnly
      onPress={logout}
      className={className}
    >
      <LogOut className="w-4 h-4" />
    </Button>
  )
}
