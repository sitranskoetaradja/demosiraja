'use client'

import { useEffect, useState } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import GeneralSection from './GeneralSection'
import ImageSection from './ImageSection'
import isEmpty from 'lodash/isEmpty'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
import { FacilityFormSchema } from './types'
// import type { BusFormSchema } from './types'

type FacilityFormProps = {
    onFormSubmit: (values: FacilityFormSchema) => void
    defaultValues?: FacilityFormSchema
    newFacility?: boolean
} & CommonProps

// const validationSchema = z.object({
//     categoryId: z.string().min(1, { message: 'Kategori harus dipilih!' }),
//     code: z.string().min(1, { message: 'Kode fasilitas harus dipilih!' }),
//     name: z.string().min(1, { message: 'Nama fasilitas harus dipilih!' }),
// 	status: z.string().min(1, { message: 'Rute Trayek harus dipilih!' }),
//     note: z.string().nullable(),
// 	busId: z.string().nullable(),
// 	busStopId: z.string().nullable(),
//     documentation: z.string(),
// })
const FacilityForm = (props: FacilityFormProps) => {
    const FacilityFormSchema = z.object({
        // General facility fields
        categoryId: z.string().min(1, { message: 'Kategori harus dipilih!' }),
        code: z.string().min(1, { message: 'Kode fasilitas harus dipilih!' }),
        name: z.string().min(1, { message: 'Nama fasilitas harus dipilih!' }),
        status: z.string().min(1, { message: 'Rute Trayek harus dipilih!' }),
        note: z.string(),
        documentation: z.string(),

        // Bus fields, which are either string, null, or undefined
        busId: z.string().nullable().optional(),
        busStopId: z.string().nullable().optional(),
    }).superRefine((data, ctx) => {
        console.log(ctx)
        // Add a final refinement for the exclusive OR logic.
        // We use `.some()` to check for at least one filled value.
        const hasBusId = data.busId !== null && data.busId !== undefined && data.busId !== '';
        const hasBusStopId = data.busStopId !== null && data.busStopId !== undefined && data.busStopId !== '';
        console.log('busId', data.busId)
        console.log('busStopId', data.busStopId)
        console.log('hasBusId', hasBusId)
        console.log('hasBusStopId', hasBusStopId)

        //   if (hasBusId && hasBusStopId) {
        //     ctx.addIssue({
        //       code: "custom",
        //       message: 'You can only select a Bus or a Halte, not both.',
        //       path: ['busId'],
        //     });
        //     ctx.addIssue({
        //       code: "custom",
        //       message: 'You can only select a Bus or a Halte, not both.',
        //       path: ['busStopId'],
        //     });
        //   } 
        if (!hasBusId && !hasBusStopId) {
            ctx.addIssue({
                code: "custom",
                message: 'Kode bus harus dipilih.',
                path: ['busId'],
            });
            ctx.addIssue({
                code: "custom",
                message: 'Nama Halte harus dipilih.',
                path: ['busStopId'],
            });
        }
        if (lokasi == 'bus') {
            data.busStopId = null
        } else if (lokasi == 'halte') {
            data.busId = null
        }
    });

    // Infer the type from the single schema
    type FacilityFormValues = z.infer<typeof FacilityFormSchema>;
    // type FacilityFormSchema = z.infer<typeof validationSchema>
    type LokasiType = string
    // const [switch, setSwitch] = useState('bus')
    const [lokasi, setLokasi] = useState<LokasiType>('bus')
    const {
        onFormSubmit,
        defaultValues = {},
        newFacility = false,
        children
    } = props

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
        watch,
        setValue,
    } = useForm<FacilityFormValues>({
        defaultValues: {
            busId: '',
            busStopId: ''
        },
        resolver: zodResolver(FacilityFormSchema),
    })
    // 🔹 Otomatis null-kan salah satu
    const busId = watch('busId')
    const busStopId = watch('busStopId')
    // 🧠 Sinkronisasi otomatis
    useEffect(() => {
        if (lokasi === 'bus') {
            // jika user baru isi busId, kosongkan busStopId
            setValue('busStopId', null)
        }
    }, [lokasi, setValue, setLokasi])

    useEffect(() => {
        if (lokasi === 'halte') {
            // jika user baru isi busStopId, kosongkan busId
            setValue('busId', null)
        }
    }, [lokasi, setValue, setLokasi])
    useEffect(() => {

        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
            console.log("reset")
        }
        console.log(control)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(defaultValues)])

    const onSubmit = (values: FacilityFormValues) => {
        onFormSubmit?.(values)
        console.log('onFormSubmit values', values)
    }

    return (
        <Form
            className="flex w-full h-full"
            containerClassName="flex flex-col w-full justify-between"
            onSubmit={handleSubmit(onSubmit)}
        >
            <Container>
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="gap-4 flex flex-col flex-auto">
                        <GeneralSection control={control} errors={errors} setLokasi={setLokasi} />
                    </div>
                    <div className="md:w-[370px] gap-4 flex flex-col">
                        <ImageSection
                            control={control}
                            errors={errors}
                        />
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default FacilityForm
