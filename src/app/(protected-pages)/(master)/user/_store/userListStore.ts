import { create } from 'zustand'
import type { Users } from '../types'
import dayjs from 'dayjs'

export const initialFilterData = {
    date: [dayjs().subtract(1, 'week').toDate(), new Date()] as [Date, Date],
    status: 'all',
    paymentMethod: ['Credit card', 'Debit card', 'Paypal', 'Stripe', 'Cash'],
}

export type UserListState = {
    // filterData: Filter
    userList: Users
    initialLoading: boolean
}

type UserListAction = {
    // setFilterData: (payload: Filter) => void
    setUserList: (payload: Users) => void
    setInitialLoading: (payload: boolean) => void
}

const initialState: UserListState = {
    // filterData: initialFilterData,
    userList: [],
    initialLoading: true,
}

export const useUserListStore = create<UserListState & UserListAction>(
    (set) => ({
        ...initialState,
        // setFilterData: (payload) => set(() => ({ filterData: payload })),
        setUserList: (payload) => set(() => ({ userList: payload })),
        setInitialLoading: (payload) =>
            set(() => ({ initialLoading: payload })),
    }),
)
