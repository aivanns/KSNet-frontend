import { create } from 'zustand'
import { PostFilters, PostSort } from './post'

interface PostState {
  filters: PostFilters
  sort: PostSort
  searchQuery: string
  selectedTags: string[]
  setFilters: (filters: PostFilters) => void
  setSort: (sort: PostSort) => void
  setSearchQuery: (query: string) => void
  setSelectedTags: (tags: string[]) => void
}

export const usePostStore = create<PostState>((set) => ({
  filters: {},
  sort: {createdAt: 'desc'},
  searchQuery: '',
  selectedTags: [],
  setFilters: (filters) => set({ filters }),
  setSort: (sort) => set({ sort }),
  setSearchQuery: (searchQuery) => set({ searchQuery }),
  setSelectedTags: (selectedTags) => set({ selectedTags })
})) 