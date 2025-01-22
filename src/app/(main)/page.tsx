'use client'

import Feed from "@/widgets/feed/ui/feed"
import Sidebar from "@/widgets/sidebar/ui/sidebar"
import PageLayout from "@/shared/ui/page-layout"

export default function Home() {

  return (
    <PageLayout
    leftSection={<Sidebar />}
    mainSection={<Feed />}
    rightSection={<p className="text-2xl font-bold text-black">section 3</p>}
    />
  )
}
