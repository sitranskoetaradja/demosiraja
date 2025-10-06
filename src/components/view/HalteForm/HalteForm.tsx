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

type HalteFormProps = {
    onFormSubmit: (values: HalteFormSchema) => void
    defaultValues?: HalteFormSchema
    newHalte?: boolean
} & CommonProps

const validationSchema = z.object({
    categoryId: z.string().min(1, { message: 'Kategori harus dipilih!' }),
    code: z.string().min(1, { message: 'Kode Halte harus diisi!' }),
    name: z.string().min(1, { message: 'Nama Halte harus diisi!' }),
    trackId: z.string().min(1, { message: 'Rute Trayek harus dipilih!' }),
    latitude: z.number().min(-90, { error: "Latitude must be greater than or equal to -90" }).max(90, { error: "Latitude must be less than or equal to 90" }),
    longitude: z.number().min(-180, { error: "Latitude must be greater than or equal to -180" }).max(180, { error: "Latitude must be less than or equal to 180" }),
    photo: z.string(),
})
type HalteFormSchema = z.infer<typeof validationSchema>
const HalteForm = (props: HalteFormProps) => {
    const {
        onFormSubmit,
        defaultValues = {},
        newHalte = false,
        children
    } = props

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm<HalteFormSchema>({
        defaultValues: {},
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(defaultValues)])

    const onSubmit = (values: HalteFormSchema) => {
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

export default HalteForm
