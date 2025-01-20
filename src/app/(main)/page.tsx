'use client'

import Feed from "@/widgets/feed/ui/feed"
import Sidebar from "@/widgets/sidebar/ui/sidebar"

export default function Home() {

  return (
    <div className="flex h-full my-5">
        <div className="w-1/5 text-center p-4">
            <Sidebar />
        </div>
        <div className="w-3/5 text-center">
            <Feed />
        </div>
        <div className="w-1/5 text-center p-4">
            <p className="text-2xl font-bold text-black">section 3</p>
        </div>
    </div>
  )
}
