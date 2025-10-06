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
	useEffect(() => {
        getCategories()
    }, [getCategories])
    return (
        <Card>
            <h4 className="mb-6">Basic Information</h4>
            <FormItem
                label="Kode Bus"
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
                            placeholder="Kode Bus"
                            {...field}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Kategori Inventaris"
                invalid={Boolean(errors.categoryId)}
                errorMessage={errors.categoryId?.message}
            >
                <Controller
                    name="categoryId"
                    control={control}
                    render={({ field }) => (
                        <Select
                            instanceId="category"
							placeholder="Kategori Inventaris"
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
                label="No Polisi"
                invalid={Boolean(errors.plateNumber)}
                errorMessage={errors.plateNumber?.message}
            >
                <Controller
                    name="plateNumber"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="Nomor Polisi"
                            {...field}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Merek Bus"
                invalid={Boolean(errors.brand)}
                errorMessage={errors.brand?.message}
            >
                <Controller
                    name="brand"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="Merek Bus"
                            {...field}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Tahun Pembuatan"
                invalid={Boolean(errors.productionYear)}
                errorMessage={errors.productionYear?.message}
            >
                <Controller
                    name="productionYear"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="number"
                            autoComplete="off"
                            placeholder="Tahun Pembuatan"
                            {...field}
                            onChange={(val) => Number(val.target.value) >= 0 ? field.onChange(Number(val.target.value)) : field.onChange(0)}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="No Rangka"
                invalid={Boolean(errors.frameNumber)}
                errorMessage={errors.frameNumber?.message}
            >
                <Controller
                    name="frameNumber"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="Nomor Rangka"
                            {...field}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="No Mesin"
                invalid={Boolean(errors.machineNumber)}
                errorMessage={errors.machineNumber?.message}
            >
                <Controller
                    name="machineNumber"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="Nomor Mesin"
                            {...field}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Pajak STNK"
                invalid={Boolean(errors.stnkPeriod)}
                errorMessage={errors.stnkPeriod?.message}
            >
                <Controller
                    name="stnkPeriod"
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            {...field}
                            locale='en'
                            placeholder="Select date"
                            value={field.value > 0 ? dayjs.unix(field.value as number).toDate(): null}
                            onChange={(date) => field.onChange(dayjs(date).unix())}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Pajak Kendaraan"
                invalid={Boolean(errors.taxPeriod)}
                errorMessage={errors.taxPeriod?.message}
            >
                <Controller
                    name="taxPeriod"
                    control={control}
                    render={({ field }) => (
                        <DatePicker
                            {...field}
                            locale='en'
                            placeholder="Select date"
                            value={field.value > 0 ? dayjs.unix(field.value as number).toDate(): null}
                            onChange={(date) => field.onChange(dayjs(date).unix())}
                        />
                    )}
                />
            </FormItem>
        </Card>
    )
}

export default GeneralSection
