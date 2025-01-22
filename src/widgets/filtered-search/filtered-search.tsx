'use client'

import { usePostStore } from "@/entities/post/model/store"
import { useTag } from "@/entities/tag/api/tag"
import { Tag } from "@/entities/tag/model/tag"
import { Button, Input, Card, Spinner } from "@heroui/react"
import { Search, X } from "lucide-react"
import { useState } from "react"
import TagBadge from "@/entities/tag/ui/tag-badge"
import ErrorCard from "@/shared/ui/error-card"

const FilteredSearch = () => {
    const { selectedTags, setSelectedTags } = usePostStore()
    const [tagSearch, setTagSearch] = useState("")

    const { data: tags, isLoading, error } = useTag.useGetTags({
        pagination: {
            page: 1,
            count: 100
        },
        filters: {
            name: tagSearch
        },
        sort: {}
    })

    const handleTagSelect = (tagId: string) => {
        setSelectedTags(
            selectedTags.includes(tagId)
                ? selectedTags.filter(id => id !== tagId)
                : [...selectedTags, tagId]
        )
    }

    const clearTags = () => setSelectedTags([])

    const allTags = tags?.data.data || []
    const selectedTagObjects = allTags.filter((tag: Tag) => selectedTags.includes(tag.id))
    const unselectedTagObjects = allTags.filter((tag: Tag) => 
        !selectedTags.includes(tag.id) && 
        tag.name.toLowerCase().includes(tagSearch.toLowerCase())
    )

    return (
        <Card className="h-[calc(100vh-2.5rem)] sticky top-5 p-4 flex flex-col gap-4">
            <div className="flex gap-2 items-center">
                <Input
                    placeholder="Поиск тегов..."
                    value={tagSearch}
                    onChange={(e) => setTagSearch(e.target.value)}
                    className="w-full"
                    startContent={<Search size={18} />}
                />
                {selectedTags.length > 0 && (
                    <Button
                        isIconOnly
                        variant="light"
                        size="sm"
                        onPress={clearTags}
                    >
                        <X size={18} />
                    </Button>
                )}
            </div>

            {selectedTagObjects.length > 0 && (
                <div className="border-b pb-4">
                    <p className="text-sm text-default-500 mb-2">Выбранные теги:</p>
                    <div className="flex flex-wrap gap-2">
                        {selectedTagObjects.map((tag: Tag) => (
                            <div key={tag.id} onClick={() => handleTagSelect(tag.id)} className="cursor-pointer">
                                <TagBadge 
                                    tag={tag.name}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
            
            <div className="flex-1 overflow-y-auto">
                {isLoading ? (
                    <div className="flex justify-center items-center h-full">
                        <Spinner size="lg" />
                    </div>
                ) : error ? (
                    <ErrorCard message="Ошибка загрузки тегов" className="h-full rounded-none"/>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        {unselectedTagObjects.map((tag: Tag) => (
                            <div key={tag.id} onClick={() => handleTagSelect(tag.id)} className="cursor-pointer">
                                <TagBadge 
                                    tag={tag.name}
                                />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </Card>
    )
}

export default FilteredSearch