'use client'

import PageLayout from "@/shared/ui/page-layout";
import Feed from "@/widgets/feed/ui/feed";
import Sidebar from "@/widgets/sidebar/ui/sidebar";
import UserProfile from "@/widgets/user-profile/ui/user-profile";

export default function ProfilePage() {
    return <PageLayout
    leftSection={<Sidebar />}
    mainSection={<UserProfile />}
    rightSection={<p className="text-2xl font-bold text-black">section 3</p>}
    />
}