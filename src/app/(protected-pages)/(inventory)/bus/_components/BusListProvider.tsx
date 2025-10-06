'use client'

import { useEffect } from 'react'
import { useBusListStore } from '../_store/busListStore'
import type { Buses } from '../types'
import type { CommonProps } from '@/@types/common'

interface BusListProviderProps extends CommonProps {
    busList: Buses
}

const BusListProvider = ({ busList, children }: BusListProviderProps) => {
    const setBusList = useBusListStore((state) => state.setBusList)

    const setInitialLoading = useBusListStore(
        (state) => state.setInitialLoading,
    )

    useEffect(() => {
        setBusList(busList)

        setInitialLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [busList])

    return <>{children}</>
}

export default BusListProvider
