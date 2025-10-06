export type categories = {
    name: string
}
export type buses = {
    code: string
}

export type bus_stops = {
    name: string
}

export type Facility = {
    id: string
    buses: buses | null
	bus_stops: bus_stops | null
    code: string
    name: string
	categories: categories
    status: string
    note: string
    documentation: string | null
    created_at: Date
    created_by: string
}

export type Facilities = Facility[]
