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
import type { UserFormSchema } from '@/components/view/UserForm'
import UserForm from '@/components/view/UserForm'
import { createClient } from '@/utils/supabase/client'
import toTitleCase from '@/utils/toTitleCase'
import dayjs from 'dayjs'
import { createAdminUser } from '@/server/actions/addUser'

const UserCreate = () => {
	const router = useRouter()
	const supabase = createClient()
	const [discardConfirmationOpen, setDiscardConfirmationOpen] =
		useState(false)
	const [isSubmiting, setIsSubmiting] = useState(false)

	const handleFormSubmit = async (values: UserFormSchema) => {
		console.log('Submitted values', values)
		// const categoryName = toTitleCase(values.code)
		setIsSubmiting(true)
		const {
			data: { user },
		} = await supabase.auth.getUser();
		
		
		if (user) {
			await sleep(800)
			const {success, data} = await createAdminUser(values.email, values.password)
			
			if (success) {

				const response = await fetch(values.avatar);
				const blob = await response.blob();
				const extractFile = new File([blob], `${user.id}-${Date.now()}`, { type: blob.type })
				const mime = blob.type; // e.g., "image/png"
				const ext = mime.split('/').pop(); // "png"
				const filePath = `avatar/${values.nip}-${Date.now()}.${ext}`;

				if (values.avatar) {
					const { error: uploadError } = await supabase.storage
						.from('sirajabucket') // your bucket name
						.upload(filePath, extractFile);
					if (uploadError) {
						toast.push(
							<Notification type="danger">Something wrong, please try again!</Notification>,
							{ placement: 'top-center' },
						)
						router.push('/user')
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
					.from('profiles')
					.insert({
						id: data?.user?.id,
						nip: values.nip,
						name: values.name,
						position: values.position,
						rank: values.rank,
						role: values.role,
						email: data?.user?.email,
						phone: values.phone,
						avatar: values.avatar ? res.publicUrl : '',
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
						<Notification type="success">User berhasil ditambah!</Notification>,
						{ placement: 'top-center' },
					)
				}
				router.push('/user')
			} else {
				toast.push(
					<Notification type="danger">Something wrong, please try again!</Notification>,
					{ placement: 'top-center' },
				)
				router.push('/user')
			}

		} else {
			router.push('/login')
		}
	}

	const handleConfirmDiscard = () => {
		setDiscardConfirmationOpen(true)
		toast.push(
			<Notification type="success">User discard!</Notification>,
			{ placement: 'top-center' },
		)
		router.push('/user')
	}

	const handleDiscard = () => {
		setDiscardConfirmationOpen(true)
	}

	const handleCancel = () => {
		setDiscardConfirmationOpen(false)
	}
	return (
		<>
			<UserForm
				defaultValues={{
					nip: '',
					name: '',
					position: '',
					rank: '',
					role: '',
					email: '',
					phone: '',
					avatar: '',
					password: '',
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
			</UserForm>
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

export default UserCreate
