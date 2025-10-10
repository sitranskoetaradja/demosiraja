'use client'

import { useEffect } from 'react'
import { useUserListStore } from '../_store/userListStore'
import type { Users } from '../types'
import type { CommonProps } from '@/@types/common'

interface UserListProviderProps extends CommonProps {
    userList: Users
}

const UserListProvider = ({ userList, children }: UserListProviderProps) => {
    const setUserList = useUserListStore((state) => state.setUserList)

    const setInitialLoading = useUserListStore(
        (state) => state.setInitialLoading,
    )

    useEffect(() => {
        setUserList(userList)

        setInitialLoading(false)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userList])

    return <>{children}</>
}

export default UserListProvider
