import type { Control, FieldErrors } from 'react-hook-form'

export type GeneralFields = {
    categoryId: string
    code: string
    plateNumber: string
    brand: string
    productionYear: number
    frameNumber: string
    machineNumber: string
    stnkPeriod: number
    taxPeriod: number
    photo: string | null
}

export type PhotoFields = {
    photo: string
}

export type BusFormSchema = GeneralFields & PhotoFields 

export type FormSectionBaseProps = {
    control: Control<BusFormSchema>
    errors: FieldErrors<BusFormSchema>
}
