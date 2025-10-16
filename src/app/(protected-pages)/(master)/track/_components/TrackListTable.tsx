'use client'

import ConfirmDialog from '@/components/shared/ConfirmDialog'
import type { ColumnDef, OnSortParam } from '@/components/shared/DataTable'
import DataTable from '@/components/shared/DataTable'
import Tooltip from '@/components/ui/Tooltip'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { TbEye, TbPencil, TbTrash } from 'react-icons/tb'
import { useTrackListStore } from '../_store/trackListStore'
import type { Track } from '../types'

type TrackListTableProps = {
    trackListTotal: number
    pageIndex?: number
    pageSize?: number
}

const trackStatusColor: Record<
    number,
    {
        label: string
        bgClass: string
        textClass: string
    }
> = {
    0: {
        label: 'Paid',
        bgClass: 'bg-success-subtle',
        textClass: 'text-success',
    },
    1: {
        label: 'Pending',
        bgClass: 'bg-warning-subtle',
        textClass: 'text-warning',
    },
    2: { label: 'Failed', bgClass: 'bg-error-subtle', textClass: 'text-error' },
}

const OrderColumn = ({ row }: { row: Track }) => {
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
    row: Track
    onEdit: () => void
    onDelete: () => void
}) => {
    const router = useRouter()

    const onView = () => {
        // router.push(`/concepts/orders/order-details/${row.id}`)
    }

    return (
        <div className="flex justify-center text-lg gap-1">
            <Tooltip wrapperClass="flex" title="Edit">
                <span className={`cursor-pointer p-2 hover:text-green-500`} onClick={onEdit} >
                    <TbPencil />
                </span>
            </Tooltip>
            <Tooltip wrapperClass="flex" title="View">
                <span className={`cursor-pointer p-2`} onClick={onView}>
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

const TrackListTable = ({
    trackListTotal,
    pageIndex = 1,
    pageSize = 10,
}: TrackListTableProps) => {
    const router = useRouter()
    const trackList = useTrackListStore((state) => state.trackList)
    const setTrackList = useTrackListStore((state) => state.setTrackList)
    const initialLoading = useTrackListStore((state) => state.initialLoading)
    const supabase = createClient()
    const { onAppendQueryParams } = useAppendQueryParams()

    const [deleting, setDeleting] = useState(false)

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

    const [orderToDelete, setOrderToDelete] = useState('')
    const handleEdit = (track: Track) => {
        // router.push(`/concepts/customers/customer-edit/${user.id}`)
    }
    const columns: ColumnDef<Track>[] = useMemo(
        () => [
            {
                header: 'No',
                size: 50,
                accessorKey: '',
                cell: ({ row }) => {
                    // const row = props.row.original
                    return (
                        <span>
                            {(row.index + 1) + ((pageIndex - 1) * pageSize)}
                        </span>
                    )
                },
            },

            {
                header: 'Kode',
                size: 100,
                accessorKey: 'code',
                cell: (props) => {
                    const row = props.row.original
                    return <span className="font-semibold">{row.code}</span>
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
                header: 'Lokasi Awal',
                accessorKey: 'from',
                cell: (props) => {
                    const row = props.row.original
                    return <span>{row.from}</span>
                },
            },
            {
                header: 'Lokasi Tujuan',
                accessorKey: 'to',
                cell: (props) => {
                    const row = props.row.original
                    return <span>{row.to}</span>
                },
            },
            {
                header: '',
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
        [],
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
        console.log('orderToDelete', orderToDelete)
        setDeleting(true)
        // await sleep(800)
        const response = await supabase
            .from('tracks')
            .delete()
            .eq('id', orderToDelete)
        console.log('response', response)

        // const newOrderList = orderList.filter(
        //     (order) => order.id !== orderToDelete,
        // )
        // setOrderList(newOrderList)
        setDeleting(false)
        setDeleteConfirmationOpen(false)
        router.push('/track')
    }

    return (
        <>
            <DataTable
                columns={columns}
                data={trackList}
                noData={trackList.length === 0}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                loading={initialLoading}
                pagingData={{
                    total: trackListTotal,
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
                title="Remove articles"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleDeleteConfirm}
                confirmButtonProps={{ loading: deleting }}
            >
                <p>
                    {' '}
                    Are you sure you want to remove these articles? This action
                    can&apos;t be undo.{' '}
                </p>
            </ConfirmDialog>
        </>
    )
}

export default TrackListTable
