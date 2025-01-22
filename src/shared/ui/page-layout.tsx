'use client'

interface PageLayoutProps {
    leftSection: React.ReactNode
    mainSection: React.ReactNode
    rightSection: React.ReactNode
}

const PageLayout = ({ leftSection, mainSection, rightSection }: PageLayoutProps) => {
    return (
        <div className="flex h-full my-5">
            <div className="w-1/5 text-center px-5">
                {leftSection}
            </div>
            <div className="w-3/5 text-center">
                {mainSection}
            </div>
            <div className="w-1/5 text-center p-4">
                {rightSection}
            </div>
        </div>
    )
}

export default PageLayout
