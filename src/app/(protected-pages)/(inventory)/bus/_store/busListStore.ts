import { create } from 'zustand'
import type { Buses } from '../types'
import dayjs from 'dayjs'

export const initialFilterData = {
    date: [dayjs().subtract(1, 'week').toDate(), new Date()] as [Date, Date],
    status: 'all',
    paymentMethod: ['Credit card', 'Debit card', 'Paypal', 'Stripe', 'Cash'],
}

export type BusListState = {
    // filterData: Filter
    busList: Buses
    initialLoading: boolean
}

type BusListAction = {
    // setFilterData: (payload: Filter) => void
    setBusList: (payload: Buses) => void
    setInitialLoading: (payload: boolean) => void
}

const initialState: BusListState = {
    // filterData: initialFilterData,
    busList: [],
    initialLoading: true,
}

export const useBusListStore = create<BusListState & BusListAction>(
    (set) => ({
        ...initialState,
        // setFilterData: (payload) => set(() => ({ filterData: payload })),
        setBusList: (payload) => set(() => ({ busList: payload })),
        setInitialLoading: (payload) =>
            set(() => ({ initialLoading: payload })),
    }),
)
