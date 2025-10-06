'use client'

import { useEffect } from 'react'
import { useTrackListStore } from '../_store/trackListStore'
import type { Tracks } from '../types'
import type { CommonProps } from '@/@types/common'

interface TrackListProviderProps extends CommonProps {
    trackList: Tracks
}

const TrackListProvider = ({ trackList, children }: TrackListProviderProps) => {
    const setTrackList = useTrackListStore((state) => state.setTrackList)

    const setInitialLoading = useTrackListStore(
        (state) => state.setInitialLoading,
    )

    useEffect(() => {
        setTrackList(trackList)

        setInitialLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trackList])

    return <>{children}</>
}

export default TrackListProvider
