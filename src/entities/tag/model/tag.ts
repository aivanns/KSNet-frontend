import { Filters, QueryPayload, SortDirection } from "@/shared/types/query"

export interface Tag {
    id: string
    name: string
}

export interface TagFilters extends Filters {
    name?: string
}

export interface TagSort {
    name?: SortDirection
}

export type TagQueryPayload = QueryPayload<TagFilters, TagSort>