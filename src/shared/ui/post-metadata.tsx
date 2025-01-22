'use client'

import { Link } from "@heroui/react"
import { ExternalLink } from "lucide-react"
import TagBadge from "@/entities/tag/ui/tag-badge"
import { Tag } from "@/entities/tag/model/tag"

interface PostMetadataProps {
    url?: string
    tags?: Tag[]
}

const PostMetadata = ({ url, tags }: PostMetadataProps) => {
    if (!url && (!tags || tags.length === 0)) return null
    
    return (
        <div className="flex flex-col gap-2 px-2">
            {url && (
                <Link 
                    href={url} 
                    target="_blank"
                    className="flex items-center gap-1 text-md text-blue-600 hover:text-primary transition-colors w-fit"
                >
                    <ExternalLink size={14} />
                    <span className="truncate max-w-[300px]">{url}</span>
                </Link>
            )}
            
            {tags && tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <TagBadge key={tag.id} tag={tag.name} />
                    ))}
                </div>
            )}
        </div>
    )
}

export default PostMetadata 