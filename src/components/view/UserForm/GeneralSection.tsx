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

const roles: Options = [
    { label: 'Admin', value: 'admin' },
    { label: 'User', value: 'user' },
]


const GeneralSection = ({ control, errors }: GeneralSectionProps) => {
    // const supabase = createClient()
    // const [loading, setLoading] = useState(true)
    // const [categories, setCategories] = useState<Options>([])
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
    // useEffect(() => {
    //     getCategories()
    // }, [getCategories])
    return (
        <Card>
            <h4 className="mb-6">Basic Information</h4>
            <FormItem
                label="NIP"
                invalid={Boolean(errors.nip)}
                errorMessage={errors.nip?.message}
            >
                <Controller
                    name="nip"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="NIP Anda"
                            {...field}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Nama"
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
                            placeholder="Nama Anda"
                            {...field}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Jabatan"
                invalid={Boolean(errors.position)}
                errorMessage={errors.position?.message}
            >
                <Controller
                    name="position"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="Jabatan Anda"
                            {...field}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Golongan"
                invalid={Boolean(errors.rank)}
                errorMessage={errors.rank?.message}
            >
                <Controller
                    name="rank"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="Golongan Anda"
                            {...field}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Email"
                invalid={Boolean(errors.email)}
                errorMessage={errors.email?.message}
            >
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="Email Anda"
                            {...field}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Nomor HP"
                invalid={Boolean(errors.phone)}
                errorMessage={errors.phone?.message}
            >
                <Controller
                    name="phone"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="Nomor HP Anda"
                            {...field}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Role User"
                invalid={Boolean(errors.role)}
                errorMessage={errors.role?.message}
            >
                <Controller
                    name="role"
                    control={control}
                    render={({ field }) => (
                        <Select
                            instanceId="role"
                            placeholder="Role User"
                            options={roles}
                            value={roles.filter(
                                (role) => role.value === field.value,
                            )}
                            onChange={(option) => field.onChange(option?.value)}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Password"
                invalid={Boolean(errors.password)}
                errorMessage={errors.password?.message}
            >
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="Password Anda"
                            {...field}
                        />
                    )}
                />
            </FormItem>
        </Card>
    )
}

export default GeneralSection
