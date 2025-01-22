'use client'

import PageLayout from "@/shared/ui/page-layout";
import FilteredSearch from "@/widgets/filtered-search/filtered-search";
import Sidebar from "@/widgets/sidebar/ui/sidebar";
import UserProfile from "@/widgets/user-profile/ui/user-profile";

export default function ProfilePage() {
    return <PageLayout
    leftSection={<Sidebar />}
    mainSection={<UserProfile />}
    rightSection={<FilteredSearch />}
    />
}