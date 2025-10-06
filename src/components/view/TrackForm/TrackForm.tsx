'use client'

import { useEffect } from 'react'
import { Form } from '@/components/ui/Form'
import Container from '@/components/shared/Container'
import BottomStickyBar from '@/components/template/BottomStickyBar'
import GeneralSection from './GeneralSection'
import isEmpty from 'lodash/isEmpty'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import type { ZodType } from 'zod'
import type { CommonProps } from '@/@types/common'
// import { TrackFormSchema } from './types'
// import type { BusFormSchema } from './types'

type TrackFormProps = {
    onFormSubmit: (values: TrackFormSchema) => void
    defaultValues?: TrackFormSchema
    newTrack?: boolean
} & CommonProps

const validationSchema = z.object({
    code: z.string().min(1, { message: 'Kode bus harus diisi!' }),
    name: z.string().min(1, { message: 'Nomor polisi harus diisi!' }),
    from: z.string().min(1, { message: 'Merek harus diisi!' }),
    to: z.string().min(1, { message: 'Nomor rangka harus diisi!' }),
    
})
type TrackFormSchema = z.infer<typeof validationSchema>
const TrackForm = (props: TrackFormProps) => {
    const {
        onFormSubmit,
        defaultValues = {},
        newTrack = false,
        children
    } = props

    const {
        handleSubmit,
        reset,
        formState: { errors },
        control,
    } = useForm<TrackFormSchema>({
        defaultValues: {},
        resolver: zodResolver(validationSchema),
    })

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(defaultValues)])

    const onSubmit = (values: TrackFormSchema) => {
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
                        {/* <ImageSection
                            control={control}
                            errors={errors}
                        /> */}
                    </div>
                </div>
            </Container>
            <BottomStickyBar>{children}</BottomStickyBar>
        </Form>
    )
}

export default TrackForm
