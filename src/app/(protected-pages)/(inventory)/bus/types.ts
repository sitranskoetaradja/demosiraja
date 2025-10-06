// export type Order = {
//     id: string
//     date: number
//     customer: string
//     status: number
//     paymentMehod: string
//     paymentIdendifier: string
//     totalAmount: number
// }

// export type Orders = Order[]

// export type Filter = {
//     date: [Date, Date]
//     status: string
//     paymentMethod: string[]
// }
export type categories = {
    name: string
}
export type Bus = {
    id: string
    code: string
    categories: categories
    plate_number: string
    brand: string
    production_year: number
    frame_number: string
    machine_number: string
    stnk_period: Date
    tax_period: Date
    photo: string | null
    created_at: Date
    created_by: string
}

export type Buses = Bus[]
