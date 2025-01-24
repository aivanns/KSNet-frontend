import { QueryPayload } from "@/shared/types/query"

import { Filters } from "@/shared/types/query"

import { SortDirection } from "@/shared/types/query"

export interface Group {
    id: string
    name: string
    createdAt: string
    updatedAt: string
}

interface GroupSort {
    name?: SortDirection
}

interface GroupFilters extends Filters {
    name?: string
}

export type GroupQueryPayload = QueryPayload<GroupFilters, GroupSort>
