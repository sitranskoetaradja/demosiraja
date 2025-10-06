import type { Control, FieldErrors } from 'react-hook-form'

export type GeneralFields = {
    categoryId: string
    busId?: string | null | undefined;
    busStopId?: string | null | undefined;
    code: string
    name: string
    note: string
    status: string
    documentation: string | null
}

export type DocumentationFields = {
    documentation: string
}

export type FacilityFormSchema = GeneralFields & DocumentationFields 

export type FormSectionBaseProps = {
    control: Control<FacilityFormSchema>
    errors: FieldErrors<FacilityFormSchema>
}
