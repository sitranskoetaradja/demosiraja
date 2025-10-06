import { create } from 'zustand'
import type { Categories } from '../types'
import dayjs from 'dayjs'

export const initialFilterData = {
    date: [dayjs().subtract(1, 'week').toDate(), new Date()] as [Date, Date],
    status: 'all',
    paymentMethod: ['Credit card', 'Debit card', 'Paypal', 'Stripe', 'Cash'],
}

export type CategoryListState = {
    // filterData: Filter
    categoryList: Categories
    initialLoading: boolean
}

type CategoryListAction = {
    // setFilterData: (payload: Filter) => void
    setCategoryList: (payload: Categories) => void
    setInitialLoading: (payload: boolean) => void
}

const initialState: CategoryListState = {
    // filterData: initialFilterData,
    categoryList: [],
    initialLoading: true,
}

export const useCategoryListStore = create<CategoryListState & CategoryListAction>(
    (set) => ({
        ...initialState,
        // setFilterData: (payload) => set(() => ({ filterData: payload })),
        setCategoryList: (payload) => set(() => ({ categoryList: payload })),
        setInitialLoading: (payload) =>
            set(() => ({ initialLoading: payload })),
    }),
)
