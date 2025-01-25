import { Card } from "@heroui/react"
import { Tabs, Tab } from "@heroui/react"
import { useTranslation } from "react-i18next"

const AdminPanel = () => {
    const { t } = useTranslation()

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
                    <Tab key="users" title={t('admin.users')}>
                        <div className="p-4">Контент пользователей</div>
                    </Tab>
                    <Tab key="posts" title={t('admin.posts')}>
                        <div className="p-4">Контент постов</div>
                    </Tab>
                    <Tab key="stats" title={t('admin.stats')}>
                        <div className="p-4">Контент статистики</div>
                    </Tab>
                </Tabs>
            </div>
        </Card>
    )
}

export default AdminPanel