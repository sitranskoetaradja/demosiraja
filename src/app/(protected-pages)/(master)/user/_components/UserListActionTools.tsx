'use client'

import Button from '@/components/ui/Button'
// import { useOrderListStore } from '../_store/categoryListStore'
import { TbCloudDownload, TbPlus } from 'react-icons/tb'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

// const CSVLink = dynamic(() => import('react-csv').then((mod) => mod.CSVLink), {
//     ssr: false,
// })

const UserListActionTools = () => {
    const router = useRouter()

    // const orderList = useOrderListStore((state) => state.orderList)

    return (
        <div className="flex flex-col md:flex-row gap-3">
            <Button
                variant="solid"
                icon={<TbPlus className="text-xl" />}
                onClick={() => router.push('/user/create')}
            >
                Tambah User
            </Button>
        </div>
    )
}

export default UserListActionTools
