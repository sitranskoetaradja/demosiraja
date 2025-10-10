'use client'

import { useMemo, useState } from 'react'
import Tag from '@/components/ui/Tag'
import Tooltip from '@/components/ui/Tooltip'
import DataTable from '@/components/shared/DataTable'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import { useHalteListStore } from '../_store/halteListStore'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import sleep from '@/utils/sleep'
import { useRouter } from 'next/navigation'
import { TbTrash, TbEye } from 'react-icons/tb'
import dayjs from 'dayjs'
import { NumericFormat } from 'react-number-format'
import type { OnSortParam, ColumnDef } from '@/components/shared/DataTable'
import type { Halte } from '../types'
import { createClient } from '@/utils/supabase/client'

type HalteListTableProps = {
    halteListTotal: number
    pageIndex?: number
    pageSize?: number
}

const HalteStatusColor: Record<
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

const OrderColumn = ({ row }: { row: Halte }) => {
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
    onDelete,
}: {
    row: Halte
    onDelete: () => void
}) => {
    const router = useRouter()

    const onView = () => {
        // router.push(`/concepts/orders/order-details/${row.id}`)
    }

    return (
        <div className="flex justify-center text-lg gap-1">
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

const PaymentMethodImage = ({
    paymentMehod,
    className,
}: {
    paymentMehod: string
    className: string
}) => {
    switch (paymentMehod) {
        case 'visa':
            return (
                <img
                    className={className}
                    src="/img/others/img-8.png"
                    alt={paymentMehod}
                />
            )
        case 'master':
            return (
                <img
                    className={className}
                    src="/img/others/img-9.png"
                    alt={paymentMehod}
                />
            )
        case 'paypal':
            return (
                <img
                    className={className}
                    src="/img/others/img-10.png"
                    alt={paymentMehod}
                />
            )
        default:
            return <></>
    }
}

const HalteListTable = ({
    halteListTotal,
    pageIndex = 1,
    pageSize = 10,
}: HalteListTableProps) => {
    const router = useRouter()
    const halteList = useHalteListStore((state) => state.halteList)
    const setHalteList = useHalteListStore((state) => state.setHalteList)
    const initialLoading = useHalteListStore((state) => state.initialLoading)
const supabase = createClient()
    const { onAppendQueryParams } = useAppendQueryParams()

    const [deleting, setDeleting] = useState(false)

    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)

    const [orderToDelete, setOrderToDelete] = useState('')

    const columns: ColumnDef<Halte>[] = useMemo(
        () => [
            {
                header: 'No',
                size:50,
                accessorKey: '',
                cell: ({row}) => {
                    // const row = props.row.original
                    return (
                        <span>
                            {row.index + 1}
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
                size: 150,
                accessorKey: 'name',
                cell: (props) => {
                    const row = props.row.original
                    return <span>{row.name}</span>
                },
            },
            {
                header: 'Jenis Halte',
                size: 150,
                accessorKey: 'kategori',
                cell: (props) => {
                    const row = props.row.original
                    return <span>{row.categories.name}</span>
                },
            },
            {
                header: 'Latitude',
                accessorKey: 'lat',
                cell: (props) => {
                    const row = props.row.original
                    return <span>{row.latitude}</span>
                },
            },
            {
                header: 'Longitude',
                accessorKey: 'lng',
                cell: (props) => {
                    const row = props.row.original
                    return <span>{row.longitude}</span>
                },
            },
            
            
            
            
            {
                header: '',
                id: 'action',
                cell: (props) => (
                    <ActionColumn
                        row={props.row.original}
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
        .from('categories')
        .delete()
        .eq('id', orderToDelete)
        console.log('response', response)
  
        // const newOrderList = orderList.filter(
        //     (order) => order.id !== orderToDelete,
        // )
        // setOrderList(newOrderList)
        setDeleting(false)
        setDeleteConfirmationOpen(false)
        router.push('/bus')
    }

    return (
        <>
            <DataTable
                columns={columns}
                data={halteList}
                noData={halteList.length === 0}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                loading={initialLoading}
                pagingData={{
                    total: halteListTotal,
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

export default HalteListTable
