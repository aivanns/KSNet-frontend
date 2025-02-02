'use client'

import PageLayout from "@/shared/ui/page-layout";
import FilteredSearch from "@/widgets/filtered-search/filtered-search";
import Sidebar from "@/widgets/sidebar/ui/sidebar";
import UserProfile from "@/widgets/user-profile/ui/user-profile";
import { useParams } from "next/navigation";

export default function ProfilePage() {
    const { id } = useParams()

    return <PageLayout
    leftSection={<Sidebar />}
    mainSection={<UserProfile userId={id as string} />}
    rightSection={<FilteredSearch />}
    />
}