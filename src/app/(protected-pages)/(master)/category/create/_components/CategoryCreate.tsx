'use client'
import { useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import sleep from '@/utils/sleep'
import { TbTrash } from 'react-icons/tb'
import { useRouter } from 'next/navigation'
import type { CategoryFormSchema } from '@/components/view/CategoryForm'
import CategoryForm from '@/components/view/CategoryForm'
import { createClient } from '@/utils/supabase/client'
import toTitleCase from '@/utils/toTitleCase'

const CategoryCreate = () => {
    const router = useRouter()
    const supabase = createClient()
    const [discardConfirmationOpen, setDiscardConfirmationOpen] =
        useState(false)
    const [isSubmiting, setIsSubmiting] = useState(false)

    const handleFormSubmit = async (values: CategoryFormSchema) => {
        console.log('Submitted values', values)
        const categoryName= toTitleCase(values.categoryName)
        setIsSubmiting(true)
        const {
            data: { user },
        } = await supabase.auth.getUser();
        if (user) {
            await sleep(800)
            const { error } = await supabase
                .from('categories')
                .insert({ name: categoryName, created_by: user.id })
            setIsSubmiting(false)
            if (error) {

                toast.push(
                    <Notification type="danger">Something wrong, please try again!</Notification>,
                    { placement: 'top-center' },
                )
            } else {

                toast.push(
                    <Notification type="success">Category created!</Notification>,
                    { placement: 'top-center' },
                )
            }
            router.push('/category')

        } else {
            router.push('/login')
        }
    }

    const handleConfirmDiscard = () => {
        setDiscardConfirmationOpen(true)
        toast.push(
            <Notification type="success">Category discard!</Notification>,
            { placement: 'top-center' },
        )
        router.push('/category')
    }

    const handleDiscard = () => {
        setDiscardConfirmationOpen(true)
    }

    const handleCancel = () => {
        setDiscardConfirmationOpen(false)
    }

    return (
        <>
            <CategoryForm
                defaultValues={{
                    categoryName: '',
                }}
                onFormSubmit={handleFormSubmit}
            >
                <Container>
                    <div className="flex items-center justify-between px-8">
                        <span></span>
                        <div className="flex items-center">
                            <Button
                                className="ltr:mr-3 rtl:ml-3"
                                type="button"
                                customColorClass={() =>
                                    'border-error ring-1 ring-error text-error hover:border-error hover:ring-error hover:text-error bg-transparent'
                                }
                                icon={<TbTrash />}
                                onClick={handleDiscard}
                            >
                                Discard
                            </Button>
                            <Button
                                variant="solid"
                                type="submit"
                                loading={isSubmiting}
                            >
                                Create
                            </Button>
                        </div>
                    </div>
                </Container>
            </CategoryForm>
            <ConfirmDialog
                isOpen={discardConfirmationOpen}
                type="danger"
                title="Discard changes"
                onClose={handleCancel}
                onRequestClose={handleCancel}
                onCancel={handleCancel}
                onConfirm={handleConfirmDiscard}
            >
                <p>
                    Are you sure you want discard this? This action can&apos;t
                    be undo.{' '}
                </p>
            </ConfirmDialog>
        </>
    )
}

export default CategoryCreate
