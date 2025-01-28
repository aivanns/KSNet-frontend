import { useSession } from "@/entities/session/model/session-context"
import PostTab from "@/features/admin-tabs/ui/post-tab"
import TopTab from "@/features/admin-tabs/ui/top-tab"
import UsersTab from "@/features/admin-tabs/ui/users-tab"
import ErrorCard from "@/shared/ui/error-card"
import { Card } from "@heroui/react"
import { Tabs, Tab } from "@heroui/react"
import { useTranslation } from "react-i18next"

const AdminPanel = () => {
    const { t } = useTranslation()
    const { user } = useSession()

    if (user?.role.name != 'Администратор') return <ErrorCard message="У вас нет доступа!" />;

    return (
        <Card className="w-full h-full text-neutral-900">
            <div className="flex flex-col gap-2 justify-start items-start m-5">
                <p className="text-2xl font-bold ml-2 mb-2">{t('admin.panel')}</p>
                <div className="border-b-2 border-neutral-200 w-full"></div>
                <Tabs 
                    aria-label="Admin tabs" 
                    color="warning"
                    size="lg"
                    variant="underlined"
                    className="w-full"
                >
                    <Tab key="users" className="w-full" title={t('admin.users')}>
                        <UsersTab />
                    </Tab>
                    <Tab key="posts" className="w-full" title={t('admin.posts')}>
                        <PostTab />
                    </Tab>
                    <Tab key="top" className="w-full" title={t('admin.top')}>
                        <TopTab />
                    </Tab>
                    <Tab key="stats" className="w-full" title={t('admin.stats')}>
                        <div className="p-4">Контент статистики</div>
                    </Tab>
                </Tabs>
            </div>
        </Card>
    )
}

export default AdminPanel