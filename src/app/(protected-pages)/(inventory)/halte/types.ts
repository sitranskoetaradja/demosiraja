export type categories = {
    name: string
}
export type tracks = {
    code: string
}
export type Halte = {
    id: string
    code: string
    name: string
    categories: categories
    tracks: tracks
    latitude: number
    longitude: number
    photo: string | null
    created_at: Date
    created_by: string
}

export type Haltes = Halte[]
