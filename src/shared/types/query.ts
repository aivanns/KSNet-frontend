export interface Pagination {
    count: number
    page: number
}

export interface Filters {
    [key: string]: string | number | boolean | undefined | string[]
}

export type SortDirection = 'asc' | 'desc'

export type SortFields<T> = {
    [K in keyof T]?: SortDirection
}

export interface QueryPayload<TFilters extends Filters = Filters, TSort = unknown> {
    pagination: Pagination
    filters: TFilters
    sort: SortFields<TSort>
}

export interface QueryResponse<T> {
    data: T[]
    count: number
}