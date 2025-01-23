'use client'

import { Button } from "@heroui/react"
import { Menu, Filter } from "lucide-react"
import { useState, useEffect } from "react"

interface PageLayoutProps {
    leftSection: React.ReactNode
    mainSection: React.ReactNode
    rightSection: React.ReactNode
}

const PageLayout = ({ leftSection, mainSection, rightSection }: PageLayoutProps) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)
    const [isFiltersOpen, setIsFiltersOpen] = useState(false)

    useEffect(() => {
        if (isSidebarOpen || isFiltersOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isSidebarOpen, isFiltersOpen])

    return (
        <div className="relative flex flex-col lg:flex-row h-full mb-5 gap-5 px-4 lg:px-0">
            <Button
                isIconOnly
                variant="flat"
                className="fixed top-4 left-4 z-50 lg:hidden shadow-lg bg-white hover:bg-neutral-100"
                onPress={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                <Menu className="w-5 h-5 text-neutral-600" />
            </Button>

            <Button
                isIconOnly
                variant="flat"
                className="fixed top-4 right-4 z-50 lg:hidden shadow-lg bg-white hover:bg-neutral-100"
                onPress={() => setIsFiltersOpen(!isFiltersOpen)}
            >
                <Filter className="w-5 h-5 text-neutral-600" />
            </Button>

            <div className={`
                fixed inset-0 z-40 lg:sticky lg:top-0 lg:z-auto lg:w-1/5 lg:h-screen
                transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                lg:translate-x-0 lg:block
                bg-white lg:bg-transparent
                px-5
                shadow-2xl lg:shadow-none
                overflow-y-auto
            `}>
                {leftSection}
            </div>

            <div className="w-full lg:w-3/5 text-center mt-5">
                {mainSection}
            </div>

            <div className={`
                fixed inset-0 z-40 lg:sticky lg:top-0 lg:z-auto lg:w-1/5 lg:h-screen
                transform transition-transform duration-300 ease-in-out
                ${isFiltersOpen ? 'translate-x-0' : 'translate-x-full'}
                lg:translate-x-0 lg:block
                bg-white lg:bg-transparent
                px-5
                shadow-2xl lg:shadow-none
                overflow-y-auto
                right-0
            `}>
                {rightSection}
            </div>

            {(isSidebarOpen || isFiltersOpen) && (
                <div 
                    className="fixed inset-0 bg-black/50 z-30 lg:hidden backdrop-blur-sm"
                    onClick={() => {
                        setIsSidebarOpen(false)
                        setIsFiltersOpen(false)
                    }}
                />
            )}
        </div>
    )
}

export default PageLayout
