'use client'

import PageLayout from "@/shared/ui/page-layout"
import AdminPanel from "@/widgets/admin-panel/ui/admin-panel"
import Sidebar from "@/widgets/sidebar/ui/sidebar"

const AdminPage = () => {
    return (
        <PageLayout leftSection={<Sidebar />} mainSection={<AdminPanel />} rightSection={<div>МЕТРИКИ</div>} />
    )
}

export default AdminPage