import { create } from 'zustand'
import type { Facilities } from '../types'
import dayjs from 'dayjs'

export const initialFilterData = {
    date: [dayjs().subtract(1, 'week').toDate(), new Date()] as [Date, Date],
    status: 'all',
    paymentMethod: ['Credit card', 'Debit card', 'Paypal', 'Stripe', 'Cash'],
}

export type FacilityListState = {
    // filterData: Filter
    facilityList: Facilities
    initialLoading: boolean
}

type FacilityListAction = {
    // setFilterData: (payload: Filter) => void
    setFacilityList: (payload: Facilities) => void
    setInitialLoading: (payload: boolean) => void
}

const initialState: FacilityListState = {
    // filterData: initialFilterData,
    facilityList: [],
    initialLoading: true,
}

export const useFacilityListStore = create<FacilityListState & FacilityListAction>(
    (set) => ({
        ...initialState,
        // setFilterData: (payload) => set(() => ({ filterData: payload })),
        setFacilityList: (payload) => set(() => ({ facilityList: payload })),
        setInitialLoading: (payload) =>
            set(() => ({ initialLoading: payload })),
    }),
)
