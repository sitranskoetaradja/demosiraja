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
import type { FacilityFormSchema } from '@/components/view/FacilityForm'
import HalteForm from '@/components/view/HalteForm'
import { createClient } from '@/utils/supabase/client'
import toTitleCase from '@/utils/toTitleCase'
import dayjs from 'dayjs'
import FacilityForm from '@/components/view/FacilityForm'

const FacilityCreate = () => {
	const router = useRouter()
	const supabase = createClient()
	const [discardConfirmationOpen, setDiscardConfirmationOpen] =
		useState(false)
	const [isSubmiting, setIsSubmiting] = useState(false)

	const handleFormSubmit = async (values: FacilityFormSchema) => {
		console.log('Submitted values', values)
		// const categoryName = toTitleCase(values.code)
		setIsSubmiting(true)
		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (user) {
			await sleep(800)
			const response = await fetch(values.documentation);
			const blob = await response.blob();
			const extractFile = new File([blob], `${user.id}-${Date.now()}`, { type: blob.type })
			const mime = blob.type; // e.g., "image/png"
			const ext = mime.split('/').pop(); // "png"
			const filePath = `facility/${values.code}-${Date.now()}.${ext}`;
			if(values.documentation) {
				const { error: uploadError } = await supabase.storage
					.from('sirajabucket') // your bucket name
					.upload(filePath, extractFile);
				if (uploadError) {
					toast.push(
						<Notification type="danger">Something wrong, please try again!</Notification>,
						{ placement: 'top-center' },
					)
					router.push('/facility')
				}

			}

			const { data: res } = supabase.storage
				.from('sirajabucket')
				.getPublicUrl(filePath);
			// const file = event.target.files[0]
			//   const fileExt = file.name.split('.').pop()
			//   const filePath = `${uid}-${Math.random()}.${fileExt}`
			//   const { error: uploadError } = await supabase.storage.from('avatars').upload(filePath, file)

			// dayjs.unix(values.value as number).toDate()
			const { error } = await supabase
				.from('facilities')
				.insert({
					category_id: values.categoryId,
					bus_id: values.busId,
					bus_stop_id: values.busStopId,
					code: values.code,
					name: values.name,
					status: values.status,
					note: values.note,
					documentation: values.documentation ? res.publicUrl : '',
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
			router.push('/facility')

		} else {
			router.push('/login')
		}
	}

	const handleConfirmDiscard = () => {
		setDiscardConfirmationOpen(true)
		toast.push(
			<Notification type="success">Facility discard!</Notification>,
			{ placement: 'top-center' },
		)
		router.push('/facility')
	}

	const handleDiscard = () => {
		setDiscardConfirmationOpen(true)
	}

	const handleCancel = () => {
		setDiscardConfirmationOpen(false)
	}
	return (
		<>
			<FacilityForm
				defaultValues={{
					categoryId: '',
					busId: '',
					busStopId: '',
					code: '',
					name: '',
					status: '',
					note: '',
					documentation: '',
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
			</FacilityForm>
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

export default FacilityCreate
