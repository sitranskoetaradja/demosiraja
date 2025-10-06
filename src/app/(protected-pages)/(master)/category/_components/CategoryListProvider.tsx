'use client'

import { useEffect } from 'react'
import { useCategoryListStore } from '../_store/categoryListStore'
import type { Categories } from '../types'
import type { CommonProps } from '@/@types/common'

interface CategoryListProviderProps extends CommonProps {
    categoryList: Categories
}

const CategoryListProvider = ({ categoryList, children }: CategoryListProviderProps) => {
    const setCategoryList = useCategoryListStore((state) => state.setCategoryList)

    const setInitialLoading = useCategoryListStore(
        (state) => state.setInitialLoading,
    )

    useEffect(() => {
        setCategoryList(categoryList)

        setInitialLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [categoryList])

    return <>{children}</>
}

export default CategoryListProvider
