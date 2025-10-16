'use client'

import ConfirmDialog from '@/components/shared/ConfirmDialog'
import type { ColumnDef } from '@/components/shared/DataTable'
import DataTable from '@/components/shared/DataTable'
import Tooltip from '@/components/ui/Tooltip'
import useAppendQueryParams from '@/utils/hooks/useAppendQueryParams'
import { createClient } from '@/utils/supabase/client'
import dayjs from 'dayjs'
import { useRouter } from 'next/navigation'
import { useMemo, useState } from 'react'
import { TbEye, TbPencil, TbTrash } from 'react-icons/tb'
import { useCategoryListStore } from '../_store/categoryListStore'
import type { Category } from '../types'

type CategoryListTableProps = {
    categoryListTotal: number
    pageIndex?: number
    pageSize?: number
}

const ActionColumn = ({
    row,
    onEdit,
    onDelete,
}: {
    row: Category
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

const CategoryListTable = ({
    categoryListTotal,
    pageIndex = 1,
    pageSize = 10,
}: CategoryListTableProps) => {
    const router = useRouter()
    const supabase = createClient()
    const categoryList = useCategoryListStore((state) => state.categoryList)
    const initialLoading = useCategoryListStore((state) => state.initialLoading)
    const { onAppendQueryParams } = useAppendQueryParams()
    const [deleting, setDeleting] = useState(false)
    const [deleteConfirmationOpen, setDeleteConfirmationOpen] = useState(false)
    const [orderToDelete, setOrderToDelete] = useState('')
    const handleEdit = (category: Category) => {
        // router.push(`/concepts/customers/customer-edit/${user.id}`)
    }
    const columns: ColumnDef<Category>[] = useMemo(
        () => [
            {
                header: 'No',
                accessorKey: '',
                cell: ({ row }) => {
                    return (
                        <span>
                            {(row.index + 1) + ((pageIndex - 1) * pageSize)}
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
                header: 'Tanggal Pembuatan',
                accessorKey: 'date',
                cell: (props) => {
                    const row = props.row.original
                    return (
                        <span>
                            {row.created_at ? dayjs(row.created_at).format('DD MMM, YYYY') : '-'}
                        </span>
                    )
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

    const handleDeleteConfirm = async () => {
        setDeleting(true)
        await supabase
            .from('categories')
            .delete()
            .eq('id', orderToDelete)
        setDeleting(false)
        setDeleteConfirmationOpen(false)
        router.push('/category')
    }

    return (
        <>
            <DataTable
                columns={columns}
                data={categoryList}
                noData={categoryList.length === 0}
                skeletonAvatarColumns={[0]}
                skeletonAvatarProps={{ width: 28, height: 28 }}
                loading={initialLoading}
                pagingData={{
                    total: categoryListTotal,
                    pageIndex,
                    pageSize,
                }}
                onPaginationChange={handlePaginationChange}
                onSelectChange={handleSelectChange}
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

export default CategoryListTable
