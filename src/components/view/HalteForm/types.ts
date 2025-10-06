import type { Control, FieldErrors } from 'react-hook-form'

export type GeneralFields = {
    categoryId: string
    code: string
    name: string
    trackId: string
    latitude: number
    longitude: number
    photo: string | null
}

export type PhotoFields = {
    photo: string
}

export type HalteFormSchema = GeneralFields & PhotoFields 

export type FormSectionBaseProps = {
    control: Control<HalteFormSchema>
    errors: FieldErrors<HalteFormSchema>
}
