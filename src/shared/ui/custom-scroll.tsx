"use client"

import SimpleBar from 'simplebar-react'
import 'simplebar-react/dist/simplebar.min.css'
import { cn } from '@/shared/lib/utils'

interface CustomScrollProps {
  children: React.ReactNode
  className?: string
}

export const CustomScroll = ({ children, className }: CustomScrollProps) => {
  return (
    <div className="h-screen overflow-hidden">
      <SimpleBar
        style={{ maxHeight: '100vh' }}
        className={cn('h-full', className)}
        forceVisible="y"
        autoHide={false}
      >
        {children}
      </SimpleBar>
    </div>
  )
} 