'use client'

import ConfirmDialog from '@/components/shared/ConfirmDialog'
import type { ColumnDef, OnSortParam } from '@/components/shared/DataTable'
import DataTable from '@/components/shared/DataTable'
import Tag from '@/components/ui/Tag'
import Tooltip from '@/components/ui/Tooltip'
import { deleteUser } from '@/server/actions/removeUser'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { TbEye, TbPencil, TbTrash } from 'react-icons/tb'
import { useUserListStore } from '../_store/userListStore'
import type { User } from '../types'

type UserListTableProps = {
    userListTotal: number
    pageIndex?: number
    pageSize?: number
}

const RoleColor: Record<
    string,
    {
        label: string
        bgClass: string
        textClass: string
    }
> = {
    'admin': {
        label: 'Admin',
        bgClass: 'bg-success-subtle',
        textClass: 'text-success',
    },
    'user': {
        label: 'User',
        bgClass: 'bg-primary-subtle',
        textClass: 'text-primary',
    },
    'TIDAK_ADA': { label: 'Tidak Ada', bgClass: 'bg-error-subtle', textClass: 'text-error' },
}

const OrderColumn = ({ row }: { row: User }) => {
    const router = useRouter()

    const onView = () => {
        // router.push(`/concepts/orders/order-details/${row.id}`)
    }

    return (
        <span
            className="cursor-pointer font-bold heading-text hover:text-primary"
            onClick={onView}
        >
            #{row.id}
        </span>
    )
}

const ActionColumn = ({
    row,
    onEdit,
    onDelete,
}: {
    row: User
    onEdit: () => void
    onDelete: () => void
}) => {
    const router = useRouter()

    const onView = () => {
        // router.push(`/concepts/orders/order-details/${row.id}`)
    }

    return (
        <div className="flex justify-center text-lg gap-0">
            <Tooltip wrapperClass="flex" title="Edit">
                <span className={`cursor-pointer p-2 hover:text-green-500`} onClick={onEdit} >
                    <TbPencil />
                </span>
            </Tooltip>
            <Tooltip wrapperClass="flex" title="View">
                <span className={`cursor-pointer p-2 hover:text-blue-500`} onClick={onView}>
                    <TbEye />
                </span>
            </Tooltip>
            <Tooltip wrapperClass="flex" title="Delete">
                <span
                    className="cursor-pointer p-2 hover:text-red-500"
                    onClick={onDelete}
                >
                    <TbTrash />
                </span>
            </Tooltip>
        </div>
    )
}

const UserListTable = ({
    userListTotal,
    pageIndex = 1,
    pageSize = 10,
}: UserListTableProps) => {
    const router = useRouter()
    const userList = useUserListStore((state) => state.userList)
    const setUserList = useUserListStore((state) => state.setUserList)
    const initialLoading = useUserListStore((state) => state.initialLoading)
    const supabase = createClient()

    const { onAppendQueryParams } = useAppendQueryParams()

    const [deleting, setDeleting] = useState(false)

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

    const [orderToDelete, setOrderToDelete] = useState('')
    const handleEdit = (user: User) => {
        // router.push(`/concepts/customers/customer-edit/${user.id}`)
    }
    const columns: ColumnDef<User>[] = useMemo(
        () => [
            {
                header: 'No',
                accessorKey: '',
                cell: ({ row }) => {
                    // const row = props.row.original
                    return (
                        <span>
                            {(row.index + 1) + ((pageIndex-1)*pageSize)}
                        </span>
                    )
                },
            },

            {
                header: 'Nama',
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return <span>{row.name}</span>
                },
            },
            {
                header: 'NIP',
                accessorKey: 'nip',
                cell: (props) => {
                    const row = props.row.original
                    return <span>{row.nip}</span>
                },
            },
            {
                header: 'Role',
                accessorKey: 'role',
                cell: (props) => {
                    const row = props.row.original
                    return (<Tag className={RoleColor[row.role].bgClass}>
                            <span
                                className={`capitalize font-semibold ${RoleColor[row.role].textClass}`}
                            >
                                {RoleColor[row.role].label}
                            </span>
                        </Tag>)
                },
            },
            {
                header: 'Email',
                accessorKey: 'Email',
                cell: (props) => {
                    const row = props.row.original
                    return <span>{row.email ?? '-'}</span>
                },
            },
            {
                header: 'Phone',
                accessorKey: 'Phone',
                cell: (props) => {
                    const row = props.row.original
                    return <span>{row.phone ?? '-'}</span>
                },
            },

            {
                header: () => <div className="flex justify-center">Action</div>,
                id: 'action',
                cell: (props) => (
                    <ActionColumn
                        row={props.row.original}
                        onEdit={() => handleEdit(props.row.original)}
                        onDelete={() => handleDelete(props.row.original.id)}
                    />
                ),
            },
        ],
        [pageIndex, pageSize],
    )

    const handleDelete = (id: string) => {
        setOrderToDelete(id)
        setDeleteConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDeleteConfirmationOpen(false)
    }

    const handlePaginationChange = (page: number) => {
        onAppendQueryParams({
            pageIndex: String(page),
        })
    }

    const handleSelectChange = (value: number) => {
        onAppendQueryParams({
            pageSize: String(value),
            pageIndex: '1',
        })
    }

    const handleSort = (sort: OnSortParam) => {
        onAppendQueryParams({
            order: sort.order,
            sortKey: sort.key,
        })
    }

    const handleDeleteConfirm = async () => {
        setDeleting(true)

        await deleteUser(orderToDelete)
        setDeleting(false)
        setDeleteConfirmationOpen(false)
        router.push('/user')
    }

    return (
        <>
            <DataTable
                columns={columns}
                data={userList}
                noData={userList.length === 0}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                loading={initialLoading}
                pagingData={{
                    total: userListTotal,
                    pageIndex,
                    pageSize,
                }}
                onPaginationChange={handlePaginationChange}
                onSelectChange={handleSelectChange}
                onSort={handleSort}
            />
            <ConfirmDialog
                isOpen={deleteConfirmationOpen}
                type="danger"
                title="Hapus User"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleDeleteConfirm}
                confirmButtonProps={{ loading: deleting }}
            >
                <p>
                    {' '}
                    Anda yakin ingin menghapus user ini? aksi ini tidak dapat dikembalikan.{' '}
                </p>
            </ConfirmDialog>
        </>
    )
}

export default UserListTable
