'use client'

import Card from '@/components/ui/Card'
import Input from '@/components/ui/Input'
import Select from '@/components/ui/Select'
import Tooltip from '@/components/ui/Tooltip'
import { FormItem } from '@/components/ui/Form'
import { HiOutlineQuestionMarkCircle } from 'react-icons/hi'
import { Controller } from 'react-hook-form'
import CreatableSelect from 'react-select/creatable'
import type { FormSectionBaseProps } from './types'
import DatePicker from '@/components/ui/DatePicker'
import dayjs from 'dayjs'
// import { Options } from '@/@types/common'
import { createClient } from '@/utils/supabase/client'
import { useCallback, useEffect, useState } from 'react'


type GeneralSectionProps = FormSectionBaseProps

type Options = {
	label: string
	value: string
}[]

const status: Options = [
    { label: 'Baik', value: 'BAIK' },
    { label: 'Rusak', value: 'RUSAK' },
    { label: 'Tidak Ada', value: 'TIDAK_ADA' },
]


const GeneralSection = ({ control, errors }: GeneralSectionProps) => {
	const supabase = createClient()
	const [loading, setLoading] = useState(true)
	const [categories, setCategories] = useState<Options>([])
	const [buses, setBuses] = useState<Options>([])
	const [haltes, setHaltes] = useState<Options>([])
	const [isDisabledBus, setIsDisabledBus] = useState(false)
	const [isDisabledBusStop, setIsDisabledBusStop] = useState(false)
	const [busId, setBusId] = useState<string | null>(null);
	const [busStopId, setBusStopId] = useState<string | null>(null);
	// const [error, setError] = useState(null);
	const fetchData = useCallback(async () => {
		setLoading(true);
		try {
			const [categoriesRes, busesRes, halteRes] = await Promise.all([
				supabase.from('categories').select('value:id, label:name'),
				supabase.from('buses').select('value:id, label:code'),
				supabase.from('bus_stops').select('value:id, label:code'),
			]);

			if (categoriesRes.error || busesRes.error || halteRes.error) {
				// Handle errors more gracefully here
				// setError(categoriesRes.error || busesRes.error || halteRes.error);
				console.error('Error fetching data:', categoriesRes.error || busesRes.error || halteRes.error);
			} else {
				setCategories(categoriesRes.data);
				setBuses(busesRes.data);
				setHaltes(halteRes.data);
			}
		} catch (err) {
			console.error('An unexpected error occurred:', err);
			//   setError(err);
		} finally {
			setLoading(false);
		}
	}, [supabase]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);
	// const getCategories = useCallback(async () => {
	//     try {
	//         setLoading(true)
	//         const { data, error, status } = await supabase
	//             .from('categories')
	//             .select(`value:id, label:name`)
	// 			if (error && status !== 406) {
	// 				console.log(error)
	// 			}
	// 			if (data) {
	// 				setCategories(data)
	// 				console.log(data)
	//         }
	//     } catch (error) {
	//         console.log('Error loading user data!')
	//     } finally {
	//         setLoading(false)
	//     }
	// }, [supabase])
	// const getBuses = useCallback(async () => {
	//     try {
	//         setLoading(true)
	//         const { data, error, status } = await supabase
	//             .from('buses')
	//             .select(`value:id, label:code`)
	// 			if (error && status !== 406) {
	// 				console.log(error)
	// 			}
	// 			if (data) {
	// 				setBuses(data)
	// 				console.log(data)
	//         }
	//     } catch (error) {
	//         console.log('Error loading user data!')
	//     } finally {
	//         setLoading(false)
	//     }
	// }, [supabase])
	// const getHalte = useCallback(async () => {
	//     try {
	//         setLoading(true)
	//         const { data, error, status } = await supabase
	//             .from('bus_stops')
	//             .select(`value:id, label:code`)
	// 			if (error && status !== 406) {
	// 				console.log(error)
	// 			}
	// 			if (data) {
	// 				setHalte(data)
	// 				console.log(data)
	//         }
	//     } catch (error) {
	//         console.log('Error loading user data!')
	//     } finally {
	//         setLoading(false)
	//     }
	// }, [supabase])
	// useEffect(() => {
	//     getCategories()
	//     getHalte()
	// 	getHalte()
	// }, [getCategories, getHalte, getBuses])
	return (
		<Card>
			<h4 className="mb-6">Basic Information</h4>
			<FormItem
				label="Kode Fasilitas"
				invalid={Boolean(errors.code)}
				errorMessage={errors.code?.message}
			>
				<Controller
					name="code"
					control={control}
					render={({ field }) => (
						<Input
							type="text"
							autoComplete="off"
							placeholder="Kode Fasilitas"
							{...field}
						/>
					)}
				/>
			</FormItem>
			<FormItem
				label="Nama Fasilitas"
				invalid={Boolean(errors.name)}
				errorMessage={errors.name?.message}
			>
				<Controller
					name="name"
					control={control}
					render={({ field }) => (
						<Input
							type="text"
							autoComplete="off"
							placeholder="Nama Fasilitas"
							{...field}
						/>
					)}
				/>
			</FormItem>
			<FormItem
				label="Kategori Fasilitas"
				invalid={Boolean(errors.categoryId)}
				errorMessage={errors.categoryId?.message}
			>
				<Controller
					name="categoryId"
					control={control}
					render={({ field }) => (
						<Select
							instanceId="categoryId"
							placeholder="Kategori Fasilitas"
							options={categories}
							value={categories.filter(
								(category) => category.value === field.value,
							)}
							onChange={(option) => { field.onChange(option?.value) }}
						/>
					)}
				/>
			</FormItem>
			<h5>Lokasi Fasilitas</h5>
			<div className="grid md:grid-cols-2 gap-4">
				<FormItem
					label="Bus"
					invalid={Boolean(errors.busId)}
					errorMessage={errors.busId?.message}
				>
					<Controller
						name="busId"
						control={control}
						render={({ field }) => (
							<Select
								instanceId="busId"
								placeholder="Rute Trayek"
								options={buses}
								value={buses.filter(
									(bus) => bus.value === busId,
								)}
								onChange={(option) => {
									field.onChange(option?.value)
									setBusId(option?.value || null);
									setBusStopId(null);
								}}
							/>
						)}
					/>
				</FormItem>
				<FormItem
					label="Halte"
					invalid={Boolean(errors.busStopId)}
					errorMessage={errors.busStopId?.message}
				>
					<Controller
						name="busStopId"
						control={control}
						render={({ field }) => (
							<Select
								isDisabled={isDisabledBus}
								instanceId="busStopId"
								placeholder="Rute Trayek"
								options={haltes}
								value={haltes.filter(
									(halte) => halte.value === busStopId,
								)}
								onChange={(option) => {
									field.onChange(option?.value)
									setBusStopId(option?.value || null);
									setBusId(null);
								}}
							/>
						)}
					/>
				</FormItem>
			</div>
			<FormItem
				label="Status Fasilitas"
				invalid={Boolean(errors.status)}
				errorMessage={errors.status?.message}
			>
				<Controller
					name="status"
					control={control}
					render={({ field }) => (
						<Select
							instanceId="status"
							placeholder="Status Fasilitas"
							options={status}
							value={status.filter(
								(res) => res.value === field.value,
							)}
							onChange={(option) => { field.onChange(option?.value) }}
						/>
					)}
				/>
			</FormItem>
<FormItem
				label="Note"
				invalid={Boolean(errors.note)}
				errorMessage={errors.note?.message}
			>
				<Controller
					name="note"
					control={control}
					render={({ field }) => (
						<Input
							textArea
							type="text"
							autoComplete="off"
							placeholder="Note"
							{...field}
						/>
					)}
				/>
			</FormItem>



		</Card>
	)
}

export default GeneralSection
