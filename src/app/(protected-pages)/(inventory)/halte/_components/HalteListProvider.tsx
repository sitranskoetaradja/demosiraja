'use client'

import { useEffect } from 'react'
import { useHalteListStore } from '../_store/halteListStore'
import type { Haltes } from '../types'
import type { CommonProps } from '@/@types/common'

interface HalteListProviderProps extends CommonProps {
    halteList: Haltes
}

const HalteListProvider = ({ halteList, children }: HalteListProviderProps) => {
    const setHalteList = useHalteListStore((state) => state.setHalteList)

    const setInitialLoading = useHalteListStore(
        (state) => state.setInitialLoading,
    )

    useEffect(() => {
        setHalteList(halteList)

        setInitialLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [halteList])

    return <>{children}</>
}

export default HalteListProvider
