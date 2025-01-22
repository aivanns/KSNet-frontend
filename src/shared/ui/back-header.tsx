'use client'

import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { routes } from "../constants/routes"

interface BackHeaderProps {
  title: string
  className?: string
  size?: 'sm' | 'md' | 'lg'
}

export const BackHeader = ({ title, className, size = 'md' }: BackHeaderProps) => {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push(routes.home)}
      className={`flex items-center gap-2 text-neutral-900 hover:text-neutral-600 transition-colors ${className}`}
    >
      <ArrowLeft className="w-5 h-5" />
      <span className={`text-${size} font-medium`}>{title}</span>
    </button>
  )
} 