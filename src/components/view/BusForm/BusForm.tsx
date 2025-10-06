'use client'

import { useEffect } from 'react'
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
// import type { BusFormSchema } from './types'

type BusFormProps = {
    onFormSubmit: (values: BusFormSchema) => void
    defaultValues?: BusFormSchema
    newBus?: boolean
} & CommonProps

const validationSchema = z.object({
    categoryId: z.string().min(1, { message: 'Kategori harus dipilih!' }),
    code: z.string().min(1, { message: 'Kode bus harus diisi!' }),
    plateNumber: z.string().min(1, { message: 'Nomor polisi harus diisi!' }),
    brand: z.string().min(1, { message: 'Merek harus diisi!' }),
    productionYear: z.number().min(2000, "Tahun harus setelah 2000.").max(new Date().getFullYear(), "Tidak bisa melebihi tahun sekarang"),
    frameNumber: z.string().min(1, { message: 'Nomor rangka harus diisi!' }),
    machineNumber: z.string().min(1, { message: 'Nomor mesin harus diisi!' }),
    stnkPeriod:  z.number().positive({ error: 'Pajak STNK harus diisi!' }),
    taxPeriod:  z.number().positive({ error: 'Pajak Kendaraan harus diisi!' }),
    photo: z.string(),
})
type BusFormSchema = z.infer<typeof validationSchema>
const BusForm = (props: BusFormProps) => {
    const {
        onFormSubmit,
        defaultValues = {},
        newBus = false,
        children
    } = props

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm<BusFormSchema>({
        defaultValues: {},
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(defaultValues)])

    const onSubmit = (values: BusFormSchema) => {
        onFormSubmit?.(values)
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
                        <GeneralSection control={control} errors={errors} />
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

export default BusForm
