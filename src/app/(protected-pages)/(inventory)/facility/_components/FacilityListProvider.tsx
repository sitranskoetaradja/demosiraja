'use client'

import { useEffect } from 'react'
import { useFacilityListStore } from '../_store/facilityListStore'
import type { Facilities } from '../types'
import type { CommonProps } from '@/@types/common'

interface FacilityListProviderProps extends CommonProps {
    facilityList: Facilities
}

const FacilityListProvider = ({ facilityList, children }: FacilityListProviderProps) => {
    const setFacilityList = useFacilityListStore((state) => state.setFacilityList)

    const setInitialLoading = useFacilityListStore(
        (state) => state.setInitialLoading,
    )

    useEffect(() => {
        setFacilityList(facilityList)

        setInitialLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [facilityList])

    return <>{children}</>
}

export default FacilityListProvider
