'use client'

import UserCard from "@/entities/user/ui/user-card";
import Navigation from "@/features/navigation/ui/navigation";
import { Card } from "@heroui/react";

const Sidebar = () => {
    return (
        <Card className="h-[calc(100vh-2.5rem)] sticky top-5 flex flex-col items-center justify-start gap-4 text-black">
            <UserCard className="mt-10"/>
            <Navigation />
        </Card>
    )
}

export default Sidebar;