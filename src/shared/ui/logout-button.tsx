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
        onPress={logout}
        className={className + ' bg-safetyOrange text-white'}
      >
        <LogOut className="w-4 h-4 mr-2" transform="rotate(180)" />
        Выйти
      </Button>
    )
  }

  return (
    <Button
      isIconOnly
      onPress={logout}
      className={className + ' bg-safetyOrange text-white'}
    >
      <LogOut className="w-4 h-4" transform="rotate(180)" />
    </Button>
  )
}
