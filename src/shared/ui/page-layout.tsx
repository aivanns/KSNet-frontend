'use client'

interface PageLayoutProps {
    leftSection: React.ReactNode
    mainSection: React.ReactNode
    rightSection: React.ReactNode
}

const PageLayout = ({ leftSection, mainSection, rightSection }: PageLayoutProps) => {
    return (
        <div className="flex flex-col lg:flex-row h-full my-5 gap-5 px-4 lg:px-0">
            <div className="hidden lg:block lg:w-1/5 text-center px-5">
                {leftSection}
            </div>
            <div className="w-full lg:w-3/5 text-center">
                {mainSection}
            </div>
            <div className="hidden lg:block lg:w-1/5 text-center px-5">
                {rightSection}
            </div>
        </div>
    )
}

export default PageLayout
