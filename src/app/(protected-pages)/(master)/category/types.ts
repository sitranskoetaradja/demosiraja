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

export type Category = {
    id: string
    name: string
    created_at: Date
    created_by: string
}

export type Categories = Category[]
