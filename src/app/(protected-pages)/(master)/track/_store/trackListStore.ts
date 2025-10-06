import { create } from 'zustand'
import type { Tracks } from '../types'
import dayjs from 'dayjs'

export const initialFilterData = {
    date: [dayjs().subtract(1, 'week').toDate(), new Date()] as [Date, Date],
    status: 'all',
    paymentMethod: ['Credit card', 'Debit card', 'Paypal', 'Stripe', 'Cash'],
}

export type TrackListState = {
    // filterData: Filter
    trackList: Tracks
    initialLoading: boolean
}

type TrackListAction = {
    // setFilterData: (payload: Filter) => void
    setTrackList: (payload: Tracks) => void
    setInitialLoading: (payload: boolean) => void
}

const initialState: TrackListState = {
    // filterData: initialFilterData,
    trackList: [],
    initialLoading: true,
}

export const useTrackListStore = create<TrackListState & TrackListAction>(
    (set) => ({
        ...initialState,
        // setFilterData: (payload) => set(() => ({ filterData: payload })),
        setTrackList: (payload) => set(() => ({ trackList: payload })),
        setInitialLoading: (payload) =>
            set(() => ({ initialLoading: payload })),
    }),
)
