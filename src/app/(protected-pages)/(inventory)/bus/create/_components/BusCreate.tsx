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
import type { BusFormSchema } from '@/components/view/BusForm'
import BusForm from '@/components/view/BusForm'
import { createClient } from '@/utils/supabase/client'
import toTitleCase from '@/utils/toTitleCase'
import dayjs from 'dayjs'

const BusCreate = () => {
	const router = useRouter()
	const supabase = createClient()
	const [discardConfirmationOpen, setDiscardConfirmationOpen] =
		useState(false)
	const [isSubmiting, setIsSubmiting] = useState(false)

	const handleFormSubmit = async (values: BusFormSchema) => {
		console.log('Submitted values', values)
		// const categoryName = toTitleCase(values.code)
		setIsSubmiting(true)
		const {
			data: { user },
		} = await supabase.auth.getUser();
		if (user) {
			await sleep(800)
			const response = await fetch(values.photo);
			const blob = await response.blob();
			const extractFile = new File([blob], `${user.id}-${Date.now()}`, { type: blob.type })
			const mime = blob.type; // e.g., "image/png"
			const ext = mime.split('/').pop(); // "png"
			const filePath = `bus/${values.code}-${Date.now()}.${ext}`;
			
			if (values.photo) {
				const { error: uploadError } = await supabase.storage
					.from('sirajabucket') // your bucket name
					.upload(filePath, extractFile);
				if (uploadError) {
					toast.push(
						<Notification type="danger">Something wrong, please try again!</Notification>,
						{ placement: 'top-center' },
					)
					router.push('/bus')
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
				.from('buses')
				.insert({
					category_id: values.categoryId,
					code: values.code,
					plate_number: values.plateNumber,
					brand: values.brand,
					production_year: values.productionYear,
					frame_number: values.frameNumber,
					machine_number: values.machineNumber,
					stnk_period: values.stnkPeriod ? dayjs.unix(values.stnkPeriod).toDate() : null,
					tax_period: values.taxPeriod ? dayjs.unix(values.taxPeriod).toDate() : null,
					photo: res.publicUrl,
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
			router.push('/bus')

		} else {
			router.push('/login')
		}
	}

	const handleConfirmDiscard = () => {
		setDiscardConfirmationOpen(true)
		toast.push(
			<Notification type="success">Bus discard!</Notification>,
			{ placement: 'top-center' },
		)
		router.push('/bus')
	}

	const handleDiscard = () => {
		setDiscardConfirmationOpen(true)
	}

	const handleCancel = () => {
		setDiscardConfirmationOpen(false)
	}
	return (
		<>
			<BusForm
				defaultValues={{
					code: '',
					categoryId: '',
					plateNumber: '',
					brand: '',
					productionYear: 0,
					frameNumber: '',
					machineNumber: '',
					stnkPeriod: 0,
					taxPeriod: 0,
					photo: '',
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
			</BusForm>
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

export default BusCreate
