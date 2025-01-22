'use client'

import Feed from "@/widgets/feed/ui/feed"
import Sidebar from "@/widgets/sidebar/ui/sidebar"
import PageLayout from "@/shared/ui/page-layout"
import FilteredSearch from "@/widgets/filtered-search/filtered-search"

export default function Home() {

  return (
    <PageLayout
    leftSection={<Sidebar />}
    mainSection={<Feed />}
    rightSection={<FilteredSearch />}
    />
  )
}
