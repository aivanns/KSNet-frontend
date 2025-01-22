'use client'

import UserCard from "@/entities/user/ui/user-card"
import { Button, Card, Tabs, Tab } from "@heroui/react"
import { Grid, List, Settings } from "lucide-react"
import { useState } from "react"
import Post from "@/entities/post/ui/post"
import TagBadge from "@/shared/ui/tag-badge"

const UserProfile = () => {
    const [view, setView] = useState<"grid" | "list">("grid")
    
    return (
        <div className="flex flex-col gap-6 w-full">
            <Card className="w-full p-6 text-black">
                    <UserCard className="m-0"/>
                
                <div className="flex justify-between items-center gap-8 mt-8 mx-10 border-t pt-6">
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold">128</span>
                        <span className="text-neutral-600">публикаций</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold">1,240</span>
                        <span className="text-neutral-600">подписчиков</span>
                    </div>
                    <div className="flex flex-col items-center">
                        <span className="text-2xl font-bold">425</span>
                        <span className="text-neutral-600">подписок</span>
                    </div>
                </div>
            </Card>

            <div className="flex justify-between items-center">
                <Tabs color="primary" variant="underlined">
                    <Tab key="posts" title="Публикации" />
                    <Tab key="saved" title="Сохраненные" />
                </Tabs>
                <div className="flex gap-2">
                    <Button 
                        isIconOnly 
                        variant={view === "grid" ? "solid" : "light"}
                        onPress={() => setView("grid")}
                    >
                        <Grid size={20} />
                    </Button>
                    <Button 
                        isIconOnly 
                        variant={view === "list" ? "solid" : "light"}
                        onPress={() => setView("list")}
                    >
                        <List size={20} />
                    </Button>
                </div>
            </div>

            <div className={view === "grid" ? "grid grid-cols-3 gap-4" : "flex flex-col gap-6"}>
                {Array.from({ length: 10 }).map((_, index) => (
                    <Post 
                        key={index}
                        isFull
                        author="John Doe"
                        date="2 часа назад"
                        text="Красивое описание поста"
                        image="https://picsum.photos/800/600"
                        tags={["Python", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS", "HTML", "CSS", "Test", "absolutely normal badge", "developer post", "fuck backend"]}
                        url="https://github.com/aivanns"
                    />
                ))}
            </div>
        </div>
    )
}

export default UserProfile