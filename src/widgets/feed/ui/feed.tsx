"use client"

import Post from "@/entities/post/ui/post";
import { Input } from "@heroui/react";

const Feed = () => {
    return (
        <>
            <div className="flex justify-between items-center gap-4 mx-10 mb-5">
                <p className="text-2xl font-bold text-black">Лента</p>
                <Input placeholder="Поиск" className="w-1/2" />
            </div>
            <div className="flex flex-col items-center justify-center gap-20">
            {Array.from({ length: 10 }).map((_, index) => (
                <Post author="John Doe" date="2 часа назад" image="https://images.ctfassets.net/h6goo9gw1hh6/2sNZtFAWOdP1lmQ33VwRN3/24e953b920a9cd0ff2e1d587742a2472/1-intro-photo-final.jpg?w=1200&h=992&fl=progressive&q=70&fm=jpg" text="Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde fugiat facilis quis non alias similique dignissimos ipsam mollitia voluptas quidem libero, quae blanditiis placeat. Quae quaerat assumenda ab itaque reprehenderit!"  key={index} />
            ))}
        </div>
        </>
    )   
}

export default Feed;