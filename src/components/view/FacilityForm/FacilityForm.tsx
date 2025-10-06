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

type FacilityFormProps = {
    onFormSubmit: (values: FacilityFormValues) => void
    defaultValues?: FacilityFormValues
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
const FacilityFormSchema = z.object({
  // General facility fields
  categoryId: z.string(),
  code: z.string(),
  name: z.string(),
  status: z.string(),
  note: z.string(),
  documentation: z.string(),

  // Bus fields, which are either string, null, or undefined
  busId: z.string().nullable().optional(),
  busStopId: z.string().nullable().optional(),
}).superRefine((data, ctx) => {
  // Add a final refinement for the exclusive OR logic.
  // We use `.some()` to check for at least one filled value.
  const hasBusId = data.busId !== null && data.busId !== undefined && data.busId !== '';
  const hasBusStopId = data.busStopId !== null && data.busStopId !== undefined && data.busStopId !== '';

  if (hasBusId && hasBusStopId) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'You can only select a Bus or a Halte, not both.',
      path: ['busId'],
    });
  } else if (!hasBusId && !hasBusStopId) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'You must select either a Bus or a Halte.',
      path: ['busId'],
    });
  }
});

// Infer the type from the single schema
type FacilityFormValues = z.infer<typeof FacilityFormSchema>;
// type FacilityFormSchema = z.infer<typeof validationSchema>
const FacilityForm = (props: FacilityFormProps) => {
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
		setValue,
    } = useForm<FacilityFormValues>({
        defaultValues: {},
        resolver: zodResolver(FacilityFormSchema),
    })

    useEffect(() => {
        if (!isEmpty(defaultValues)) {
            reset(defaultValues)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [JSON.stringify(defaultValues)])

    const onSubmit = (values: FacilityFormValues) => {
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
                        <GeneralSection control={control} errors={errors}/>
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
