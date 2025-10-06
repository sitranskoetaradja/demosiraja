'use client'
import { use, useState } from 'react'
import Container from '@/components/shared/Container'
import Button from '@/components/ui/Button'
import Notification from '@/components/ui/Notification'
import toast from '@/components/ui/toast'
import ConfirmDialog from '@/components/shared/ConfirmDialog'
import sleep from '@/utils/sleep'
import { TbTrash } from 'react-icons/tb'
import { useRouter } from 'next/navigation'
import { createClient } from '@/utils/supabase/client'
import toTitleCase from '@/utils/toTitleCase'
import dayjs from 'dayjs'
import { TrackFormSchema } from '@/components/view/TrackForm/types'
import TrackForm from '@/components/view/TrackForm'

const TrackCreate = () => {
	const router = useRouter()
	const supabase = createClient()
	const [discardConfirmationOpen, setDiscardConfirmationOpen] =
		useState(false)
	const [isSubmiting, setIsSubmiting] = useState(false)

	const handleFormSubmit = async (values: TrackFormSchema) => {
		console.log('Submitted values', values)
		// const categoryName = toTitleCase(values.code)
		setIsSubmiting(true)
		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (user) {
			await sleep(800)
			
			const { error } = await supabase
				.from('tracks')
				.insert({
					code: values.code,
					name: values.name,
					from: values.from,
					to: values.to,
					created_by: user.id,
				})
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
			router.push('/track')

		} else {
			router.push('/login')
		}
	}

	const handleConfirmDiscard = () => {
		setDiscardConfirmationOpen(true)
		toast.push(
			<Notification type="success">Track discard!</Notification>,
			{ placement: 'top-center' },
		)
		router.push('/track')
	}

	const handleDiscard = () => {
		setDiscardConfirmationOpen(true)
	}

	const handleCancel = () => {
		setDiscardConfirmationOpen(false)
	}
	return (
		<>
			<TrackForm
				defaultValues={{
					code: '',
					name: '',
					from: '',
					to: '',
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
			</TrackForm>
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

export default TrackCreate
