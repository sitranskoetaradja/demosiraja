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

// const categories: Options = [
//     { label: 'Bags', value: 'bags' },
//     { label: 'Cloths', value: 'cloths' },
//     { label: 'Devices', value: 'devices' },
//     { label: 'Shoes', value: 'shoes' },
//     { label: 'asdasd', value: 'watches' },
//     { label: 'Watchxzczxces', value: 'watchertes' },
//     { label: 'Watczxches', value: 'watcerthes' },
//     { label: 'Watzxcxcawwwches', value: 'watcfghhes' },
//     { label: 'Watasasdches', value: 'watasdsadches' },
//     { label: 'Watdhwaches', value: 'watcasdxzches' },
//     { label: 'Watsdfgches', value: 'watczxches' },
//     { label: 'Watcfxbhes', value: 'watczxczxches' },
//     { label: 'Watcasdfhes', value: 'watczxczxches' },
//     { label: 'Watasdgfches', value: 'watrthches' },
//     { label: 'Watches', value: 'watzxaweches' },
//     { label: 'Watcsdheshes', value: 'wavbntches' },
//     { label: 'Watcertgasghes', value: 'watcbvnmhes' },
//     { label: 'Watdfgsdches', value: 'wadsfghches' },
//     { label: 'Watwaerches', value: 'wawettches' },
//     { label: 'Watches', value: 'watchwetes' },
// ]


const GeneralSection = ({ control, errors }: GeneralSectionProps) => {
	const supabase = createClient()
	const [loading, setLoading] = useState(true)
	const [categories, setCategories] = useState<Options>([])
	const [tracks, setTracks] = useState<Options>([])
	const getCategories = useCallback(async () => {
        try {
            setLoading(true)
            const { data, error, status } = await supabase
                .from('categories')
                .select(`value:id, label:name`)
				if (error && status !== 406) {
					console.log(error)
				}
				if (data) {
					setCategories(data)
					console.log(data)
            }
        } catch (error) {
            console.log('Error loading user data!')
        } finally {
            setLoading(false)
        }
    }, [supabase])
    const getTracks = useCallback(async () => {
        try {
            setLoading(true)
            const { data, error, status } = await supabase
                .from('tracks')
                .select(`value:id, label:name`)
				if (error && status !== 406) {
					console.log(error)
				}
				if (data) {
					setTracks(data)
					console.log(data)
            }
        } catch (error) {
            console.log('Error loading user data!')
        } finally {
            setLoading(false)
        }
    }, [supabase])
	useEffect(() => {
        getCategories()
        getTracks()
    }, [getCategories, getTracks])
    return (
        <Card>
            <h4 className="mb-6">Basic Information</h4>
            <FormItem
                label="Kode Halte"
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
                            placeholder="Kode Halte"
                            {...field}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Nama Halte"
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
                            placeholder="Nama Halte"
                            {...field}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Kategori Halte"
                invalid={Boolean(errors.categoryId)}
                errorMessage={errors.categoryId?.message}
            >
                <Controller
                    name="categoryId"
                    control={control}
                    render={({ field }) => (
                        <Select
                            instanceId="category"
							placeholder="Kategori Halte"
                            options={categories}
                            value={categories.filter(
                                (category) => category.value === field.value,
                            )}
                            onChange={(option) => field.onChange(option?.value)}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Rute Trayek"
                invalid={Boolean(errors.trackId)}
                errorMessage={errors.trackId?.message}
            >
                <Controller
                    name="trackId"
                    control={control}
                    render={({ field }) => (
                        <Select
                            instanceId="tracks"
							placeholder="Rute Trayek"
                            options={tracks}
                            value={tracks.filter(
                                (track) => track.value === field.value,
                            )}
                            onChange={(option) => field.onChange(option?.value)}
                        />
                    )}
                />
            </FormItem>
            
           
            <FormItem
                label="latitude"
                invalid={Boolean(errors.latitude)}
                errorMessage={errors.latitude?.message}
            >
                <Controller
                    name="latitude"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="latitude"
                            {...field}
                            onChange={(val) => Number(val.target.value) >= 0 ? field.onChange(Number(val.target.value)) : field.onChange(null)}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="longitude"
                invalid={Boolean(errors.longitude)}
                errorMessage={errors.longitude?.message}
            >
                <Controller
                    name="longitude"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="longitude"
                            {...field}
                            onChange={(val) => Number(val.target.value) >= 0 ? field.onChange(Number(val.target.value)) : field.onChange(null)}
                        />
                    )}
                />
            </FormItem>
            
        </Card>
    )
}

export default GeneralSection
