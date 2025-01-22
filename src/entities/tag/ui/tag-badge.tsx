const getColorFromHash = (tag: string) => {
    const colors = [
        'bg-blue-100 text-blue-600',
        'bg-green-100 text-green-600',
        'bg-purple-100 text-purple-600',
        'bg-yellow-100 text-yellow-600',
        'bg-red-100 text-red-600',
        'bg-pink-100 text-pink-600',
        'bg-indigo-100 text-indigo-600',
        'bg-orange-100 text-orange-600',
        'bg-teal-100 text-teal-600',
        'bg-cyan-100 text-cyan-600',
        'bg-fuchsia-100 text-fuchsia-600',
        'bg-lime-100 text-lime-600',
        'bg-emerald-100 text-emerald-600',
        'bg-violet-100 text-violet-600',
        'bg-rose-100 text-rose-600',
        'bg-sky-100 text-sky-600',
        'bg-gray-100 text-gray-600',
        'bg-amber-100 text-amber-600',
    ]
    
    let hash = 0
    for (let i = 0; i < tag.length; i++) {
        hash = tag.charCodeAt(i) + ((hash << 5) - hash)
    }
    
    return colors[Math.abs(hash) % colors.length]
}

const TagBadge = ({ tag, selected }: { tag: string, selected?: boolean }) => {
    const colorClass = getColorFromHash(tag)
    return <div className={`${colorClass} px-2 py-1 rounded-md text-sm ${selected ? 'bg-blue-500 text-white' : ''}`}>{tag}</div>
}

export default TagBadge
