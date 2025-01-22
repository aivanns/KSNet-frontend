'use client'

import { Button } from "@heroui/react"
import { LogIn } from "lucide-react"
import Link from "next/link"
import { routes } from "../constants/routes"

interface LoginButtonProps {
  wide?: boolean
  className?: string
}

export const LoginButton = ({ wide = false, className }: LoginButtonProps) => {
  if (wide) {
    return (
      <Link href={routes.login}>
        <Button
          color="default"
          className={className}
        >
          <LogIn className="w-4 h-4 mr-2" />
          Войти
        </Button>
      </Link>
    )
  }

  return (
    <Link href={routes.login}>
      <Button
        color="default"
        isIconOnly
        className={className}
      >
        <LogIn className="w-4 h-4" />
      </Button>
    </Link>
  )
}
