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
	
    return (
        <Card>
            <h4 className="mb-6">Basic Information</h4>
            <FormItem
                label="Kode Rute Trayek"
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
                            placeholder="Kode Rute Trayek"
                            {...field}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Nama Rute Trayek"
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
                            placeholder="Nama Rute Trayek"
                            {...field}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Halte Awal"
                invalid={Boolean(errors.from)}
                errorMessage={errors.from?.message}
            >
                <Controller
                    name="from"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="Halte Awal"
                            {...field}
                        />
                    )}
                />
            </FormItem>
            <FormItem
                label="Halte Akhir"
                invalid={Boolean(errors.to)}
                errorMessage={errors.to?.message}
            >
                <Controller
                    name="to"
                    control={control}
                    render={({ field }) => (
                        <Input
                            type="text"
                            autoComplete="off"
                            placeholder="Halte Akhir"
                            {...field}
                        />
                    )}
                />
            </FormItem>
            
        </Card>
    )
}

export default GeneralSection
