'use client'

import Avatar from '@/components/ui/Avatar'
import Dropdown from '@/components/ui/Dropdown'
import withHeaderItem from '@/utils/hoc/withHeaderItem'
import Link from 'next/link'
import signOut from '@/server/actions/auth/handleSignOut'
import { PiUserDuotone, PiSignOutDuotone } from 'react-icons/pi'
import { useCallback, useEffect, useState, type JSX } from 'react'
import { createClient } from '@/utils/supabase/client'

type DropdownList = {
    label: string
    path: string
    icon: JSX.Element
}

const dropdownItemList: DropdownList[] = []
type User = {
    nip: string
    name: string
    position: string
    rank: string
    role: string
    email: string
    phone: string
    password: string
    avatar: string | null
}

const _UserDropdown = () => {
    const supabase = createClient()
    const [userData, setUserData] = useState<User | null>(null)

    const handleSignOut = async () => {
        await signOut()
    }

    const avatarProps = {
        ...(userData?.avatar
            ? { src: userData?.avatar }
            : { icon: <PiUserDuotone /> }),
    }

    const getProfile = useCallback(async () => {
        try {
            const { data: { user } } = await supabase.auth.getUser();
            const { data, error, status } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', user?.id)
                .single()
            if (error && status !== 406) {
                console.log(error)
                throw error
            }
            if (data) {
                setUserData(data)
                console.log('data user', data)
            }
        } catch (error) {
            console.log('Error loading user data!')
        } finally {
        }
    }, [supabase])
    useEffect(() => {
        getProfile()
    }, [getProfile])

    return (
        <Dropdown
            className="flex"
            toggleClassName="flex items-center"
            renderTitle={
                <div className="cursor-pointer flex items-center">
                    <Avatar size={32} {...avatarProps} />
                </div>
            }
            placement="bottom-end"
        >
            <Dropdown.Item variant="header">
                <div className="py-2 px-3 flex items-center gap-3">
                    <Avatar {...avatarProps} />
                    <div>
                        <div className="font-bold text-gray-900 dark:text-gray-100">
                            {userData?.name || 'Anonymous'}
                        </div>
                        <div className="text-xs">
                            {userData?.email || 'No email available'}
                        </div>
                    </div>
                </div>
            </Dropdown.Item>
            <Dropdown.Item variant="divider" />
            {dropdownItemList.map((item) => (
                <Dropdown.Item
                    key={item.label}
                    eventKey={item.label}
                    className="px-0"
                >
                    <Link className="flex h-full w-full px-2" href={item.path}>
                        <span className="flex gap-2 items-center w-full">
                            <span className="text-xl">{item.icon}</span>
                            <span>{item.label}</span>
                        </span>
                    </Link>
                </Dropdown.Item>
            ))}
            <Dropdown.Item
                eventKey="Sign Out"
                className="gap-2"
                onClick={handleSignOut}
            >
                <span className="text-xl">
                    <PiSignOutDuotone />
                </span>
                <span>Sign Out</span>
            </Dropdown.Item>
        </Dropdown>
    )
}

const UserDropdown = withHeaderItem(_UserDropdown)

export default UserDropdown
