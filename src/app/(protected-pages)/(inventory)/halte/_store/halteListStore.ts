import { create } from 'zustand'
import type { Haltes } from '../types'
import dayjs from 'dayjs'

export const initialFilterData = {
    date: [dayjs().subtract(1, 'week').toDate(), new Date()] as [Date, Date],
    status: 'all',
    paymentMethod: ['Credit card', 'Debit card', 'Paypal', 'Stripe', 'Cash'],
}

export type HalteListState = {
    // filterData: Filter
    halteList: Haltes
    initialLoading: boolean
}

type HalteListAction = {
    // setFilterData: (payload: Filter) => void
    setHalteList: (payload: Haltes) => void
    setInitialLoading: (payload: boolean) => void
}

const initialState: HalteListState = {
    // filterData: initialFilterData,
    halteList: [],
    initialLoading: true,
}

export const useHalteListStore = create<HalteListState & HalteListAction>(
    (set) => ({
        ...initialState,
        // setFilterData: (payload) => set(() => ({ filterData: payload })),
        setHalteList: (payload) => set(() => ({ halteList: payload })),
        setInitialLoading: (payload) =>
            set(() => ({ initialLoading: payload })),
    }),
)
